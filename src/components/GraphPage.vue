<style scoped>
    .container {
        margin: 25px auto;
    }

    .main-background {
        min-height: 200px;
        background-color: rgba(52, 73, 94,1.0);
    }

    .graph-container {
        background-color: rgba(52, 73, 94,1.0);
        padding: 10px 0;
    }

    .container-box {
        margin-top: 20px;
        padding: 10px;
        line-height: 1.5em;
        background-color: rgba(44, 62, 80, 1.0);
        border: solid thin rgba(236, 240, 241,1.0);
    }
     .box-shadow {
        box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.7);
    }
</style>

<template>
    <div class="container box-shadow">
        <summoner-header></summoner-header>

        <div class="row">
            <div class="col-xs-12 graph-container">
                <div class="col-xs-6">
                    <div class="container-box">
                        <h1 class="text-center">{{ chestPercentage }} Chests Unlocked</h1>
                        <graph :data="graphDatasets.chestsUnlocked.data" type="pie" mount="chests"></graph>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="container-box">
                        <h1 class="text-center">{{ sRankPercentage }} of Champions at S Rank</h1>
                        <graph :data="graphDatasets.sRankedChampionsPercentage.data" type="pie" mount="srank"></graph>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 graph-container">
                <div class="col-xs-6">
                    <div class="container-box">
                        <h1 class="text-center">Champion Rank Count Bar</h1>
                        <graph :data="graphDatasets.championRankCount.data" type="bar" mount="barchart"></graph>
                    </div>
                </div>
                <div class="col-xs-6">
                    <div class="container-box">
                      <h1 class="text-center">Champion Preference</h1>
                      <graph :options="graphDatasets.championPreference.options" :data="graphDatasets.championPreference.data" type="radar" mount="preference"></graph>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var AppStore = require('../store/AppStore');
    var PageNames = require('../config/PageNames');

    var Graph = require('./Graph.vue');
    var SummonerHeader = require('./SummonerHeader.vue');

    module.exports = {
        data: function() {
            return {
                store: AppStore,
                graphDatasets: {
                    chestsUnlocked: { data: '', loaded: false },
                    sRankedChampionsPercentage: { data: '', loaded: false },
                    championRoleExperienceByType: { data: '', loaded: false },
                    championRankCount: { data: '', loaded: false },
                    championPreference: {data: '', loaded: false}
                },
                PageNames: PageNames,
                summonerProfileImageUrl: "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/" + AppStore.getSummonerInformation().profileIconId + ".png",
                leagueChampionCount: '',
                chestPercentage: '',
                sRankPercentage: ''
            }
        },

        components: {
            Graph,
            SummonerHeader
        },

        methods: {
            populateChampionRoleExperienceByTypeDataset: function() {
            },

            populatePercentageOfChestsDataset: function() {
                var summonerChampions = this.store.getChampionMasteries();
                var summonerChampionCount = summonerChampions.length;

                var chestsUnlocked = summonerChampions.filter((value) => {
                    return value.chestGranted === true;
                }).length;

                var notUnlocked = this.leagueChampionCount - chestsUnlocked;

                var unlockedPercentage = (chestsUnlocked / (chestsUnlocked + notUnlocked)) * 100;
                unlockedPercentage = unlockedPercentage.toFixed(2) + "%";

                this.chestPercentage = unlockedPercentage;

                var data = {
                    labels: [
                        'Chests Unlocked',
                        'Chests Not Unlocked'
                    ],

                    datasets: [{
                        data: [chestsUnlocked, notUnlocked],
                        backgroundColor: ['#16a085', '#1abc9c']
                    }]
                };

                this.graphDatasets.chestsUnlocked.data   = data;
                this.graphDatasets.chestsUnlocked.loaded = true;
            },

            populatePercentageOfSRankedChampions: function() {
                var summonerChampions = this.store.getChampionMasteries();

                var sRankedChampions = summonerChampions.filter(function(value) {
                    return (value.highestGrade === 'S' || value.highestGrade === 'S-' || value.highestGrade === 'S+');
                }).length;

                var other = this.leagueChampionCount - sRankedChampions;

                var sRankPercentage = (sRankedChampions / this.leagueChampionCount) * 100;
                sRankPercentage = sRankPercentage.toFixed(2) + "%";
                this.sRankPercentage = sRankPercentage;

                var data = {
                    labels: [
                        'S Ranked Champions',
                        'Other'
                    ],

                    datasets: [{
                        data: [sRankedChampions, other],
                        backgroundColor: ['#16a085', '#1abc9c']
                    }]
                };


                this.graphDatasets.sRankedChampionsPercentage.data   = data;
                this.graphDatasets.sRankedChampionsPercentage.loaded = true;
            },

            populateChampionRankCount: function() {
                var sRanked = this.getChampionCountAtRank('S');
                var aRanked = this.getChampionCountAtRank('A');
                var bRanked = this.getChampionCountAtRank('B');
                var cRanked = this.getChampionCountAtRank('C');
                var dRanked = this.getChampionCountAtRank('D');
                var eRanked = this.getChampionCountAtRank('E');
                var fRanked = this.getChampionCountAtRank('F');

                var unranked = this.leagueChampionCount
                                 - (sRanked
                                 + aRanked
                                 + bRanked
                                 + cRanked
                                 + dRanked
                                 + eRanked
                                 + fRanked);

                var data = {
                    labels: ['S', 'A', 'B', 'C', 'D', 'E', 'F', 'Unranked'],
                    datasets: [
                        {
                            label: 'Champion Ranks',
                            backgroundColor: '#16a085',
                            data: [sRanked, aRanked, bRanked, cRanked, dRanked, eRanked, fRanked, unranked],
                        }
                    ]
                };

                this.graphDatasets.championRankCount.data   = data;
                this.graphDatasets.championRankCount.loaded = true;
            },

            populateTagPreference : function() {
                var tags = this.store.getChampionTypes();
                var data = {};

                var dataset = [];

                var _this = this;

                tags.forEach(function(tag) {
                  var tagExperience = _this.store.getXpForTag(tag);
                  dataset.push(tagExperience);
                });

                data = {
                  datasets: [
                    {
                      data: dataset,
                      backgroundColor: "#16a085",
                      borderColor: "#fff",
                      pointBackgroundColor: "#16a085",
                      pointBorderColor: "#fff",
                      pointHoverBackgroundColor: "#fff",
                      pointHoverBorderColor: "rgba(179,181,198,1)",
                      label: "Experience"
                    }
                  ],
                  labels: tags
                };

                this.graphDatasets.championPreference = {};

                this.graphDatasets.championPreference.options = {
                  scale: {
                    ticks: {
                        display: false
                    }
                  }
                };

                this.graphDatasets.championPreference.data = data;
                this.graphDatasets.championPreference.loaded = true;
            },

            getChampionCountAtRank: function(rank) {
                var summonerChampions = this.store.getChampionMasteries();
                rank = rank.toUpperCase();

                var count = summonerChampions.filter(function(value) {
                    return (value.highestGrade === rank || value.highestGrade === (rank + '-') || value.highestGrade === (rank + '+'));
                }).length;

                return count;
            },

            populatePercentageOfChampionsMastered: function() {
            }
        },

        ready: function() {
            this.leagueChampionCount = Object.keys(this.store.getAllChampionDetails()).length;

            this.populatePercentageOfChestsDataset();
            this.populatePercentageOfSRankedChampions();
            this.populateChampionRankCount();
            this.populateChampionRoleExperienceByTypeDataset();
            this.populateTagPreference();
            this.populatePercentageOfChampionsMastered();
        }
    }
</script>

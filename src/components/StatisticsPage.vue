<style scoped>
    .container {
    }
    .main-background {
        min-height: 200px;
        background-color: rgba(44, 62, 80,1.0);
    }
    .stats-container {
        height: 100%;
        padding: 5px;
    }
    .stats-container {
        text-align: center;
    }
    .stats-container span {
        display: block;
    }
    .stats-container .sub-title {
        display: block;
        font-size: 1.2em;
        color: rgba(22, 160, 133, 1.0);
    }
    .champion-name {
        color: rgba(22, 160, 133, 1.0);
        text-transform: uppercase;
        font-size: 1.5em;
        margin: 10px auto;
        border-top: solid thin white;
        border-bottom: solid thin white;
    }
    .champions-textfield {
        display: block;
        padding: 15px;
        margin-bottom: 20px;
        position: relative
    }
    .champions-textfield>input:focus~label {
        color: #2196F3
    }
    .champions-textfield>input {
        animation-duration: .1ms;
        animation-name: mui-node-inserted;
        display: block;
        background-color: transparent;
        color: darkgrey;
        border: none;
        border-bottom: solid 1px white;
        outline: 0;
        height: 32px;
        width: 100%;
        font-size: 18px;
        padding-left: 15px;
        box-shadow: none;
        border-radius: 0
    }
    .champions-textfield>input::-webkit-input-placeholder{
        color: darkgrey;
        opacity: 1
    }
    .champions-textfield>input::-moz-placeholder {
        color: darkgrey;
        opacity: 1
    }
    .champions-textfield>input:-ms-input-placeholder {
        color: darkgrey;
        opacity: 1
    }
    .champions-textfield>input::placeholder {
        color: darkgrey;
        opacity: 1
    }
    .champions-textfield>input:focus {
        height: 32px;
    }
    .champion-search-container {
        padding-top: 25px;
        background-color: #95a5a6;
    }
    .top-three-container {
        margin-top: 25px;
    }
    .top-three-container .champion:hover {
      background-color: rgba(255, 255, 255, .1);
    }
    .uppercase {
        text-transform: uppercase;
    }
    .back-button {
        background-color: rgba(52, 73, 94,1.0);
        box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
        color: #ffffff;
        text-align: center;
        padding: 10px 15px;
        margin: 10px 5px;
        border-radius: 3px;
        cursor: pointer;
        float: left;
        width: 100%;
    }
    #champions-list-wrapper {
        position: relative;
        text-align: center
    }
    #champions-list {
        padding: 0
    }
    #champions-list>li {
        margin: 10px;
        position: relative;
        width: 140px;
        height: 140px;
        overflow: hidden;
        display: inline-flex;
        list-style-type: none;
        cursor: pointer;
        z-index: 20000;
        -moz-box-shadow: 1px 1px 16px 0px rgba(0, 0, 0, 0.75);
        box-shadow: 1px 1px 16px 0px rgba(0, 0, 0, 0.75);
        background-color: rgba(52, 73, 94, 1.0);
    }
    #detail-view,
    #champions-list li span {
        position: absolute;
        bottom: 0;
        margin-top: 5px;
    }
    @media (max-width: 767px) {
        #champions-list li {
            margin: 5px
        }
    }
    @media (max-width: 320px) {
        #champions-list>li {
            width: 110px;
            height: 110px
        }
    }
    @media (min-width: 992px) {
        #champions-list>li {
            width: 160px;
            height: 160px
        }
    }
    #champions-list .champion-sprite {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        position: absolute;
        background-color: transparent;
        border: none
    }
    #champions-list .champion-sprite:hover {
        background-color: rgba(255, 255, 255, .3)
    }
    #champions-list .champion-sprite>.mui-ripple-effect {
        background-color: #fff
    }
    #champions-list button.champion-sprite:active,
    #champions-list button.champion-sprite:focus {
        background-color: initial;
        outline: 0
    }
    .champion-sprite {
        background-repeat: no-repeat;
        background-position: center center;
        width: 140px;
        height: 140px
    }
    .champion-sprite .glyphicon {
        position: absolute;
        top: 137px;
        padding-top: 2px;
        padding-right:10px;
        text-align: right !important;
        font-size: 40px;
        color: white;
    }
    .champion-sprite .unlocked {
        color: #FFFF00 !important;
    }
    @media (max-width: 320px) {
        .champion-sprite {
            width: 110px;
            height: 110px
        }
    }
    @media (min-width: 992px) {
        .champion-sprite {
            width: 160px;
            height: 160px
        }
    }
    #champions-list li span {
        color: #fff;
        font-size: 14px;
        background-color: rgba(0, 0, 0, .5);
        left: 0;
        right: 0;
        z-index: 20;
        text-align: center;
        pointer-events: none
    }
    .champion-splash-wrapper {
        display: block;
        padding: 0px 32px;
        height: 300px;
        background-size: cover;
        background-position: center top;
        position: relative;
    }
    .champion-stats {
        position: absolute;
        left: 20px;
        background: rgba(0, 0, 0, 0.5);
        padding: 8px 16px;
    }
    .champion-stats-type {
        font-size: 10px;
        color: #888;
    }
    .champion {
        cursor: pointer;
        margin-top: 0;
    }

    .splash-fix {
        margin: 0;
        padding: 0;
    }

    .champion-list-container {
        background-color: rgba(52, 73, 94, 0.8);
    }

    .details {
      margin-top: 20px;
    }

    .box-shadow {
        box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.7);
    }
</style>

<template>
    <div class="container box-shadow">
        <div class="row">
            <div class="col-xs-12 main-background">

                <summoner-header></summoner-header>

                <div class="row" v-if="!champDetail">
                    <div class="col-xs-12 top-three-container">
                        <div class="champion col-xs-4" v-for="champInfo in topThreeChamps" @click="displayChampionDetails(champInfo)">
                            <div class="col-xs-12">
                                <img class="img-rounded center-block" v-bind:src="champInfo.details.imageUrl" />
                            </div>
                            <div class="col-xs-12">
                                <h2 class="text-center champion-name">{{ champInfo.details.name }} - {{ champInfo.details.title }}</h2>
                            </div>
                            <div class="stats-container">
                                <p>
                                    <span class="sub-title">Mastery Points!</span>
                                    <span>{{ cleanPoints(champInfo.mastery.championPoints) }}</span>
                                </p>
                                <p>
                                    <span class="sub-title">Highest Rank</span>
                                    <span>{{ cleanRank(champInfo.mastery.highestGrade) }}</span>
                                </p>
                                <p>
                                    <span class="sub-title">Chest Unlocked</span>
                                    <span>{{ convertBoolean(champInfo.mastery.chestGranted) }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row champion-list-container" v-if="!champDetail">
                    <div class="container">
                        <label>Filter Champion List</label>
                      <input id="champions-search-bar" class="form-control" v-model="championSearch" placeholder="Champion name..." type="text">
                    </div>
                    <div id="champions-list-wrapper">
                        <ul id="champions-list">
                            <li v-for="champInfo in this.filterChampionsByName(championSearch)"
                                v-bind:style="{ background: champInfo.mastery.chestGranted ? '#16a085' : '#7f8c8d' }">
                                <div class="champion-sprite" @click="displayChampionDetails(champInfo)">
                                    <div class="row">
                                      <span v-bind:class="[glyphicon, chestIcon, champInfo.mastery.chestGranted ? unlockedColour : '']"></span>
                                      <img style="padding:5px;" class="img-rounded center-block" v-bind:src="champInfo.details.imageUrl" />
                                      <progress class="progress"
                                                style="height:7px; width:115px;"
                                                title="{{champInfo.mastery.championPoints}} / 46800"
                                                value="{{champInfo.mastery.championPoints}}"
                                                max="46800">{{ (champInfo.mastery.championPoints / 46800) * 100}}%</progress>
                                    </div>
                                    <span class="uppercase">{{champInfo.details.name}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="row" v-if="champDetail">
                    <div class="col-lg-12 splash-fix">
                      <div class="champion-splash-wrapper" style="background-image: url('http://ddragon.leagueoflegends.com/cdn/img/champion/splash/{{champDetail.details.key}}_0.jpg');">

                      <div class="champion-stats">
                        <div>
                          <div class="champion-stats-type uppercase text-center">Highest Rank</div>
                          <div class="text-center">{{champDetail.mastery.highestGrade == undefined ? 'Unranked' : champDetail.mastery.highestGrade}}</div>
                        </div>
                        <div style="padding-top:10px">
                          <div class="champion-stats-type uppercase">Current Experience</div>
                          <div class="text-center">{{champDetail.mastery.championPoints}}</div>
                        </div>
                        <div style="padding-top:10px">
                          <div class="champion-stats-type uppercase text-center">Chest Captured</div>
                          <div class="text-center uppercase">{{champDetail.mastery.chestGranted ? 'Yes' : 'No'}}</div>
                        </div>
                      </div>
                    </div>
                      <div class="col-xs-12 details">
                          <div class="col-xs-2">
                              <!-- back button-->
                              <span @click="hideChampionDetails()" class="back-button"><i class="glyphicon glyphicon-chevron-left"></i> Back</span>
                          </div>
                          <div class="col-xs-10">
                              <champ-info :champ-info="champDetail"></champ-info>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var AppStore = require('../store/AppStore');
    var PageNames = require('../config/PageNames');

    var SummonerHeader = require('./SummonerHeader.vue');
    var ChampInfo = require('./ChampInfo.vue');

    var allChampions = [];

    module.exports = {
        data: function() {
            allChampions = AppStore.getAllChampionInformation();
            var championInformation = allChampions;

            var topThree = championInformation.slice(0, 3);
            var rest = championInformation.slice(3, championInformation.length);

            return {
                glyphicon: 'glyphicon',
                chestIcon: 'glyphicon-bed',
                unlockedColour: 'unlocked',

                championSearch: '',
                champDetail: undefined,
                topThreeChamps: topThree,
                restOfChamps: rest,
                store: AppStore,
                PageNames: PageNames,
                summonerProfileImageUrl: "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/" + AppStore.getSummonerInformation().profileIconId + ".png"
            }
        },

        components: {
            SummonerHeader,
            ChampInfo
        },

        methods: {
            filterChampionsByName: function(championName) {
              if (championName == null || championName == undefined || championName == NaN || championName.length == '') {
                return allChampions.slice(3, allChampions.length);
              }

              return allChampions.filter(function(champion) {
                return champion.details.name.toLowerCase().indexOf(championName.toLowerCase()) >= 0 ||
                        champion.details.key.toLowerCase().indexOf(championName.toLowerCase()) >= 0;
              });
            },

            convertBoolean: function(bool) {
                return (bool === true) ? 'Yes' : 'No';
            },

            cleanPoints: function(points) {
                if (typeof points === 'undefined') {
                    return 0;
                }

                return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            cleanRank: function(rank) {
                if (typeof rank === 'undefined') {
                    return 'Unrated';
                }

                return rank;
            },

            displayChampionDetails: function(champInfo) {
                this.champDetail = champInfo;
            },

            hideChampionDetails: function() {
                this.champDetail = null;
            }
        }
    }
</script>

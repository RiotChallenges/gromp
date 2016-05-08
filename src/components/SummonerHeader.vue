<style scoped>
    .top-header {
        width: 100%;
        background: #22313F;
        color: rgba(22, 160, 133,1.0);
    }

    .top-header .profile-icon {
        margin: 10px;
    }

    .top-header .main-title {
        font-size: 2.3em;
        font-family: 'Lato';
        color: #ffffff;
        text-transform: uppercase;
    }

    .main-title {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .top-header .summoner-details {
        font-size: 1.5em;
        margin: 10px;
    }

    .nav {
        display: inline;
        position: absolute;
        right: 0;
        top: 10px;
    }

    .nav ul {
        list-style-type: none;
    }

    .nav ul li {
        background-color: rgba(52, 73, 94,1.0);
        box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.3);
        color: #ffffff;
        text-align: center;
        padding: 10px 15px;
        margin: auto 5px;
        border-radius: 3px;
        cursor: pointer;
        float: left;
    }

    .nav ul li:hover {
        background-color: rgba(26, 188, 156,1.0);
    }

    .progressBarContainer {
        position: relative;
        width: 100%;
        height: 30px;
        background-color: #ddd;
    }

    .progressBar {
        position: absolute;
        width: 10%;
        height: 100%;
        background-color: #4CAF50;
    }

    .progressBarLabel {
        text-align: center;
        line-height: 30px;
        color: white;
    }

    .progress-bar-success {
        background-color: rgba(39, 174, 96,1.0);
    }

    .progress {
        height: 30px;
    }

    .progress-bar {
        font-size: 1em;
        line-height: 30px;
    }
</style>

<template>
    <div class="row">
        <div class="col-xs-12 top-header">
            <div class="col-xs-2">
                <img :src="summonerProfileImageUrl" class="img-rounded profile-icon"/>
            </div>
            <div class="col-xs-5">
                <div class="summoner-details">
                    <h1 class="main-title">{{ store.getSummonerInformation().name }} / {{ store.getRegion() }}</h1>

                    <div class="progress">
                      <div class="progress-bar progress-bar-success" role="progressbar"
                      aria-valuenow="{{ store.getSummonerInformation().summonerLevel }}" aria-valuemin="0"
                      aria-valuemax="30" style="width:{{ (store.getSummonerInformation().summonerLevel / 30) * 100}}%">
                        Level  {{ store.getSummonerInformation().summonerLevel }}
                      </div>
                    </div>
                </div>
                </div>
                <div class="col-xs-5">

                <div class="nav">
                    <ul>
                        <li @click="store.setActivePage(PageNames.DialoguePage)"><span style="font-size:1em;" class="glyphicon glyphicon-search"></span></li>
                        <li @click="store.setActivePage(PageNames.GraphPage)"><span style="font-size:1em;" class="glyphicon glyphicon-object-align-bottom"></span>&nbsp;&nbsp;Graphs</li>
                        <li @click="store.setActivePage(PageNames.StatisticsPage)"><span style="font-size:1em;" class="glyphicon glyphicon-fire"></span>&nbsp;&nbsp;Masteries</li>
                        <li @click="store.setActivePage(PageNames.AchievementPage)"><span style="font-size:1em;" class="glyphicon glyphicon-gift"></span>&nbsp;&nbsp;Achievements</li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    var AppStore = require('../store/AppStore');
    var PageNames = require('../config/PageNames');

    module.exports = {
        data: function() {
            return {
                store: AppStore,
                PageNames: PageNames,
                summonerProfileImageUrl: "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/profileicon/" + AppStore.getSummonerInformation().profileIconId + ".png"
            }
        },

        methods: {
          restart : function() {

          }
        }
    }
</script>

<style>

 #pre-load { background: url('https://superbuytires.com/images/Loading.gif') no-repeat -9999px -9999px; }

 .landing-page-container {
    margin: 100px auto;
    box-sizing: border-box;
    background: linear-gradient(rgba(44, 62, 80, 0.9), rgba(34, 49, 63, 0.9));
    background-size: cover;
    width: 75%;
    position: relative;
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.47);

 }

 .region-select-container {
    margin: 10px auto;
 }

 .region-selector {
    cursor: pointer;
    background-color: rgba(44, 62, 80, 1.0);
    color: rgba(22, 160, 133,1.0);
    padding: 10px;
    margin-top: 10px;
    box-sizing: border-box;
    width: 9%;
 }

 .region-selector .region-text {
    display: block;
    text-align: center;
 }

 .region-selector.active {
    background-color: rgba(22, 160, 133,1.0);
    color: rgba(236, 240, 241,1.0);
 }

 .search-button {
    border: none;
    background-color: rgba(22, 160, 133,1.0);
    color: rgba(236, 240, 241, 1.0);
    margin-top: 25px;
    width: 100%;
    padding: 10px;
    font-size: 1.2em;
 }

 .search-button:focus {
    outline: none;
 }

 @media only screen and (min-width: 960px) {
     .render {
      background: url('https://s3-us-west-1.amazonaws.com/riot-api/img/api-challenge.png') no-repeat;
      position: absolute;
      height: 530px;
      width: 300px;
      top: -10px;
      left: -50px;
      z-index: 1;
   }

   .form-container {
      margin-left: 250px;
   }
 }
</style>

<template>
    <div class="container landing-page-container">
      <div class="col-xs-12">
        <div class="render"></div>
       <span id="pre-load"></span>

       <div class="form-container">
        <div class="row">
            <div class="col-xs-12">
                <h1>Gromp</h1>
                <p>League Mastery Helper</h1>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <input type="text" placeholder="Enter your Summoner Name.." class="form-control" v-model="summonerName" @keyup.enter="findUser" />
            </div>
        </div>

        <div class="row">
          <div class="col-xs-12">
              <div class="region-select-container">
                  <div class="col-xs-12">
                    <div class="center-block">
                      <div class="col-xs-1 region-selector"
                            v-for="playerRegion in regions"
                            v-bind:class="{'active': playerRegion == region }"
                            @click="this.region = playerRegion"
                            >

                            <span class="region-text">{{ playerRegion }}</span>
                            </div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="row">
              <div class="col-xs-12">
                  <div class="col-xs-6 col-xs-offset-3">
                    <button class="search-button" @click="findUser">Search</button>
                  </div>
              </div>
          </div>

          <div class="row">
              <div class="col-xs-12">
                  <div class="col-xs-6 col-xs-offset-3 text-center">
                    <h2>{{store.getClientMessage()}}</h2>
                  </div>
              </div>
          </div>
        </div>
        </div>

    </div>
</template>

<script>
    var ApiService = require('../services/ApiService');
    var AppStore = require('../store/AppStore');
    var PageNames = require('../config/PageNames');

    AppStore.setClientMessage('');

    var populateStore = function(regionCode, summonerName) {
      ApiService.getChampionMasteryDetails(summonerName, regionCode,
          function(success) {
            AppStore.setClientMessage('');
            AppStore.setLoadingMessage("Invading enemy jungle.");
            AppStore.setChampionMasteries(success.data);

            populateChampionDetails(regionCode, function() {
              AppStore.setLoadingMessage("Done!");
              AppStore.setActivePage(PageNames.StatisticsPage);
            });
      },
          function(failed) {
            AppStore.setClientMessage('Could not find that summoner!');
            AppStore.setActivePage(PageNames.DialoguePage);
      });
    }

    var populateSummonerInformation = function(regionCode, summonerName) {
      ApiService.getSummonerInformation(regionCode, summonerName,
                                        function(success) {AppStore.setSummonerInformation(success.data);},
                                        function(failure) {console.log(failure);});
    }

    var populateChampionDetails = function(regionCode, callback) {
      ApiService.getChampionDetails(regionCode, (success) => {
        AppStore.setChampionDetails(success.data);
        callback();
      });
    }

    module.exports = {
        data: function() {
            return {
                summonerName: '',
                region: 'EUW',
                store: AppStore,
                regions: ['BR', 'EUNE', 'EUW', 'JP', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'RU', 'TR'],
                PageNames: PageNames
            }
        },

        methods: {
          findUser: function(e) {
              e.preventDefault();
              AppStore.setLoadingMessage("Rushing the lane.");
              AppStore.setActivePage(PageNames.LoadingPage);
              populateStore(this.region, this.summonerName);
              populateSummonerInformation(this.region, this.summonerName);
              AppStore.setRegion(this.region);
          }
        }
    }
</script>

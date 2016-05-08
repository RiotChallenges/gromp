<style>
  .tile {
    background-color: rgba(10,10,10,0.5);
  }

  .summonerInformation {
    height: 200px;
  }

  .title {
    text-transform: uppercase;
  }

  #summonerName {
    font-size: 500%;
  }

  .inner {
    margin: 20px;
  }

  .champion {
      padding: 20px;
      margin-top: 20px;
  }

  .champion-name {
    margin: 0;
  }

  .mastery-stats {
    background-color: rgba(255, 255, 255, 0.2);
    padding: 5px;
    width: 100%;
    margin-top: 10px;
  }

  .mastery-stats p {
    margin: 0;
  }

  .tag-line {
    text-transform: uppercase;
  }

  .search-container {
    min-height: 200px;
    background-color: rgba(10, 10, 10, 0.5);
    width: 100%;
    margin-top: 25px;
  }
</style>
<template>
  <div class="row">
    <div class="col-xs-12">
        <div class="tile summonerInformation">
            <div class="row">
              <div class="col-xs-6">
                <div class="inner">
                  <h2 class="title" id="summonerName">{{store.getSummonerInformation().name}}</h2>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <div class="inner">
                  <h3 class="title">{{store.getRegion()}}</h3>
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
        <div v-for="champInfo in store.getTopThreeChampionInformation()">
          <div class="champion tile col-xs-8 col-xs-offset-2" >
            <div class="row">
              <div class="col-xs-2">
                <img class="img-rounded" v-bind:src="champInfo.details.imageUrl"/>
              </div>
              <div class="col-xs-10">
                <h3 class="champion-name">{{champInfo.details.name}}</h3>
                <span class="tag-line">{{ champInfo.details.title }}</span>

                <div class="row">
                  <div class="col-xs-12">
                    <div class="mastery-stats">
                      <p>Master Points: {{ champInfo.mastery.championPoints }}</p>
                      <p>Chest Unlocked: {{ champInfo.mastery.chestGranted }}</p>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

        <!-- Champion Search Markup -->
       <div class="row">
            <div class="col-xs-12">
                <div class="search-container">

                </div>
            </div>
        </div>
  <!-- End of Champion Search Markup -->


    </div>
  </div>


</template>
<script>
  var AppStore       = require('../store/AppStore');

  module.exports = {
      data: function() {
          return {
              store: AppStore,
          }
      },

      methods: {}
  }
</script>

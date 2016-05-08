<style scoped>
  .container {
      margin: 25px auto;
  }

  .main-background {
      min-height: 200px;
      background-color: rgba(52, 73, 94,1.0);
  }

  .achievement-container {
      background-color: rgba(52, 73, 94,1.0);
      padding: 10px 0;
  }

  .unlocked {
    background-color: rgba(22, 160, 133,0.5) !important;
  }

  .unlocked:hover {
    background-color: rgba(255, 255, 255, .1);
  }

  .container-box {
      margin-top: 20px;
      padding: 10px;
      line-height: 1.5em;
      background-color: rgba(44, 62, 80, 1.0);
      border: solid thin rgba(236, 240, 241,1.0);
  }

  .container-box:hover {
    background-color: rgba(255, 255, 255, .1);
  }
   .box-shadow {
        box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.7);
    }

    .progress {
      border-radius: 0;
    }
</style>

<template>
    <div class="container box-shadow">
      <summoner-header></summoner-header>
      <div class="row">
          <div class="col-xs-12 achievement-container">
            <div class="col-xs-6">
                <div v-bind:class="[containerBox, isChampionMaster() ? unlocked : '']">
                    <div class="row text-center">
                      <span style="font-size:5em;" v-bind:class="[glyphicon, isChampionMaster() ? unlockedIcon : lockIcon]"></span>
                    </div>

                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center uppercase">Champion Master</h1>
                        <h5 class="text-center">All Champions Mastered</h5>
                        <progress class="progress progress-success" value="{{this.getMasteredCountForTag(null)}}" max="{{store.getLeagueChampionCount()}}">{{this.getMasteredCountForTag(null)}}</progress>
                      </div>
                    </div>
                </div>
            </div>
              <div class="col-xs-6">
              <div v-bind:class="[containerBox, isJackOfTrades() ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, isJackOfTrades() ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1>Jack Of All Trades</h1>
                        <h5>Play all champions at least once</h5>
                        <progress class="progress progress-success" value="{{store.getChampionMasteries().length}}" max="{{store.getLeagueChampionCount()}}">{{store.getChampionMasteries().length}}%</progress>
                      </div>
                    </div>
                  </div>
              </div>
            <div class="col-xs-6">
              <div v-bind:class="[containerBox, isChestHoarder() ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, isChestHoarder() ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1>Chest Hoarder</h1>
                        <h5>All Chests unlocked</h5>
                        <progress class="progress progress-success" value="{{store.getChestsUnlocked()}}" max="{{store.getLeagueChampionCount()}}">{{store.getChestsUnlocked()}}%</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-6">
              <div v-bind:class="[containerBox, isChampionDeserter() ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, isChampionDeserter() ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1>Deserter!</h1>
                        <h5>Abandoned a previously mastered champion</h5>
                        <progress class="progress progress-success" value="{{isChampionDeserter() ? 1 : 0}}" max="1">{{isChampionDeserter() ? 1 : 0}}%</progress>
                      </div>
                    </div>
                  </div>
              </div>

              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.hasPlayedChampionType('Support') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, this.hasPlayedChampionType('Support') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Support Club</h1>
                        <h5 class="text-center">Played a Support</h5>
                        <progress class="progress progress-success" value="{{hasPlayedChampionType('Support') ? 1 : 0}}" max="{{1}}">{{hasPlayedChampionType('Support') ? 1 : 0}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, isRankedWithAll('Support') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, isRankedWithAll('Support') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Mobile Ward</h1>
                        <h5 class="text-center">Achieved any rank with all Supports</h5>
                        <progress class="progress progress-success" value="{{this.getRankedCountForTag('Support')}}" max="{{store.getLeagueChampionsWithTagCount('Support')}}">{{this.getRankedCountForTag('Support')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, isMasterOfChampionTag('Support') ? unlocked : '']">
                    <div class="row text-center">
                      <span style="font-size:5em;" v-bind:class="[glyphicon, isMasterOfChampionTag('Support') ? unlockedIcon : lockIcon]"></span>
                    </div>

                    <div class="row">
                      <div class="text-center">
                        <h1>S-U-P-P-O-R-T</h1>
                        <h5>Master all of the Supports</h5>
                        <progress class="progress progress-success" value="{{this.getMasteredCountForTag('Support')}}" max="{{store.getLeagueChampionsWithTagCount('Support')}}">{{this.getMasteredCountForTag('Support')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>

              <div class="col-xs-4">
                <div v-bind:class="[containerBox, hasPlayedChampionType('Mage') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, hasPlayedChampionType('Mage') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Was that Magic?</h1>
                        <h5 class="text-center">Played a Mage</h5>
                        <progress class="progress progress-success" value="{{hasPlayedChampionType('Mage') ? 1 : 0}}" max="{{1}}">{{hasPlayedChampionType('Mage') ? 1 : 0}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.isRankedWithAll('Mage') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, this.isRankedWithAll('Mage') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">You're a Wizard!</h1>
                        <h5 class="text-center">Achieved any rank with all Mages</h5>
                        <progress class="progress progress-success" value="{{this.getRankedCountForTag('Mage')}}" max="{{store.getLeagueChampionsWithTagCount('Mage')}}">{{this.getRankedCountForTag('Mage')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.isMasterOfChampionTag('Mage') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, this.isMasterOfChampionTag('Mage') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Archmage</h1>
                        <h5 class="text-center">Master all of the Mages</h5>
                        <progress class="progress progress-success" value="{{this.getMasteredCountForTag('Mage')}}" max="{{store.getLeagueChampionsWithTagCount('Mage')}}">{{this.getMasteredCountForTag('Mage')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>

              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.hasPlayedChampionType('Fighter') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, this.hasPlayedChampionType('Fighter') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Fight Club</h1>
                        <h5 class="text-center">Played a Fighter</h5>
                        <progress class="progress progress-success" value="{{hasPlayedChampionType('Fighter') ? 1 : 0}}" max="{{1}}">{{hasPlayedChampionType('Fighter') ? 1 : 0}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.isRankedWithAll('Fighter') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, this.isRankedWithAll('Fighter') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Brawler</h1>
                        <h5 class="text-center">Achieved any rank with all Fighter</h5>
                        <progress class="progress progress-success" value="{{this.getRankedCountForTag('Fighter')}}" max="{{store.getLeagueChampionsWithTagCount('Fighter')}}">{{this.getRankedCountForTag('Fighter')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.isMasterOfChampionTag('Fighter') ? unlocked : '']">
                    <div class="row text-center">
                      <span style="font-size:5em;" v-bind:class="[glyphicon, this.isMasterOfChampionTag('Fighter') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Sting like a Bee</h1>
                        <h4 class="text-center">Master all of the Fighters</h4>
                        <progress class="progress progress-success" value="{{this.getMasteredCountForTag('Fighter')}}" max="{{store.getLeagueChampionsWithTagCount('Fighter')}}">{{this.getMasteredCountForTag('Fighter')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>

              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.hasPlayedChampionType('Marksman') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, this.hasPlayedChampionType('Marksman') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Army Reserve</h1>
                        <h5 class="text-center">Played a Marksman</h5>
                        <progress class="progress progress-success" value="{{this.hasPlayedChampionType('Marksman') ? 1 : 0}}" max="{{1}}">{{hasPlayedChampionType('Marksman') ? 1 : 0}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.isRankedWithAll('Marksman') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, this.isRankedWithAll('Marksman') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Militia</h1>
                        <h5 class="text-center">Achieved any rank with all Marksmen</h5>
                        <progress class="progress progress-success" value="{{this.getRankedCountForTag('Marksman')}}" max="{{store.getLeagueChampionsWithTagCount('Marksman')}}">{{this.getRankedCountForTag('Marksman')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.isMasterOfChampionTag('Marksman') ? unlocked : '']">
                    <div class="row text-center">
                      <span style="font-size:5em;" v-bind:class="[glyphicon, this.isMasterOfChampionTag('Marksman') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1>Deadeye</h1>
                        <h4>Master all of the Marksmen</h4>
                        <progress class="progress progress-success" value="{{this.getMasteredCountForTag('Marksman')}}" max="{{store.getLeagueChampionsWithTagCount('Marksman')}}">{{this.getMasteredCountForTag('Marksman')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>

              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.hasPlayedChampionType('Tank') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, this.hasPlayedChampionType('Tank') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Bulwark</h1>
                        <h5 class="text-center">Played a Tank</h5>
                        <progress class="progress progress-success" value="{{hasPlayedChampionType('Tank') ? 1 : 0}}" max="{{1}}">{{hasPlayedChampionType('Tank') ? 1 : 0}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, isRankedWithAll('Tank') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, isRankedWithAll('Tank') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Hard as Nails</h1>
                        <h5 class="text-center">Achieved any rank with all Tanks</h5>
                        <progress class="progress progress-success" value="{{this.getRankedCountForTag('Tank')}}" max="{{store.getLeagueChampionsWithTagCount('Tank')}}">{{this.getRankedCountForTag('Tank')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, isMasterOfChampionTag('Tank') ? unlocked : '']">
                    <div class="row text-center">
                      <span style="font-size:5em;" v-bind:class="[glyphicon, isMasterOfChampionTag('Tank') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">A Great Wall</h1>
                        <h4 class="text-center">Master all of the Tanks</h4>
                        <progress class="progress progress-success" value="{{this.getMasteredCountForTag('Tank')}}" max="{{store.getLeagueChampionsWithTagCount('Tank')}}">{{this.getMasteredCountForTag('Tank')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>

              <div class="col-xs-4">
                <div v-bind:class="[containerBox, this.hasPlayedChampionType('Assassin') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, this.hasPlayedChampionType('Assassin') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">Thief</h1>
                        <h5 class="text-center">Played a Assassin</h5>
                        <progress class="progress progress-success" value="{{hasPlayedChampionType('Assassin') ? 1 : 0}}" max="{{1}}">{{hasPlayedChampionType('Assassin') ? 1 : 0}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, isRankedWithAll('Assassin') ? unlocked : '']">
                    <div class="row text-center">
                    <span style="font-size:5em;" v-bind:class="[glyphicon, isRankedWithAll('Assassin') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1 class="text-center">In the Bush!</h1>
                        <h5 class="text-center">Achieved any rank with all Assassin</h5>
                        <progress class="progress progress-success" value="{{this.getRankedCountForTag('Assassin')}}" max="{{store.getLeagueChampionsWithTagCount('Assassin')}}">{{this.getRankedCountForTag('Assassin')}}</progress>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="col-xs-4">
                <div v-bind:class="[containerBox, isMasterOfChampionTag('Assassin') ? unlocked : '']">
                    <div class="row text-center">
                      <span style="font-size:5em;" v-bind:class="[glyphicon, isMasterOfChampionTag('Assassin') ? unlockedIcon : lockIcon]"></span>
                    </div>
                    <div class="row">
                      <div class="text-center">
                        <h1>Ezio Auditore</h1>
                        <h4>Master all of the Assassins</h4>
                        <progress class="progress progress-success" value="{{this.getMasteredCountForTag('Assassin')}}" max="{{store.getLeagueChampionsWithTagCount('Assassin')}}">{{this.getMasteredCountForTag('Assassin')}}</progress>
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

  var ONE_MONTH = (((1000 * 60) * 60) * 24) * 31;

  module.exports = {
    props: { },
    data: function() {
        return {
            glyphicon: 'glyphicon',
            lockIcon: 'glyphicon-lock',
            unlockedIcon: 'glyphicon-ok',

            unlocked: 'unlocked',
            containerBox: 'container-box',

            store: AppStore,
            PageNames: PageNames,
        }
    },
    components: {
        SummonerHeader
    },
    methods: {
      isChampionMaster: function() {
        return this.getMasteredCountForTag(null) == AppStore.getLeagueChampionCount();
      },

      isChestHoarder: function() {
        return AppStore.getChestsUnlocked() == AppStore.getLeagueChampionCount()
      },

      isChampionDeserter: function() {
        var hasDeserted = false;
        var championMasteries = AppStore.getAllChampionInformation();
        championMasteries.forEach(function(championMastery) {
          var delta = new Date().getTime() - championMastery.mastery.lastPlayTime;
          if (championMastery.mastery.championLevel === 5 && delta > ONE_MONTH) {
            hasDeserted = true;
            return true;
          }
        });
        return hasDeserted;
      },

      isJackOfTrades: function() {
        return AppStore.getChampionMasteries().length == AppStore.getLeagueChampionCount();
      },

      isRankedWithAll: function(tag) {
          return this.getRankedCountForTag(tag) == AppStore.getLeagueChampionsWithTagCount(tag);
      },

      isMasterOfChampionTag: function(tag) {
        return this.getMasteredCountForTag(tag) == AppStore.getLeagueChampionsWithTagCount(tag);
      },

      hasPlayedChampionType: function(tag) {
        return Object.keys(AppStore.getAllChampionInformationForTag(tag)).length > 0;
      },

      getMasteredCountForTag: function(tag) {
        var championsWithTag = AppStore.getAllChampionInformationForTag(tag);
        return Object.keys(championsWithTag.filter(function(value) {
            return (value.mastery.championLevel === 5);
        })).length;
      },

      getRankedCountForTag: function(tag) {
        var championsWithTag = AppStore.getAllChampionInformationForTag(tag);
        return Object.keys(championsWithTag.filter(function(value) {
            return (value.mastery.highestGrade !== 'Unranked');
        })).length;
      },
    },
  }
</script>

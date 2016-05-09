<style scoped>
  .container {
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

    .twitter-button {
      height: 28px;
      padding: 1px 10px 1px 9px;
      border-radius: 4px;
      position: relative;
      font-weight: 500;
      color: #FFF;
      cursor: pointer;
      background-color: #1B95E0;
      box-sizing: border-box;
    }

    .twitter-button i {
        top: 4px;
        width: 18px;
        height: 18px;
        position: relative;
        display: inline-block;
        background: transparent url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E") no-repeat scroll 0px 0px;
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getChampionsMasteredTweet()}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i>{{this.getChampionsMasteredTweet()}}
                          </a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getJackOfTradesTweet()}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i>{{this.getJackOfTradesTweet()}}
                          </a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{getChestHoarderTweet()}}"
                          	class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i>{{getChestHoarderTweet()}}
                          </a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getChampionDesertedTweet()}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i>{{this.getChampionDesertedTweet()}}
                          </a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getPlayedTypeOfChampionTweet('Support')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getRankedTypeOfChampionTweet('Support')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getMasteredTypeOfChampionTweet('Support')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getPlayedTypeOfChampionTweet('Mage')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getRankedTypeOfChampionTweet('Mage')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getMasteredTypeOfChampionTweet('Mage')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getPlayedTypeOfChampionTweet('Fighter')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getRankedTypeOfChampionTweet('Fighter')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getMasteredTypeOfChampionTweet('Fighter')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getPlayedTypeOfChampionTweet('Marksman')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getRankedTypeOfChampionTweet('Marksman')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getMasteredTypeOfChampionTweet('Marksman')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getPlayedTypeOfChampionTweet('Tank')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getRankedTypeOfChampionTweet('Tank')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getMasteredTypeOfChampionTweet('Tank')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <h5 class="text-center">Played an Assassin</h5>
                        <progress class="progress progress-success" value="{{hasPlayedChampionType('Assassin') ? 1 : 0}}" max="{{1}}">{{hasPlayedChampionType('Assassin') ? 1 : 0}}</progress>
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getPlayedTypeOfChampionTweet('Assassin')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getRankedTypeOfChampionTweet('Assassin')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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
                        <div>
                          <a target="_blank" href="https://twitter.com/intent/tweet?button_hashtag=GrompAchievement&text={{this.getMasteredTypeOfChampionTweet('Assassin')}}"
                            class="twitter-button" data-url="http://riot-challenge.herokuapp.com"><i></i></a>
                        </div>
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

  var GROMP_HASHTAG = " #GrompAchievements";
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
      getChampionsMasteredTweet: function() {
        if (this.isChampionMaster()) {
          return AppStore.getSummonerInformation().name + " has mastered all League Champions!" + GROMP_HASHTAG;
        }
        return AppStore.getSummonerInformation().name + " has mastered " + this.getMasteredCountForTag(null)  + " champions, " + (AppStore.getLeagueChampionCount() - this.getMasteredCountForTag(null)) + " to go!" + GROMP_HASHTAG;
      },

      isChampionMaster: function() {
        return this.getMasteredCountForTag(null) == AppStore.getLeagueChampionCount();
      },

      getChestHoarderTweet() {
        if (this.isChestHoarder()) {
          return AppStore.getSummonerInformation().name + " has unlocked all " + AppStore.getLeagueChampionCount() + " chests!" + GROMP_HASHTAG;
        }
        return AppStore.getSummonerInformation().name + " has unlocked " + AppStore.getChestsUnlocked() + " chests, " + (AppStore.getLeagueChampionCount() - AppStore.getChestsUnlocked()) + " to go!" + GROMP_HASHTAG;
      },

      isChestHoarder: function() {
        return AppStore.getChestsUnlocked() == AppStore.getLeagueChampionCount()
      },

      getChampionDesertedTweet: function() {
        if (this.isChampionDeserter()) {
          return AppStore.getSummonerInformation().name + " has completed the Champion Deserter Achievement!" + GROMP_HASHTAG;
        }
        return AppStore.getSummonerInformation().name + " has yet to abandoned a Champion!" + GROMP_HASHTAG;
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

      getJackOfTradesTweet: function() {
        if (this.isJackOfTrades()) {
          return AppStore.getSummonerInformation().name + " has played all champions at least once, and become a Jack of All Trades!" + GROMP_HASHTAG;
        }
        return AppStore.getSummonerInformation().name + " has played " + AppStore.getChampionMasteries().length + " champions, " + (AppStore.getLeagueChampionCount() - AppStore.getChampionMasteries().length) + " to go!" + GROMP_HASHTAG;
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

      getPlayedTypeOfChampionTweet: function (tag) {
        if (this.hasPlayedChampionType(tag)) {
          return AppStore.getSummonerInformation().name + " has played at least one " + tag + " character!" + GROMP_HASHTAG;
        }
        return AppStore.getSummonerInformation().name + " has yet to play a " + tag + " character!" + GROMP_HASHTAG;
      },

      hasPlayedChampionType: function(tag) {
        return Object.keys(AppStore.getAllChampionInformationForTag(tag)).length > 0;
      },

      getMasteredTypeOfChampionTweet: function (tag) {
        var championsWithTag = AppStore.getAllChampionInformationForTag(tag);
        var championsMastered = Object.keys(championsWithTag.filter(function(value) {
        return (value.mastery.championLevel === 5);
        })).length;

        if (championsWithTag.length == championsMastered) {
          return AppStore.getSummonerInformation().name + " has achieved mastery with all " + championsWithTag.length + " " + tag + " characters!" + GROMP_HASHTAG;
        }
        return AppStore.getSummonerInformation().name + " has achieved mastery with " + championsMastered + " " + tag + " characters, " + (championsWithTag.length - championsMastered) + " to go!" + GROMP_HASHTAG;
      },

      getMasteredCountForTag: function(tag) {
        var championsWithTag = AppStore.getAllChampionInformationForTag(tag);
        return Object.keys(championsWithTag.filter(function(value) {
            return (value.mastery.championLevel === 5);
        })).length;
      },

      getRankedTypeOfChampionTweet: function (tag) {
        var championsWithTag = AppStore.getAllChampionInformationForTag(tag);
        var championsMastered = Object.keys(championsWithTag.filter(function(value) {
            return (value.mastery.championLevel > 1);
        })).length;

        if (championsWithTag.length == championsMastered) {
          return AppStore.getSummonerInformation().name + " has achieved at least a rank with all " + championsWithTag.length + " " + tag + " characters!" + GROMP_HASHTAG;
        }
        return AppStore.getSummonerInformation().name + " has achieved at least a rank with " + championsMastered + " " + tag + " characters, " + (championsWithTag.length - championsMastered)  + " to go!" + GROMP_HASHTAG;
      },

      getRankedCountForTag: function(tag) {
        var championsWithTag = AppStore.getAllChampionInformationForTag(tag);
        return Object.keys(championsWithTag.filter(function(value) {
          return (value.mastery.championLevel > 1);
        })).length;
      },
    },
  }
</script>

<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>

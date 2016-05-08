const PageNames = require('../config/PageNames');

const AppStore = {
    _region: undefined,
    _clientMessage: undefined,
    _summonerInformation: undefined,
    _championMasteries: undefined,
    _championDetails: undefined,
    _activePage: undefined,
    _loadingMessage: '',

    getClientMessage : function() {
      return this._clientMessage;
    },

    setClientMessage : function(clientMessage) {
      this._clientMessage = clientMessage;
    },

    setLoadingMessage : function(loadingMessage) {
      this._loadingMessage = loadingMessage;
    },

    getLoadingMessage : function() {
      return this._loadingMessage;
    },

    getTopThreeChampionMasteries : function() {
      var championMasteriesLength = Object.keys(this._championMasteries).length;
      return championMasteriesLength > 3 ? this._championMasteries.slice(0, 3) : this._championMasteries.slice(0, championMasteriesLength);
    },

    getHighestForStat : function(stat) {
      var maxValue = 0;

      this._championDetails.forEach(function(championDetails) {
          if(championDetails.stats[stat] > maxValue) {
            maxValue = championDetails.stats[stat];
          }
      });

      return maxValue;
    },

    getLowestForStat : function(stat) {
      var minValue = 10000; // Some large number.

      this._championDetails.forEach(function(championDetails) {
          if(championDetails.stats[stat] < minValue) {
            minValue = championDetails.stats[stat];
          }
      });

      return minValue;
    },

    getChestsUnlocked: function() {
      return Object.keys(this._championMasteries.filter(function(value) {
          return value.chestGranted === true;
      })).length;
    },

    getLeagueChampionCount: function() {
      if (this._championDetails == null) {
        return 0;
      }
      return Object.keys(this._championDetails).length;
    },

    getLeagueChampionsWithTagCount: function(tag) {
      if (this._championDetails == null) {
        return 0;
      }
      return Object.keys(this._championDetails.filter(function(champion) { return champion.tags.indexOf(tag) !== -1;})).length;
    },

    getAllChampionInformation: function() {
      var championMasteries = this.getChampionMasteries();

      var championInformation = [];

      var _this = this;

      championMasteries.forEach(function(championMastery) {
        var champDetails = _this.getChampionDetails(championMastery.championId);
        championInformation.push({details: champDetails, mastery: championMastery});
      });

      return championInformation;
    },

    getAllChampionInformationForTag: function(tag) {
      var _this = this;
      var championInformation = [];
      var championMasteries = this.getChampionMasteries();

      championMasteries.forEach(function(championMastery) {
        var champDetails = _this.getChampionDetails(championMastery.championId);

        if (tag == null || champDetails.tags.indexOf(tag) !== -1) {
          championInformation.push({details: champDetails, mastery: championMastery});
        }
      });

      return championInformation;
    },

    getTopThreeChampionInformation : function() {
      var topThreeChampionMasteries = this.getTopThreeChampionMasteries();
      var championInformation = [];
      var _this = this;
      topThreeChampionMasteries.forEach(function(championMastery) {
          var championDetails = _this.getChampionDetails(championMastery.championId);
          championInformation.push({details: championDetails, mastery: championMastery});
      });
      return championInformation;
    },

    getChampionMasteryDetails : function(championId) {
      return this._championMasteries.find(function(championMastery) {
        return championMastery.championId === championId
      });
    },

    getXpForTag : function(tag) {
      var tagChampions = this._championDetails.filter(function(champion) { return champion.tags.indexOf(tag) !== -1;});

      var sum = 0;

      var _this = this;

      tagChampions.forEach(function(champion) {
          var championMastery = _this.getChampionMasteryDetails(champion.id);
          sum += championMastery ? championMastery.championPoints : 0;
      });

      return sum;
    },

    getSummonerInformation : function() {
      return this._summonerInformation;
    },

    setSummonerInformation : function(summonerInformation) {
      this._summonerInformation = summonerInformation;
    },

    getChampionMasteries : function() {
      return this._championMasteries;
    },

    setChampionMasteries : function(championMasteries) {
      this._championMasteries = championMasteries;
    },

    getAllChampionDetails : function() {
      return this._championDetails;
    },

    getChampionDetails : function(championId) {
      return this._championDetails[championId];
    },

    getChampionTypes: function() {
      if (this._championDetails == null) {
        return [];
      }

      var championTypes = [];
      this._championDetails.forEach(function(detail) {
          detail.tags.forEach(function(tag) {
            championTypes.push(tag);
          });
      });

      // "Figher", "Melee"
      var indexOfFigher = championTypes.indexOf("Figher");
      if (indexOfFigher > -1) {
        championTypes.splice(indexOfFigher, 1);
      }

      var indexOfMelee = championTypes.indexOf("Melee");
      if (indexOfMelee > -1) {
        championTypes.splice(indexOfMelee, 1);
      }

      return championTypes.filter(function (value, index, self) {
        return self.indexOf(value) == index;
      })
    },

    getChampionDetailsByNameStartingWith: function(championName) {
      for(var championId in this._championDetails) {
        if(this._championDetails[championId].name.toLowerCase().indexOf(championName.toLowerCase()) == 0) {
          return this._championDetails[championId];
        }
      }
    },

    getChampionDetailsByName : function(championName) {
      for(var championId in this._championDetails) {
        if(this._championDetails[championId].name.toLowerCase() === championName.toLowerCase()) {
          return this._championDetails[championId];
        }
      }
    },

    getRegion : function() {
      return this._region;
    },

    setRegion : function(region) {
      this._region = region;
    },

    setChampionDetails : function(championDetails) {
      var championDetailsMap = [];

      championDetails.forEach(function(detail) {
          championDetailsMap[detail.id] = detail;
      });

      this._championDetails = championDetailsMap;
    },

    addToChampionDetails : function(championId, championDetails) {
      this._championDetails = this._championDetails || {};
      this._championDetails[championId] = championDetails;
    },

    getActivePage : function() {
        if (!this._activePage) {
          return PageNames.DialoguePage;
        }

        return this._activePage;
    },

    setActivePage : function(activePage) {
        this._activePage = activePage;
    }
}

module.exports = AppStore;

var Vue = require('vue');
var AppStore = require('../store/AppStore');

Vue.use(require('vue-resource'));

const ApiService = {

    API_DOMAIN     : '',
    SUCCESS_STATUS : 'success',
    FAILED_STATUS  : 'failed',

    getChampionMasteryDetails : function(summonerName, region, onSuccess, onFailure) {
        var endpoint = this.API_DOMAIN + '/championmastery/championMasteries?regionCode='+ region +'&summonerName=' + summonerName;
        Vue.http.get(endpoint).then(onSuccess).catch(onFailure);
    },

    getChampionDetails : function(region, onSuccess, onFailure) {
        var endpoint = this.API_DOMAIN + "/champion/" + "?regionCode=" + region;
        Vue.http.get(endpoint).then(onSuccess).catch(onFailure);
    },

    getSummonerInformation : function(region, summonerName, onSuccess, onFailure) {
        var endpoint = this.API_DOMAIN + "/summoner/details?summonerName=" + summonerName + "&regionCode=" + region;
        Vue.http.get(endpoint).then(onSuccess).catch(onFailure);
    },

    getChampionInfoById: function(region, championName, onSuccess, onFailure) {
        var endpoint = this.API_DOMAIN + "/champion/byName?regionCode=" + region + "&championName=" + championName;
        Vue.http.get(endpoint).then(onSuccess).catch(onFailure);
    }
}

module.exports = ApiService;

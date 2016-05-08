var Vue = require('vue');
var Chart = require('chart.js');

const PageNames = require('./config/PageNames');

//Vue.config.debug = true;
Vue.use(require('vue-resource'));


var AppStore = require('./store/AppStore');
var DialoguePage = require("./components/DialoguePage.vue");
var SummonerInfoPage = require("./components/SummonerInfoPage.vue");
var TopThreePage = require('./components/TopThreePage.vue');
var LoadingPage = require('./components/LoadingPage.vue');
var StatisticsPage = require('./components/StatisticsPage.vue');
var GraphPage      = require('./components/GraphPage.vue');
var AchievementPage = require('./components/AchievementPage.vue');

new Vue({
	el: "body",

    data: {
        store: AppStore
    },

    components: {
        DialoguePage: DialoguePage,
        SummonerInfoPage: SummonerInfoPage,
        TopThreePage: TopThreePage,
        LoadingPage: LoadingPage,
        StatisticsPage: StatisticsPage,
        GraphPage: GraphPage,
				AchievementPage: AchievementPage,
	},

    ready: function() {
        AppStore.setActivePage(PageNames.DialoguePage);
    }

});

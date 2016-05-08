<template>
    <div class="container">
        <h1>Mastery Data</h1>

        <div class="container" v-for="heroDetails in store.getChampionMasteries() | orderBy 'championId'">
            <img src="http://lkimg.zamimg.com/images/v2/champions/icons/size100x100/{{heroDetails.championId}}.png">
            <p>{{heroDetails.championPoints}}</p>
        </div>
    </div>
</template>
<script>
    var AppStore = require('../store/AppStore');

    module.exports = {
        data: function() {
            return {
                store: AppStore,
            }
        }
    }
</script>

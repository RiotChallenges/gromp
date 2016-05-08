<style>
  #loading-loadingIcon {
    background-image: url('https://superbuytires.com/images/Loading.gif');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50px 50px;
    min-height: 100px;
    min-width: 100px;
    margin-top: 100px;
  }
</style>
<template>
  <div class="container">
      <div class="col-xs-12">
        <div class="row">
          <div class="col-xs-12">
            <div id="loading-loadingIcon"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 text-center">
              {{store.getLoadingMessage()}}
          </div>
        </div>
      </div>
  </div>
</template>
<script>
    var AppStore = require('../store/AppStore');

    module.exports = {
        data: function() {
            return {
              store: AppStore
            }
        }
    }
</script>

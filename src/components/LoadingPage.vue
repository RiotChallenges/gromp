<style>
  #loading-loadingIcon {
    background-image: url('https://superbuytires.com/images/Loading.gif');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50px 50px;
    min-height: 100px;
    min-width: 100px;
    margin-top: 25px;
  }

  .background-container {
    margin: 75px auto;
    box-sizing: border-box;
    background: linear-gradient(rgba(44, 62, 80, 0.9), rgba(34, 49, 63, 0.9));
    background-size: cover;
    width: 75%;
    position: relative;
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.47);
    min-height: 281px;

 }


</style>
<template>
  <div class="container background-container">
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

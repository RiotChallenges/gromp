<style scoped>

* {
  color: black;
}

.title {
  background-color: rgba(30, 53, 74,1.0);
}

.title h1 {
  color: whitesmoke;
}

.body {
  background-color: whitesmoke;
  padding-top: 10px;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.champImage {
  margin-left: 10px;
}

.tag {
  padding: 5px;
  background-color: rgba(30, 53, 74,1.0);
  margin-right: 5px;
  color: whitesmoke;
}

.tags {
  margin-bottom: 20px;
}

.big {
  color: black;
  text-transform: uppercase;
  font-size: 1.5em;
}

.col-xs-10 {
  margin: 0;
}

.progress-bar {
  background-color: rgba(30, 53, 74,1.0);
  color: whitesmoke;
}

.lore {
  line-height: 1.7em;
  text-align: justify;
}

.no-padding {
  padding: 0;
}

</style>

<template>
  <div class="col-xs-12">
    <div class="row title text-center">
      <h1>{{champInfo.details.name}}</h1>
    </div>
    <div class="row body">
      <div class="row">
        <div class="col-xs-3 center-block text-center">
          <img class="img-rounded champImage" v-bind:src="champInfo.details.imageUrl"/>
          <progress class="progress" style="padding-top:2px; padding-left:10px; height:8px; width:130px;" value="{{champInfo.mastery.championPoints}}" max="46800">{{ (champInfo.mastery.championPoints / 46800) * 100}}%</progress>
        </div>
        <div class="col-xs-9">
          <div class="row tags">
            <div class="col-xs-10">
                <span class="tag" v-for="tag in champInfo.details.tags">
                  {{tag}}
                </span>
            </div>
          </div>
          <div class="row no-padding">
            <div class="col-xs-10 no-padding">
              <div class="col-xs-3">
                HEALTH
              </div>
              <div class="col-xs-9">
                  <div class="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar"
                    aria-valuenow="{{ hp.current }}" aria-valuemin="{{hp.min}}" aria-valuemax="{{ hp.max }}"
                    style="width:{{ ((hp.current - hp.min) / (hp.max - hp.min)) * 100}}%">
                      {{hp.current}}
                    </div>
                  </div>
              </div>
            </div>
            <div class="col-xs-10 no-padding">
              <div class="col-xs-3">
                ATTACK
              </div>
              <div class="col-xs-9">
                  <div class="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar"
                    aria-valuenow="{{ attack.current }}" aria-valuemin="{{attack.min}}" aria-valuemax="{{ attack.max }}"
                    style="width:{{ ((attack.current - attack.min) / (attack.max - attack.min)) * 100}}%">
                      {{attack.current}}
                    </div>
                  </div>
              </div>
            </div>
            <div class="col-xs-10 no-padding">
              <div class="col-xs-3">
                ARMOUR
              </div>
              <div class="col-xs-9">
                  <div class="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar"
                    aria-valuenow="{{ armour.current }}" aria-valuemin="{{armour.min}}" aria-valuemax="{{ armour.max }}"
                    style="width:{{ ((armour.current - armour.min) / (armour.max - armour.min)) * 100}}%">
                      {{armour.current}}
                    </div>
                  </div>
              </div>
            </div>
            <div class="col-xs-10 no-padding">
              <div class="col-xs-3">
                MANA
              </div>
              <div class="col-xs-9">
                  <div class="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar"
                    aria-valuenow="{{ mp.current }}" aria-valuemin="{{mp.min}}" aria-valuemax="{{ mp.max }}"
                    style="width:{{ ((mp.current - mp.min) / (mp.max - mp.min)) * 100}}%">
                      {{mp.current}}
                    </div>
                  </div>
              </div>
            </div>
            <div class="col-xs-10 no-padding">
              <div class="col-xs-3">
                MAGIC RESIST
              </div>
              <div class="col-xs-9">
                  <div class="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar"
                    aria-valuenow="{{ spellBlock.current }}" aria-valuemin="{{spellBlock.min}}" aria-valuemax="{{ spellBlock.max }}"
                    style="width:{{ ((spellBlock.current - spellBlock.min) / (spellBlock.max - spellBlock.min)) * 100}}%">
                      {{spellBlock.current}}
                    </div>
                  </div>
              </div>
            </div>
            <div class="col-xs-10 no-padding">
              <div class="col-xs-3">
                ATTACK SPEED
              </div>
              <div class="col-xs-9">
                  <div class="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar"
                    aria-valuenow="{{ attackSpeed.current }}" aria-valuemin="{{attackSpeed.min}}" aria-valuemax="{{ attackSpeed.max }}"
                    style="width:{{ ((attackSpeed.current - attackSpeed.min) / (attackSpeed.max - attackSpeed.min)) * 100}}%">
                      {{attackSpeed.current}}
                    </div>
                  </div>
              </div>
            </div>
          <div class="row">
            <div class="col-xs-10">
              <div class="col-xs-12">
                <p class="big">{{ champInfo.details.title }}</p>
                <p class="lore">{{ stripHtml(champInfo.details.lore) }}</p>
              </div>
            </div>
          </div>

        </div>
        </div>
      </div>
    </div
  </div>
</template>

<script>

  var StatNames = require('../config/StatNames');
  var AppStore = require('../store/AppStore');

  module.exports = {
    props: {
      champInfo : {}
    },
    methods: {
      stripHtml : function(html) {
        var tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
      }
    },
    data : function() {
      var MAX_LEVEL = 18;

      function calculateMax(value, valuePerLevel) {
        return value + (valuePerLevel * MAX_LEVEL - 1);
      }

      var currentHp = this.champInfo.details.stats.hp;
      var maxHp = AppStore.getHighestForStat(StatNames.HP);
      var minHp = AppStore.getLowestForStat(StatNames.HP) - 50;

      var currentArmour = this.champInfo.details.stats.armor;
      var maxArmour = AppStore.getHighestForStat(StatNames.Armour);
      var minArmour = AppStore.getLowestForStat(StatNames.Armour) - 5;

      var currentAttack = this.champInfo.details.stats.attackdamage;
      var maxAttack = AppStore.getHighestForStat(StatNames.AttackDamage);
      var minAttack = AppStore.getLowestForStat(StatNames.AttackDamage) - 5;

      var currentMp = this.champInfo.details.stats.mp;
      var maxMp = AppStore.getHighestForStat(StatNames.MP);
      var minMp = AppStore.getLowestForStat(StatNames.MP) - 20;

      var currentSpellBlock = this.champInfo.details.stats.spellblock;
      var maxSpellBlock = AppStore.getHighestForStat(StatNames.SpellBlock);
      var minSpellBlock = AppStore.getLowestForStat(StatNames.SpellBlock) - 3;

      var currentAttackSpeed = 1 + this.champInfo.details.stats.attackspeedoffset;
      var maxAttackSpeed = 1 + AppStore.getHighestForStat(StatNames.AttackSpeed);
      var minAttackSpeed = 1 + AppStore.getLowestForStat(StatNames.AttackSpeed) - 0.1;

      return {
        hp : {
          current: currentHp,
          max: maxHp,
          min: minHp
        },
        armour: {
          current: currentArmour,
          max: maxArmour,
          min: minArmour
        },
        attack: {
          current: currentAttack,
          max: maxAttack,
          min: minAttack
        },
        mp: {
          current: currentMp,
          max: maxMp,
          min: minMp
        },
        spellBlock: {
          current: currentSpellBlock,
          max: maxSpellBlock,
          min: minSpellBlock
        },
        attackSpeed: {
          current: currentAttackSpeed,
          max: maxAttackSpeed,
          min: minAttackSpeed
        }
      };
    }
  }
</script>

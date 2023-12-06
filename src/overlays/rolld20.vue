<template>
  <div v-if="visible" class="overlay">
    {{combat.groupRollResults}}
    <div class="dierow">
      <div
        v-for="(die, dieind) in combat.groupRoll"
        :key="dieind"
        :style="{
          color:
            tokenInfo.tokens[tokenInfo.getCategoryById(die.id)][die.id]
              .dicecolor,
        }"
        class="content"
      >
        <div :class="{ rolling: rolling }" :data-face="currentFace[die.id]" class="die">
          <figure
            v-for="i in 20"
            :key="i"
            :data-face="i"
            :style="`border-bottom-color : ${
              tokenInfo.tokens[tokenInfo.getCategoryById(die.id)][die.id]
                .dicecolor
            }`"
            class="face"
          ></figure>
        </div>
      </div>
    </div>

    <h5>Click to quickroll or gesture to start rolling</h5>

    <a class="randomize" href="" @click.prevent="handleRoll">Roll!</a>
    <a class="randomize" href="" @click.prevent="result">Continue</a>
  </div>
</template>

<script>
import {combatStore} from "stores/combat";
import {useTokenStore} from "stores/tokenInfo";

const combat = combatStore();
const tokenInfo = useTokenStore();
export default {
  name: "rollD20",
  data() {
    return {
      sides: 20,
      initialSide: 1,
      currentFace: {},
      lastFace: null,
      timeoutId: null,
      rolling: false,
      transitionDuration: 500,
      animationDuration: 3000,
      combat: combat,
      tokenInfo: tokenInfo,
      visible: 0,
      rollend: false,
    };
  },
  created() {
  },
  // Watch d20appear from combat.js and when it changes either show or hide the whole rolld20 overlay
  watch: {
    'combat.d20appear': function (newVal, oldVal) {
      if (newVal == true) {
        this.show();
      } else {
        this.hide();
      }
    }
  },
  methods: {
    randomFace() {
      let face = Math.floor(Math.random() * this.sides) + this.initialSide;
      this.lastFace = face === this.lastFace ? this.randomFace() : face;
      return face;
    },
    rollTo(face, id) {
      clearTimeout(this.timeoutId)
      this.currentFace[id] = face;
    },
    reset() {
      this.currentFace = null;
      this.rolling = false;
    },
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    startRoll() {
      this.rolling = true
    },
    handleRoll() {
      this.rolling = true;
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.rolling = false
//make a rollTo for each die in groupRoll and save it on the appropriate id
        for (const die in this.combat.groupRoll) {
          this.rollTo(this.randomFace(), this.combat.groupRoll[die].id);
        }

        this.rollend = true;
      }, this.animationDuration);
    },
    result() {
        //store each roll result in groupRollResults from currentFace
        for (const die in this.combat.groupRoll) {
          this.combat.groupRollResults[this.combat.groupRoll[die].id] = this.currentFace[this.combat.groupRoll[die].id]
        }
        if (this.combat.action != 'attack') {
          this.combat.groupRollResults = [];
          this.combat.groupRoll = [];
        }

        //set this.combat.d20appear to false
        this.combat.d20appear = false;

    },
    handleClick(face) {
      this.reset();
      this.rollTo(face);
    },
  },
};
</script>
<style lang="scss" scoped>
.overlay {
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

h5 {
  color: white;
}

$containerWidth: 200px;
$containerHeight: $containerWidth;

$faceWidth: $containerWidth * 0.5;
$faceHeight: $faceWidth * 0.86;

$transitionDuration: 0.5s;
$animationDuration: 3s;

$angle: 53deg;
$ringAngle: -11deg;
$sideAngle: 360deg/5;
$opacity: 0.75;
$color: rgba(255, 117, 0, $opacity);

$rotateX: -$angle;
$translateZ: $faceWidth * 0.335;
$translateY: -$faceHeight * 0.15;
$translateRingZ: $faceWidth * 0.75;
$translateRingY: $faceHeight * 0.78 + $translateY;
$translateLowerZ: $translateZ;
$translateLowerY: $faceHeight * 0.78 + $translateRingY;

@keyframes roll {
  10% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  30% {
    transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px);
  }
  50% {
    transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px);
  }
  70% {
    transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg);
  }
  90% {
    transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg);
  }
}

body {
  background: #333;
  padding: 20px;
}

.content {
  margin: auto auto;
  position: relative;
  width: $containerWidth;
  height: $containerHeight;
  perspective: 1500px;
  color: white;
}

.die {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform $transitionDuration ease-out;
  cursor: pointer;

  transform: rotateX($rotateX);

  &.rolling {
    animation: roll $animationDuration linear;
  }

  @for $i from 1 through 5 {
    &[data-face="#{$i}"] {
      $angleMultiplier: $i - 1;
      transform: rotateX(-$angle) rotateY($sideAngle * $angleMultiplier);
    }
  }

  @for $i from 16 through 20 {
    &[data-face="#{$i}"] {
      $angleMultiplier: $i - 15;
      transform: rotateX(-$angle + 180deg) rotateY(-$sideAngle * $angleMultiplier);
    }
  }

  @for $i from 6 through 10 {
    &[data-face="#{$i}"] {
      $angleMultiplier: $i - 6;
      transform: rotateX(-$ringAngle) rotateZ(180deg) rotateY($sideAngle * $angleMultiplier);
    }
  }

  @for $i from 11 through 15 {
    &[data-face="#{$i}"] {
      $angleMultiplier: $i - 8;
      transform: rotateX(-$ringAngle) rotateY(-$sideAngle * $angleMultiplier - $sideAngle/2);
    }
  }

  .face {
    $horizontalMargin: -$faceWidth * 0.5;

    position: absolute;
    left: 50%;
    top: 0;
    margin: 0 $horizontalMargin;
    border-left: $faceWidth * 0.5 solid transparent;
    border-right: $faceWidth * 0.5 solid transparent;
    border-bottom: $faceHeight solid;
    width: 0px;
    height: 0px;
    transform-style: preserve-3d;
    backface-visibility: hidden;

    counter-increment: steps 1;

    &:before {
      content: counter(steps);
      position: absolute;
      top: $faceHeight * 0.25;
      left: -$faceWidth;
      color: #fff;
      text-shadow: 1px 1px 3px #000;
      font-size: $faceHeight * 0.5;
      text-align: center;
      line-height: $faceHeight * 0.9;
      width: $faceWidth * 2;
      height: $faceHeight;
    }

    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        $angleMultiplier: $i - 1;
        transform: rotateY(-$sideAngle * $angleMultiplier) translateZ($translateZ) translateY($translateY) rotateX($angle);
      }
    }

    @for $i from 16 through 20 {
      &:nth-child(#{$i}) {
        $angleMultiplier: $i - 18;
        transform: rotateY($sideAngle * $angleMultiplier + $sideAngle/2) translateZ($translateLowerZ) translateY($translateLowerY) rotateZ(180deg) rotateX($angle);
      }
    }

    @for $i from 6 through 10 {
      &:nth-child(#{$i}) {
        $angleMultiplier: $i - 11;
        transform: rotateY(-$sideAngle * $angleMultiplier) translateZ($translateRingZ) translateY($translateRingY) rotateZ(180deg) rotateX($ringAngle);
      }
    }

    @for $i from 11 through 15 {
      &:nth-child(#{$i}) {
        $angleMultiplier: $i - 8;
        transform: rotateY($sideAngle * $angleMultiplier + $sideAngle/2) translateZ($translateRingZ) translateY($translateRingY) rotateX($ringAngle);
      }
    }
  }
}

h2 {
  color: #fafafa;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;

  > li {
    display: inline-block;
    margin: 10px 10px;
  }
}

a {
  text-align: center;
  color: #fff;
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;
  padding: 5px 15px;
  width: 40px;
  display: inline-block;
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  background-color: #999;

  &.active {
    background-color: #333;
  }

  &:hover {
    background-color: #666;
  }

  &.randomize {
    width: auto;
    margin: 20px 10px;
  }
}

.dierow {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Adjust this value as needed */
  margin-bottom: 20px; /* Adjust this value as needed */
}

.content {
  margin: 0 10px; /* Adjust this value as needed */
}
</style>

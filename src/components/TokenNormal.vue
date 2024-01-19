<template>
  <div
    :class="{ 'targeted': isTargeted }"
    :style="{
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${size.x}px`,
      height: `${size.y}px`,
      'background-image': `url('${backgroundImageUrl}')`,
    }"
    class="token-normal"
    @click="combat.targetSelected(tokenid)"
    @mousedown="playing ? startDragging($event) : null"
    @mousemove="playing ? drag($event) : null"
    @mouseup="playing ? stopDragging($event) : null"
    @selectstart="$event.preventDefault()"
    @touchcancel="playing ? stopDragging($event) : null"
    @touchend="playing ? stopDragging($event) : null"
    @touchmove="playing ? touchDrag($event) : null"
    @touchstart="playing ? startTouchDragging($event) : null"
  ><span style="color:white">{{ tokenid }} {{ hp }}</span></div>
</template>

<script>
import {usePositionStore} from "stores/positionStore"; // Adjust the path as needed
import {pxTranslate} from "stores/px2feet";
import {combatStore} from "stores/combat";
import artyom from "src/boot/voice";
import { parse } from "postcss";
const positionStore = usePositionStore();
const sizetranslate = pxTranslate();
const combat = combatStore();
export default {
  props: {
    tokenIndex: {
      type: String,
      required: true,
    },
    widthBoxes: {
      type: Number,
      required: true,
    },
    heightBoxes: {
      type: Number,
      required: true,
    },
    backgroundImageUrl: {
      type: String,
      required: true,
    },
    playing: {
      type: Boolean,
      required: true,
    },
    tokenid: {
      type: String,
      required: false,
    },
    hp : {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      isDragging: false,
      startPosition: {x: 0, y: 540},

      combat: combat
    };
  },
  computed: {
    position() {
      return positionStore.getPosition(this.tokenIndex) || {x: 0, y: 0};
    },
    isTargeted() {
      const targets = combat.getTargets;
      return targets.includes(this.tokenid);
    },
    size(){
      return {
        x: sizetranslate.feetTranslator(5 * this.widthBoxes),
        y: sizetranslate.feetTranslator(5 * this.heightBoxes),
      }
    }
  },
  watch: {
    'sizetranslate.pxPerFoot': {
      handler: function () {
        console.log("here")
        this.size.x = sizetranslate.feetTranslator(5 * this.widthBoxes);
        this.size.y = sizetranslate.feetTranslator(5 * this.heightBoxes);
      },
      immediate: true, // To run the handler immediately on component creation
    },
  },
  methods: {
    startDragging(event) {
      event.preventDefault();
      this.isDragging = true;
      this.startPosition = {
        x: event.clientX - this.position.x,
        y: event.clientY - this.position.y,
      };
    },
    drag(event) {
      if (this.isDragging) {
        this.position.x = event.clientX - this.startPosition.x;
        this.position.y = event.clientY - this.startPosition.y;
        positionStore.setPosition(this.tokenIndex, {
          x: this.position.x,
          y: this.position.y,
        });
      }
    },
    stopDragging() {
      this.isDragging = false;
    },
    startTouchDragging(event) {
      event.preventDefault();
      const touch = event.touches[0];
      this.isDragging = true;
      this.startPosition = {
        x: touch.clientX - this.position.x,
        y: touch.clientY - this.position.y,
      };
    },
    touchDrag(event) {
      if (this.isDragging) {
        const touch = event.touches[0];
        this.position.x = touch.clientX - this.startPosition.x;
        this.position.y = touch.clientY - this.startPosition.y;
        positionStore.setPosition(this.tokenIndex, {
          x: this.position.x,
          y: this.position.y,
        });
      }
    },
  },
  created() {
    positionStore.setPosition(this.tokenIndex, {x: 0, y: 540});
  },

  mounted() {
    this.size.x = sizetranslate.feetTranslator(5 * this.widthBoxes);
    this.size.y = sizetranslate.feetTranslator(5 * this.heightBoxes);
    console.log("23" + sizetranslate.feetTranslator(5 * this.heightBoxes));
    var moves = {
      smart: true,
      indexes: ["Move Left * ft", "Move Right * ft", "Move Up * ft", "Move Down * ft",],
      action: (i, wildcard) => {
        console.log(combat.getAction);
        if (combat.getAction != "moving") {
          return;
        }
        const wordToNumber = {
          one: 1,
          two: 2,
          three: 3,
          four: 4,
          five: 5,
          six: 6,
          seven: 7,
          eight: 8,
          nine: 9,
          ten: 10,
          fifteen : 15,
          twenty : 20,
          twentyfive : 25,
          thirty : 30,
          thirtyfive : 35,
          forty : 40,
          fortyfive : 45,
          fifty : 50,
          fiftyfive : 55,
          sixty : 60,
        };
        let wildwildcard = parseInt(wildcard) ? parseInt(wildcard): wordToNumber[wildcard];
        const direction = i;
        const position = positionStore.getPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0]);
        const x = position.x;
        const y = position.y;
        console.log(`wildcard ${wildwildcard}`)
        if(wildwildcard == undefined){
          wildwildcard = 0;
        }
        console.log(this.combat.initiativeOrder[this.combat.initiativeIndex][1])
        switch (direction) {
          case 0:
            console.log("0");

            console.log(positionStore.getPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0]));
            positionStore.setPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0], {
              x: x - sizetranslate.feetTranslator(parseInt(wildwildcard)),
              y: y,
            });

            console.log(positionStore.getPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0]));
            break;
          case 1:
            console.log("1");
            console.log(positionStore.getPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0]));
            positionStore.setPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0], {
              x: x + sizetranslate.feetTranslator(parseInt(wildwildcard)),
              y: y,
            });
            console.log(positionStore.getPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0]));
            break;
          case 2:
            console.log("2");

            console.log(positionStore.getPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0]));
            positionStore.setPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0], {
              x: x,
              y: y - sizetranslate.feetTranslator(parseInt(wildwildcard)),
            });

            console.log(positionStore.getPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0]));
            break;
          case 3:
            console.log("3");

            console.log(positionStore.getPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0]));
            positionStore.setPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0], {
              x: x,
              y: y + sizetranslate.feetTranslator(parseInt(wildwildcard)),
            });

            console.log(positionStore.getPosition(this.combat.initiativeOrder[this.combat.initiativeIndex][0]));
            break;
        }

      },

    };
    artyom.addCommands(moves);
  },

};
</script>

<style scoped>
.token-normal {
  position: absolute;
  cursor: move;
  background-size: cover;
  background-repeat: no-repeat;
}

.token-normal {
  position: absolute;
  cursor: move;
  background-size: cover;
  background-repeat: no-repeat;
}

.targeted {
  border: 2px solid red;
}
</style>

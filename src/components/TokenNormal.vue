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
  ><span style="color:white">{{ tokenid }}</span></div>
</template>

<script>
import {usePositionStore} from "stores/positionStore"; // Adjust the path as needed
import {pxTranslate} from "stores/px2feet";
import {combatStore} from "stores/combat";

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
  },
  data() {
    return {
      isDragging: false,
      startPosition: {x: 0, y: 0},
      size: {
        x: 0,
        y: 0,
      },
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
    }
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
    positionStore.setPosition(this.tokenIndex, {x: 0, y: 0});
  },
  mounted() {
    this.size.x = sizetranslate.feetTranslator(5 * this.widthBoxes);
    this.size.y = sizetranslate.feetTranslator(5 * this.heightBoxes);
    console.log("23" + sizetranslate.feetTranslator(5 * this.heightBoxes));
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

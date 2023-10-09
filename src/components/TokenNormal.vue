<template>
  <div
    class="token-normal"
    :style="{
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${size.x}px`,
      height: `${size.y}px`,
      'background-image': `url('${backgroundImageUrl}')`,
    }"
    @mousedown="startDragging"
    @mousemove="drag"
    @mouseup="stopDragging"
    @touchstart="startTouchDragging"
    @touchmove="touchDrag"
    @touchend="stopDragging"
    @touchcancel="stopDragging"
    @selectstart="$event.preventDefault()"
  ></div>
</template>

<script>
import { usePositionStore } from "../stores/positionStore"; // Adjust the path as needed
import { pxTranslate } from "../stores/px2feet";
const positionStore = usePositionStore();
const sizetranslate = pxTranslate();
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
      required : true
    }
  },
  data() {
    return {
      isDragging: false,
      startPosition: { x: 0, y: 0 },
      size: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    position() {
      return positionStore.getPosition(this.tokenIndex) || { x: 0, y: 0 };
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
    positionStore.setPosition(this.tokenIndex, { x: 0, y: 0 });
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
</style>

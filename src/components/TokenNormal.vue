<template>
  <div
    class="token-normal"
    :style="{
      left: `${position.x}px`,
      top: `${position.y}px`,
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
import { computed } from "vue";
import { usePositionStore } from "../stores/positionStore"; // Adjust the path as needed
export default {
  props: {
    tokenIndex: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isDragging: false,
      startPosition: { x: 0, y: 0 },
    };
  },
  computed: {
    position() {
      const positionStore = usePositionStore();
      return positionStore.getPosition(this.tokenIndex);
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

        // Save the updated position to the store
        const positionStore = usePositionStore();
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

        // Save the updated position to the store
        const positionStore = usePositionStore();
        positionStore.setPosition(this.tokenIndex, {
          x: this.position.x,
          y: this.position.y,
        });
      }
    },
    created() {
      // Set the initial position to (0, 0) when the component is created
      const positionStore = usePositionStore();
      positionStore.setPosition(this.tokenIndex, { x: 0, y: 0 });
    },
  },
};
</script>
    
    <style scoped>
.token-normal {
  width: 50px;
  height: 50px;
  background-color: blue;
  position: absolute;
  cursor: move;
}
</style>
    
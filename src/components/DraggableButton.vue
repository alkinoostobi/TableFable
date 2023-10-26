<template>
    <div
      :style="{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`
      }"
    >
      <div
        class="handle"
        @mousedown="startDrag"
        @mouseup="stopDrag"
      ></div>
      <button
        style="margin-top: 40px;"
        @click="handleButtonClick"
      >
        Pause Movement
      </button>
    </div>
  </template>
  
  <script>
    import { combatStore } from "../stores/combat";
  const combat = combatStore();
  export default {
    name: 'DraggableWithHandle',
    data() {
      return {
        isDragging: false,
        position: { x: 0, y: 0 },
        startX: 0,
        startY: 0,
        initialX: 0,
        initialY: 0,
          combat: combat,
      };
    },
    methods: {
      startDrag(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.initialX = this.position.x;
        this.initialY = this.position.y;
        document.addEventListener('mousemove', this.move);
        document.addEventListener('mouseup', this.stopDrag);
      },
      stopDrag() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('mouseup', this.stopDrag);
      },
      move(e) {
        if (!this.isDragging) return;
        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;
        this.position.x = this.initialX + dx;
        this.position.y = this.initialY + dy;
      },
      handleButtonClick() {
            combat.movePause();
      }
    }
  };
  </script>
  
  <style>
  div {
    display: inline-block;
    position: relative;
  }
  .handle {
    width: 2rem;
    height: 1rem;
    background-color: lightblue;
    cursor: grab;
  }
  </style>
  
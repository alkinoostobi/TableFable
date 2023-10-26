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
      >
        <q-icon name="drag_handle" class="handle-icon" />
      </div>
      <div class="buttons-container">
        <button @click="handlePauseClick" class="action-button">
          <q-icon name="pause" /> Pause Movement
        </button>
        <button @click="handleEndClick" class="action-button">
          <q-icon name="stop" /> End Movement
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
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
      handlePauseClick() {
        combat.movePause();
      },
      handleEndClick() {
        combat.moveEnd();
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .handle-icon {
    font-size: 1.5rem;
  }
  .buttons-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  }
  .action-button {
    margin-top: 10px;
  }
  </style>
  
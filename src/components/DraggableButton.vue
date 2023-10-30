<template>
    <div
      :style="{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`
      }"
      @touchstart="startDrag"
      @touchend="stopDrag"
    >
      <div
        class="handle"
        @mousedown="startDrag"
        @touchstart="startDrag"
        @mouseup="stopDrag"
        @touchend="stopDrag"
      >
        <q-icon name="drag_handle" class="handle-icon" />
      </div>
      <div class="buttons-container">
        <button @click="handlePauseClick" @touchstart="handlePauseClick" class="action-button" v-if="combat.action == 'moving'">
          <q-icon name="pause" /> Pause Movement
        </button>
        <button @click="combat.action == 'moving' ? handleEndClick : (combat.action == 'attack' ? finalizeAttack() : '')" @touchstart="combat.action == 'moving' ? handleEndClick : (combat.action == 'attack' ? finalizeAttack() : '')" class="action-button">
          <q-icon name="stop" /> 
          <span v-if="combat.action == 'moving'">End Movement</span>
          <span v-if="combat.action == 'attack'">Attack</span>
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
        e.preventDefault();
        if (e.type === 'touchstart') {
          this.startX = e.touches[0].clientX;
          this.startY = e.touches[0].clientY;
        } else {
          this.startX = e.clientX;
          this.startY = e.clientY;
        }
        this.isDragging = true;
        this.initialX = this.position.x;
        this.initialY = this.position.y;
        document.addEventListener('mousemove', this.move);
        document.addEventListener('touchmove', this.move, { passive: false });
        document.addEventListener('mouseup', this.stopDrag);
        document.addEventListener('touchend', this.stopDrag);
      },
      stopDrag() {
        this.isDragging = false;
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('touchmove', this.move);
        document.removeEventListener('mouseup', this.stopDrag);
        document.removeEventListener('touchend', this.stopDrag);
      },
      move(e) {
        if (!this.isDragging) return;
        let clientX, clientY;
        if (e.type === 'touchmove') {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }
        const dx = clientX - this.startX;
        const dy = clientY - this.startY;
        this.position.x = this.initialX + dx;
        this.position.y = this.initialY + dy;
      },
      handlePauseClick() {
        combat.movePause();
      },
      handleEndClick() {
        combat.moveEnd();
      },
        finalizeAttack() {
        combat.finalizeAttack()
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
  
<template>
  <div
    :style="{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`
      }"
    @touchend="stopDrag"
    @touchstart="startDrag"
  >
    <div
      class="handle"
      @mousedown="startDrag"
      @mouseup="stopDrag"
      @touchend="stopDrag"
      @touchstart="startDrag"
    >
      <q-icon class="handle-icon" name="drag_handle"/>
    </div>
    <div class="buttons-container">
      <button v-if="combat.action === 'moving'" class="action-button" @click="handlePauseClick"
              @touchstart="handlePauseClick">
        <q-icon name="pause"/>
        Pause Movement
      </button>
      <button
        class="action-button"
        @click="combat.action === 'moving' ? handleEndClick : (combat.action === 'attack' ? finalizeAttack() : '')"
        @touchstart="combat.action === 'moving' ? handleEndClick : (combat.action == 'attack' ? finalizeAttack() : '')">
        <q-icon v-if="combat.action === 'moving'" name="stop"/>
        <svg v-if="combat.action === 'attack'" viewBox="0 0 256 256" width="80%" height="80%" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M221.7,34.3A8.1,8.1,0,0,0,216,32h0l-63.8.2a8.1,8.1,0,0,0-6.2,2.9L75.6,120.3,67.3,112a16.1,16.1,0,0,0-22.6,0L32,124.7a15.9,15.9,0,0,0,0,22.6l20.9,20.9-30,29.9a16.2,16.2,0,0,0,0,22.7l12.3,12.3a16.3,16.3,0,0,0,22.7,0l29.9-30L108.7,224a16.1,16.1,0,0,0,22.6,0L144,211.3a15.9,15.9,0,0,0,0-22.6l-8.3-8.3L220.9,110a8.1,8.1,0,0,0,2.9-6.2L224,40A8.1,8.1,0,0,0,221.7,34.3ZM207.8,100l-83.5,69-13-13,54.4-54.3a8.1,8.1,0,0,0-11.4-11.4L100,144.7l-13-13,69-83.5,52-.2Z"/></svg>
        <span v-if="combat.action === 'moving'">End Movement</span>
        <span v-if="combat.action === 'attack'">Attack</span>
      </button>
      <button
        class="action-button"
        @click="combat.action === 'moving' ? handleEndClick : (combat.action === 'attack' ? cancelAttack() : '')"
        @touchstart="combat.action === 'moving' ? handleEndClick : (combat.action == 'attack' ? cancelAttack() : '')">
        <q-icon size="105px" name="close"/>
        <br/>
        <span>Cancel</span>
      </button>
    </div>
  </div>
</template>

<script>
import {combatStore} from "stores/combat";

import {dmtools} from "stores/dmtools";

const condmtools = dmtools();
const combat = combatStore();

export default {
  name: 'DraggableWithHandle',
  data() {
    return {
      isDragging: false,
      position: {x: 0, y: 0},
      startX: 0,
      startY: 0,
      initialX: 0,
      initialY: 0,
      combat: combat,
      condmtools: condmtools,
    };
  },
  mounted() {
    switch (condmtools.playerposition) {
      case 'bottom':
        this.position.x = 960;
        this.position.y = 800
        break;
      case 'top':
        this.position.x = 960;
        this.position.y = 100
        break;
      case 'left':
        this.position.x = 10;
        this.position.y = 490
        break;
      case 'right':
        this.position.x = 1800;
        this.position.y = 490
        break;
    }
    if (condmtools.playerposition == 'bottom') {
      this.position.x = 960;
      this.position.y = 800
    }
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
      document.addEventListener('touchmove', this.move, {passive: false});
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
    },
    cancelAttack(){
      combat.cancelAttack()

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
  flex-direction: row;
  margin-top: 10px;
}

.action-button {
  margin-top: 10px;
  width : 8rem;
  height : 8rem;
}
</style>

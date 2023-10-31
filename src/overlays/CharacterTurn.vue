<template>
    <div class="overlay" @click="handleTap($event)">
      <div class="action-label pixel-border pixelborder">ACTION {{ 4 - combat.getActionNumber }}</div>
      <div
        class="actions"
        :style="{
          transform: `rotate(${rotation}deg) translate(${positions[0]}%, ${positions[1]}%)`,
        }"
      >
        <div class="action top-left pixel-border pixelborder" @click="combat.startAttack(0)">
          <div class="image-container">
            <img src="../assets/attack.png" alt="Attack icon" />
          </div>
          <span class="action-text">Attack</span>
        </div>
        <div class="action top-right pixel-border pixelborder">
          <div class="image-container">
            <img src="../assets/spell.png" alt="Spell icon" />
          </div>
          <span class="action-text">Spell</span>
        </div>
        <div class="action right pixel-border pixelborder">
          <div class="image-container">
            <img src="../assets/skip.png" alt="Skip action icon" />
          </div>
          <span class="action-text">Skip Action</span>
        </div>
        <div class="action left pixel-border pixelborder" @click="combat.moveStart()">
          <div class="image-container">
            <img src="../assets/move.png" alt="Action icon" />
          </div>
          <span class="action-text">Move Action</span>
        </div>
        <div class="action center pixel-border pixelborder">
          <div class="image-container">
            <img src="../assets/classaction.png" alt="Class action icon" />
          </div>
          <span class="action-text">Class Action</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { combatStore } from "../stores/combat";
  import { dmtools } from "../stores/dmtools"; 
  const condmtools = dmtools();
  const combat = combatStore();
  export default {
    name: "CharacterTurn",
    data() {
      return {
        rotation: 0,
        rotations: [0, 90, 180, 270],
        currentRotationIndex: 0,
            positions: [0, 0],
          combat: combat,
          condmtools : condmtools,
      };
    },
    methods: {
      handleTap(event) {
        const tapX = event.clientX;
        const tapY = event.clientY;
  
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
  
        if (tapY < 50) {
          this.rotation = this.rotations[2];
          this.currentRotationIndex = 2;
          this.positions = [0, 200];
          condmtools.playerposition = 'top'
        } else if (tapY > screenHeight - 50) {
          this.rotation = this.rotations[0];
          this.currentRotationIndex = 0;
          this.positions = [0, 200];
          condmtools.playerposition = 'bottom'
        } else if (tapX < 50) {
          this.rotation = this.rotations[1];
          this.currentRotationIndex = 1;
          this.positions = [0, 400];
          condmtools.playerposition = 'left'
        } else if (tapX > screenWidth - 50) {
          this.rotation = this.rotations[3];
          this.currentRotationIndex = 3;
          this.positions = [0, 400];
          condmtools.playerposition = 'right'
        }
      },
    },
  };
  </script>
  
  <style scoped>

  
  .overlay {
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column; 
  }
  
  .actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .action {
    margin: 10px;
    padding: 0 20px; 
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .action-label {
    color: black;
    font-size: 1.5em;
    margin-bottom: 20px;
    padding : 0 1rem;
  }
  
  .image-container {
    width: 6rem;
    height: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-container img {
    max-width: 100%;
    max-height: 100%;
  }
  
  .action-text {
    color: black;
    margin-top: 10px;
  }
  
  .top-left {
    order: 2; /* Adjust the order to place it below Action 1 */
  }
  
  .top-right {
    order: 3;
  }
  
  .center {
    order: 4;
  }
  
  .left {
    order: 5;
  }
  
  .right {
    order: 6;
  }
  </style>
  
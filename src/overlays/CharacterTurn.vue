<template>
  <div class="overlay" @click="handleTap($event)">
    <div class="action-label pixel-border pixelborder">ACTION {{ 4 - combat.getActionNumber }}</div>
    <div
      :style="{
          transform: `rotate(${rotation}deg) translate(${positions[0]}%, ${positions[1]}%)`,
        }"
      class="actions"
    >
      <div class="action top-left pixel-border pixelborder" @click="combat.startAttack(0)">
        <div class="image-container">
          <img alt="Attack icon" src="../assets/attack.png"/>
        </div>
        <span class="action-text">Attack</span>
      </div>
      <div class="action top-right pixel-border pixelborder">
        <div class="image-container">
          <img alt="Spell icon" src="../assets/spell.png"/>
        </div>
        <span class="action-text">Spell</span>
      </div>
      <div class="action right pixel-border pixelborder" @click="combat.turnOver()">
        <div class="image-container">
          <img alt="Skip action icon" src="../assets/skip.png"/>
        </div>
        <span class="action-text">Skip Turn</span>
      </div>
      <div class="action left pixel-border pixelborder" @click="combat.moveStart()">
        <div class="image-container">
          <img alt="Action icon" src="../assets/move.png"/>
        </div>
        <span class="action-text">Move Action</span>
      </div>
      <div class="action center pixel-border pixelborder">
        <div class="image-container">
          <img alt="Class action icon" src="../assets/classaction.png"/>
        </div>
        <span class="action-text">Class Action</span>
      </div>
    </div>
  </div>
</template>

<script>
import {combatStore} from "stores/combat";
import {dmtools} from "stores/dmtools";
import artyom from "../boot/voice";
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
      condmtools: condmtools,
    };
  },
  mounted(){
    var attack = {
      indexes:["attack"], // These spoken words will trigger the execution of the command
      action:function(){ // Action to be executed when a index match with spoken word
          combat.startAttack(0);
      }
    };
    artyom.addCommands(attack);
    var move = {
      indexes:["move"], // These spoken words will trigger the execution of the command
      action:function(){ // Action to be executed when a index match with spoken word
        combat.moveStart()
      }
    };
    artyom.addCommands(move);
    var turnend = {
      indexes:["end turn", "i end my turn", 'skip turn'], // These spoken words will trigger the execution of the command
      action:function(){ // Action to be executed when a index match with spoken word
        combat.turnOver()
      }
    };
    artyom.addCommands(turnend);
  },
  methods: {
    handleTap(event) {
      const tapX = event.clientX;
      const tapY = event.clientY;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      if (tapY < 350) {
        this.rotation = this.rotations[2];
        this.currentRotationIndex = 2;
        this.positions = [0, 200];
        condmtools.playerposition = 'top'
      } else if (tapY > screenHeight - 350) {
        this.rotation = this.rotations[0];
        this.currentRotationIndex = 0;
        this.positions = [0, 200];
        condmtools.playerposition = 'bottom'
      } else if (tapX < 350) {
        this.rotation = this.rotations[1];
        this.currentRotationIndex = 1;
        this.positions = [0, 400];
        condmtools.playerposition = 'left'
      } else if (tapX > screenWidth - 350) {
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
  padding: 0 1rem;
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

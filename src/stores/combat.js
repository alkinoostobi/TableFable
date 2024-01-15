import {defineStore} from "pinia";
import {useTokenStore} from "./tokenInfo";
import {pxTranslate} from "./px2feet";
import {usePositionStore} from "./positionStore"; // Adjust the path as needed
import socket from "../boot/socket"; // Adjust the path as needed


// Access the tokenInfo store
const tokenInfo = useTokenStore();
// Access the positionStore store
const positionStore = usePositionStore();
const sizetranslate = pxTranslate();
// Define a Pinia store named "combat"
export const combatStore = defineStore("combat", {
  state: () => ({
    combatBool: false, // Boolean state for combat status
    initiativeOrder: [], // Array to store the order of initiative
    initiativeIndex: 0, // Index indicating the current initiative
    numberOfActions: 3, // Number of actions available to a character
    overlay: false,
    combatPause: false, //Boolean state for combat pausing
    movePosition: {
      start: 0,
      lastStop: 0,
      end: 0,
    },
    action: '',
    movementLeft: 0,
    attack: {
      loadedAttack: {
        range: 0,
        numbOfDice: 0,
        damage: 0,
        bonus: 0,
        targets: 0,
        aoe: 0,
        aoetype: ''
      },
      targets: []
    },
    groupRoll: [{id: 'pl1', skill: 'Perception'}, {id: 'pl2', skill: 'Perception'}, {
      id: 'pl3',
      skill: 'Perception'
    }, {id: 'pl4', skill: 'Perception'}],
    groupRollResults: {pl1: -1,pl2: -1, pl3: -1, pl4: -1},
    d20appear: false,
    popupx : 0,
    popupy : 0,
    popuptext : 'Default Text',
    popupshow : false,
  }),
  actions: {
    combatStart(rollSkill) {
      this.combatBool = true
      this.rollForInitiative(rollSkill)
    },
    rollForInitiative(rollSkill) {
      const tokensWithInitiative = [];

      // Calculate initiative for player characters
      for (const pcId in tokenInfo.tokens.pcs) {
        const pc = tokenInfo.tokens.pcs[pcId];
        const initiativeRoll = Math.floor(Math.random() * 20) + tokenInfo.tokens.pcs[pcId].skills[rollSkill][0] + tokenInfo.tokens.pcs[pcId].stats[tokenInfo.tokens.pcs[pcId].skills[rollSkill][1]][1];
        tokensWithInitiative.push({id: pcId, type: "pcs", initiative: initiativeRoll});
      }

      // Calculate initiative for non-player characters
      for (const npcId in tokenInfo.tokens.npcs) {
        const perceptionSkillnpc = tokenInfo.tokens.npcs[npcId].perception;
        tokensWithInitiative.push({id: npcId, type: "npcs", initiative: perceptionSkillnpc});
      }

      // Sort tokens by initiative in descending order
      tokensWithInitiative.sort((a, b) => b.initiative - a.initiative);

      // Store the initiative order as an array of token IDs
      this.initiativeOrder = tokensWithInitiative.map(token => [token.id, token.type]);
      this.overlay = true;
      this.movementLeft = tokenInfo.tokens[this.initiativeOrder[this.initiativeIndex][1]][this.initiativeOrder[this.initiativeIndex][0]].speed;
      console.log(this.movementLeft = tokenInfo.tokens[this.initiativeOrder[this.initiativeIndex][1]][this.initiativeOrder[this.initiativeIndex][0]].speed)
      socket.emit('combatInitiatives', this.initiativeOrder);
      socket.emit('tokenslist', tokenInfo.tokens);
      socket.emit('combatStart' , true);
      socket.emit('addToLog', {type:'title', body:'Combat Started'});
    },
    pauseCombat() {
      this.combatPause = !this.combatPause
    },
    // Action to advance to the next turn
    turnOver() {
      // Increment initiativeIndex unless it reaches the end, then reset to 0
      this.initiativeIndex = this.initiativeIndex < this.initiativeOrder.length - 1 ? this.initiativeIndex + 1 : 0;
      socket.emit('turnChange', this.initiativeIndex);
      this.numberOfActions = 3;
      //                  tokenInfo.tokens[tokenType][tokenId].speed
      this.movementLeft = tokenInfo.tokens[this.initiativeOrder[this.initiativeIndex][1]][this.initiativeOrder[this.initiativeIndex][0]].speed;
      socket.emit('addToLog', {type:'title', body:`${this.initiativeOrder[this.initiativeIndex][0]} Turn`});
    },
    actionOver() {
      this.action = ''
      if (this.numberOfActions === 1) {
        this.turnOver()
      } else {
        this.numberOfActions--
        this.movementLeft = tokenInfo.tokens[this.initiativeOrder[this.initiativeIndex][1]][this.initiativeOrder[this.initiativeIndex][0]].speed;
      }
      this.overlay = true;
    },
    moveStart() {
      this.overlay = false;
      this.action = 'moving';
      this.movePosition.start = positionStore.getPosition(this.initiativeOrder[this.initiativeIndex][0])
      this.movePosition.lastStop = this.movePosition.start;
    },
    movePause() {
      this.movePosition.end = positionStore.getPosition(this.initiativeOrder[this.initiativeIndex][0])
      let distanceTraveledPX = positionStore.tokenDistance(this.movePosition.end, this.movePosition.lastStop);
      let distanceTraveledFeet = sizetranslate.pxtoFeet(distanceTraveledPX);
      if (distanceTraveledFeet > this.movementLeft) {
        this.movePosition.end = this.movePosition.lastStop
        positionStore.setPosition(this.initiativeOrder[this.initiativeIndex][0], this.movePosition.lastStop);
        alert(`hey you cant move more than ${this.movementLeft} feet`)
      } else {
        this.movePosition.lastStop = this.movePosition.end;
        this.movementLeft = this.movementLeft - distanceTraveledFeet

      }
    },
    moveEnd() {
      console.log('moveEnd')
      this.movePosition.end = positionStore.getPosition(this.initiativeOrder[this.initiativeIndex][0])
      let distanceTraveledPX = positionStore.tokenDistance(this.movePosition.end, this.movePosition.lastStop);
      let distanceTraveledFeet = sizetranslate.pxtoFeet(distanceTraveledPX);
      if (distanceTraveledFeet > this.movementLeft) {
        this.movePosition.end = this.movePosition.lastStop
        positionStore.setPosition(this.initiativeOrder[this.initiativeIndex][0], this.movePosition.lastStop);
        alert(`hey you cant move more than ${this.movementLeft} feet`)
      } else {
        this.movePosition.lastStop = this.movePosition.end;
        this.movementLeft = this.movementLeft - distanceTraveledFeet
        this.actionOver()
      }
      socket.emit('addToLog', {type:'intendedText', body:`Action ${4-this.numberOfActions}: Move ${distanceTraveledFeet}ft`});
    },

    async rollMyDice(numberOfDice, die, perDieModifier = 0, finalModifier = 0) {
      let result = 0;
      if (die === 20) {
        this.d20appear = true;
        //await until all groupRollResults values are not -1
        while (Object.values(this.groupRollResults).includes(-1)) {
          await new Promise(r => setTimeout(r, 100));
        }

        if(this.action == 'attack'){
          return (this.groupRollResults[this.initiativeOrder[this.initiativeIndex][0]] + perDieModifier + finalModifier);
        }
      }else{
        for (let i = 0; i < numberOfDice; i++) {
          const roll = Math.floor(Math.random() * die) + 1;
          result += roll + perDieModifier;
        }
        result = result + finalModifier;
        return result;
      }

    },
    targetSelected(targetID) {
      if (this.action !== 'attack' || targetID === this.initiativeOrder[this.initiativeIndex][0]) return;
      const index = this.attack.targets.indexOf(targetID);
      if (index !== -1) {
        // If targetID is found in the array, remove it
        this.attack.targets.splice(index, 1);
        this.attack.loadedAttack.targets++
      } else if (this.attack.loadedAttack.targets > 0) {
        // If targetID is not found in the array, add it
        if (positionStore.canTokensReach(this.initiativeOrder[this.initiativeIndex][0], targetID, this.attack.loadedAttack.range)) {
          this.attack.targets.push(targetID);
          this.attack.loadedAttack.targets--
        } else {
          alert('Target too far away')
        }
      } else {
        alert('You cannot select any more targets')
      }
    },
    startAttack(attackIndex) {
      this.overlay = false;
      this.action = 'attack'
      let category = tokenInfo.getCategoryById(this.initiativeOrder[this.initiativeIndex][0])
      let attackobj = tokenInfo.tokens[category][this.initiativeOrder[this.initiativeIndex][0]].attacks[attackIndex]
      this.attack.loadedAttack.range = attackobj.range
      this.attack.loadedAttack.damage = attackobj.damage
      this.attack.loadedAttack.bonus = attackobj.bonus
      this.attack.loadedAttack.targets = attackobj.targets
      this.attack.loadedAttack.numbOfDice = attackobj.numbOfDice;
    },
    cancelAttack() {
      this.attack.loadedAttack.range = 0
      this.attack.loadedAttack.damage = 0
      this.attack.loadedAttack.bonus = 0
      this.attack.loadedAttack.targets = 0
      this.attack.loadedAttack.numbOfDice = 0
      this.attack.targets.length = 0
      this.overlay = true;
      this.action='';
    },
    async finalizeAttack() {
      console.log("attacked");
      if (this.attack.targets.length === 0) {
        alert('Select Targets');
        return;
      }
      console.log('this.attack.targets.length:', this.attack.targets.length); // Add this line for debugging
      //delete the insides of groupRollResults and groupRoll and put only the attackerId = -1
      Object.keys(this.groupRollResults).forEach(key => delete this.groupRollResults[key]);
      this.groupRoll.length = 0;
      this.groupRoll.push({id: this.initiativeOrder[this.initiativeIndex][0], skill: 'Attack'});
      this.groupRollResults[this.initiativeOrder[this.initiativeIndex][0]] = -1;



      for (let i = 0; i < this.attack.targets.length; i++) {
        console.log('Inside loop'); // Add this line for debugging
        //await for this.rollMyDice(1, 20, this.attack.loadedAttack.bonus, 0) and put the result in a variable


        let attackroll = await this.rollMyDice(1, 20, this.attack.loadedAttack.bonus, 0);
        let target = this.attack.targets[i];
        let category = tokenInfo.getCategoryById(target);
        let targetAC = tokenInfo.tokens[category][target].defense.ac;
        let positionPopup = positionStore.getPosition(target);
        console.log(positionPopup.x,positionPopup.y)
        if (attackroll >= targetAC) {
          let damage = await this.rollMyDice(this.attack.loadedAttack.numbOfDice, this.attack.loadedAttack.damage, 0, this.attack.loadedAttack.bonus);
          tokenInfo.tokens[category][target].defense.hp = tokenInfo.tokens[category][target].defense.hp - damage;
          console.log(` ${target} took ${damage} points of damage`);
          this.showpopup(positionPopup.x,positionPopup.y,` ${target} took ${damage} points of damage`)
          socket.emit('addToLog', {type:'intendedText', body:`Action ${4-this.numberOfActions}: Attack ${target} (Success)`} );
          socket.emit('addToLog', {type:'damage', body:` ${target} took ${damage} points of damage`});
        } else {
          this.showpopup(positionPopup.x,positionPopup.y,'You missed');
          socket.emit('addToLog', {type:'intendedText', body:`Action ${4-this.numberOfActions}: Attack ${target} (Fail)`} );
          console.log('You missed')
        }
      }
      this.attack.loadedAttack.range = 0
      this.attack.loadedAttack.damage = 0
      this.attack.loadedAttack.bonus = 0
      this.attack.loadedAttack.targets = 0
      this.attack.loadedAttack.numbOfDice = 0
      this.attack.targets.length = 0
       //set 2 second timeout and then do action over
       setTimeout(() => {
        this.actionOver();
      }, 2500);
    },
    addToGrouproll(id, skill) {
      this.groupRoll.push({'id': id, 'skill': skill})
    },
    cleanGroupRoll() {
      this.groupRoll.length = 0;
    },
    spell() {
    },
    ability() {
    },
    setd20appear() {
      this.d20appear = false;
    },
    showpopup(x, y, text) {
      this.popupx = x;
      this.popupy = y;
      this.popuptext = text;
      this.popupshow = true;
    }

  },
  getters: {
    // Getter to determine whose turn it is based on initiativeIndex
    playerTurn() {
      return this.initiativeOrder[this.initiativeIndex];
    },
    getcombatBool() {
      return this.combatBool;
    },
    getMovementLeft() {
      return this.movementLeft;
    },
    getAction() {
      return this.action;
    },
    getActionNumber() {
      return this.numberOfActions;
    },
    getTargets() {
      return this.attack.targets;
    }
  }


});

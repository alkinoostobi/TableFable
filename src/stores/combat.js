import { defineStore } from "pinia";
import { useTokenStore } from "../stores/tokenInfo";

// Access the tokenInfo store
const tokenInfo = useTokenStore();

// Define a Pinia store named "combat"
export const combatStore = defineStore("combat", {
    state: () => ({
        combatBool: false, // Boolean state for combat status
        initiativeOrder: [], // Array to store the order of initiative
        initiativeIndex: 0, // Index indicating the current initiative
        numberOfActions: 3, // Number of actions available to a character
        combatPause: false,
    }),
    actions: {
        // Action to roll for initiative
        rollForInitiative(rollSkill) {
            const tokensWithInitiative = [];

            // Calculate initiative for player characters
            for (const pcId in tokenInfo.tokens.pcs) {
                const pc = tokenInfo.tokens.pcs[pcId];
                const initiativeRoll = Math.floor(Math.random() * 20) + tokenInfo.tokens.pcs[pcId].skills[rollSkill][0] + tokenInfo.tokens.pcs[pcId].stats[tokenInfo.tokens.pcs[pcId].skills[rollSkill][1]][1];
                tokensWithInitiative.push({ id: pcId, type: "pc", initiative: initiativeRoll });
            }

            // Calculate initiative for non-player characters
            for (const npcId in tokenInfo.tokens.npcs) {
                const perceptionSkillnpc = tokenInfo.tokens.npcs[npcId].perception;
                tokensWithInitiative.push({ id: npcId, type: "npc", initiative: perceptionSkillnpc });
            }

            // Sort tokens by initiative in descending order
            tokensWithInitiative.sort((a, b) => b.initiative - a.initiative);

            // Store the initiative order as an array of token IDs
            this.initiativeOrder = tokensWithInitiative.map(token => [token.id, token.type]);
        },
        pauseCombat() {
            this.combatPause = !this.combatPause
        },
        // Action to advance to the next turn
        turnOver() {
            // Increment initiativeIndex unless it reaches the end, then reset to 0
            this.initiativeIndex = this.initiativeIndex < this.initiativeOrder.length - 1 ? this.initiativeIndex + 1 : 0;
            this.numberOfActions = 3;
            //                  tokenInfo.tokens[tokenType][tokenId].speed
            this.movementLeft = tokenInfo.tokens[this.initiativeOrder[this.initiativeIndex][1]][this.initiativeOrder[this.initiativeIndex][0]].speed;
        },
        move() {},
        attack() {},
        spell() {},
        ability() {},

    },
    getters: {
        // Getter to determine whose turn it is based on initiativeIndex
        playerTurn() {
            return this.initiativeOrder[this.initiativeIndex];
        },
        combatBool() {
            return this.combatBool;
        }
    }
});
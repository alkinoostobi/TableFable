import { defineStore } from "pinia";
import { useTokenStore } from "../stores/tokenInfo";
const tokenInfo = useTokenStore();
export const combatStore = defineStore("combat", {
    state: () => ({
        combatBool: false,
        initiativeOrder: [],
        initiativeIndex: 0
    }),
    actions: {
        rollForInitiative(rollSkill) {
            const tokensWithInitiative = [];

            for (const pcId in tokenInfo.tokens.pcs) {
                const pc = tokenInfo.tokens.pcs[pcId];
                const initiativeRoll = Math.floor(Math.random() * 20) + tokenInfo.tokens.pcs[pcId].skills[rollSkill][0] + tokenInfo.tokens.pcs[pcId].stats[tokenInfo.tokens.pcs[pcId].skills[rollSkill][1]][1];
                tokensWithInitiative.push({ id: pcId, type: "pc", initiative: initiativeRoll });
            }

            for (const npcId in tokenInfo.tokens.npcs) {
                const perceptionSkillnpc = tokenInfo.tokens.npcs[npcId].perception;
                tokensWithInitiative.push({ id: npcId, type: "npc", initiative: perceptionSkillnpc });
            }

            tokensWithInitiative.sort((a, b) => b.initiative - a.initiative);

            this.initiativeOrder = tokensWithInitiative.map(token => token.id);
        }
    },
});
<template>
  <q-layout view="hHh lpR fFf" v-no-right-click>
    <character-turn v-if="combat.overlay"></character-turn>
    <roll-d20></roll-d20>
    <pop-up></pop-up>
    <q-dialog v-model="sizenotChosen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter the size of the grid box in pixels</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="gridSize"
            autofocus
            dense
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn v-close-popup flat label="Cancel"/>
          <q-btn v-close-popup flat label="Enter" @click="SaveSize()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="background-container">
      <div
        v-if="!sizenotChosen"
        :style="`background-size: ${gridFeetTranslator}px ${gridFeetTranslator}px;background-image: linear-gradient(to right, ${dmTools.getGridColor} 1px, transparent 1px),
    linear-gradient(to bottom, ${dmTools.getGridColor} 1px, transparent 1px);`"
        class="grid-background"
      >
        <span
          v-if="combat.action === 'moving'"
          class="pixel-border pixelborder remainingFt"
        >
          {{ combat.getMovementLeft.toFixed(2) }}ft remaining
        </span>

        <draggable-button
          v-if="combat.getAction === 'moving' ||combat.getAction === 'attack' "
        ></draggable-button>
        <q-page-container>
          <div
            v-for="(category, catInd) in getTokens"
            :key="'category' + catInd"
          >
            <token-normal
              v-for="(token, tokenInd) in category"
              :key="'token' + tokenInd"
              :backgroundImageUrl="token.icon"
              :height-boxes="token.size.y"
              :playing="
                !combat.getcombatBool ||
                (combat.initiativeOrder[combat.initiativeIndex][0] === token.id /*&& combat.action == 'moving'*/) ||
                combat.combatPause
              "
              :style="`
               -webkit-transform: rotate(${token.rotation});
               -moz-transform: rotate(${token.rotation});
               -ms-transform: rotate(${token.rotation});
               -o-transform: rotate(${token.rotation});
               transform: rotate(${token.rotation}); `"
              :token-index="token.id"
              :tokenid="token.id"
              :width-boxes="token.size.x"
            ></token-normal>
          </div>
        </q-page-container>
        <div class="circular-button">
          <q-btn
            color="primary"
            icon="auto_fix_high"
            round
            size="lg"
            @click="combat.combatStart('Perception')"
          />
        </div>
      </div>
      <div
        :style="`background: url(${dmTools.getGridBackground}) no-repeat center;`"
        class="background-image"
      ></div>
    </div>
  </q-layout>
</template>

<script>
import TokenNormal from "../components/TokenNormal.vue";
import DraggableButton from "../components/DraggableButton.vue";
import CharacterTurn from "../overlays/CharacterTurn.vue";
import rollD20 from "../overlays/rolld20.vue"
import PopUp from "components/popUp.vue";

import {tokenPositions} from "../shared/tokenPositions"; // Adjust the import path
import {usePositionStore} from "stores/positionStore"; // Adjust the path as needed
import {pxTranslate} from "stores/px2feet";
import {useTokenStore} from "stores/tokenInfo";
import {combatStore} from "stores/combat";
import {dmtools} from "stores/dmtools"; // Adjust the path as needed

const sizetranslate = pxTranslate();
const positionStore = usePositionStore();
const tokenInfo = useTokenStore();
const combat = combatStore();
const condmtools = dmtools();
export default {
  components: {
    TokenNormal,
    CharacterTurn,
    DraggableButton,
    rollD20,
    PopUp
  },
  data() {
    return {
      sizenotChosen: true,
      gridSize: 0,
      showOverlay: false,
      combat: combat,
      dmTools: condmtools,
    };
  },
  methods: {
    SaveSize() {
      sizetranslate.setpxPerFoot(this.gridSize);
    },
    feetTranslatorloc(feet) {
      return sizetranslate.feetTranslator(feet);
    },
    testpos(ind) {
      return positionStore.getPosition(ind);
    },
  },
  mounted() {
  },
  computed: {
    initiativeOrder() {
      return combat.initiativeOrder;
    },
    getTokens() {
      return tokenInfo.getAllTokens;
    },
    tokenPositions() {
      return tokenPositions.value;
    },
    gridFeetTranslator() {
      return sizetranslate.feetTranslator(5);
    },
    positio1n() {
      return positionStore.getPosition(0) || {x: 0, y: 0};
    },
  },
};
</script>

<style scoped>
.grid-background {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999; /* Adjust the z-index as needed */
  pointer-events: auto; /* Allows interaction with the overlay */
}

.background-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover !important;
  z-index: -1;
}

.remainingFt {
  color: black;
  font-size: 2rem;
  opacity: 0.7;
  padding: 0 1rem;
  position: absolute;
  z-index: 99999;
}
</style>

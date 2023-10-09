<template>
  <q-layout view="hHh lpR fFf">
    <q-dialog v-model="sizenotChosen" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Enter the size of the grid box in pixels</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="gridSize"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Enter" v-close-popup @click="SaveSize()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div
      class="grid-background"
      v-if="!sizenotChosen"
      :style="`background-size: ${gridFeetTranslator}px ${gridFeetTranslator}px;`"
    >
      {{ testpos(3) }}
      <q-page-container>
        <div v-for="(category, catInd) in getTokens" :key="'category' + catInd">
          <token-normal
            v-for="(token, tokenInd) in category"
            :key="'token' + tokenInd"
            :token-index="token.id"
            :width-boxes="token.size.x"
            :height-boxes="token.size.y"
            :backgroundImageUrl="token.icon"
          ></token-normal>
        </div>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
import { tokenPositions } from "../shared/tokenPositions"; // Adjust the import path
import TokenNormal from "../components/TokenNormal.vue";
import { usePositionStore } from "../stores/positionStore"; // Adjust the path as needed
import { pxTranslate } from "../stores/px2feet";
import { useTokenStore } from "../stores/tokenInfo";
const sizetranslate = pxTranslate();
const positionStore = usePositionStore();
const tokenInfo = useTokenStore();
export default {
  components: {
    TokenNormal,
  },
  data() {
    return {
      sizenotChosen: true,
      gridSize: 0,
    };
  },
  unmounted() {
    console.log("Bottom behaviour");
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
  computed: {
    getTokens() {
      return tokenInfo.getAllTokens();
    },
    tokenPositions() {
      return tokenPositions.value;
    },
    gridFeetTranslator() {
      return sizetranslate.feetTranslator(5);
    },
    positio1n() {
      return positionStore.getPosition(0) || { x: 0, y: 0 };
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
  background-image: linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);
}
</style>

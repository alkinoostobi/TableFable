<template>
  <q-layout view="hHh lpR fFf">
    <div class="grid-background">
      <q-page-container>
        {{ $options.board }}
        <!-- Use v-for to render multiple TokenNormal components -->
        <token-normal
          v-for="(position, index) in 3"
          :key="index"
          :token-index="index"
        ></token-normal>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
import { tokenPositions } from "../shared/tokenPositions"; // Adjust the import path
import TokenNormal from "../components/TokenNormal.vue";
export default {
  components: {
    TokenNormal,
  },
  computed: {
    tokenPositions() {
      return tokenPositions.value;
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
  background-size: 60px 60px;
  background-image: linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px);
}
</style>

import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", {
  state: () => ({
    tokens: {
      pcs: {

      },
      npcs: {

      }
    },
  }),
  actions: {
    setPosition(tokenIndex, position) {
      this.positions[tokenIndex] = position;
    },
    getPosition(tokenIndex) {
      return this.positions[tokenIndex];
    },
  },
});

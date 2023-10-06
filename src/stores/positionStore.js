import { defineStore } from "pinia";

export const usePositionStore = defineStore("position", {
  state: () => ({
    positions: {},
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

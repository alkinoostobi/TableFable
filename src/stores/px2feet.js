import { defineStore } from "pinia";

export const pxTranslate = defineStore("translate", {
  state: () => ({
    pxPerFoot: 0,
  }),
  actions: {
    feetTranslator(feet) {
      return this.pxPerFoot * feet
    },
    setpxPerFoot(pxPer5feet) {
      this.pxPerFoot = pxPer5feet / 5
    },
  },
});

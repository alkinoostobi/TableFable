import {defineStore} from "pinia";

export const pxTranslate = defineStore("translate", {
  state: () => ({
    pxPerFoot: 10,
  }),
  actions: {
    feetTranslator(feet) {
      return this.pxPerFoot * feet
    },
    setpxPerFoot(pxPer5feet) {
      console.log(`pxPer5feet: ${pxPer5feet}`)
      this.pxPerFoot = pxPer5feet / 5
      console.log('pxPerFoot: ' + this.pxPerFoot)
    },
    pxtoFeet(px) {
      return px / this.pxPerFoot
    }
  },
  getters: {
    getpxPerFoot() {
      return this.pxPerFoot
    }
  },
});

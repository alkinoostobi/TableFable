import { defineStore } from "pinia";

export const dmtools = defineStore("dmtools", {
    state: () => ({
        gridbackground: 'https://inkarnate-api-as-production.s3.amazonaws.com/YcHbT8nzcZHx5yyYYw3EJ',
        projectorbackground: '',
        soundtrack: '',
        tvbackground: '',
        gridcolor: 'black'
    }),
    actions: {
        setscene(gridbackground, projectorbackground, soundtrack, tvbackground) {
            this.gridbackground = gridbackground
            this.projectorbackground = projectorbackground
            this.soundtrack = soundtrack
            this.tvbackground = tvbackground
        },
        getPosition(tokenIndex) {
            return this.positions[tokenIndex];
        },
        tokenDistance(tokenA, tokenB) {
            return Math.sqrt((tokenA.x - tokenB.x) ** 2 + (tokenA.y - tokenB.y) ** 2);
        },
    },
    getters: {
        getGridBackground() {
            return this.gridbackground;
        },
        getGridColor() {
            return this.gridcolor
        }
    },
});
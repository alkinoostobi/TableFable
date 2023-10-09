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
        setToken(tokenId, tokenCat, tokenInfo) {
            this.tokens[tokenCat][tokenId] = tokenInfo;
        },
        getToken(tokenId, tokenCat) {
            return this.tokens[tokenCat][tokenId];
        },
    },
});
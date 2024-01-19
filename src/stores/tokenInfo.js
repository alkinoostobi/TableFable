import {defineStore} from "pinia";
export const useTokenStore = defineStore("token", {
    state: () => ({
        tokens: {}
    }),
    actions: {
        setToken(tokenId, tokenCat, tokenInfo) {
          console.log(tokenInfo)
          console.log(tokenCat)

            this.tokens[tokenCat][tokenId] = tokenInfo;
        },
        getToken(tokenId, tokenCat) {
            return this.tokens[tokenCat][tokenId];
        },
        getTokenIcon(tokenID,tokenCat){
          return this.tokens[tokenCat][tokenID].icon;
        },
        insertTokens(tokens) {
          console.log(tokens)
            this.tokens = tokens;
        },
        getCategoryById(objectId) {
            const pcsKeys = Object.keys(this.tokens.pcs);
            const npcsKeys = Object.keys(this.tokens.npcs);

            if (pcsKeys.includes(objectId)) {
                return 'pcs';
            } else if (npcsKeys.includes(objectId)) {
                return 'npcs';
            } else {
                return 'Object not found';
            }
        },
    },
    getters: {
        getAllTokens() {
            return this.tokens;
        },
    }
});

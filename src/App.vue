<template>
  <router-view/>
</template>

<script>
import {defineComponent, watch} from 'vue'
import {useTokenStore} from "stores/tokenInfo";

export default defineComponent({
  name: 'App',
  setup() {
    const tokenStore = useTokenStore();

    watch(
      () => tokenStore.tokens,
      (tokens) => {
        for (const category in tokens) {
          for (const token in tokens[category]) {
            if (tokens[category][token].defense.hp <= 0) {
              delete tokens[category][token];
            }
          }
        }
      },
      {deep: true} // Watch nested properties
    );

    // Other component logic...

    return {
      // Any properties or methods you want to expose
    };
  },
})
</script>

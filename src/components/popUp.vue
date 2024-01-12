<template>
    <transition name="fade">
      <div v-if="combat.popupshow" class="popup pixelborder pixel-border" :style="{top : y+'px', left: 960 + x +'px'}">
        {{ text }}
      </div>
    </transition>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import {combatStore} from "stores/combat";
  const combat = combatStore();
  export default {
    name: 'PopUp',
    props: {
  
    },
    data() {
      return {
        show: false,
        combat : combat,
      };
    },
    //watch this.combat.popupshow and when it turns true put the setTimeout
    watch: {
      'combat.popupshow': function (val) {
        if (val) {
          this.showPopup();
        }
      }
    },
    methods: {
      showPopup() {
        this.show = true;
        setTimeout(() => {
          this.combat.popupshow = false;
        }, 2000); // Popup will disappear after 2 seconds
      }
    },
    computed : {
      text() {
        return this.combat.popuptext;
      },
      x() {
        return this.combat.popupx;
      },
      y() {
        return this.combat.popupy;
      }
    },
    mounted() {
    },
    beforeUnmount() {
    }
  };
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    transform: translateX(-50%);
    color: #121212;
    padding: 0 10px 0 10px;
    border-radius: 5px;
    text-align: center;
    z-index: 999;
    min-width: 4vw;
    min-height : 1vw;
    width : auto;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: all 2s;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
  }
  </style>
  
<script>
export default {
  name: 'App',
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import { VueElement } from 'vue-demi';
import Navbar from './components/Navbar.vue';
import { useMainStore } from './stores/counter';

const store = useMainStore();
</script>

<template>
  <div :class="store.darkMode === true ? 'dark' : ''">
    <div class="h-screen w-screen bg-white dark:bg-black">
      <navbar class="bg-white dark:bg-black h-[10vh]" />
      <router-view
        v-slot="{ Component }"
        class="bg-white dark:bg-black text-black dark:text-white h-[90vh] w-full"
      />
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* Route transitions */
.router-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.router-enter-active {
  transition: all 4s ease-in-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 4s ease-in-out;
}
</style>

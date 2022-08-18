<script setup>
import Navbar from './components/Navbar.vue';
import { useMainStore } from './stores/counter';

const store = useMainStore();
</script>

<template>
  <div :class="store.darkMode === true ? 'dark' : ''">
    <div class="h-screen w-screen bg-white dark:bg-black">
      <navbar class="bg-white dark:bg-black" />
      <RouterView class="bg-white dark:bg-black" />
    </div>
  </div>
</template>

<style scoped></style>

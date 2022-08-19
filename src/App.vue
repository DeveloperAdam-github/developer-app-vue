<script setup>
import Navbar from "./components/Navbar.vue";
import { useMainStore } from "./stores/counter";

const store = useMainStore();
</script>

<template>
  <div :class="store.darkMode === true ? 'dark' : ''">
    <div class="h-screen w-screen bg-white dark:bg-black">
      <navbar class="bg-white dark:bg-black h-[10vh]" />
      <RouterView class="bg-white dark:bg-black h-[90vh] w-full" />
    </div>
  </div>
</template>

<style scoped></style>

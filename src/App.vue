<script setup>
import Navbar from "./components/Navbar.vue";

function toggleMode(mode) {
  if (mode === "dark") {
    localStorage.theme = "dark";
  }

  if (mode === "light") {
    localStorage.theme = light;
  }

  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
</script>

<template class="dark">
  <div class="h-screen w-screen bg-white dark:bg-black">
    <navbar />
    <RouterView />
  </div>
</template>

<style scoped>
</style>

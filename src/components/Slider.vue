<script setup>
import { ref } from 'vue';
import { useMainStore } from '../stores/counter';

const store = useMainStore();

var toggle = ref(store.darkMode);

function toggleToggle() {
  store.setDarkModeToggle(toggle);
}
</script>
<template>
  <div class="flex justify-end items-center space-x-2">
    <label
      for="toggle"
      class="w-12 h-7 flex items-center rounded-full p-1 cursor-pointer duration-300 ease-in-out"
      :class="store.darkMode === false ? 'bg-gray-200' : 'bg-white'"
    >
      <div
        class="toggle-dot w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out flex items-center justify-center"
        :class="store.darkMode === false ? '' : 'translate-x-5 bg-black'"
      >
        <p :class="store.darkMode === false ? 'block text-xl' : 'hidden'">☀️</p>
        <p :class="store.darkMode === true ? 'block text-xl' : 'hidden'">🌑</p>
      </div>
    </label>
    <input
      id="toggle"
      type="checkbox"
      class="hidden"
      :value="toggle"
      @click="toggleToggle"
    />
  </div>
</template>

<style></style>

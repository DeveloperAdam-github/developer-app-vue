<script setup>
import { ref } from "vue";

var toggle = ref(false);

function toggleToggle() {
  toggle.value = !toggle.value;
  console.log(toggle.value, "what is this");
}
</script>
<template>
  <div class="flex justify-end items-center space-x-2">
    <label
      for="toggle"
      class="
        w-10
        h-6
        flex
        items-center
        rounded-full
        p-1
        cursor-pointer
        duration-300
        ease-in-out
      "
      :class="toggle === true ? 'bg-gray-200' : 'bg-white'"
    >
      <div
        class="
          toggle-dot
          w-4
          h-4
          rounded-full
          shadow-md
          transform
          duration-300
          ease-in-out
          flex
          items-center
          justify-center
        "
        :class="toggle === true ? '' : 'translate-x-3 bg-black'"
      >
        <i v-if="toggle === true" class="fa-solid fa-sun text-yellow-200"></i>
        <i v-if="toggle === false" class="fa-solid fa-moon text-white"></i>
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
  <!-- <div
    class="
      w-10
      h-5
      py-1
      px-1
      rounded-xl
      border border-black
      flex
      items-center
      relative
    "
    @click="toggleToggle"
  >
    <div
      class="h-4 w-4 bg-red-500 rounded-full absolute duration-1000 transition"
      :class="toggle === true ? 'left-1' : 'right-1'"
    ></div>
  </div> -->
</template>

<style>
</style>
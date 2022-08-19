<script setup>
import { onMounted, ref } from "vue-demi";

const titleShow = ref(true);
const messageShow = ref(false);

onMounted(() => {
  setTimeout(() => {
    titleShow.value = false;
  }, 5000);
  setTimeout(() => {
    messageShow.value = true;
  }, 5800);
});
</script>

<template>
  <main class="w-full h-full dark:text-white text-black">
    <div class="h-full w-full justify-center items-center pb-14 flex">
      <transition name="fade">
        <h1 v-show="titleShow" class="font-boldHeadline text-xl" id="title">
          DeveloperApp
        </h1>
      </transition>

      <transition name="fade-in">
        <h1 v-show="messageShow" class="font-boldHeadline text-xl" id="title">
          Let's get started!
        </h1>
      </transition>
    </div>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.5s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 1;
}
</style>

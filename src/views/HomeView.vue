<script>
export const componentName = 'HomeView';
export default {
  name: componentName,
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup>
import { onMounted, ref } from 'vue-demi';
import { useRouter } from 'vue-router';
import LoginForm from '../components/Forms/LoginForm.vue';
import { useUserStore } from '../stores/user';

const router = useRouter();
const store = useUserStore();

const titleShow = ref(true);
const messageShow = ref(false);
const showButtons = ref(false);
const showLoginForm = ref(false);
const user = ref(store.user);

onMounted(() => {
  setTimeout(() => {
    titleShow.value = false;
  }, 3500);
  setTimeout(() => {
    messageShow.value = true;
  }, 4000);
  setTimeout(() => {
    messageShow.value = false;
  }, 6500);
  setTimeout(() => {
    showButtons.value = true;
  }, 7100);
});

const toggleLoginForm = () => {
  // showButtons.value = false;
  // setTimeout(() => {
  //   showLoginForm.value = true;
  // }, 300)
  // console.log(showLoginForm.value);
  router.push({
    name: 'login',
  });
};
</script>

<template>
  <main class="w-full h-[90vh] dark:text-white text-black">
    <div
      class="h-full w-full justify-center items-center pb-14 flex"
      v-show="!user"
    >
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

      <transition name="fade-in">
        <div
          v-show="showButtons"
          class="font-boldHeadline text-xl flex flex-col"
          id="title"
        >
          <button className="blue-btn" @click="toggleLoginForm">Sign In</button>
          <button className="blue-btn">Register</button>
        </div>
      </transition>
      <!-- <div v-show="showLoginForm" class="flex flex-col items-center">
        <h1 class="font-boldHeadline text-xl m-14" id="title">DeveloperApp</h1>
        <LoginForm />
      </div> -->
    </div>
    <div class="w-full h-full flex justify-center items-center" v-if="user">
      <h1 class="text-2xl font-boldHeadline">Hello {{ user.displayName }}</h1>
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

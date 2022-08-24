<script>
export const componentName = 'LoginView';
export default {
  name: componentName,
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup>
import { auth, provider } from '../firebase';
import { useRouter } from 'vue-router';
import { signInWithPopup } from '@firebase/auth';
import { useUserStore } from '../stores/user';
import { computed, ref, watchEffect } from 'vue-demi';

const router = useRouter();
let showEmailForm = ref(false);
let hiddenDiv = ref(true);
let email = ref('');
let password = ref('');

const goBack = () => {
  console.log('test');
  router.go(-1);
};

const store = useUserStore();

let doesUserExist = computed(() => {
  return store.user;
});

const toggleShowEmailForm = () => {
  showEmailForm.value = !showEmailForm.value;
  setTimeout(() => {
    hiddenDiv.value = !hiddenDiv.value;
  }, 450);
};

watchEffect(() => {
  if (store.user !== null) {
    router.push('/');
  }
});

const submitForm = () => {
  store.signInWithEmailAndPassword(email.value, password.value);
};
</script>

<template>
  <div
    class="flex relative flex-col p-8 justify-center items-center text-black dark:text-white"
  >
    <div class="w-full h-64 overflow-hidden">
      <transition name="fade">
        <form
          @submit.prevent="submitForm"
          v-if="showEmailForm"
          action=""
          class="w-full max-w-xl flex flex-col justify-center items-center p-4"
        >
          <label for="email" class="w-full text-left text-base font-headline"
            >Email</label
          >
          <input name="email" type="text" class="input-std" v-model="email" />
          <label for="password" class="w-full text-left text-base font-headline"
            >Password</label
          >
          <input type="password" class="input-std" v-model="password" />
          <button type="submit" class="blue-btn">Login</button>
        </form>
      </transition>
      <transition name="fade-opposite">
        <div
          class="h-64 flex flex-col justify-center items-center dark:text-white text-black"
          v-if="hiddenDiv"
        >
          <h1 class="font-boldHeadline text-xl" id="title">DeveloperApp 🚀</h1>
        </div>
      </transition>
    </div>

    <div class="w-full mt-10 flex flex-col items-center">
      <button class="google-btn" @click="store.signInWithGoogle()">
        <img
          class="h-full"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
          alt=""
        />
        <p>Sign in with google</p>
      </button>
      <button class="google-btn" @click="toggleShowEmailForm">
        <i class="fa-solid fa-envelope text-blue-500 text-lg"></i>
        <p>Sign in with Email</p>
      </button>
    </div>
    <div
      class="flex flex-col font-headline w-full text-center h-1/5 justify-end"
    >
      <small class="m-2 text-blue-500" @click="goBack"> Go back.. </small>
      <!-- <small class="m-2 text-blue-500"> Register... </small> -->
    </div>
  </div>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: translateX(250px);
}

.fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-250px);
}

.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-opposite-enter-from {
  opacity: 0;
  transform: translateX(-250px);
}

.fade-opposite-enter-active {
  transition: all 0.5s ease-in-out;
}

.fade-opposite-leave-to {
  opacity: 0;
  transform: translateX(250px);
}

.fade-opposite-leave-active {
  transition: all 0.5s ease-in-out;
}
</style>

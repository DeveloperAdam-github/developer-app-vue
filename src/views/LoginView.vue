<script>
export default {
  name: 'LoginView',
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup>
import { auth, provider } from '../firebase';
import { useRouter } from 'vue-router';
import { signInWithPopup } from '@firebase/auth';
import { useUserStore } from '../stores/user';
import { computed, watch } from 'vue-demi';

const router = useRouter();

const goBack = () => {
  console.log('test');
  router.go(-1);
};

const store = useUserStore();

let doesUserExist = computed(() => {
  return store.user;
});

watch(() => {
  console.log(store.user, 'does this update?');
  if (store.user !== null) {
    router.push('/');
  }
});
</script>

<template>
  <div class="flex flex-col p-8 justify-center items-center">
    <form
      action=""
      class="w-full max-w-xl flex flex-col justify-center items-center"
    >
      <label for="email" class="w-full text-left text-base font-headline"
        >Email</label
      >
      <input name="email" type="text" class="input-std" />
      <label for="password" class="w-full text-left text-base font-headline"
        >Password</label
      >
      <input type="password" class="input-std" />
      <button class="blue-btn">Login</button>
    </form>

    <div class="w-full mt-10 flex flex-col items-center">
      <button class="google-btn" @click="store.signInWithGoogle()">
        <img
          class="h-full"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
          alt=""
        />
        <p>Sign in with google</p>
      </button>
      <!-- <button class="google-btn">
        <i class="fa-solid fa-envelope text-blue-500 text-lg"></i>
        <p>Sign in with Email</p>
      </button> -->
    </div>
    <div
      class="flex flex-col font-headline w-full text-center h-1/5 justify-end"
    >
      <small class="m-2 text-blue-500" @click="goBack"> Go back.. </small>
      <!-- <small class="m-2 text-blue-500"> Register... </small> -->
    </div>
  </div>
</template>

<style></style>

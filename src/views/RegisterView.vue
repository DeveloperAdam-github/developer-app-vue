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
let displayName = ref('');
let email = ref('');
let password = ref('');

const goBack = () => {
  router.go(-1);
};

let clearError = computed(() => {
  return email;
});

const store = useUserStore();

let doesUserExist = computed(() => {
  return store.user;
});

setTimeout(() => {
  showEmailForm.value = !showEmailForm.value;
}, 450);

watchEffect(() => {
  if (store.user !== null) {
    router.push('/');
  }

  if (email.value === '') {
    store.clearErrorMessage();
  }
});

const submitForm = () => {
  store.createUserWithEmailAndPassword(
    displayName.value,
    email.value,
    password.value
  );
};
</script>

<template>
  <div
    class="flex relative flex-col p-8 justify-center items-center text-black dark:text-white"
  >
    <div class="w-full h-84 overflow-hidden">
      <transition name="fade">
        <form
          @submit.prevent="submitForm"
          v-if="showEmailForm"
          action=""
          class="w-full max-w-xl p-4 flex flex-col justify-center items-center"
        >
          <label for="name" class="w-full text-left text-base font-headline"
            >Name</label
          >
          <input
            name="name"
            type="text"
            class="input-std"
            v-model="displayName"
          />
          <label for="email" class="w-full text-left text-base font-headline"
            >Email</label
          >
          <input
            name="email"
            type="text"
            class="input-std"
            v-model="email"
            :class="
              store.error === 'auth/invalid-email' ? 'ring-red-500 ring-2' : ''
            "
          />
          <small
            v-if="store.error === 'auth/invalid-email'"
            class="text-red-500 text-xs w-full text-left -mt-2 mb-2"
            >Please enter a valid email</small
          >
          <label for="password" class="w-full text-left text-base font-headline"
            >Password</label
          >
          <input
            type="password"
            class="input-std"
            v-model="password"
            :class="
              store.error === 'auth/weak-password' && password !== ''
                ? 'ring-red-500 ring-2'
                : ''
            "
          />
          <small
            v-if="store.error === 'auth/weak-password' && password !== ''"
            class="text-red-500 text-xs w-full text-left -mt-2"
            >Password must be greater than 6 characters</small
          >
          <button type="submit" class="blue-btn">Register</button>
        </form>
      </transition>
    </div>
    <div
      class="flex flex-col font-headline w-full text-center h-1/5 justify-end"
    >
      <small class="m-2 text-blue-500" @click="goBack"> Go back.. </small>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-from {
  opacity: 0;
  transform: translateY(-250px);
}

.fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(250px);
}

.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-opposite-enter-from {
  opacity: 0;
  transform: translateY(250px);
}

.fade-opposite-enter-active {
  transition: all 0.5s ease-in-out;
}

.fade-opposite-leave-to {
  opacity: 0;
  transform: translateY(-250px);
}

.fade-opposite-leave-active {
  transition: all 0.5s ease-in-out;
}
</style>

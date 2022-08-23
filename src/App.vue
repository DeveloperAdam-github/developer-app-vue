<script>
export const componentName = 'App';
export default {
  name: componentName,
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import { ref } from 'vue-demi';
import Navbar from './components/Navbar.vue';
import { useMainStore } from './stores/counter';
import { doc, getDoc, getFirestore } from '@firebase/firestore';
import { app } from './firebase';
import { useUserStore } from './stores/user';
import { useRoute, useRouter } from 'vue-router';

const store = useMainStore();
const userStore = useUserStore();
const showNav = ref(false);
const showToast = ref(false);
const route = ref(useRouter());

function toggleNav(value) {
  console.log(value);
  showNav.value = value;
}

function copyLinkToClipboard(value) {
  const db = getFirestore(app);
  const docRef = doc(db, 'uniqueLinks', userStore.user.uid);
  console.log('testing');
  getDoc(docRef).then((response) => {
    console.log('hello test?')(
      (userStore.uniqueLink =
        response._document.data.value.mapValue.fields.uniqueLink.stringValue)
    );
    navigator.clipboard
      .writeText(`http://localhost:5173/user/${userStore.uniqueLink}`)
      .then(() => {
        showToast.value = true;
      });
    setTimeout(() => {
      showToast.value = false;
    }, 6000);
  });

  // navigator.clipboard.writeText(`http://localhost:5173/user/test`).then(() => {
  //   showToast.value = true;
  // });
  // setTimeout(() => {
  //   showToast.value = false;
  // }, 6000);
}
</script>

<template>
  <div :class="store.darkMode === true ? 'dark' : ''">
    <div class="h-screen w-screen bg-white dark:bg-black relative">
      <div
        :class="showNav ? 'h-96 ' : 'h-0'"
        class="w-full z-50 top-[10vh] absolute overflow-hidden transition-height duration-500 ease-in-out flex items-center justify-center bg-white text-black dark:text-white dark:bg-black flex flex-col"
      >
        The navbar is here, wont be many links :)
        <input type="text" placeholder="Text input paste here..." />
      </div>
      <navbar
        v-if="route.currentRoute.name !== 'user'"
        :show-toast="showToast"
        @copyLink="copyLinkToClipboard"
        @navToggle="toggleNav"
        class="bg-white dark:bg-black h-[10vh]"
      />
      <router-view
        v-slot="{ Component }"
        class="bg-white dark:bg-black text-black dark:text-white h-[90vh] w-full"
      >
        <transition name="route" mode="out-in">
          <component :is="Component"></component>
        </transition>
        <div
          class="toast w-full toast-center transition-height ease-in-out duration-700"
          :class="showToast ? 'h-32' : 'h-0 -bottom-10'"
        >
          <div class="alert alert-success text-white font-boldHeadline">
            <div>
              <span>Copied to clipboard</span>
            </div>
          </div>
        </div>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
/* Route transitions */
.router-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.router-enter-active {
  transition: all 0.5s ease-in-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-leave-active {
  transition: all 0.5s ease-in-out;
}
</style>

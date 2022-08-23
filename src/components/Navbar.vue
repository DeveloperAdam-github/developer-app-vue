<script setup>
import { ref, defineEmits } from 'vue-demi';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';
import Slider from './Slider.vue';

const isNavOpen = ref(false);
const isCopied = ref(false);
const emit = defineEmits(['navToggle', 'copyLink']);
const route = useRouter();
const routeRef = ref(route.currentRoute._value.path);
const store = useUserStore();

const handleChange = (event) => {
  console.log('hello');
  isNavOpen.value = !isNavOpen.value;
  emit('navToggle', isNavOpen.value);
};

const copy = () => {
  isCopied.value = true;
  emit('copyLink', isCopied.value);
};

const props = defineProps({
  showToast: Boolean,
});
</script>
<template>
  <nav class="w-full p-4 flex justify-between items-end z-50 relative">
    <i
      class="fa-solid fa-bars text-xl text-black dark:text-white"
      @click="handleChange"
    ></i>
    <!-- && store.user !== null -->
    <div v-if="routeRef === '/'">
      <i
        v-if="store.user"
        :class="props.showToast ? 'text-blue-500 dark:text-blue-500' : ''"
        class="fa-solid fa-link text-xl dark:text-white"
        @click="copy"
      ></i>
    </div>
    <div>
      <Slider />
    </div>
  </nav>
</template>

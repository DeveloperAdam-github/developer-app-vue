<script setup>
import { computed, ref } from 'vue-demi';
import { useUserDataStore } from '../stores/userData';

const props = defineProps({
  showModal: {
    type: Boolean,
  },
});

const emit = defineEmits(['closeModal']);
const store = useUserDataStore();

const showModalRef = computed(() => props.showModal);
const headerLine = ref('');

function closeModal() {
  emit('closeModal', false);
  console.log('closing modal');
}

console.log(showModalRef, 'does this change?');
</script>

<template>
  <div
    v-if="showModalRef"
    class="modal-overlay fixed z-10 left-0 top-0 w-full h-full overflow-auto flex items-center justify-center p-8 dark:bg-black/75"
  >
    <div
      class="modal-content bg-white dark:bg-black p-4 rounded-lg w-full flex flex-col items-center"
    >
      <div class="w-full flex justify-end" @click="closeModal">X</div>
      <form
        @submit.prevent="store.uploadHeaderLine(headerLine)"
        class="w-full my-2 flex flex-col items-center"
      >
        <input
          v-model="headerLine"
          type="text"
          placeholder="Add in a short bio here"
          class="input-std"
          max="30"
        />
        <button class="blue-btn">Save</button>
      </form>
    </div>
  </div>
</template>

<style></style>

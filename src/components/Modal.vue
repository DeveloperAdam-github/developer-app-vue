<script setup>
import { Camera, CameraResultType } from '@capacitor/camera';
import { computed, ref } from 'vue-demi';
import { useUserDataStore } from '../stores/userData';

const props = defineProps({
  showModal: {
    type: Boolean,
  },
  modalType: {
    type: String,
  },
});

const emit = defineEmits(['closeModal']);
const store = useUserDataStore();
const showModal = ref(store.showModal);

const showModalRef = computed(() => props.showModal);
const modalTypeRef = computed(() => props.modalType);
const headerLine = ref('');
const email = ref('');
const pill = ref('');
const platform = ref('');
const link = ref('');
const description = ref('');
const imageRef = ref('');
const projectName = ref('');

function closeModal() {
  store.toggleModalView(false);
}

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: true,
    resultType: CameraResultType.Base64,
  });

  console.log(image, 'can I use this?');

  imageRef.value = image;

  console.log(imageRef.value, 'the image ref value?');
};

console.log(showModalRef, 'does this change?');
</script>

<template>
  <div
    v-if="showModalRef"
    class="modal-overlay bg-black/50 fixed z-10 left-0 top-0 w-full h-full overflow-auto flex items-center justify-center p-8 dark:bg-black/75"
  >
    <div
      class="modal-content bg-white dark:bg-black p-4 rounded-lg w-full flex flex-col items-center"
    >
      <div class="w-full flex justify-end" @click="closeModal">X</div>
      <!-- HEADERLINE -->
      <form
        v-if="modalTypeRef === 'header'"
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

      <!-- EMAIL  -->
      <form
        v-if="modalTypeRef === 'email'"
        @submit.prevent="store.uploadEmail(email)"
        class="w-full my-2 flex flex-col items-center"
      >
        <input
          v-model="email"
          type="text"
          placeholder="Enter email address.."
          class="input-std"
          max="18"
        />
        <button class="blue-btn">Save</button>
      </form>

      <!-- PILL -->
      <form
        v-if="modalTypeRef === 'pillForm'"
        @submit.prevent="store.uploadPill(pill)"
        class="w-full my-2 flex flex-col items-center"
      >
        <input
          v-model="pill"
          type="text"
          placeholder="Add a pill value"
          class="input-std"
          max="14"
        />
        <button class="blue-btn">Save</button>
      </form>

      <!-- SOCIAL LINK -->
      <form
        v-if="modalTypeRef === 'socialLink'"
        @submit.prevent="store.uploadSocial(social, platform)"
        class="w-full my-2 flex flex-col items-center"
      >
        <select v-model="platform" name="" id="" class="p-1 w-full text-black">
          <option selected disabled>Select a platform</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
          <option value="github">Github</option>
          <option value="twitter">Twiter</option>
          <option value="tiktok">TikTok</option>
        </select>
        <input
          v-model="social"
          type="text"
          placeholder="Add a social link"
          class="input-std"
          max="14"
        />
        <button class="blue-btn">Save</button>
      </form>

      <!-- PROJECT FORM -->
      <form
        v-if="modalTypeRef === 'project'"
        @submit.prevent="
          store.uploadProject(projectName, link, description, imageRef)
        "
        class="w-full my-2 flex flex-col items-center"
      >
        <input
          v-model="projectName"
          type="text"
          placeholder="Project Name"
          class="input-std text-sm"
          max="14"
        />
        <input
          v-model="link"
          type="text"
          placeholder="Add a link to your project"
          class="input-std text-sm"
          max="14"
        />
        <input
          v-model="description"
          type="text"
          placeholder="A short description"
          class="input-std text-sm"
          max="14"
        />
        <div class="w-full flex">
          <div @click="takePicture" class="blue-btn h-10">Add Image</div>
        </div>
        <button class="blue-btn">Save</button>
      </form>
    </div>
  </div>
</template>

<style></style>
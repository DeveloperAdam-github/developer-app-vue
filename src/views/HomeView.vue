<script>
export const componentName = 'HomeView';
export default {
  components: { Modal },
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
import { useUserDataStore } from '../stores/userData';
import { Camera, CameraResultType } from '@capacitor/camera';
import { auth, db } from '../firebase';
import { doc, Firestore, setDoc } from '@firebase/firestore';
import Modal from '../components/Modal.vue';

const router = useRouter();
const store = useUserStore();
const userDataStore = useUserDataStore();

const titleShow = ref(true);
const messageShow = ref(false);
const showButtons = ref(false);
const showLoginForm = ref(false);
const showModal = ref(userDataStore.showModal);
const user = ref(store.user);
const modalType = ref('');

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: true,
    resultType: CameraResultType.Base64,
  });

  if (image) {
    const result = await store.uploadPicture(image);
    console.log(result, 'what result');
  }
};

const takeHeroPicture = async () => {
  const heroImage = await Camera.getPhoto({
    quality: 100,
    allowEditing: true,
    resultType: CameraResultType.Base64,
  });

  if (heroImage) {
    const result = await userDataStore.uploadHeroPicture(heroImage);
    console.log(result, 'upload Hero Picture result');
  }
};

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
  router.push({
    name: 'login',
  });
};

const toggleRegisterForm = () => {
  router.push({
    name: 'register',
  });
};

function toggleModal(value) {
  showModal.value = true;
  userDataStore.toggleModalView(true);
  modalType.value = value;
  // console.log(showModal.value, 'toggle?');
}

function sendEmail() {}
</script>

<template>
  <main class="w-full h-[90vh] dark:text-white text-black">
    <div
      class="h-full w-full justify-center items-center pb-14 flex"
      v-show="!store.user"
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
          <button className="blue-btn" @click="toggleRegisterForm">
            Register
          </button>
        </div>
      </transition>
    </div>
    <div
      class="w-full h-full text-black dark:text-white flex flex-col justify-center items-center font-headline overflow-scroll"
      v-if="store.user"
    >
      <modal
        :showModal="userDataStore.showModal"
        :modalType="modalType"
        @closeModal="toggleModal"
      />
      <div class="h-full w-full flex flex-col">
        <!-- profile pic -->
        <div class="w-full h-20 xl:h-72 relative">
          <img
            v-if="userDataStore.heroImage"
            :src="userDataStore.heroImage"
            class="object-cover h-full w-full"
            alt=""
            @click="takeHeroPicture"
          />
          <div
            v-else
            class="bg-gray-200 dark:bg-gray-400 w-full h-full flex items-center justify-center"
          >
            <i
              @click="takeHeroPicture"
              class="fa-solid fa-plus text-2xl p-2 text-black"
            ></i>
          </div>
          <div
            class="w-20 h-20 xl:h-44 xl:w-44 rounded-full absolute -bottom-10 left-10 xl:-bottom-20"
          >
            <div class="w-full h-full relative rounded-full">
              <img
                v-if="user.imageUrl"
                :src="user.imageUrl"
                @click="takePicture"
                class="full w-full h-full rounded-full object-cover"
                alt=""
              />
              <img
                v-else-if="user.photoUrl"
                :src="user.photoUrl"
                @click="takePicture"
                class="full w-full h-full rounded-full object-cover"
                alt=""
              />
              <div
                v-else
                class="flex items-center justify-center h-full w-full absolute top-0 rounded-full dark:bg-gray-200 bg-black"
              >
                <div class="relative"></div>
                <i
                  @click="takePicture"
                  class="fa-solid fa-plus text-xl p-2 text-white dark:text-black"
                ></i>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-64 xl:h-96 xl:mt-14 flex flex-col px-6">
          <div class="w-full flex justify-end py-4">
            <!-- <a :href="`mailto:${user.email}`"> -->
            <button
              @click="toggleModal('email')"
              class="h-8 w-8 xl:h-16 xl:w-16 xl:mr-6 bg-black dark:bg-white rounded-full flex items-center justify-center"
            >
              <i
                class="fa-solid text-white xl:text-3xl dark:text-black fa-envelope"
              ></i>
            </button>
            <!-- </a> -->
          </div>
          <div class="w-full h-64">
            <div class="w-fill flex flex-col">
              <h1
                class="text-lg font-boldHeadline xl:text-4xl"
                v-if="user.displayName"
              >
                {{ user.displayName }}
              </h1>
              <h1 class="text-lg font-boldHeadline xl:text-4xl" v-else>
                {{ user.name }}
              </h1>
              <div class="flex my-1 text-sm xl:text-lg">
                <span class="flex items-center"
                  ><i class="fa-solid fa-location-dot"></i>
                  <p class="ml-2 font-headline">UK</p></span
                >
                <span class="flex items-center ml-4"
                  ><i class="fa-solid fa-calendar"></i>
                  <p class="ml-2 font-headline">Joined, 2022</p></span
                >
              </div>
              <div class="xl:text-xl">
                <p
                  v-if="userDataStore.headerLine"
                  @click="toggleModal('header')"
                >
                  {{ userDataStore.headerLine }}
                </p>
                <p v-else @click="toggleModal('header')">
                  Loves Doughnuts, Writes Code. Click to add yours..
                </p>
              </div>
              <div
                class="w-full flex my-1 flex-wrap"
                v-if="userDataStore.pills && userDataStore.pills.length > 0"
              >
                <!-- PILLS -->
                <div
                  v-for="(pill, index) in userDataStore.pills"
                  :key="index"
                  class="h-6 text-xs xl:h-10 xl:text-lg xl:rounded-3xl xl:px-4 font-headline px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl items-center flex m-1 mx-2"
                >
                  {{ pill }}
                </div>
                <div
                  @click="toggleModal('pillForm')"
                  class="h-6 text-xs font-headline px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl items-center flex m-1 mx-2 xl:h-10 xl:text-lg xl:rounded-full xl:px-4"
                >
                  <i class="fa-solid fa-plus text-white dark:text-black"></i>
                </div>
              </div>
              <!-- ICONS -->
              <div
                class="flex mt-1 flex-wrap"
                v-if="userDataStore.socials && userDataStore.socials.length > 0"
              >
                <div
                  v-for="(social, index) in userDataStore.socials"
                  :key="index"
                  class="h-7 xl:h-14 xl:w-14 xl:mx-4 m-1 w-7 rounded-full dark:bg-white bg-black flex items-center justify-center"
                >
                  <a :href="social.link">
                    <i
                      :class="
                        social.platform === 'github'
                          ? 'fa-github'
                          : social.platform === 'instagram'
                          ? 'fa-instagram'
                          : social.platform === 'facebook'
                          ? 'fa-facebook'
                          : social.platform === 'linkedin'
                          ? 'fa-linkedin'
                          : social.platform === 'twitter'
                          ? 'fa-twitter'
                          : social.platform === 'tiktok'
                          ? 'fa-tiktok'
                          : ''
                      "
                      class="fa-brands xl:text-3xl text-white dark:text-black"
                    ></i>
                  </a>
                </div>
                <div
                  class="h-7 xl:h-14 xl:w-14 xl:mx-4 mr-2 w-7 rounded-full dark:bg-white bg-black flex items-center justify-center"
                  @click="toggleModal('socialLink')"
                >
                  <i
                    class="fa-solid xl:text-3xl fa-plus text-white dark:text-black"
                  ></i>
                </div>
              </div>

              <!-- PROJECT LISTS -->
              <div
                class="w-full xl:px-[10%] xl:mt-10 h-full overflow-scroll my-2 flex flex-col"
              >
                <div class="flex flex-col items-center my-4">
                  <div
                    class="bg-gray-400 w-full h-44 flex items-center justify-center"
                  >
                    <button class="blue-btn" @click="toggleModal('project')">
                      <p>Add new Project</p>
                    </button>
                  </div>

                  <div
                    class="flex flex-col mt-10 w-full items-center my-4"
                    v-for="(project, index) in userDataStore.projects"
                    :key="index"
                  >
                    <a :href="project.link" class="w-full">
                      <img
                        :src="project.imageUrl"
                        class="w-full xl:h-96 h-44 object-cover object-center"
                        alt=""
                      />
                    </a>
                    <div
                      class="px-2 xl:px-0 xl:text-2xl text-sm text-black dark:text-white mt-1"
                    >
                      <p class="xl:my-4">
                        <span
                          class="xl:text-4xl xl:my-4 font-headlineBold font-bold text-base"
                          >{{ project.projectName }}</span
                        >
                        - {{ project.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
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

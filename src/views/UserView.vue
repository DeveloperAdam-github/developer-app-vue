<script setup>
import { useShowPageStore } from '../stores/showPage';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useShowPageStore();
const router = useRouter();
const userData = ref(store);

const routerParams = router.currentRoute._value.params.id;
console.log(routerParams);

const loadUserData = onMounted(() => {
  store.getAllUserData(routerParams);
});
</script>

<template>
  <div
    v-if="store.isLoading === false"
    class="h-full w-full flex justify-center items-center text-black dark:text-white"
  >
    <div
      class="w-full h-full text-black dark:text-white flex flex-col justify-center items-center font-headline overflow-scroll"
    >
      <div class="h-full w-full flex flex-col">
        <div class="w-full h-20 xl:h-72 relative">
          <img
            v-if="store.heroImage"
            :src="store.heroImage"
            class="object-cover h-full w-full"
            alt=""
          />
          <div
            v-else
            class="bg-gray-200 dark:bg-gray-400 w-full h-full flex items-center justify-center"
          >
            <i class="fa-solid fa-plus text-2xl p-2 text-black"></i>
          </div>
          <div
            class="w-20 h-20 xl:h-44 xl:w-44 rounded-full absolute -bottom-10 left-10 xl:-bottom-20"
          >
            <img
              v-if="store.imageUrl"
              :src="store.imageUrl"
              @click="takePicture"
              class="full w-full h-full rounded-full object-cover"
              alt=""
            />
            <img
              v-else-if="store.photoUrl"
              :src="store.photoUrl"
              @click="takePicture"
              class="full w-full h-full rounded-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div class="w-full h-64 xl:h-96 xl:mt-14 flex flex-col px-6">
          <div class="w-full flex justify-end py-4">
            <div
              class="h-8 w-8 xl:h-16 xl:w-16 xl:mr-6 bg-black dark:bg-white rounded-full flex items-center justify-center"
            >
              <a :href="`mailto:${store.email}`">
                <i
                  class="fa-solid text-white dark:text-black fa-envelope xl:text-3xl"
                ></i>
              </a>
            </div>
          </div>
          <div class="w-full h-64 xl:h-full">
            <div class="w-fill flex flex-col">
              <h1
                v-if="store.displayName"
                class="text-lg xl:text-4xl font-boldHeadline"
              >
                {{ store.displayName }}
              </h1>
              <h1 v-else>Null</h1>
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
              <div class="text-base xl:text-xl">
                <p>{{ store.headerLine }}</p>
              </div>
              <div class="w-full flex my-1 flex-wrap xl:m-4">
                <!-- PILLS -->
                <div
                  v-if="store.pills && store.pills.length > 0"
                  v-for="(pill, index) in store.pills"
                  :key="index"
                  class="h-6 xl:h-10 xl:text-lg xl:rounded-3xl xl:px-4 text-xs font-headline px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl items-center flex m-1 mx-2"
                >
                  {{ pill }}
                </div>
              </div>
              <!-- ICONS && SOCIALS -->
              <div class="flex mt-1 flex-wrap">
                <div
                  v-if="store.socials && store.socials.length > 0"
                  v-for="(social, index) in store.socials"
                  :key="index"
                  class="h-7 mr-2 w-7 xl:h-14 xl:w-14 xl:mx-4 rounded-full dark:bg-white bg-black flex items-center justify-center"
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
              </div>

              <!-- PROJECT LISTS -->
              <div
                class="w-full xl:px-[10%] xl:mt-10 h-full overflow-scroll my-2 flex flex-col"
              >
                <div
                  class="flex flex-col items-center my-4"
                  v-for="(project, index) in store.projects"
                  :key="index"
                >
                  <a :href="project.link" class="w-full">
                    <img
                      :src="project.imageUrl"
                      class="w-full h-44 xl:h-96 object-cover object-center"
                      alt=""
                    />
                  </a>
                  <div
                    class="px-2 xl:px-0 text-sm xl:text-2xl text-black dark:text-white mt-1 w-full"
                  >
                    <p class="xl:my-4 text-left w-full">
                      <span
                        class="font-headlineBold xl:text-4xl xl:my-4 font-bold text-base"
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
  <div
    v-else
    class="h-full w-full flex justify-center items-center text-black dark:text-white flex-col"
  >
    <h1 class="font-boldHeadline text-2xl my-10">DeveloperApp</h1>
    <h1 class="text-base">Loading users profile...</h1>
    <i class="fa-solid fa-spinner animate-spin text-blue-500 text-lg"></i>
  </div>
</template>

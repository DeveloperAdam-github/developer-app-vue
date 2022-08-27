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
    v-if="userData"
    class="h-full w-full flex justify-center items-center text-black dark:text-white"
  >
    <div
      class="w-full h-full text-black dark:text-white flex flex-col justify-center items-center font-headline overflow-scroll"
    >
      <div class="h-full w-full flex flex-col">
        <div class="w-full h-20 relative">
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
          <div class="w-20 h-20 rounded-full absolute -bottom-10 left-10">
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
        <div class="w-full h-64 flex flex-col px-6">
          <div class="w-full flex justify-end py-4">
            <div
              class="h-8 w-8 bg-black dark:bg-white rounded-full flex items-center justify-center"
            >
              <i class="fa-solid text-white dark:text-black fa-envelope"></i>
            </div>
          </div>
          <div class="w-full h-64">
            <div class="w-fill flex flex-col">
              <h1 v-if="store.displayName" class="text-lg font-boldHeadline">
                {{ store.displayName }}
              </h1>
              <h1 v-else>Null</h1>
              <div class="flex my-1 text-sm">
                <span class="flex items-center"
                  ><i class="fa-solid fa-location-dot"></i>
                  <p class="ml-2 font-headline">UK</p></span
                >
                <span class="flex items-center ml-4"
                  ><i class="fa-solid fa-calendar"></i>
                  <p class="ml-2 font-headline">Joined, 2022</p></span
                >
              </div>
              <div class="">
                <p>Loves Doughnuts, Writes Code.</p>
              </div>
              <div class="w-full flex my-1 flex-wrap">
                <!-- PILLS -->
                <div
                  class="h-6 text-xs font-headline px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl items-center flex m-1 mx-2"
                >
                  FullStack Developer
                </div>
                <div
                  class="h-6 text-xs font-headline px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl items-center flex m-1 mx-2"
                >
                  Vue Wizard
                </div>
                <div
                  class="h-6 text-xs font-headline px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl items-center flex m-1 mx-2"
                >
                  Freelancer
                </div>
                <div
                  class="h-6 text-xs font-headline px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl items-center flex m-1 mx-2"
                >
                  CEO
                </div>
                <div
                  class="h-6 text-xs font-headline px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded-xl items-center flex m-1 mx-2"
                >
                  Javascript expert
                </div>
              </div>
              <!-- ICONS -->
              <div class="flex mt-1 flex-wrap">
                <div
                  class="h-7 mr-2 w-7 rounded-full dark:bg-white bg-black flex items-center justify-center"
                >
                  <i class="fa-brands fa-github text-white dark:text-black"></i>
                </div>
                <div
                  class="h-7 mr-2 w-7 rounded-full dark:bg-white bg-black flex items-center justify-center"
                >
                  <i
                    class="fa-brands fa-instagram text-white dark:text-black"
                  ></i>
                </div>
                <div
                  class="h-7 mr-2 w-7 rounded-full dark:bg-white bg-black flex items-center justify-center"
                >
                  <i
                    class="fa-brands fa-linkedin text-white dark:text-black"
                  ></i>
                </div>
                <div
                  class="h-7 mr-2 w-7 rounded-full dark:bg-white bg-black flex items-center justify-center"
                >
                  <i class="fa-solid fa-plus text-white dark:text-black"></i>
                </div>
              </div>

              <!-- PROJECT LISTS -->
              <div class="w-full h-full overflow-scroll my-2 flex flex-col">
                <div class="flex flex-col items-center my-4">
                  <img
                    src="https://techcrunch.com/wp-content/uploads/2020/11/GettyImages-1211125072.jpg?w=730&crop=1"
                    class="w-full h-44 object-cover object-center"
                    alt=""
                  />
                  <p class="px-2 text-sm text-black dark:text-white mt-1">
                    Worldie - Built in Vue and deployed to the app store.
                  </p>
                </div>

                <div class="flex flex-col items-center my-4">
                  <img
                    src="https://techcrunch.com/wp-content/uploads/2020/11/GettyImages-1211125072.jpg?w=730&crop=1"
                    class="w-full h-44 object-cover object-center"
                    alt=""
                  />
                  <p class="px-2 text-sm text-black dark:text-white mt-1">
                    Amazon - Call me Jeff.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

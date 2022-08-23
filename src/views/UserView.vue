<template>
  <div
    class="h-full w-full flex justify-center items-center text-black dark:text-white"
  >
    <div
      class="w-full h-full text-black dark:text-white flex flex-col justify-center items-center font-headline overflow-scroll"
    >
      <div class="h-full w-full flex flex-col">
        <div class="w-full h-20 relative">
          <img
            src="https://geekflare.com/wp-content/uploads/2019/12/code-review-tools.png"
            class="object-cover h-full w-full"
            alt=""
          />
          <div class="w-20 h-20 rounded-full absolute -bottom-10 left-10">
            <img
              src="https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg"
              class="full w-full rounded-full"
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
              <h1 class="text-lg font-boldHeadline">Homer Simpson</h1>
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
                    src="../assets/images/screenshot.jpeg"
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

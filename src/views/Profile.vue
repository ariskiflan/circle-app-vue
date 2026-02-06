<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { assets } from "../assets/assets";
import Threads from "../components/Threads.vue";
import { useStore } from "vuex";
import { Icon } from '@iconify/vue';
import { useRouter } from "vue-router";
import ButtonFollows from "../components/ButtonFollows.vue";


const router = useRouter();
const route = useRoute();
const store = useStore();
const id = route.params.id;

const activeTab = ref("all");

const userById = computed(() => store.getters["authModules/userById"]);
const threadsByUserId = computed(
  () => store.getters["threadModules/threadByUserId"]
);

const getProfile = async () => {
  await store.dispatch("authModules/getUserById", id);
  await store.dispatch("threadModules/getThreadByUserId", id);
};

const handleFollows = () => {
  router.push("/follows");
}

onMounted(async () => {
  await getProfile();
});
</script>

<template>
  <div>
    <div class="sticky top-0 bg-[#1d1d1d] z-10">
      <div class="px-5 py-10 flex flex-col gap-3 md:gap-5">
        <div class="flex items-center gap-3">
        <Icon icon="mdi:arrow-back" 
          width="40" 
          height="40" 
          class="cursor-pointer"
          @click="router.push('/')"
       ></Icon>
          <p class="text-md md:text-2xl font-semibold">{{ userById?.fullname }}</p>
        </div>

        <div class="relative">
          <div class="w-full h-[70px] md:h-[100px] rounded-2xl bg-green-500"></div>
          <div
            class="w-15 h-15 md:w-20 md:h-20 rounded-full bg-gray-400 border-4 border-black absolute bottom-[-30px] md:bottom-[-40px] left-[30px] overflow-hidden"
          >
            <img :src="userById?.profile?.avatar" alt="" />
          </div>
        </div>

        <div class="flex justify-end mt-5 md:mt-10">
           <ButtonFollows :follows="userById" />
        </div>

        <div class="flex flex-col gap-2">
          <p class="text-xl md:text-2xl font-semibold">{{ userById?.fullname }}</p>
          <span class="text-gray-400 font-semibold text-md">
            @{{ userById?.username }}
          </span>
          <p class="text-md font-normal">{{ userById?.profile?.bio }}</p>

          <div class="flex items-center gap-5" @click="handleFollows">
            <p class="text-sm md:text-md font-semibold">
              {{ userById?.following?.length }}
              <span class="text-gray-400 font-normal">Following</span>
            </p>
            <p class="text-sm md:text-md font-semibold">
              {{ userById?.follower?.length }}
              <span class="text-gray-400 font-normal">Followers</span>
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 justify-center items-center">
        <p
          @click="activeTab = 'all'"
          :class="[
            'relative text-md md:text-xl cursor-pointer px-4 py-2 text-center border-b-2',
            activeTab === 'all'
              ? 'border-gray-500 font-bold text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-1 after:bg-green-500 after:rounded-lg'
              : 'border-gray-500 font-normal',
          ]"
        >
          All Post
        </p>
        <p
          @click="activeTab = 'media'"
          :class="[
            'relative text-md md:text-xl cursor-pointer px-4 py-2 text-center border-b-2',
            activeTab === 'media'
              ? 'border-gray-500 font-bold text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-1 after:bg-green-500 after:rounded-lg'
              : 'border-gray-500 font-normal',
          ]"
        >
          Media
        </p>
      </div>
    </div>

    <div>
      <div v-if="activeTab === 'all'">
        <div v-for="item in threadsByUserId" :key="item.id">
          <Threads :thread="item"  />
          <!-- :handleGetThreads="getProfile" -->
        </div>
      </div>

      <div v-else class="grid grid-cols-2 gap-2 p-5">
        <template v-for="thread in threadsByUserId" :key="thread.id">
          <img
            v-for="img in thread.image || []"
            :key="img.id"
            :src="img.image"
            alt="media"
            class="w-full"
          />
        </template>
      </div>
    </div>
  </div>
</template>

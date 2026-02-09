<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import ListFollows from "../components/ListFollows.vue";
import { Icon } from "@iconify/vue";

const router = useRouter();
const route = useRoute();
const store = useStore();
const activeTab = ref("followers");

const followersList = computed(() => store.getters["followsModules/followers"]);
const followingList = computed(() => store.getters["followsModules/followings"]);
const currentUser = computed(() => store.getters["authModules/currentUser"]);
const userById = computed(() => store.getters["authModules/userById"]);

console.log(currentUser);


// Ambil userId dari query params, jika tidak ada gunakan currentUser
const targetUserId = computed(() => {
  return route.query.userId ? Number(route.query.userId) : currentUser.value?.id;
});

// Fungsi untuk fetch data followers dan following
const fetchFollowData = async () => {
  if (targetUserId.value) {
    // Jika melihat profile user lain, fetch data user tersebut
    if (route.query.userId) {
      await store.dispatch("authModules/getUserById", Number(route.query.userId));
    }

    await store.dispatch("followsModules/getFollower", targetUserId.value);
    await store.dispatch("followsModules/getFollowing", targetUserId.value);
  }
};

const displayedUser = computed(() => {
  // Jika ada userId di query, ambil dari userById
  if (route.query.userId) {
    return userById.value;
  }
  // Jika tidak ada, tampilkan currentUser
  return currentUser.value;
});

onMounted(() => {
  fetchFollowData();
});

// Watch jika userId berubah (ketika navigasi ke profile user lain)
watch(() => route.query.userId, () => {
  fetchFollowData();
});
</script>

<template>
  <div>
    <div class="pt-4 px-4 md:hidden flex items-center gap-2">
      <Icon icon="mdi:arrow-back" width="40" height="40" class="cursor-pointer" @click="router.push('/')"></Icon>
      <p class="text-lg font-semibold">
        @{{ displayedUser?.username || displayedUser?.user?.username }}
      </p>
    </div>
  
    <div class="grid grid-cols-2 justify-center items-center py-5 md:py-10">
      <p @click="activeTab = 'followers'"
        class="relative text-md md:text-xl cursor-pointer px-4 py-2 text-center border-b-2" :class="[
                'relative text-md md:text-xl cursor-pointer px-4 py-2 text-center border-b-2',
                activeTab === 'followers'
                  ? 'border-gray-500 font-bold text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-1 after:bg-green-500 after:rounded-lg'
                  : 'border-gray-500 font-normal',
              ]">
        Followers
      </p>
  
      <p @click="activeTab = 'following'"
        class="relative text-md md:text-xl cursor-pointer px-4 py-2 text-center border-b-2" :class="[
                'relative text-md md:text-xl cursor-pointer px-4 py-2 text-center border-b-2',
                activeTab === 'following'
                  ? 'border-gray-500 font-bold text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-1 after:bg-green-500 after:rounded-lg'
                  : 'border-gray-500 font-normal',
              ]">
        Following
      </p>
    </div>
  
    <div class="p-5">
      <div v-if="activeTab === 'followers'" class="flex flex-col gap-5">
        <div v-if="followersList.length > 0">
          <div v-for="(follower, index) in followersList" :key="index">
            <ListFollows :follows="follower.follower" />
          </div>
        </div>
        <div v-else class="text-center text-gray-400 py-10">
          No followers yet
        </div>
      </div>
  
      <div v-else class="flex flex-col gap-5">
        <div v-if="followingList.length > 0">
          <div v-for="(following, index) in followingList" :key="index">
            <ListFollows :follows="following.following" />
          </div>
        </div>
        <div v-else class="text-center text-gray-400 py-10">
          Not following anyone yet
        </div>
      </div>
    </div>
  </div>
</template>
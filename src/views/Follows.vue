<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import ListFollows from "../components/ListFollows.vue";

const store = useStore();
const activeTab = ref("followers");

const followersList = computed(() => store.getters["followsModules/followers"]);
const followingList = computed(
  () => store.getters["followsModules/followings"]
);

onMounted(() => {
  store.dispatch("followsModules/getFollowing");
  store.dispatch("followsModules/getFollower");
});
</script>

<template>
  <div>
    <div class="grid grid-cols-2 justify-center items-center py-10">
      <p
        @click="activeTab = 'followers'"
        class="relative text-xl cursor-pointer px-4 py-2 text-center border-b-2"
        :class="[
          'relative text-xl cursor-pointer px-4 py-2 text-center border-b-2',
          activeTab === 'followers'
            ? 'border-gray-500 font-bold text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-1 after:bg-green-500 after:rounded-lg'
            : 'border-gray-500 font-normal',
        ]"
      >
        Followers
      </p>

      <p
        @click="activeTab = 'following'"
        class="relative text-xl cursor-pointer px-4 py-2 text-center border-b-2"
        :class="[
          'relative text-xl cursor-pointer px-4 py-2 text-center border-b-2',
          activeTab === 'following'
            ? 'border-gray-500 font-bold text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-1 after:bg-green-500 after:rounded-lg'
            : 'border-gray-500 font-normal',
        ]"
      >
        Following
      </p>
    </div>

    <div class="p-5">
      <div v-if="activeTab === 'followers'" class="flex flex-col gap-5">
        <div v-for="(follower, index) in followersList" :key="index">
          <ListFollows :follows="follower" />
        </div>
      </div>

      <div v-else class="flex flex-col gap-5">
        <div v-for="(following, index) in followingList" :key="index">
          <ListFollows :follows="following" />
        </div>
      </div>
    </div>
  </div>
</template>

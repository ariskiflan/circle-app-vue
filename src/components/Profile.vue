<script setup>
import { computed } from "vue";
import { assets } from "../assets/assets";
import { useStore } from "vuex";

const store = useStore();

const user = computed(() => store.getters["authModules/currentUser"]);
</script>

<template>
  <div>
    <div class="bg-[#262626] p-5 rounded-2xl flex flex-col gap-5">
      <p class="text-2xl font-semibold">My Profile</p>

      <div class="relative">
        <div class=" w-full h-[100px] rounded-2xl bg-green-500"></div>
        <div
          class="w-20 h-20 rounded-full bg-gray-400 border-4 border-black absolute bottom-[-40px] left-[30px] object-cover"
        >
          <img :src="user.user.avatar || assets.Avatar" alt="" />
        </div>
      </div>

      <div class="flex justify-end">
        <button
          class="flex border-2 border-white py-2 px-4 rounded-2xl text-white font-semibold"
        >
          Edit Profile
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <p class="text-2xl font-semibold">{{ user.user.fullname }}</p>
        <span class="text-gray-400 font-semibold text-md">
          @{{ user.user.username }}
        </span>
        <p class="text-md font-normal">{{ user.user.bio }}</p>

        <div class="flex items-center gap-5">
          <p class="text-md font-semibold">
            {{ user.user.follower.length }}
            <span class="text-gray-400 font-normal">Followers</span>
          </p>
          <p class="text-md font-semibold">
            {{ user.user.following.length }}
            <span class="text-gray-400 font-normal">Followings</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { assets } from "../assets/assets";
import { useStore } from "vuex";
import { Icon } from '@iconify/vue';

const store = useStore();

const user = computed(() => store.getters["authModules/currentUser"]);
</script>

<template>
  <div>
    <div class="bg-[#262626] p-5 rounded-2xl flex flex-col gap-4">
      <p class="text-xl md:text-2xl font-semibold">My Profile</p>
  
      <div class="relative">
        <div class=" w-full h-[70px] md:h-[85px] rounded-2xl bg-green-500"></div>
        <div
          class="w-15 h-15 md:w-17 md:h-17 rounded-full bg-gray-400 border-4 border-black absolute bottom-[-30px] md:bottom-[-35px] left-[30px] object-cover">
          <img :src="user.user.avatar || assets.Avatar" alt="" />
        </div>
      </div>
  
      <div class="flex justify-end">
        <button
          class="flex border-2 border-white py-1 px-3 md:py-2 md:px-4 rounded-2xl text-white font-semibold text-sm lg:text-md">
          Edit Profile
        </button>
      </div>
  
      <div class="flex flex-col lg:gap-2 gap-1">
        <p class="text-md md:text-xl font-semibold">{{ user.user.fullname }}</p>
        <span class="text-gray-400 font-semibold text-md">
          @{{ user.user.username }}
        </span>
        <p class="text-md font-normal">{{ user.user.bio }}</p>
  
        <div class="flex items-center gap-5">
          <p class="text-sm md:text-md font-semibold">
            {{ user.user.follower.length }}
            <span class="text-gray-400 font-normal">Followers</span>
          </p>
          <p class="text-sm md:text-md font-semibold">
            {{ user.user.following.length }}
            <span class="text-gray-400 font-normal">Followings</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { assets } from "../assets/assets";
import { useStore } from "vuex";
import { Icon } from '@iconify/vue';
import ModalEditProfile from "../components/ModalEditProfile.vue";
import { updateProfile } from "../services/call/profile";
import { POSITION, TYPE, useToast } from "vue-toastification";
import { useRouter } from "vue-router";

const store = useStore();
const toast = useToast();
const router = useRouter();

const isEditModalOpen = ref(false);

const user = computed(() => store.getters["authModules/currentUser"]);

const openEditModal = () => {
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const handleSaveProfile = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    // Call API update profile
    await updateProfile(token, formData);

    // Refresh user data
    await store.dispatch("authModules/getProfile", token);

    toast("Update Profile Berhasil!", {
      timeout: 2000,
      position: POSITION.TOP_CENTER,
      type: TYPE.SUCCESS,
    });

  } catch (error) {
    console.error("Failed to update profile:", error);
  }
};

const handleFollows = () => {
  router.push("/follows");
};

</script>

<template>
  <div>
    <div class="bg-[#262626] p-5 rounded-2xl flex flex-col gap-4">
      <p class="text-xl md:text-2xl font-semibold">My Profile</p>
  
      <div class="relative">
        <div class="w-full h-[70px] md:h-[100px] rounded-2xl overflow-hidden">
          <img v-if="user?.cover" :src="user?.cover" alt="Cover" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full bg-green-500"></div>
        </div>
        <div
          class="w-15 h-15 md:w-20 md:h-20 rounded-full bg-gray-400 border-4 border-black absolute bottom-[-30px] md:bottom-[-40px] left-[30px] overflow-hidden">
          <img :src="user?.avatar || assets.Profile" alt="" class="object-cover w-full h-full" />
        </div>
      </div>
  
      <div class="flex justify-end">
        <button @click="openEditModal"
          class="flex border-2 border-white py-1 px-3 md:py-2 md:px-4 rounded-2xl text-white font-semibold text-sm lg:text-md">
          Edit Profile
        </button>
      </div>
  
      <div class="flex flex-col lg:gap-2 gap-1">
        <p class="text-md md:text-xl font-semibold">{{ user.user.fullname }}</p>
        <span class="text-gray-400 font-semibold text-md">
          @{{ user.user.username }}
        </span>
        <p class="text-sm md:text-md font-normal">{{ user.bio }}</p>
  
        <div class="flex items-center gap-5">
          <p class="text-sm md:text-md font-semibold" @click="handleFollows">
            {{ user.user.follower.length }}
            <span class="text-gray-400 font-normal">Followers</span>
          </p>
          <p class="text-sm md:text-md font-semibold" @click="handleFollows">
            {{ user.user.following.length }}
            <span class="text-gray-400 font-normal">Followings</span>
          </p>
        </div>
      </div>
    </div>
  
    <ModalEditProfile :isOpen="isEditModalOpen" :user="user" @close="closeEditModal" @save="handleSaveProfile" />
  </div>
</template>

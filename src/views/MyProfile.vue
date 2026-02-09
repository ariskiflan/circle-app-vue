<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { RouterLink } from "vue-router";
import Threads from "../components/Threads.vue";
import { assets } from "../assets/assets";
import { getThreadByToken } from "../services/call/thread";
import { Icon } from '@iconify/vue';
import { useRouter } from "vue-router";
import ModalEditProfile from "../components/ModalEditProfile.vue";
import ImagePreviewModal from "../components/ImagePreviewModal.vue";
import { updateProfile } from "../services/call/profile";
import { POSITION, TYPE, useToast } from "vue-toastification";

const router = useRouter();
const store = useStore();
const toast = useToast();
const user = computed(() => store.getters["authModules/currentUser"]);
const threadsByUserToken = computed(
  () => store.getters["threadModules/threadByUserToken"]
);

const activeTab = ref("all");
const isEditModalOpen = ref(false);
const showImageModal = ref(false);
const selectedImage = ref(null);

const handleFollows = () => {
  router.push("/follows");
};

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

    // Success notification (optional)
  } catch (error) {
    console.error("Failed to update profile:", error);
  }
};

const openPreview = (src) => {
  selectedImage.value = src;
  showImageModal.value = true;
};

onMounted(() => {
  store.dispatch("threadModules/getThreadByUserToken");
});
</script>

<template>
  <div>
    <div class="sticky top-0 bg-[#1d1d1d] z-10">
      <div class="px-5 py-10 flex flex-col gap-3 md:gap-5">
        <div class="flex items-center gap-3">
          <Icon icon="mdi:arrow-back" width="40" height="40" class="cursor-pointer" @click="router.push('/')"></Icon>
  
          <p class="text-md md:text-2xl font-semibold">{{ user?.user?.fullname }}</p>
        </div>
  
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
  
        <div class="flex justify-end mt-5 md:mt-10">
          <button @click="openEditModal"
            class="flex border-2 border-white py-1 px-3 md:py-2 md:px-4 rounded-2xl text-white font-semibold text-md md:text-xl hover:bg-white hover:text-black transition-colors">
            Edit Profile
          </button>
        </div>
  
        <div class="flex flex-col gap-2">
          <p class="text-xl md:text-2xl font-semibold">{{ user?.user?.fullname }}</p>
          <span class="text-gray-400 font-semibold text-md">
            @{{ user?.user?.username }}
          </span>
          <p class="text-sm md:text-md font-normal">{{ user?.bio }}</p>
          <div class="flex items-center gap-5">
            <p class="text-sm md:text-md font-semibold cursor-pointer hover:underline" @click="handleFollows">
              {{ user?.user?.following?.length || 0 }}
              <span class="text-gray-400 font-normal text-sm md:text-md">Following</span>
            </p>
  
            <p class="text-sm md:text-md font-semibold cursor-pointer hover:underline" @click="handleFollows">
              {{ user?.user?.follower?.length || 0 }}
              <span class="text-gray-400 font-normal text-sm md:text-md">Followers</span>
            </p>
          </div>
        </div>
      </div>
  
      <div class="grid grid-cols-2 justify-center items-center">
        <p @click="activeTab = 'all'" :class="[
              'relative text-md md:text-xl cursor-pointer px-4 py-2 text-center border-b-2',
              activeTab === 'all'
                ? 'border-gray-500 font-bold text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-1 after:bg-green-500 after:rounded-lg'
                : 'border-gray-500 font-normal',
            ]">
          All Post
        </p>
        <p @click="activeTab = 'media'" :class="[
              'relative text-md md:text-xl cursor-pointer px-4 py-2 text-center border-b-2',
              activeTab === 'media'
                ? 'border-gray-500 font-bold text-white after:content-[\'\'] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-[80%] after:h-1 after:bg-green-500 after:rounded-lg'
                : 'border-gray-500 font-normal',
            ]">
          Media
        </p>
      </div>
    </div>
  
    <div>
      <template v-if="activeTab === 'all'">
        <div v-for="item in threadsByUserToken" :key="item.id">
          <Threads :thread="item" />
        </div>
      </template>
  
      <template v-else>
        <div class="grid grid-cols-2 gap-2 p-5">
          <template v-for="thread in threadsByUserToken" :key="thread.id">
            <img v-for="img in thread.image || []" :key="img.id" :src="img.image" alt="media"
              class="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
              @click="openPreview(img.image)" />
          </template>
        </div>
      </template>
    </div>
  
    <!-- Edit Profile Modal -->
    <ModalEditProfile :isOpen="isEditModalOpen" :user="user" @close="closeEditModal" @save="handleSaveProfile" />
  
    <!-- Image Preview Modal -->
    <ImagePreviewModal v-model="showImageModal" :image="selectedImage" />
  </div>
</template>
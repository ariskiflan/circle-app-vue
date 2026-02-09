<script setup>
import Threads from "../components/Threads.vue";
import AddThread from "../components/AddThread.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import Sidebar from '../components/Sidebar.vue';
import { ref } from "vue";
import Rightbar from '../components/Rightbar.vue'
import { assets } from "../assets/assets";
import { RouterLink, useRouter } from "vue-router";
import ModalAddThread from "../components/ModalAddThread.vue";

const store = useStore();
const router = useRouter();
const showPostModal = ref(false);

const threads = computed(() => store.getters["threadModules/threads"]);

const getThreads = async () => {
  await store.dispatch("threadModules/getThreads");
};

const showSidebar = ref(false);

const openSidebar = () => {
  showSidebar.value = true;
};

const closeSidebar = () => {
  showSidebar.value = false;
};

const handleLogout = () => {
  store.commit("authModules/LOGOUT");
  router.push("/login");
};

onMounted(async () => {
  getThreads();
});
</script>

<template>
  <div>
    <div class="w-full">
      <div class="sticky top-0 pt-10 z-10 bg-[#1d1d1d]">
  
        <div class="flex justify-between items-center mb-10 px-5">
          <h2 class="text-white md:text-5xl text-4xl font-bold">Home</h2>
          <div class="xl:hidden">
            <Icon icon="mdi:user-circle-outline" width="40" height="40" class="cursor-pointer" @click="openSidebar">
            </Icon>
          </div>
  
          <!-- Overlay -->
          <div v-if="showSidebar" class="fixed inset-0 bg-black/50 z-40 xl:hidden" @click="closeSidebar"></div>
  
          <!-- Sidebar Drawer -->
          <transition name="slide">
            <div v-if="showSidebar" class="fixed top-0 right-0 h-screen w- md:w-96 bg-black z-50 xl:hidden">
              <Rightbar />
            </div>
          </transition>
  
        </div>
        <AddThread :getThread="getThreads" />
      </div>
  
      <div>
        <div v-for="item in threads" :key="item.id">
          <Threads :thread="item" />
          <!-- :handleGetThreads="getThreads" -->
        </div>
      </div>
    </div>
  
    <div class="bg-[#04A51E] w-[90%] rounded-3xl fixed bottom-4 left-1/2 -translate-x-1/2
               block md:hidden">
      <div class="flex items-center justify-between px-5 py-2">
        <RouterLink to="/">
          <img class="w-8" :src="assets.Home" alt="" />
        </RouterLink>
  
        <RouterLink to="/search">
          <img class="w-8" :src="assets.UserSearch" alt="" />
        </RouterLink>
  
        <div>
          <Icon icon="mdi:add-circle" width="40" height="40" class="cursor-pointer" @click="showPostModal = true" />
        </div>
  
        <!-- MODAL -->
        <ModalAddThread v-model="showPostModal" />
  
        <RouterLink to="/follows">
          <img class="w-8" :src="assets.Like" alt="" />
        </RouterLink>
  
        <div @click="handleLogout">
          <img class="w-8" :src="assets.Logout" alt="" />
        </div>
      </div>
    </div>
  
  </div>
</template>

<style scoped>
.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-active {
  transition: transform 0.3s ease;
}

.slide-leave-to {
  transform: translateX(100%);
}

.slide-leave-active {
  transition: transform 0.3s ease;
}
</style>

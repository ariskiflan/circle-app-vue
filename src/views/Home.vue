<script setup>
import Threads from "../components/Threads.vue";
import AddThread from "../components/AddThread.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Icon } from "@iconify/vue";
import Sidebar from '../components/Sidebar.vue';
import { ref } from "vue";

const store = useStore();

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
        <div class="md:hidden">
          <Icon icon="mdi:hamburger-menu" 
          width="40" 
          height="40" 
          class="cursor-pointer"
          @click="openSidebar"></Icon>
        </div>

        <!-- Overlay -->
        <div
          v-if="showSidebar"
          class="fixed inset-0 bg-black/50 z-40 md:hidden"
          @click="closeSidebar"
        ></div>

        <!-- Sidebar Drawer -->
        <transition name="slide">
          <div
            v-if="showSidebar"
            class="fixed top-0 left-0 h-screen w-64 bg-black z-50 md:hidden"
          >
            <Sidebar />
          </div>
        </transition>

        </div>
        <AddThread :getThread="getThreads" />
      </div>

      <div>
        <div v-for="item in threads" :key="item.id">
          <Threads :thread="item" :handleGetThreads="getThreads" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-active {
  transition: transform 0.3s ease;
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-leave-active {
  transition: transform 0.3s ease;
}
</style>

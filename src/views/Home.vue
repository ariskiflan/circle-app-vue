<script setup>
import Threads from "../components/Threads.vue";
import AddThread from "../components/AddThread.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const threads = computed(() => store.getters["threadModules/threads"]);

const getThreads = async () => {
  await store.dispatch("threadModules/getThreads");
};

onMounted(async () => {
  getThreads();
});
</script>

<template>
  <div>
    <div class="w-full">
      <div class="sticky top-0 pt-10 z-10 bg-[#1d1d1d]">
        <h2 class="text-white text-5xl font-bold px-5 mb-10">Home</h2>
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

<style scoped></style>

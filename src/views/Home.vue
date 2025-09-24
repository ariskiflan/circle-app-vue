<script setup>
import Threads from "../components/Threads.vue";
import AddThread from "../components/AddThread.vue";
import { ref, onMounted } from "vue";
import { getThreads } from "../services/call/thread";

const threads = ref([]);

const handleGetThreads = async () => {
  try {
    const res = await getThreads();
    threads.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  handleGetThreads();
});
</script>

<template>
  <div>
    <div class="w-full">
      <div class="sticky top-0 pt-10 z-10 bg-[#1d1d1d]">
        <h2 class="text-white text-5xl font-bold px-5 mb-10">Home</h2>
        <AddThread :get-thread="handleGetThreads" />
      </div>

      <div>
        <div v-for="item in threads" :key="item.id">
          <Threads :thread="item" :handle-get-threads="handleGetThreads" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

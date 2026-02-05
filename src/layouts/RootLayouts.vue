<script setup>
import Sidebar from "../components/Sidebar.vue";
import Rightbar from "../components/Rightbar.vue";
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-[35%_65%] xl:grid-cols-[20%_50%_30%]">

    <!-- Sidebar -->
    <div class="hidden md:block sticky top-0 h-screen">
      <Sidebar />
    </div>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Rightbar -->
    <div class="hidden lg:block sticky top-0 h-screen">
      <Rightbar />
    </div>

  </div>
</template>



<style scoped></style>

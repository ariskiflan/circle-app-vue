<script setup>
import Sidebar from "../components/Sidebar.vue";
import Rightbar from "../components/Rightbar.vue";
</script>

<template>
  <div>
    <div className="grid grid-cols-[20%_50%_30%]">
      <div className=" sticky top-0 h-screen">
        <Sidebar />
      </div>

      <main className="">
        <router-view />
      </main>

      <div className=" sticky top-0 h-screen">
        <Rightbar />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import Profile from "./Profile.vue";
import Suggested from "./Suggested.vue";
import Footer from "./Footer.vue";
</script>

<template>
  <div>
    <div className="text-white h-screen border-l-2 border-gray-500 p-10">
      <div className="flex flex-col gap-5">
        <Profile />
        <Suggested />
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

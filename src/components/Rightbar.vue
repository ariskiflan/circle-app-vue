<script setup>
import Profile from "./Profile.vue";
import Suggested from "./Suggested.vue";
import Footer from "./Footer.vue";
import { useRoute } from "vue-router";

const router = useRoute();
</script>

<template>
  <div class="hidden lg:block">
    <div className="text-white h-screen border-l-2 border-gray-500 p-10">
      <div className="flex flex-col gap-5">
        <div v-if="router.path != '/my-profile'">
          <Profile />
        </div>
        <Suggested />
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>

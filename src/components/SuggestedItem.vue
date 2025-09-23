<script setup>
import { assets } from "../assets/assets";
import ButtonFollows from "./ButtonFollows.vue";
</script>

<template>
  <div>
    <div className="flex items-center gap-5 justify-between">
      <div className="flex items-center gap-5">
        <img :src="assets.Avatar" alt="" className="w-10" />

        <div>
          <p className="text-md font-semibold">asasa</p>
          <span className="text-gray-400 font-normal text-md">
            @asasa
          </span>
        </div>
      </div>

      <div>
        <ButtonFollows />
      </div>
    </div>
  </div>
</template>

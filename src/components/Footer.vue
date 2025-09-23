<script setup>
import { assets } from "../assets/assets";
</script>

<template>
  <div>
    <div className="bg-[#262626] p-5 rounded-2xl flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold">
          Developed by <span className="font-bold">@arskflnm</span>
        </p>
        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
        <div className="flex gap-3 items-center">
          <div>1</div>
          <div>
            2
          </div>
          <div>3</div>
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="flex items-center gap-2 text-sm">
          Powered by
          <img :src="assets.FooterLogo" alt="" className="w-7" /> Dumbways
          Indonesia
        </p>

        <div className="w-2 h-2 rounded-full bg-gray-400"></div>

        <span>2025</span>
      </div>
    </div>
  </div>
</template>

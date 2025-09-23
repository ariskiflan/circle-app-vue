<script setup>
import SuggestedItem from "./SuggestedItem.vue";
</script>

<template>
  <div>
    <div className="bg-[#262626] p-5 rounded-2xl flex flex-col gap-5">
      <p className="text-2xl font-semibold">Suggested For you</p>

      <div
        className="flex flex-col gap-5 h-[190px] overflow-auto hide-scrollbar"
      >
        <div>
          <SuggestedItem />
        </div>
      </div>
    </div>
  </div>
</template>

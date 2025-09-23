<script setup>
import { assets } from "../assets/assets";
</script>

<template>
  <div>
    <div class="border-b-2 border-gray-500 p-5 w-full flex flex-col gap-4">
      <div class="flex items-center gap-5 w-full">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img
            :src="assets.Profile"
            alt="avatar"
            class="object-cover w-full
          h-full"
          />
        </div>

        <div class="flex-1 flex items-center gap-3">
          <!-- Input teks -->
          <input
            type="text"
            class="flex-1 text-xl text-white bg-transparent px-4 py-2 outline-none"
            name="content"
          />

          <!-- Upload gambar -->
          <button type="button">
            <input
              ref="inputRef"
              type="file"
              name="image"
              multiple
              class="hidden"
            />
            <img :src="assets.GaleryAdd" alt="" class="w-8 cursor-pointer" />
          </button>

          <!-- Tombol Post -->
          <button
            type="submit"
            class="bg-[#04A51E] text-white px-6 py-2 rounded-3xl text-sm font-medium
                 hover:bg-transparent transition-all duration-100 ease-in-out
                 hover:[box-shadow:inset_0_0_0_2px_white]"
          >
            Post
          </button>
        </div>
      </div>

      <!-- Preview gambar -->
      <!-- <div v-if="preview?.length" class="grid grid-cols-2 gap-2">
        <img
          v-for="(item, i) in preview"
          :key="i"
          :src="item"
          class="w-full"
          alt="preview"
        />
      </div> -->
    </div>
  </div>
</template>

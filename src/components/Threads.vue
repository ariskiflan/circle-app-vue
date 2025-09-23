<script setup>
import { assets } from "../assets/assets";
</script>

<template>
  <div>
    <div class="border-b-2 border-gray-500">
      <div class="p-5">
        <div class="flex gap-5 relative">
          <div class="w-10 h-10 rounded-full overflow-hidden">
            <img
              class="object-cover w-full h-full"
              :src="assets.Profile"
              alt="avatar"
            />
          </div>

          <div class="flex flex-col gap-3">
            <!-- nama + username + waktu -->
            <div class="flex gap-3 items-center">
              <p class="font-semibold text-xl">asasasasa</p>
              <p class="text-gray-400 text-md font-semibold">
                @asasaas
              </p>
              <div class="w-2 h-2 rounded-full bg-gray-400"></div>
              <p class="text-gray-400 text-md font-semibold">
                asasasasas
              </p>
            </div>

            <!-- konten & gambar -->
            <div class="flex flex-col gap-3">
              <p class="text-md font-normal line-clamp-5">asasasasasas</p>

              <!-- <div class="grid grid-cols-2 gap-2" v-if="image?.length">
                <div v-for="(item, index) in image" :key="index">
                  <img :src="item.image" alt="" />
                </div>
              </div> -->
            </div>

            <!-- like & reply -->
            <div class="flex gap-5 items-center">
              <div class="flex gap-2 items-center">
                <!-- <Like
                  :threadId="Number(id)"
                  :handleGetThreads="handleGetThreads"
                /> -->

                <img :src="assets.Like" class="w-6" alt="" />
                <span class="text-md text-gray-400 font-medium">
                  asasasasasas
                </span>
              </div>

              <div class="flex gap-2 items-center">
                <img :src="assets.Reply" class="w-6" alt="" />
                <span class="text-md text-gray-400 font-medium">
                  asasas Replies
                </span>
              </div>
            </div>
          </div>

          <!-- tombol delete hanya jika userId cocok -->
          <!-- <div
            v-if="userId === user?.userId"
            class="absolute top-0 right-0 cursor-pointer"
          >
            <RiDeleteBin6Line :size="24" />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

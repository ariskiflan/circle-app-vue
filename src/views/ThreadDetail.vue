<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { assets } from "../assets/assets";
import Like from "../components/Like.vue";
import AddThread from "../components/AddThread.vue";
import Threads from "../components/Threads.vue";
import formatTime from "../utils/formatTime";
import { Icon } from '@iconify/vue';
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const threadDetail = computed(
  () => store.getters["threadModules/threadDetail"]
);
const replies = computed(
  () => store.getters["threadModules/replies"]
);

onMounted(() => {
  store.dispatch("threadModules/getThreadDetail", route.params.id);
});
</script>

<template>
  <div>
    <div class="px-5 pt-10 pb-5 md:pb-0 md-pt-0 md:py-10">
      <div class="flex gap-3 items-center">
        <Icon icon="mdi:arrow-back" 
          width="40" 
          height="40" 
          class="cursor-pointer"
          @click="router.push('/')"
       ></Icon>
        <p class="text-xl md:text-3xl font-semibold">Status</p>
      </div>
    </div>

    <div class="border-b-2 border-gray-500">
      <div class="p-5">
        <div class="flex gap-5">
          <img
            :src="assets.Profile"
            alt="avatar"
            class="w-10 h-10 rounded-full object-cover"
          />

          <div class="flex flex-col gap-3">
            <div class="flex gap-3 items-center">
              <p class="font-bold text-md md:text-xl">
                {{ threadDetail?.author?.fullname }}
              </p>
              <p class="text-gray-400 text-md font-semibold">
                {{ threadDetail?.author?.username }}
              </p>
              <div class="w-1 h-1 md:w-2 md:h-2 rounded-full bg-gray-400"></div>
              <p class="text-gray-400 text-sm md:text-md font-semibold">
                {{
                  threadDetail?.posted_at && formatTime(threadDetail.posted_at)
                }}
              </p>
            </div>

            <div class="flex flex-col gap-3">
              <p class="text-md font-normal line-clamp-5">
                {{ threadDetail?.content }}
              </p>

              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="(item, index) in threadDetail?.image || []"
                  :key="index"
                >
                  <img :src="item.image" alt="" />
                </div>
              </div>
            </div>

            <div class="flex gap-5 items-center">
              <div class="flex gap-2 items-center">
                <Like
                  :threadId="id"
                />
                  <!-- :handleGetThreads="handleGetThreadDetail" -->

                <span class="text-sm md:text-md text-gray-400 font-medium">
                  {{ threadDetail?._count?.like }} Likes
                </span>
              </div>

              <div class="flex gap-2 items-center">
                <img :src="assets.Reply" class="w-5 md:w-6" alt="" />
                <span class="text-sm md:text-md text-gray-400 font-medium">
                  {{ threadDetail?._count?.replies }} Replies
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddThread  :threadId="id" />
    <!-- :getThread="handleGetThreadDetail" -->

    <div>
      <div v-for="item in replies" :key="item.id">
        <Threads :thread="item"  />
        <!-- :handleGetThreads="handleGetThreadDetail" -->
      </div>
    </div>
  </div>
</template>

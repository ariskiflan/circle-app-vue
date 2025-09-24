<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { assets } from "../assets/assets";
import Like from "../components/Like.vue";
import AddThread from "../components/AddThread.vue";
import Threads from "../components/Threads.vue";
import { getThreadById, getReplies } from "../services/call/thread";
import formatTime from "../utils/formatTime";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const threadDetail = ref(null);
const replies = ref([]);

const handleGetThreadDetail = async () => {
  try {
    const res = await getThreadById(id);
    const resReplies = await getReplies(id);

    threadDetail.value = res.data;
    replies.value = resReplies.data;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  handleGetThreadDetail();
});
</script>

<template>
  <div>
    <div class="px-5 py-10">
      <div class="flex gap-3 items-center">
        <img
          class="w-10 cursor-pointer"
          :src="assets.Back"
          alt="back"
          @click="router.push('/')"
        />
        <p class="text-3xl font-semibold">Status</p>
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
              <p class="font-bold text-xl">
                {{ threadDetail?.author?.fullname }}
              </p>
              <p class="text-gray-400 text-md font-semibold">
                {{ threadDetail?.author?.username }}
              </p>
              <div class="w-2 h-2 rounded-full bg-gray-400"></div>
              <p class="text-gray-400 text-md font-semibold">
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
                  :handleGetThreads="handleGetThreadDetail"
                />
                <span class="text-md text-gray-400 font-medium">
                  {{ threadDetail?._count?.like }}
                </span>
              </div>

              <div class="flex gap-2 items-center">
                <img :src="assets.Reply" class="w-6" alt="" />
                <span class="text-md text-gray-400 font-medium">
                  {{ threadDetail?._count?.replies }} Replies
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddThread :getThread="handleGetThreadDetail" :threadId="id" />

    <div>
      <div v-for="item in replies" :key="item.id">
        <Threads :thread="item" :handleGetThreads="handleGetThreadDetail" />
      </div>
    </div>
  </div>
</template>

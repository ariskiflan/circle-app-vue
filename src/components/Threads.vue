<script setup>
import { assets } from "../assets/assets";
import formatTime from "../utils/formatTime";
import { Icon } from "@iconify/vue";
import Like from "./Like.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { deleteThread } from "../services/call/thread";
import { POSITION, TYPE, useToast } from "vue-toastification";
import { ref } from "vue";
import ImagePreviewModal from "../components/ImagePreviewModal.vue";

const { thread, handleGetThreads } = defineProps({
  thread: {
    type: Object,
    required: true,
  },
  // handleGetThreads: {
  //   type: Function,
  // },
});

const store = useStore();
const toast = useToast();
const user = computed(() => store.getters["authModules/currentUser"]);
const showDeleteModal = ref(false);
const showImageModal = ref(false);
const selectedImage = ref(null);

const handleDeletethread = async () => {
  try {
    await deleteThread(thread.id);
    showDeleteModal.value = false;
    // await handleGetThreads();
    toast("Thread berhasil dihapus", {
      timeout: 2000,
      position: POSITION.TOP_CENTER,
      type: TYPE.SUCCESS,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleRedirectProfile = () => {
  return user.value.id != thread.author.id
    ? `/profile/${thread.author.id}`
    : "/my-profile";
};

const openPreview = (src) => {
  selectedImage.value = src;
  showImageModal.value = true;
};
</script>

<template>
  <div>
    <div class="border-b-2 border-gray-500">
      <div class="p-5">
        <div class="flex gap-3 md:gap-5 relative">
          <RouterLink :to="handleRedirectProfile()">
            <div class="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden">
              <img class="object-cover w-full h-full" :src="thread.author.profile.avatar || assets.Profile"
                alt="avatar" />
            </div>
          </RouterLink>
  
          <div class="flex flex-col gap-3">
            <div class="flex gap-3 items-center">
              <p class="font-semibold text-md md:text-xl">
                {{ thread.author.fullname }}
              </p>
              <p class="text-gray-400 text-md font-semibold">
                @{{ thread.author.username }}
              </p>
              <div class="w-1 h-1 md:w-2 md:h-2 rounded-full bg-gray-400"></div>
              <p class="text-gray-400 text-sm md:text-md font-semibold">
                {{ formatTime(thread.posted_at) }}
              </p>
            </div>
  
            <div class="flex flex-col gap-3">
              <p class="text-md font-normal line-clamp-5">
                {{ thread.content }}
              </p>
  
              <div class="grid grid-cols-2 gap-2" v-if="thread.image?.length">
                <div v-for="(item, index) in thread.image" :key="index">
                  <img :src="item.image" alt="" @click="openPreview(item.image)" />
                </div>
  
                <ImagePreviewModal v-model="showImageModal" :image="selectedImage" />
              </div>
            </div>
  
            <div class="flex gap-5 items-center">
              <div class="flex gap-2 items-center">
                <Like :threadId="Number(thread.id)" />
                <!-- :handleGetThreads="handleGetThreads" -->
                <span class="text-sm md:text-md text-gray-400 font-medium">
                  {{ thread._count.like }} Likes
                </span>
              </div>
  
              <div class="flex gap-2 items-center">
                <router-link :to="`/thread-detail/${thread.id}`" className="flex gap-2 items-center">
                  <img :src="assets.Reply" class="w-5 md:w-6" alt="" />
                  <span class="text-sm md:text-md text-gray-400 font-medium">
                    {{ thread._count.replies }} Replies
                  </span>
                </router-link>
              </div>
            </div>
          </div>
  
          <div v-if="user.userId === thread.userId" class="absolute top-0 right-0 cursor-pointer"
            @click="showDeleteModal = true">
            <Icon icon="material-symbols:delete-outline" width="24" height="24" />
          </div>
  
          <Teleport to="body">
            <Transition name="fade">
              <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center">
                <!-- overlay -->
                <div class="absolute inset-0 bg-black/60" @click="showDeleteModal = false"></div>
  
                <!-- modal -->
                <Transition name="scale">
                  <div v-if="showDeleteModal" class="relative bg-[#1e1e1e] w-[90%] max-w-sm
                     rounded-2xl p-5 z-10">
                    <h3 class="text-white font-semibold text-lg mb-2">
                      Delete thread?
                    </h3>
  
                    <p class="text-gray-400 text-sm mb-6">
                      This action cannot be undone.
                    </p>
  
                    <div class="flex justify-end gap-3">
                      <button @click="showDeleteModal = false" class="px-4 py-2 rounded-full text-sm
                         hover:bg-white/10">
                        Cancel
                      </button>
  
                      <button @click="handleDeleteThread" class="bg-red-600 px-4 py-2 rounded-full
                         text-sm font-medium hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>
            </Transition>
          </Teleport>
  
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.scale-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

.scale-leave-to {
  transform: scale(0.95);
  opacity: 0;
}
</style>

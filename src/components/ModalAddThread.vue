<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { createThreads } from "../services/call/thread";
import { assets } from "../assets/assets";
import { Icon } from "@iconify/vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  threadId: {
    type: Number,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emit("update:modelValue", false);
};

const postThreads = ref({
  content: "",
  image: null,
  threadId: null,
});

const preview = ref([]);
const inputRef = ref(null);

const route = useRoute();
const store = useStore();
const user = computed(() => store.getters["authModules/currentUser"]);

const handlePostThreads = async () => {
  try {
    if (props.threadId) {
      postThreads.value.threadId = props.threadId;
    }

    if (postThreads.value.content || postThreads.value.image) {
      await createThreads(postThreads.value);
      await store.dispatch("threadModules/getThreads");
    }

    postThreads.value = { content: "", image: null, threadId: null };
    preview.value = [];
    closeModal();
  } catch (error) {
    console.log(error);
  }
};

const handleImageChange = (e) => {
  const files = e.target.files;
  if (!files?.length) return;

  const fileList = Array.from(files);
  preview.value = fileList.map((file) => URL.createObjectURL(file));
  postThreads.value.image = files;
};

const handleImage = () => {
  inputRef.value?.click();
};

/* reset state saat modal ditutup */
watch(
  () => props.modelValue,
  (val) => {
    if (!val) {
      postThreads.value = { content: "", image: null, threadId: null };
      preview.value = [];
    }
  }
);
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="modelValue" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                <!-- Overlay -->
                <div class="absolute inset-0 bg-black/60" @click="closeModal"></div>
    
                <!-- Modal -->
                <div class="relative bg-[#1e1e1e] w-full sm:max-w-xl
                     p-4 sm:p-6 z-10 animate-slide-up">
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-white font-semibold text-lg">
                            {{ route.path === "/" ? "Create Post" : "Reply" }}
                        </h2>
    
                        <div class="xl:hidden" @click="closeModal">
                            <Icon icon="mdi:close" width="24" height="24"></Icon>
                        </div>
                    </div>
    
                    <!-- Content -->
                    <div class="flex gap-4">
                        <div class="hidden sm:block w-10 h-10 rounded-full overflow-hidden">
                            <img :src="user?.avatar || assets.Profile" alt="avatar" />
                        </div>
    
                        <div class="flex-1 flex flex-col gap-4">
                            <input v-model="postThreads.content" type="text"
                                class="w-full text-white bg-transparent text-base outline-none" :placeholder="
                      route.path === '/' ? `What's on your mind?` : 'Type your reply'
                    " />
    
                            <!-- Preview -->
                            <div v-if="preview.length" class="grid grid-cols-2 gap-2">
                                <img v-for="(item, index) in preview" :key="index" :src="item" class="w-full rounded-lg" />
                            </div>
    
                            <!-- Actions -->
                            <div class="flex justify-between items-center">
                                <button @click="handleImage" type="button">
                                    <input multiple ref="inputRef" type="file" class="hidden" @change="handleImageChange" />
                                    <img :src="assets.GaleryAdd" class="w-7 cursor-pointer" />
                                </button>
    
                                <button @click="handlePostThreads" class="bg-[#04A51E] px-5 py-2 rounded-full text-sm font-medium
                             hover:bg-transparent transition
                             hover:[box-shadow:inset_0_0_0_2px_white]">
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
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

@keyframes slide-up {
    from {
        transform: translateY(100%);
    }

    to {
        transform: translateY(0);
    }
}

.animate-slide-up {
    animation: slide-up 0.25s ease-out;
}
</style>

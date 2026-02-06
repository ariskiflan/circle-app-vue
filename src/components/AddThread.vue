<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex"; // kalau pakai Vuex
import { createThreads } from "../services/call/thread";
import { assets } from "../assets/assets";

const props = defineProps({
  // getThread: {
  //   type: Function,
  // },
  threadId: {
    type: Number,
    default: null,
  },
});

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

const handlePostThreads = async (e) => {
  e.preventDefault();
  try {
    if (props.threadId) {
      postThreads.value.threadId = props.threadId;
    }

    if (postThreads.value.content || postThreads.value.image) {
      await createThreads(postThreads.value);
      // props.getThread();
      await store.dispatch("threadModules/getThreads");
    }

    postThreads.value = { content: "", image: null, threadId: null };
    preview.value = [];
  } catch (error) {
    console.log(error);
  }
};

const handleImageChange = (e) => {
  const files = e.target.files;
  if (!files || !files.length) return;

  const fileList = Array.from(files);
  preview.value = fileList.map((file) => URL.createObjectURL(file));
  postThreads.value.image = files;
};

const handleImage = () => {
  inputRef.value?.click();
};
</script>

<template>
  <div class="border-b-2 border-gray-500 sm:p-5 p-3 w-full flex flex-col gap-4">
    <div class="flex items-center gap-5 w-full">
      <!-- <router-link :to="`/profile/${user?.userId}`"> -->
      <div class="hidden sm:block w-10 h-10  rounded-full object-cover overflow-hidden">
        <img :src="user?.avatar || assets.Profile" alt="avatar" />
      </div>

      <!-- </router-link> -->

      <div class="flex-1 flex items-center gap-3">
        <input
          v-model="postThreads.content"
          type="text"
          class="flex-1 sm:text-xl text-md text-white bg-transparent px-4 py-2 outline-none"
          :placeholder="
            route.path === '/' ? `What's on your mind?` : 'Type Your Reply'
          "
        />

        <button @click="handleImage" type="button">
          <!-- ✅ File input tidak bisa langsung v-model,
               tapi kita bisa tetap simpan ke postThreads.image via @change -->
          <input
            multiple
            name="image"
            ref="inputRef"
            type="file"
            class="hidden"
            @change="handleImageChange"
          />
          <img :src="assets.GaleryAdd" alt="" class="w-6 sm:w-8 cursor-pointer" />
        </button>

        <button
          @click="handlePostThreads"
          type="submit"
          class="bg-[#04A51E] text-white px-3 py-1 sm:px-6 sm:py-2 rounded-3xl text-sm font-medium hover:bg-transparent transition-all duration-100 ease-in-out hover:[box-shadow:inset_0_0_0_2px_white] cursor-pointer"
        >
          Post
        </button>
      </div>
    </div>

    <div v-if="preview.length" class="grid grid-cols-2 gap-2 mt-2">
      <div v-for="(item, index) in preview" :key="index">
        <img class="w-full" :src="item" alt="preview" />
      </div>
    </div>
  </div>
</template>

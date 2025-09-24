<script setup>
import { ref, onMounted } from "vue";
import { createLike, getCurrentLike } from "../services/call/like";
import { Icon } from "@iconify/vue";

const props = defineProps({
  threadId: {
    type: Number,
    required: true,
  },
  handleGetThreads: {
    type: Function,
    required: true,
  },
});

const like = ref(false);

const getLikes = async () => {
  try {
    const res = await getCurrentLike(props.threadId);
    like.value = res.data.like !== null;
    props.handleGetThreads();
  } catch (err) {
    console.error(err);
  }
};

const handleLike = async () => {
  try {
    await createLike(props.threadId);
    await getLikes();
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  getLikes();
});
</script>

<template>
  <div @click="handleLike" class="cursor-pointer">
    <Icon
      :icon="like ? 'fa-solid:heart' : 'fa-regular:heart'"
      :color="like ? 'red' : '#909090'"
      width="20"
      height="20"
    />
  </div>
</template>

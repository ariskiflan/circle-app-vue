<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { createFollow } from "../services/call/follow";

const props = defineProps({
  follows: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const route = useRoute();
const isFollowing = ref(false);

const currentUser = computed(() => store.getters["authModules/currentUser"]);
const targetUserId = computed(() => {
  return route.query.userId ? Number(route.query.userId) : currentUser.value?.id;
});


const handleCreateFollows = async () => {
  try {
    const token = localStorage.getItem("token");
    await createFollow(Number(props.follows.id));
    isFollowing.value = !isFollowing.value;

    await store.dispatch("authModules/getProfile", token);
    await store.dispatch("authModules/getUserById", props.follows.id);

    if (targetUserId.value) {
      store.dispatch("followsModules/getFollower", targetUserId.value);
      store.dispatch("followsModules/getFollowing", targetUserId.value);
    }

  } catch (err) {
    console.error(err);
  }
};

const checkIsFollowing = () => {
  try {
    // ✅ BENAR: Cek di user.following untuk followingId
    const followings = currentUser.value?.user?.following?.find(
      (f) => f.followingId === props.follows.id
    );
    isFollowing.value = !!followings;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  checkIsFollowing();
});
watch([currentUser, () => props.follows.id], checkIsFollowing);
</script>

<template>
  <button @click="handleCreateFollows"
    class="flex border-2 border-white py-1 px-3 md:py-2 md:px-4 rounded-2xl text-white font-semibold cursor-pointer text-sm xl:text-md">
    {{ isFollowing ? "Unfollow" : "Follow" }}
  </button>
</template>

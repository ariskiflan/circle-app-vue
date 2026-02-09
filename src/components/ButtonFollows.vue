<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "vuex";
import { createFollow } from "../services/call/follow";

const props = defineProps({
  follows: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const isFollowing = ref(false);

const user = computed(() => store.getters["authModules/currentUser"]);

const handleCreateFollows = async () => {
  try {
    const token = localStorage.getItem("token");
    await createFollow(Number(props.follows.id));
    isFollowing.value = !isFollowing.value;

    await store.dispatch("authModules/getProfile", token);
    await store.dispatch("authModules/getUserById", props.follows.id);
    store.dispatch("followsModules/getFollowing");
    store.dispatch("followsModules/getFollower");
  } catch (err) {
    console.error(err);
  }
};

const checkIsFollowing = () => {
  try {
    // ✅ BENAR: Cek di user.following untuk followingId
    const followings = user.value?.user?.following?.find(
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
watch([user, () => props.follows.id], checkIsFollowing);
</script>

<template>
  <button
    @click="handleCreateFollows"
    class="flex border-2 border-white py-1 px-3 md:py-2 md:px-4 rounded-2xl text-white font-semibold cursor-pointer text-sm xl:text-md"
  >
    {{ isFollowing ? "Unfollow" : "Follow" }}
  </button>
</template>

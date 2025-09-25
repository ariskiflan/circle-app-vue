<script setup>
import { assets } from "../assets/assets";
import { computed } from "vue";
import { useStore } from "vuex";
import ButtonFollows from "./ButtonFollows.vue";

const props = defineProps({
  follows: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const user = computed(() => store.getters["authModules/currentUser"]);

const handleRedirectProfile = () => {
  if (user.value?.id !== props.follows?.id) {
    return `/profile/${props.follows?.id}`;
  }
  return "/my-profile";
};
</script>

<template>
  <div class="flex items-center gap-5 justify-between">
    <div class="flex items-center gap-5">
      <RouterLink :to="handleRedirectProfile()">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img
            :src="assets.Profile"
            alt="profile"
            class="object-cover w-full h-full"
          />
        </div>
      </RouterLink>

      <div>
        <p class="text-md font-semibold">{{ props.follows.fullname }}</p>
        <span class="text-gray-400 font-normal text-md">
          @{{ props.follows.username }}
        </span>
        <p>{{ props.follows?.profile?.bio }}</p>
      </div>
    </div>

    <div>
      <ButtonFollows :follows="props.follows" />
    </div>
  </div>
</template>

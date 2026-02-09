<script setup>
import { RouterLink, useRouter } from "vue-router";
import { assets } from "../assets/assets";
import ButtonFollows from "./ButtonFollows.vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const { suggestedUsers } = defineProps({
  suggestedUsers: {
    type: Object,
    required: true,
  },
});

const goProfile = async () => {
  await store.dispatch("authModules/getUserById", suggestedUsers.id);
  await store.dispatch("threadModules/getThreadByUserId", suggestedUsers.id);
  router.push(`/profile/${suggestedUsers.id}`);
};
</script>

<template>
  <div>
    <div className="flex items-center gap-5 justify-between">
      <div @click="goProfile">
        <div className="flex items-center gap-3 md:gap-5">
          <img
            :src="suggestedUsers.profile?.avatar || assets.Avatar"
            alt=""
            className="w-8 md:w-10 cursor-pointer"
          />

          <div>
            <p className="text-sm md:text-md font-semibold">
              {{ suggestedUsers.fullname }}
            </p>
            <span className="text-gray-400 font-normal text-sm md:text-md">
              @{{ suggestedUsers.username }}
            </span>
          </div>
        </div>
      </div>

      <div>
        <ButtonFollows :follows="suggestedUsers" />
      </div>
    </div>
  </div>
</template>

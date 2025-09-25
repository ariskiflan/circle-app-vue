<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getUsers } from "../services/call/user";
import { assets } from "../assets/assets";
import ButtonFollows from "../components/ButtonFollows.vue";

const input = ref("");
const users = ref([]);
const searchResult = ref([]);

const router = useRouter();
const store = useStore();
const user = computed(() => store.getters["authModules/currentUser"]);

const handleSearchUsers = async () => {
  try {
    const res = await getUsers();
    users.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const handleChange = () => {
  if (input.value === "") {
    searchResult.value = [];
  } else {
    const keyword = input.value.toLowerCase();
    searchResult.value = users.value.filter((user) =>
      user.username.toLowerCase().includes(keyword)
    );
  }
};

const handleRedirectProfile = (users) => {
  return user.value.id != users?.id ? `/profile/${users.id}` : "/my-profile";
};

onMounted(() => {
  handleSearchUsers();
});
</script>

<template>
  <div class="px-5 py-10 flex flex-col gap-5">
    <div>
      <input
        type="text"
        class="w-full bg-[#3f3f3f] p-2 rounded-2xl font-normal text-white placeholder:text-white"
        placeholder="Search Your Friend"
        v-model="input"
        @input="handleChange"
      />
    </div>

    <div class="flex flex-col gap-5">
      <template v-if="searchResult.length > 0">
        <div
          v-for="item in searchResult"
          :key="item.id"
          class="flex items-center gap-5 justify-between"
        >
          <div class="flex items-center gap-5">
            <RouterLink :to="handleRedirectProfile(item)">
              <div class="w-10 h-10 rounded-full overflow-hidden">
                <img :src="item.profile?.Avatar || assets.Profile" alt="" />
              </div>
            </RouterLink>

            <div>
              <p class="text-md font-semibold">{{ item.fullname }}</p>
              <span class="text-gray-400 font-normal text-md">
                @{{ item.username }}
              </span>
              <p>{{ item.profile?.bio }}</p>
            </div>
          </div>

          <div>
            <ButtonFollows :follows="item" />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex items-center gap-5 justify-center h-screen">
          <div class="flex flex-col gap-2 items-center">
            <p class="text-2xl font-semibold">No Result for "{{ input }}"</p>
            <p class="text-md font-normal text-[#b3b3b3]">
              Try searching for something else or check the spelling of what you
              typed
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

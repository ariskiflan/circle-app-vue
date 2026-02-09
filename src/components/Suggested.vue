<script setup>
import SuggestedItem from "./SuggestedItem.vue";
import { ref, onMounted } from "vue";
import { getUsersNotId } from "../services/call/user";

const suggestedUsers = ref([]);

const handleSuggestedUser = async () => {
  try {
    const res = await getUsersNotId();
    suggestedUsers.value = res.data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  handleSuggestedUser();
});
</script>

<template>
  <div>
    <div className="bg-[#262626] p-5 rounded-2xl flex flex-col gap-5">
      <p className="text-md md:text-xl font-semibold">Suggested For you</p>
  
      <div className="flex flex-col gap-3 h-[150px] overflow-auto hide-scrollbar">
        <div v-for="item in suggestedUsers" :key="item.id">
          <SuggestedItem :suggestedUsers="item" />
        </div>
  
      </div>
    </div>
  </div>
</template>

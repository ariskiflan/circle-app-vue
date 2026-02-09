<script setup>
import { assets } from "../assets/assets";
import { useStore } from "vuex";
import { RouterLink, useRouter } from "vue-router";
import { ref } from "vue";
import ConfirmModal from "./ConfirmModal.vue";

const store = useStore();
const router = useRouter();

const showLogoutModal = ref(false);

const handleLogout = () => {
  try {
    store.commit("authModules/LOGOUT");
    showLogoutModal.value = false;
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <div class=" h-screen md:border-r-2 border-gray-500">
      <div class="p-10 flex flex-col gap-10 h-full justify-between">
        <div class="flex flex-col gap-10">
          <img class="md:w-58 w-40" :src="assets.Logo" alt="" />
  
          <div>
            <ul class="flex flex-col gap-10">
              <RouterLink to="/">
                <li class="flex items-center gap-5 hover:translate-1 transition-all duration-100">
                  <img class="md:w-10 w-8" :src="assets.Home" alt="" />
                  <p class="md:text-2xl text-xl text-white font-medium hover:font-bold cursor-pointer ">
                    Home
                  </p>
                </li>
              </RouterLink>
  
              <RouterLink to="/search">
                <li class="flex items-center gap-5 hover:translate-1 transition-all duration-100">
                  <img class="md:w-10 w-8" :src="assets.UserSearch" alt="" />
                  <p class="md:text-2xl text-xl text-white font-medium hover:font-bold cursor-pointer">
                    Search
                  </p>
                </li>
              </RouterLink>
  
              <RouterLink to="/follows">
                <li class="flex items-center gap-5 hover:translate-1 transition-all duration-100">
                  <img class="md:w-10 w-8" :src="assets.Like" alt="" />
                  <p class="md:text-2xl text-xl text-white font-medium hover:font-bold cursor-pointer">
                    Follows
                  </p>
                </li>
              </RouterLink>
  
              <RouterLink to="/my-profile">
                <li class="flex items-center gap-5 hover:translate-1 transition-all duration-100">
                  <img class="md:w-10 w-8" :src="assets.Profile" alt="" />
                  <p class="md:text-2xl text-xl text-white font-medium hover:font-bold cursor-pointer">
                    Profile
                  </p>
                </li>
              </RouterLink>
            </ul>
          </div>
  
          <!-- <div>
                  <button
                    class="bg-[#04A51E] text-white w-full py-3 rounded-3xl md:text-2xl text-xll font-medium hover:bg-transparent  transition-all duration-100 ease-in-out hover:[box-shadow:inset_0_0_0_2px_white] cursor-pointer"
                  >
                    Create Post
                  </button>
                </div> -->
        </div>
  
        <!-- Trigger -->
        <div class="flex items-center gap-5 cursor-pointer
             hover:translate-x-1 transition" @click="showLogoutModal = true">
          <img class="md:w-10 w-8" :src="assets.Logout" />
          <p class="md:text-2xl text-xl text-white font-medium">Logout</p>
        </div>
  
        <!-- Modal -->
        <ConfirmModal v-model="showLogoutModal" title="Logout?" description="You will be signed out from your account."
          confirm-text="Logout" confirm-color="bg-red-600 hover:bg-red-700" @confirm="handleLogout" />
  
      </div>
    </div>
  </div>
</template>

<style scoped></style>

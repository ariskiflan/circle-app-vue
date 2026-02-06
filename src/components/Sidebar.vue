<script setup>
import { assets } from "../assets/assets";
import { useStore } from "vuex";
import { RouterLink, useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const handleLogout = () => {
  store.commit("authModules/LOGOUT");
  router.push("/login");
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
                <li
                  class="flex items-center gap-5 hover:translate-1 transition-all duration-100"
                >
                  <img class="md:w-10 w-8" :src="assets.Home" alt="" />
                  <p
                    class="md:text-2xl text-xl text-white font-medium hover:font-bold cursor-pointer "
                  >
                    Home
                  </p>
                </li>
              </RouterLink>

              <RouterLink to="/search">
                <li
                  class="flex items-center gap-5 hover:translate-1 transition-all duration-100"
                >
                  <img class="md:w-10 w-8" :src="assets.UserSearch" alt="" />
                  <p
                    class="md:text-2xl text-xl text-white font-medium hover:font-bold cursor-pointer"
                  >
                    Search
                  </p>
                </li>
              </RouterLink>

              <RouterLink to="/follows">
                <li
                  class="flex items-center gap-5 hover:translate-1 transition-all duration-100"
                >
                  <img class="md:w-10 w-8" :src="assets.Like" alt="" />
                  <p
                    class="md:text-2xl text-xl text-white font-medium hover:font-bold cursor-pointer"
                  >
                    Follows
                  </p>
                </li>
              </RouterLink>

              <RouterLink to="/my-profile">
                <li
                  class="flex items-center gap-5 hover:translate-1 transition-all duration-100"
                >
                  <img class="md:w-10 w-8" :src="assets.Profile" alt="" />
                  <p
                    class="md:text-2xl text-xl text-white font-medium hover:font-bold cursor-pointer"
                  >
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

        <div
          @click="handleLogout"
          class="flex items-center gap-5 hover:translate-1 transition-all duration-100"
        >
          <img class="md:w-10 w-8" :src="assets.Logout" alt="" />
          <p
            class="md:text-2xl text-xl text-white font-medium hover:font-bold cursor-pointer"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

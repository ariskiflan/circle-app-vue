<script setup>
import { assets } from "../assets/assets";
import { ref } from "vue";
import { login } from "../services/call/user";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { POSITION, TYPE, useToast } from "vue-toastification";

const router = useRouter();
const store = useStore();
const toast = useToast();

const formInput = ref({
  username: "",
  password: "",
});

const handleLogin = async () => {
  try {
    const res = await login(formInput.value);

    if (res.status) {
      await store.dispatch("authModules/login", formInput.value);

      toast("Login Berhasil!", {
        timeout: 2000,
        position: POSITION.TOP_CENTER,
        type: TYPE.SUCCESS,
      });

      router.push("/");

    }
  } catch (error) {
    toast(error.response.data.message, {
      timeout: 2000,
      position: POSITION.TOP_CENTER,
      type: TYPE.ERROR,
    });
  }
};
</script>

<template>
  <div class="flex flex-col h-screen justify-center w-full md:w-1/3 m-auto gap-5 p-10 md:p-0">
    <div class="flex flex-col gap-5">
      <img :src="assets.Logo" alt="" class="w-40 md:w-64" />
      <p class="text-xl md:text-4xl font-semibold">Login to Circle</p>
    </div>

    <!-- FORM -->
    <form class="flex flex-col gap-5 w-full" @submit.prevent="handleLogin">
      <input
        v-model="formInput.username"
        class="border-2 px-4 py-2 rounded-xl w-full text-md md:text-xl"
        type="text"
        placeholder="Username"
        name="username"
      />
      <input
        v-model="formInput.password"
        class="border-2 px-4 py-2 rounded-xl w-full text-md md:text-xl"
        type="password"
        placeholder="Password"
        name="password"
      />

      <button
        type="submit"
        class="bg-[#04A51E] text-white w-full py-2 rounded-3xl text-md md:text-xl font-medium
               hover:bg-transparent transition-all duration-100 ease-in-out
               hover:[box-shadow:inset_0_0_0_2px_white] cursor-pointer"
      >
        Login
      </button>
    </form>

    <div>
      <p class="text-md md:text-xl">
        Don’t have an account yet?
        <RouterLink to="/register" class="text-[#04A51E] cursor-pointer">
          Sign up
        </RouterLink>
      </p>
    </div>
  </div>
</template>

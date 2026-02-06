<script setup>
import { assets } from "../assets/assets";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { POSITION, TYPE, useToast } from "vue-toastification";
import { register } from "../services/call/user";

const router = useRouter();
const toast = useToast();

const formInput = ref({
  username: "",
  fullname: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  try {
    const res = await register(formInput.value);

    if (res.status) {
      toast("Register Berhasil!", {
        timeout: 2000,
        position: POSITION.TOP_CENTER,
        type: TYPE.SUCCESS,
      });

      router.push("/login");
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
  <div>
    <div>
      <div className="flex flex-col h-screen justify-center w-full md:w-1/3 m-auto gap-5 p-10 md:p-0">
        <div className="flex flex-col gap-5">
          <img :src="assets.Logo" alt="" className="w-40 md:w-64" />
          <p className="text-xl md:text-4xl font-semibold">Create Account Circle</p>
        </div>

        <form
          @submit.prevent="handleRegister"
          className="flex flex-col gap-5 w-full"
        >
          <input
            className="border-2 px-4 py-2 rounded-xl w-full text-md md:text-xl"
            type="text"
            placeholder="Username"
            name="username"
            v-model="formInput.username"
          />
          <input
            className="border-2 px-4 py-2 rounded-xl w-full text-md md:text-xl"
            type="text"
            placeholder="Fullname"
            name="fullname"
            v-model="formInput.fullname"
          />
          <input
            className="border-2 px-4 py-2 rounded-xl w-full text-md md:text-xl"
            type="text"
            placeholder="Email"
            name="email"
            v-model="formInput.email"
          />
          <input
            className="border-2 px-4 py-2 rounded-xl w-full text-md md:text-xl"
            type="password"
            placeholder="Password"
            name="password"
            v-model="formInput.password"
          />

          <button
            type="submit"
            className="bg-[#04A51E] text-white w-full py-2 rounded-3xl text-md md:text-xl font-medium hover:bg-transparent  transition-all duration-100 ease-in-out hover:[box-shadow:inset_0_0_0_2px_white] cursor-pointer"
          >
            Create
          </button>
        </form>

        <div>
          <p class="text-md md:text-xl">
            Already have an acount?
            <RouterLink to="/login" className="text-[#04A51E] cursor-pointer">
              Sign in
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { assets } from "../assets/assets";
</script>

<template>
  <div>
    <div>
      <div className="flex flex-col h-screen justify-center w-1/3 m-auto gap-5">
        <div className="flex flex-col gap-5">
          <img :src="assets.Logo" alt="" className="w-64" />
          <p className="text-4xl font-semibold">Create Account Circle</p>
        </div>

        <form className="flex flex-col gap-5 w-full">
          <input
            className="border-2 px-4 py-2 rounded-xl w-full"
            type="text"
            placeholder="Username"
            name="username"
          />
          <input
            className="border-2 px-4 py-2 rounded-xl w-full"
            type="text"
            placeholder="Fullname"
            name="fullname"
          />
          <input
            className="border-2 px-4 py-2 rounded-xl w-full"
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            className="border-2 px-4 py-2 rounded-xl w-full"
            type="password"
            placeholder="Password"
            name="password"
          />

          <button
            type="submit"
            className="bg-[#04A51E] text-white w-full py-2 rounded-3xl text-xl font-medium hover:bg-transparent  transition-all duration-100 ease-in-out hover:[box-shadow:inset_0_0_0_2px_white] cursor-pointer"
          >
            Create
          </button>
        </form>

        <div>
          <p>
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

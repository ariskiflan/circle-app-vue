import { createRouter, createWebHistory } from "vue-router";
import RootLayouts from "../layouts/RootLayouts.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [
  {
    path: "/",
    component: RootLayouts,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("token"); // cek apakah user sudah login

  // kalau rute butuh login (meta.requiresAuth) tapi belum login
  if (to.meta.requiresAuth && !isLoggedIn) {
    alert("⚠️ Harap login dulu!"); // kasih peringatan
    next({ name: "Login" }); // redirect ke halaman login
  } else {
    // kalau sudah login atau rute tidak butuh login → lanjut
    next();
  }
});

export default router;

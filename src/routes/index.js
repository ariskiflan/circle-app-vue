import { createRouter, createWebHistory } from "vue-router";
import RootLayouts from "../layouts/RootLayouts.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ThreadDetail from "../views/ThreadDetail.vue";
import MyProfile from "../views/MyProfile.vue";
import { POSITION, TYPE, useToast } from "vue-toastification";
import store from "../store/index";

const toast = useToast();

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
      {
        path: "/thread-detail/:id",
        name: "Thread-Detail",
        component: ThreadDetail,
        meta: { requiresAuth: true },
      },
      {
        path: "/my-profile",
        name: "My-Profile",
        component: MyProfile,
        meta: { requiresAuth: true },
      },
    ],
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters["authModules/isAuthenticated"];

  if (to.meta.requiresAuth && !isLoggedIn) {
    toast("Silahkan Login!", {
      timeout: 2000,
      position: POSITION.TOP_CENTER,
      type: TYPE.SUCCESS,
    });
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;

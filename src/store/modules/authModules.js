import { getProfile } from "../../services/call/profile";

const userStr = localStorage.getItem("user");
let savedUser = null;
try {
  if (userStr) savedUser = JSON.parse(userStr);
} catch {
  savedUser = null;
}

const savedToken = localStorage.getItem("token");

export default {
  namespaced: true,
  state: {
    user: savedUser,
    token: savedToken || "",
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },
  mutations: {
    SET_USER(state, payload) {
      console.log("SET_USER payload:", payload);
      state.user = payload.user;
      state.token = payload.token;
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("token", payload.token);
    },
    LOGOUT(state) {
      state.user = undefined;
      state.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  actions: {
    async getProfile({ commit, state }) {
      try {
        const res = await getProfile(state.token);

        commit("SET_USER", {
          user: res.data,
          token: state.token,
        });
      } catch (err) {
        commit("SET_USER", { user: undefined, token: "" });
      }
    },
  },
};

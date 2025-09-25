import { getFollower, getFollowing } from "../../services/call/follow";

export default {
  namespaced: true,
  state: () => ({
    followers: [],
    followings: [],
  }),
  getters: {
    followers(state) {
      return state.followers;
    },
    followings(state) {
      return state.followings;
    },
  },
  mutations: {
    setFollowers(state, data) {
      state.followers = data;
    },
    setFollowings(state, data) {
      state.followings = data;
    },
  },
  actions: {
    async getFollower({ commit }) {
      try {
        const res = await getFollower();
        commit("setFollowers", res.data);
      } catch (err) {
        console.log(err);
      }
    },

    async getFollowing({ commit }) {
      try {
        const res = await getFollowing();
        commit("setFollowings", res.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};

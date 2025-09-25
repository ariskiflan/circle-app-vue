import { getThreadByUserId, getThreads } from "../../services/call/thread";

export default {
  namespaced: true,
  state: () => ({
    threadByUserId: {},
    threads: {},
  }),
  getters: {
    threadByUserId: (state) => state.threadByUserId,
    threads: (state) => state.threads,
  },
  mutations: {
    setThreadByUserId(state, payload) {
      state.threadByUserId = payload;
    },
    setThreads(state, payload) {
      state.threads = payload;
    },
  },
  actions: {
    async getThreadByUserId({ commit }, id) {
      try {
        const res = await getThreadByUserId(id);
        commit("setThreadByUserId", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getThreads({ commit }) {
      try {
        const res = await getThreads();
        commit("setThreads", res.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};

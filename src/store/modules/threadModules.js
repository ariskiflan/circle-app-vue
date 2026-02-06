import { getThreadByUserId, getThreads, getThreadByToken, getThreadById,
  getReplies, } from "../../services/call/thread";

export default {
  namespaced: true,
  state: () => ({
    threadByUserId: {},
    threads: {},
    threadByUserToken: {},
    threadDetail: null,   
    replies: [],          
  }),
  getters: {
    threadByUserId: (state) => state.threadByUserId,
    threads: (state) => state.threads,
    threadByUserToken: (state) => state.threadByUserToken,
    threadDetail: (state) => state.threadDetail, 
    replies: (state) => state.replies,  
  },
  mutations: {
    setThreadByUserId(state, payload) {
      state.threadByUserId = payload;
    },
    setThreads(state, payload) {
      state.threads = payload;
    },
    setThreadByUserToken(state, payload) {
      state.threadByUserToken = payload; 
    },
    setThreadDetail(state, payload) {
      state.threadDetail = payload; 
    },
    setReplies(state, payload) {
      state.replies = payload; 
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
    async getThreadByUserToken({ commit }) {
      try {
        const res = await getThreadByToken();
        commit("setThreadByUserToken", res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getThreadDetail({ commit }, id) {
      try {
        const [threadRes, repliesRes] = await Promise.all([
          getThreadById(id),
          getReplies(id),
        ]);

        commit("setThreadDetail", threadRes.data);
        commit("setReplies", repliesRes.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
};

import { createStore } from "vuex";

import authModules from "./modules/authModules";

const store = createStore({
  modules: {
    authModules,
  },
});

export default store;

import { createStore } from "vuex";

import authModules from "./modules/authModules";
import followsModules from "./modules/followsModules";
import threadModules from "./modules/threadModules";

const store = createStore({
  modules: {
    authModules,
    followsModules,
    threadModules,
  },
});

export default store;

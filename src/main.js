import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App)
  .use(router)
  .use(store)
  .use(Toast)
  .mount("#app");

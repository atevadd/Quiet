import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

// import "./assets/main.css";

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount("#app");

// AXIOS DEFAULT CONFIG
axios.defaults.baseURL = "https://quiett.com.ng/api/v1";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";

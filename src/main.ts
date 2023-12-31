// main.ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/main.css";
import App from "./App.vue";
import router from '@/router/index.ts';


const app = createApp(App);

app.use(ElementPlus).use(router).mount("#app");

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./samples/node-api";
// ElementPlus 引入
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App);
// ElementPlus 注册
app.use(ElementPlus);
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});

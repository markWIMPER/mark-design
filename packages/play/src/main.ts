import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import MarkDesign from "mark-design";
import "mark-design/dist/index.css";

createApp(App).use(MarkDesign).mount("#app");

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import MarkDesign from "mark-design";
import "mark-design/dist/index.css";

const app = createApp(App);
app.use(MarkDesign);
app.mount("#app");

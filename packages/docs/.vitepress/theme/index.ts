import { AntDesignContainer } from "@vitepress-demo-preview/component";

import "@vitepress-demo-preview/component/dist/style.css";
import DefaultTheme from "vitepress/theme";
import "./style/index.css";
import MarkDesign from "mark-design";
import "mark-design/dist/index.css";

export default {
  extends: DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.component("demo-preview", AntDesignContainer);
    app.use(MarkDesign);
  },
};

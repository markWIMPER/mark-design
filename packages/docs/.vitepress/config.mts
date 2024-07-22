import { defineConfig } from "vitepress";
import {
  containerPreview,
  componentPreview,
} from "@vitepress-demo-preview/plugin";
import { nav, sidebar } from "../src/menu";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mark-Design",
  description: "Mark-Design",
  base: "/mark-design",
  themeConfig: {
    logo: "/logo.png",
    // https://vitepress.dev/reference/default-theme-config
    nav: nav,
    sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/markWIMPER/mark-design" },
    ],
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
});

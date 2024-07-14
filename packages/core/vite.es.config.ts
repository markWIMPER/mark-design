import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const COMP_NAMES = ["Button", "Icon"] as const;

export default defineConfig({
  plugins: [
    vue(),
    dts({
      tsconfigPath: "../../tsconfig.build.json",
      outDir: "dist/types",
    }),
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "MarkDesign",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "vue",
        "@forawesome/fomtawesome-svg-core",
        "@forawesome/free-solid-svg-icons",
        "@forawesome/vue-fontawesome",
        "@popperjs/core",
        "async-validator",
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "index.css";
          return assetInfo.name as string;
        },
        // 分包
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
          if (id.includes("/packages/hooks/")) {
            return "hooks";
          }
          if (id.includes("/packages/utils/")) {
            return "utils";
          }
          for (const item of COMP_NAMES) {
            if (id.includes(`/packages/components/${item}/`)) {
              return item;
            }
          }
        },
      },
    },
  },
});

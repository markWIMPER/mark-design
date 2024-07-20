import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { readdirSync } from "fs";
import { filter, map } from "lodash-es";

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  );
}

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
          for (const item of getDirectoriesSync("../components")) {
            if (id.includes(`/packages/components/${item}/`)) {
              return item;
            }
          }
        },
      },
    },
  },
});

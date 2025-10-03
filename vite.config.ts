import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve("lib/Trend.vue"),
      name: "Vue3Trend",
      fileName: (format) => `vue3-trend.${format}.js`,
    },
  },
});

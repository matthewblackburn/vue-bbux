import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import libCss from "vite-plugin-libcss";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.js"),
            name: "vue-bbux",
            fileName: (format) => `vue-bbux.${format}.js`,
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
    plugins: [vue(), libCss()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
        dedupe: ["vuedraggable"],
    },
});

import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        cssCodeSplit: true,
        lib: {
            entry: path.resolve(__dirname, "src/plugin.js"),
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
    plugins: [vue()],
    // resolve: {
    //     alias: {
    //         "@": fileURLToPath(new URL("./src", import.meta.url)),
    //     },
    // },
});

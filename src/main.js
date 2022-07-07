import { createApp } from "vue";
import App from "./app.vue";
import routes from "./routes";

const app = createApp(App);

app.use(routes);

import Plugin from "./index.js";
app.use(Plugin);

import * as icons from "./assets/icons";
console.log(icons);

app.mount("#app");

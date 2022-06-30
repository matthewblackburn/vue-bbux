import { createApp } from "vue";
import App from "./app.vue";
import routes from "./routes";

const app = createApp(App);

app.use(routes);

import Plugin from "./plugin";
app.use(Plugin);

app.mount("#app");

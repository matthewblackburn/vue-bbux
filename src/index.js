// Services
import ThemeService from "./services/theme.js";
import ApiService from "./services/api.js";

// Composables
// import {validate} from "./composables/bx-validate.js";

// Directives
import * as directives from "./directives";

// Components
import * as components from "./components";

// Package Components
import { VueDraggableNext } from "vue-draggable-next";

// -- Helpers

function setTheme(theme) {
    if (!theme) theme = "light";

    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "dark" || localStorage.getItem("theme") == "system") {
            theme = "dark";
        }
    } else if (!window.matchMedia) {
        return false;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        if (theme == "system") {
            theme = "dark";
        }
    }

    if (theme == "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
}

function install(app, options) {
    options = options || {};

    console.log("OPTIONS", options);

    //////////////////////////////////////////////////

    // Global

    //////////////////////////////////////////////////

    var theme = options.theme || ThemeService?.theme;

    theme = new Proxy(theme, {
        set: (target, key, value) => {
            target[key] = value;
            if (key == "mode") setTheme(value);
            return true;
        },
    });

    setTheme(theme?.mode);

    const apiURL = options.apiURL || "https://api.inyerpocket.com";
    const api = new ApiService(apiURL);

    app.config.globalProperties.$bbux = {
        theme,
        apiURL,
        api,
    };

    app.provide("bbux", app.config.globalProperties.$bbux);

    //////////////////////////////////////////////////

    // Composables

    //////////////////////////////////////////////////

    // app.provide("validate", validate);

    //////////////////////////////////////////////////

    // Directives

    //////////////////////////////////////////////////

    for (const key in directives) {
        app.directive(key, directives[key]);
    }

    //////////////////////////////////////////////////

    // Components

    //////////////////////////////////////////////////

    for (const key in components) {
        app.component(key, components[key]);
    }

    //////////////////////////////////////////////////

    // Package Components

    //////////////////////////////////////////////////

    app.component("draggable", VueDraggableNext);
}

//////////////////////////////////////////////////

export default { install };

export * from "./directives";
export * from "./components";

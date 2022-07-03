// Services
import themeService from "@/services/theme.js";
import apiService from "@/services/api.js";

// Composables
// import {validate} from "@/composables/bx-validate.js";

// Directives
import BxRipple from "@/directives/bx-ripple.js";

// Components

// -- Input
import BxTextField from "@/components/input/fields/bx-text-field.vue";
import BxTextarea from "@/components/input/fields/bx-textarea.vue";

// -- Layout
import BxContainer from "@/components/layout/bx-container.vue";
import BxRow from "@/components/layout/bx-row.vue";
import BxCol from "@/components/layout/bx-col.vue";

// -- UI
import BxBtn from "@/components/ui/bx-btn.vue";
import BxCard from "@/components/ui/bx-card.vue";
import BxIcon from "@/components/ui/bx-icon.vue";
import BxImage from "@/components/ui/bx-image.vue";
import BxLoading from "@/components/ui/bx-loading.vue";
import BxNavbar from "@/components/ui/bx-navbar.vue";
import BxSidebar from "@/components/ui/bx-sidebar.vue";

export default {
    install(app, options) {
        options = options || {};

        console.log("OPTIONS", options);

        //////////////////////////////////////////////////

        // Global

        //////////////////////////////////////////////////

        var theme = options.theme || themeService?.theme;

        theme = new Proxy(theme, {
            set: (target, key, value) => {
                target[key] = value;
                if (key == "mode") setTheme(value);
                return true;
            },
        });

        setTheme(theme?.mode);

        const apiURL = options.apiURL || "https://api.inyerpocket.com";
        const api = new apiService(apiURL);

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

        app.directive("ripple", BxRipple);

        //////////////////////////////////////////////////

        // Components

        //////////////////////////////////////////////////

        // -- Input
        app.component("bx-text-field", BxTextField);
        app.component("bx-textarea", BxTextarea);

        // -- Layout
        app.component("bx-container", BxContainer);
        app.component("bx-row", BxRow);
        app.component("bx-col", BxCol);

        // -- UI
        app.component("bx-btn", BxBtn);
        app.component("bx-card", BxCard);
        app.component("bx-icon", BxIcon);
        app.component("bx-image", BxImage);
        app.component("bx-loading", BxLoading);
        app.component("bx-navbar", BxNavbar);
        app.component("bx-sidebar", BxSidebar);
    },
};

//////////////////////////////////////////////////

// Helpers

//////////////////////////////////////////////////

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

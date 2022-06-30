// Services
import themeService from "@/services/theme.js";
import apiService from "@/services/api.js";

// Composables
import { validate } from "@/composables/bx-validate.js";

// Directives
import BxRipple from "@/directives/bx-ripple.js";

// Components

// -- Input
import BxTextField from "@/components/input/fields/bx-text-field.vue";

// -- Layout
import BxContainer from "@/components/layout/bx-container.vue";
import BxRow from "@/components/layout/bx-row.vue";
import BxCol from "@/components/layout/bx-col.vue";

// -- UI
import BxBtn from "@/components/ui/bx-btn.vue";
import BxCard from "@/components/ui/bx-card.vue";
import BxIcon from "@/components/ui/bx-icon.vue";

export default {
    install(app, options) {
        options = options || {};

        console.log("OPTIONS", options);

        //////////////////////////////////////////////////

        // Global

        //////////////////////////////////////////////////

        const theme = options.theme || themeService;
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

        app.provide("validate", validate);

        //////////////////////////////////////////////////

        // Directives

        //////////////////////////////////////////////////

        app.directive("ripple", BxRipple);

        //////////////////////////////////////////////////

        // Components

        //////////////////////////////////////////////////

        // -- Input
        app.component("bx-text-field", BxTextField);

        // -- Layout
        app.component("bx-container", BxContainer);
        app.component("bx-row", BxRow);
        app.component("bx-col", BxCol);

        // -- UI
        app.component("bx-btn", BxBtn);
        app.component("bx-card", BxCard);
        app.component("bx-icon", BxIcon);
    },
};

export function echo(value) {
    console.log("ECHO", value);
}

<script setup>
import { RouterView } from "vue-router";
import { computed, inject, reactive } from "vue";

//////////////////////////////////////// Inject

const bbux = reactive(inject("bbux"));

//////////////////////////////////////// Computed

const logo = computed(() => {
    let url;

    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (bbux?.theme?.mode == "light") {
        url = "img/logo-light.svg";
    }

    if (bbux?.theme?.mode == "dark") {
        url = "img/logo-dark.svg";
    }

    if (bbux?.theme?.mode == "system") {
        if (dark) url = "img/logo-dark.svg";
        else url = "img/logo-light.svg";
    }

    return url;
});

const options = computed(() => {
    return {
        left: {
            align: "left",
            logo: logo.value,
            menu: [
                {
                    title: "Item One",
                    key: "itemOne",
                },
                {
                    title: "Item Two",
                    key: "itemTwo",
                },
                {
                    title: "Item Three",
                    key: "itemThree",
                },
            ],
        },
        right: {
            align: "right",
            search: {
                placeholder: "Search for something...",
            },
            buttons: [
                {
                    type: "icon",
                    text: "alarm",
                    emit: "switchTheme",
                },
            ],
        },
    };
});

//////////////////////////////////////// Computed

function switchTheme() {
    const mode = bbux.theme.mode;

    if (mode == "system") {
        bbux.theme.mode = "dark";
    }

    if (mode == "dark") {
        bbux.theme.mode = "light";
    }

    if (mode == "light") {
        bbux.theme.mode = "system";
    }
}
</script>

<template>
    <div id="app" class="background">
        <bx-navbar :options="options" @switchTheme="switchTheme()"></bx-navbar>

        <div class="d-flex fill-width fill-height">
            <bx-sidebar></bx-sidebar>

            <div class="fill-width fill-height">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

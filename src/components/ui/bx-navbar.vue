<script setup>
import { defineProps, computed } from "vue";

//////////////////////////////////////// Setup

const props = defineProps({
    options: {
        type: Object,
    },
});

//////////////////////////////////////// Computed

const left = computed(() => {
    if (!props?.options?.left) return {};

    return props.options.left;
});

const leftAlign = computed(() => {
    if (!left?.value?.align) return;

    if (left.value.align == "left") return "justify-start";
    if (left.value.align == "center") return "justify-center";
    if (left.value.align == "right") return "justify-end";
});

const center = computed(() => {
    if (!props?.options?.center) return {};

    return props.options.center;
});

const centerAlign = computed(() => {
    if (!center?.value?.align) return;

    if (center.value.align == "left") return "justify-start";
    if (center.value.align == "center") return "justify-center";
    if (center.value.align == "right") return "justify-end";
});

const right = computed(() => {
    if (!props?.options?.right) return {};

    return props.options.right;
});

const rightAlign = computed(() => {
    if (!right?.value?.align) return;

    if (right.value.align == "left") return "justify-start";
    if (right.value.align == "center") return "justify-center";
    if (right.value.align == "right") return "justify-end";
});
</script>

<template>
    <bx-card class="bx-navbar light fill-width">
        <bx-container fluid>
            <bx-row>
                <bx-col xs="12">
                    <div class="d-flex align-center fill-width fill-height">
                        <div class="bx-navbar__left fill-width d-flex align-center" :class="[leftAlign]">
                            <bx-image height="20" :src="left.logo" v-if="left.logo"></bx-image>

                            <div class="d-flex align-center fill-width" v-if="left.menu">
                                <div class="bx-navbar__menu">
                                    <ul class="dark--text">
                                        <li v-for="(item, index) in left.menu" :key="index">{{ item.title }}</li>
                                    </ul>
                                </div>
                            </div>

                            <bx-text-field type="search" :options="{ type: 'search' }" hide-details :placeholder="left.search.placeholder || 'Search...'" color="primary" prepend-icon-inner="search" v-if="left.search"></bx-text-field>
                        </div>

                        <div class="bx-navbar__center fill-width d-flex align-center" :class="[centerAlign]">
                            <bx-image height="20" :src="center.logo" v-if="center.logo"></bx-image>

                            <div class="d-flex align-center fill-width" v-if="center.menu">
                                <div class="bx-navbar__menu">
                                    <ul class="dark--text">
                                        <li v-for="(item, index) in center.menu" :key="index">{{ item.title }}</li>
                                    </ul>
                                </div>
                            </div>

                            <bx-text-field type="search" :options="{ type: 'search' }" hide-details :placeholder="center.search.placeholder || 'Search...'" color="primary" prepend-icon-inner="search" v-if="center.search"></bx-text-field>
                        </div>

                        <div class="bx-navbar__right fill-width d-flex align-center" :class="[rightAlign]">
                            <bx-image height="20" :src="right.logo" v-if="right.logo"></bx-image>

                            <div class="d-flex align-center fill-width" v-if="right.menu">
                                <div class="bx-navbar__menu">
                                    <ul class="dark--text">
                                        <li v-for="(item, index) in right.menu" :key="index">{{ item.title }}</li>
                                    </ul>
                                </div>
                            </div>

                            <bx-text-field type="search" :options="{ type: 'search' }" hide-details :placeholder="right.search.placeholder || 'Search...'" color="primary" prepend-icon-inner="search" v-if="right.search"></bx-text-field>

                            <div class="buttons"></div>
                        </div>

                        <!-- <div class="d-flex align-center">
                            <bx-text-field :type="search.type" :options="search" hide-details placeholder="Search for something..." color="primary" prepend-icon-inner="search"></bx-text-field>

                            <bx-btn color="dark" transparent icon @click="switchTheme()">
                                <bx-icon color="dark" icon="sun"></bx-icon>
                            </bx-btn>
                        </div> -->
                    </div>
                </bx-col>
            </bx-row>
        </bx-container>
    </bx-card>
</template>

<style lang="scss" scoped>
.bx-navbar {
    .bx-navbar__left,
    .bx-navbar__center,
    .bx-navbar__right {
        flex-shrink: 1;
    }
    .bx-navbar__menu {
        ul {
            margin: 0;
            padding: 0;
            display: flex;
            flex-wrap: nowrap;

            li {
                padding: 0 8px;
                font-size: 0.8rem;
                white-space: nowrap;
            }
        }
    }
}
</style>

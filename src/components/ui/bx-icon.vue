<script setup>
import { ref, computed, watch } from "vue";

//////////////////////////////////////// Setup

const props = defineProps({
    icon: {
        type: String,
        default: "brush",
    },
    color: {
        type: String,
        default: "default",
    },
    size: {
        type: String,
        default: "md",
    },
});

//////////////////////////////////////// Data

const svg = ref("");

//////////////////////////////////////// Computed

const iconText = computed(() => {
    if (!props.icon) return "";

    return props.icon;
});

const iconPath = computed(() => {
    if (!iconText.value) return "";

    const imgUrl = new URL(`../../assets/icons/${iconText.value}.svg`, import.meta.url).href;

    return imgUrl;
});

const iconColor = computed(() => {
    if (!props.color) return;

    return `${props.color}--text`;
});

const iconSize = computed(() => {
    if (!props.size) return;

    return `bx-icon--${props.size}`;
});

//////////////////////////////////////// Methods

function render(path) {
    fetch(path)
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.text();
        })
        .then((text) => {
            svg.value = text;
        });

    // fetch(path)
    //     .then((response) => {
    //         if (!response.ok) throw Error(response.statusText);
    //         return response.text();
    //     })
    //     .then((text) => {
    //         svg.value = text;
    //     })
    //     .catch(() => {
    //         let modulePath = `node_modules/vue-bbux/dist/${path}`;

    //         fetch(modulePath)
    //             .then((response) => {
    //                 if (!response.ok) throw Error(response.statusText);
    //                 return response.text();
    //             })
    //             .then((text) => {
    //                 svg.value = text;
    //             })
    //             .catch((error) => {
    //                 console.log("ICON ERROR", error);
    //             });
    //     });
}

//////////////////////////////////////// Watchers

watch(
    () => iconPath.value,
    (path) => {
        render(path);
    }
);

//////////////////////////////////////// Init

render(iconPath.value);
</script>

<template>
    <i class="bx-icon" :class="[iconColor, iconSize]">
        <div class="bx-icon__content" v-html="svg"></div>
    </i>
</template>

<style lang="scss" scoped>
.bx-icon {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

    .bx-icon__content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    svg {
        transition: all 0.25s ease;
        fill: var(--bx-color);
    }

    &.bx-icon--xs {
        width: 12px;
        height: 12px;
    }

    &.bx-icon--sm {
        width: 14px;
        height: 14px;
    }

    &.bx-icon--lg {
        width: 22px;
        height: 22px;
    }

    &.bx-icon--xl {
        width: 26px;
        height: 26px;
    }
}

//////////////////////////////////////////////////

[class*="--default"] {
    --bx-color: var(--bx-default);
}

[class*="--primary"] {
    --bx-color: var(--bx-primary);
}

[class*="--success"] {
    --bx-color: var(--bx-success);
}

[class*="--warning"] {
    --bx-color: var(--bx-warning);
}

[class*="--error"] {
    --bx-color: var(--bx-error);
}

[class*="--dark"] {
    --bx-color: var(--bx-dark);
}

[class*="--white"] {
    --bx-color: var(--bx-white);
}

//////////////////////////////////////////////////
</style>

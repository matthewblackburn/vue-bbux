<script setup>
import { ref, onMounted, defineProps, computed } from "vue";

const props = defineProps({
    color: {
        type: String,
        default: "default",
    },
    size: {
        type: String,
        default: "md",
    },
});

const icon = ref();
const content = ref();

const iconColor = computed(() => {
    if (!props.color) return;

    return `bx-icon--${props.color}`;
});

const iconSize = computed(() => {
    if (!props.size) return;

    return `bx-icon--${props.size}`;
});

onMounted(() => {
    const text = icon.value.textContent;

    var xhr = new XMLHttpRequest();

    xhr.open("GET", `icons/${text}.svg`, false);
    xhr.overrideMimeType("image/svg+xml");

    xhr.onload = function () {
        icon.value.replaceChild(xhr.responseXML.documentElement, content.value);
    };

    xhr.send("");
});
</script>

<template>
    <i ref="icon" class="bx" :class="[iconColor, iconSize]">
        <div ref="content" class="bx-icon__content"><slot></slot></div>
    </i>
</template>

<style lang="scss">
.bx {
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;

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

//////////////////////////////////////////////////
</style>

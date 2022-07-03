<script setup>
import { defineProps, computed, reactive, watch } from "vue";

//////////////////////////////////////// Setup

const props = defineProps({
    src: {
        type: String,
    },
    height: {
        type: [String, Number],
    },
    width: {
        type: [String, Number],
    },
    contain: {
        type: Boolean,
        default: false,
    },
});

//////////////////////////////////////// Data

const image = reactive({
    src: "",
    width: 0,
    height: 0,
    loaded: false,
});

//////////////////////////////////////// Computed

const imageWidth = computed(() => {
    let width = props.width || image.width;

    if (props.height) {
        if (props.width) {
            width = props.width;
        } else {
            width = props.height * imageRatio.value;
        }
    }

    return {
        width: `${width}px`,
    };
});

const imageHeight = computed(() => {
    let height = props.height || image.height;

    if (props.width) {
        if (props.height) {
            height = props.height;
        } else {
            height = props.width / imageRatio.value;
        }
    }

    return {
        height: `${height}px`,
    };
});

const imageRatio = computed(() => {
    const height = image?.height;
    const width = image?.width;

    return width / height || 0;
});

const imageSrc = computed(() => {
    return {
        backgroundImage: `url(${image?.src})`,
    };
});

const imageContain = computed(() => {
    if (!props.contain) return;

    return "contain";
});

//////////////////////////////////////// Methods

function render(src) {
    if (!src) return;

    let img = new Image();
    img.src = src;

    img.onload = () => {
        image.src = img.src;
        image.width = img.width;
        image.height = img.height;
        image.loaded = true;
    };
}

//////////////////////////////////////// Watchers

watch(
    () => props.src,
    (src) => {
        render(src);
    }
);

//////////////////////////////////////// Init

render(props.src);
</script>

<template>
    <div class="bx-image" :style="[imageWidth, imageHeight]">
        <transition>
            <div class="bx-image__image" :class="[imageContain]" :style="[imageSrc]" v-if="image.loaded"></div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.bx-image {
    position: relative;
    flex-shrink: 0;

    .bx-image__image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: cover;

        &.contain {
            background-size: contain;
        }
    }
}
</style>

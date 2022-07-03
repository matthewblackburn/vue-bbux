<script setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
// const route = useRoute();

const props = defineProps({
    color: {
        type: String,
        default: "default",
    },
    size: {
        type: String,
        default: "md",
    },
    transparent: {
        type: Boolean,
        default: false,
    },
    hover: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    to: {
        type: Object,
    },
});

const buttonColor = computed(() => {
    if (!props.color) return;

    return `bx-btn--${props.color}`;
});

const buttonIcon = computed(() => {
    if (!props.icon) return;

    return "bx-btn--icon";
});

const buttonTransparent = computed(() => {
    if (!props.transparent) return;

    return "bx-btn--transparent";
});

const buttonHover = computed(() => {
    if (!props.hover) return;

    return "bx-btn--hover";
});

const buttonSize = computed(() => {
    if (!props.size) return;

    return `bx-btn--${props.size}`;
});

const buttonTo = computed(() => {
    if (!props.to) return;

    return props.to;
});

const buttonDisabled = computed(() => {
    if (!props.disabled) return;

    return "bx-btn--disabled";
});

function goTo(obj) {
    if (!obj) return;
    if (props.disabled || props.loading) return;

    router.push(obj);
}
</script>

<template>
    <button class="bx-btn bx-btn--default" @click="goTo(buttonTo)" :class="[buttonColor, buttonIcon, buttonTransparent, buttonHover, buttonSize, buttonDisabled]" v-ripple>
        <div class="bx-btn__content">
            <slot></slot>
        </div>

        <bx-loading class="p-absolute center fill-width fill-height" v-if="loading"></bx-loading>
    </button>
</template>

<style lang="scss" scoped>
.bx-btn {
    border: 0;
    margin: var(--bx-button-margin);
    border-radius: var(--bx-border-radius);
    -webkit-transition: all 0.25s ease;
    transition: all 0.25s ease;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 1;
    overflow: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    padding: 0;
    outline: none;
    font-size: 0.8rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    flex-shrink: 0;

    .bx-btn__content {
        padding: var(--bx-button-padding);
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
    }

    &.bx-btn--disabled {
        pointer-events: none;
        opacity: 0.4;
    }

    &.bx-btn--icon {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;

        .bx-btn__content {
            padding: 8px;
        }
    }

    &.bx-btn--default,
    &.bx-btn--primary {
        background-color: var(--bx-button-color);
        color: var(--bx-color);
    }

    &.bx-btn--xs {
        font-size: 0.6rem;
        border-radius: 7px;

        .bx-btn__content {
            padding: 3px 8px;
        }

        &.bx-btn--icon {
            .bx-btn__content {
                padding: 3px;
            }
        }
    }

    &.bx-btn--sm {
        font-size: 0.75rem;
        border-radius: 9px;

        .bx-btn__content {
            padding: 5px 10px;
        }

        &.bx-btn--icon {
            .bx-btn__content {
                padding: 5px;
            }
        }
    }

    &.bx-btn--lg {
        font-size: 1rem;

        .bx-btn__content {
            padding: 10px 15px;
        }

        &.bx-btn--icon {
            .bx-btn__content {
                padding: 10px;
            }
        }
    }

    &.bx-btn--xl {
        font-size: 1.2rem;

        .bx-btn__content {
            padding: 15px 20px;
        }

        &.bx-btn--icon {
            .bx-btn__content {
                padding: 15px;
            }
        }
    }

    &.bx-btn--transparent {
        background: transparent;
        color: var(--bx-button-color);
        overflow: hidden;

        &:before {
            content: "";
            background: var(--bx-button-color);
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            pointer-events: none;
            -webkit-transition: all 0.25s ease;
            transition: all 0.25s ease;
            z-index: -1;
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
            opacity: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }

        &:hover {
            &:before {
                -webkit-transform: scale(1);
                transform: scale(1);
                opacity: 0.1;
            }
        }
    }

    &:not(.bx-btn--transparent) {
        &.bx-btn--hover {
            &:hover {
                -webkit-box-shadow: 0 10px 20px -10px var(--bx-button-color);
                box-shadow: 0 10px 20px -10px var(--bx-button-color);
                -webkit-transform: translateY(-3px);
                transform: translateY(-3px);
            }
        }
    }
}

//////////////////////////////////////////////////

[class*="--default"] {
    --bx-button-color: var(--bx-default);
    --bx-color: #222222;
}

[class*="--primary"] {
    --bx-button-color: var(--bx-primary);
    --bx-color: #ffffff;
}

[class*="--success"] {
    --bx-button-color: var(--bx-success);
    --bx-color: #ffffff;
}

[class*="--warning"] {
    --bx-button-color: var(--bx-warning);
    --bx-color: #ffffff;
}

[class*="--error"] {
    --bx-button-color: var(--bx-error);
    --bx-color: #ffffff;
}

[class*="--dark"] {
    --bx-button-color: var(--bx-dark);
    --bx-color: #ffffff;
}

//////////////////////////////////////////////////

[class*="--block"] {
    display: block;
    width: 100%;
}
</style>

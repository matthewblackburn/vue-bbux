<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
    color: {
        type: [Array, String],
    },
});

const loadingColor = computed(() => {
    if (!props.color) return "";

    return props.color;
});
</script>

<template>
    <div class="bx-loading">
        <div class="bx-loading__content">
            <div :class="[loadingColor]"></div>
            <div :class="[loadingColor]"></div>
            <div :class="[loadingColor]"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bx-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 30px;
    height: 30px;

    &:before {
        content: "";
        background: var(--bx-button-color);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.7;
    }

    .bx-loading__content {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        div {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: var(--bx-color);
            animation: bounce 0.5s alternate infinite;
            margin: 0 2px;
            transition: background-color 0.2s;

            &:nth-child(2) {
                animation-delay: 0.16s;
            }

            &:nth-child(3) {
                animation-delay: 0.32s;
            }

            @keyframes bounce {
                from {
                    transform: scaleX(1.25);
                }

                to {
                    transform: translateY(-5px) scaleX(1);
                }
            }
        }
    }
}
</style>

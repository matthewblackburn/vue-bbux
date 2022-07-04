<script setup>
import { computed } from "vue";

const props = defineProps({
    fluid: {
        type: Boolean,
        default: false,
    },
});

const containerFluid = computed(() => {
    if (!props.fluid) return;

    return "fluid";
});
</script>

<template>
    <div class="container" :class="[containerFluid]">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.container {
    padding: 16px;
    margin: auto;

    @media (min-width: 960px) {
        max-width: 900px;
    }

    &.fluid {
        max-width: 100%;
    }
}
</style>

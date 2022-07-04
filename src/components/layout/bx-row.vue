<script setup>
import { computed } from "vue";

const props = defineProps({
    dense: {
        type: Boolean,
        default: false,
    },
});

const rowDense = computed(() => {
    if (!props.dense) return;

    return "dense";
});
</script>

<template>
    <div class="row" :class="[rowDense]">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    margin: -16px;

    .col {
        padding: 16px;
    }

    &.dense {
        margin: -8px;

        .col {
            padding: 8px;
        }
    }
}
</style>

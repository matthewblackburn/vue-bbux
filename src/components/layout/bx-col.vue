<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
    xs: {
        type: String,
    },
    sm: {
        type: String,
    },
    md: {
        type: String,
    },
    lg: {
        type: String,
    },
    xl: {
        type: String,
    },
});

const colXs = computed(() => {
    if (!props.xs) return;

    return `col-xs-${props.xs}`;
});

const colSm = computed(() => {
    if (!props.sm) return;

    return `col-sm-${props.sm}`;
});

const colMd = computed(() => {
    if (!props.md) return;

    return `col-md-${props.md}`;
});

const colLg = computed(() => {
    if (!props.lg) return;

    return `col-lg-${props.lg}`;
});

const colXl = computed(() => {
    if (!props.xl) return;

    return `col-xl-${props.xl}`;
});
</script>

<template>
    <div class="col" :class="[colXs, colSm, colMd, colLg, colXl]">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.col {
    width: 100%;
    padding: 16px;

    //xs
    &.col-xs-1 {
        flex: 0 0 8.3333333333%;
        max-width: 8.3333333333%;
    }

    &.col-xs-2 {
        flex: 0 0 16.6666666667%;
        max-width: 16.6666666667%;
    }

    &.col-xs-3 {
        flex: 0 0 25%;
        max-width: 25%;
    }

    &.col-xs-4 {
        flex: 0 0 33.3333333333%;
        max-width: 33.3333333333%;
    }

    &.col-xs-5 {
        flex: 0 0 41.6666666667%;
        max-width: 41.6666666667%;
    }

    &.col-xs-6 {
        flex: 0 0 50%;
        max-width: 50%;
    }

    &.col-xs-7 {
        flex: 0 0 58.3333333333%;
        max-width: 58.3333333333%;
    }

    &.col-xs-8 {
        flex: 0 0 66.6666666667%;
        max-width: 66.6666666667%;
    }

    &.col-xs-9 {
        flex: 0 0 75%;
        max-width: 75%;
    }

    &.col-xs-10 {
        flex: 0 0 83.3333333333%;
        max-width: 83.3333333333%;
    }

    &.col-xs-11 {
        flex: 0 0 91.6666666667%;
        max-width: 91.6666666667%;
    }

    &.col-xs-12 {
        flex: 0 0 100%;
        max-width: 100%;
    }

    //sm
    @media (min-width: 600px) {
        &.col-sm-1 {
            flex: 0 0 8.3333333333%;
            max-width: 8.3333333333%;
        }

        &.col-sm-2 {
            flex: 0 0 16.6666666667%;
            max-width: 16.6666666667%;
        }

        &.col-sm-3 {
            flex: 0 0 25%;
            max-width: 25%;
        }

        &.col-sm-4 {
            flex: 0 0 33.3333333333%;
            max-width: 33.3333333333%;
        }

        &.col-sm-5 {
            flex: 0 0 41.6666666667%;
            max-width: 41.6666666667%;
        }

        &.col-sm-6 {
            flex: 0 0 50%;
            max-width: 50%;
        }

        &.col-sm-7 {
            flex: 0 0 58.3333333333%;
            max-width: 58.3333333333%;
        }

        &.col-sm-8 {
            flex: 0 0 66.6666666667%;
            max-width: 66.6666666667%;
        }

        &.col-sm-9 {
            flex: 0 0 75%;
            max-width: 75%;
        }

        &.col-sm-10 {
            flex: 0 0 83.3333333333%;
            max-width: 83.3333333333%;
        }

        &.col-sm-11 {
            flex: 0 0 91.6666666667%;
            max-width: 91.6666666667%;
        }

        &.col-sm-12 {
            flex: 0 0 100%;
            max-width: 100%;
        }

        //////////////////////////////////////////////////

        &.offset-sm-1 {
            margin-left: 8.3333333333%;
        }

        &.offset-sm-2 {
            margin-left: 16.6666666667%;
        }

        &.offset-sm-3 {
            margin-left: 25%;
        }

        &.offset-sm-4 {
            margin-left: 33.3333333333%;
        }

        &.offset-sm-5 {
            margin-left: 41.6666666667%;
        }

        &.offset-sm-6 {
            margin-left: 50%;
        }

        &.offset-sm-7 {
            margin-left: 58.3333333333%;
        }

        &.offset-sm-8 {
            margin-left: 66.6666666667%;
        }

        &.offset-sm-9 {
            margin-left: 75%;
        }

        &.offset-sm-10 {
            margin-left: 83.3333333333%;
        }

        &.offset-sm-11 {
            margin-left: 91.6666666667%;
        }

        &.offset-sm-12 {
            margin-left: 100%;
        }
    }

    //md
    @media (min-width: 960px) {
        &.col-md-1 {
            flex: 0 0 8.3333333333%;
            max-width: 8.3333333333%;
        }

        &.col-md-2 {
            flex: 0 0 16.6666666667%;
            max-width: 16.6666666667%;
        }

        &.col-md-3 {
            flex: 0 0 25%;
            max-width: 25%;
        }

        &.col-md-4 {
            flex: 0 0 33.3333333333%;
            max-width: 33.3333333333%;
        }

        &.col-md-5 {
            flex: 0 0 41.6666666667%;
            max-width: 41.6666666667%;
        }

        &.col-md-6 {
            flex: 0 0 50%;
            max-width: 50%;
        }

        &.col-md-7 {
            flex: 0 0 58.3333333333%;
            max-width: 58.3333333333%;
        }

        &.col-md-8 {
            flex: 0 0 66.6666666667%;
            max-width: 66.6666666667%;
        }

        &.col-md-9 {
            flex: 0 0 75%;
            max-width: 75%;
        }

        &.col-md-10 {
            flex: 0 0 83.3333333333%;
            max-width: 83.3333333333%;
        }

        &.col-md-11 {
            flex: 0 0 91.6666666667%;
            max-width: 91.6666666667%;
        }

        &.col-md-12 {
            flex: 0 0 100%;
            max-width: 100%;
        }

        //////////////////////////////////////////////////

        &.offset-md-1 {
            margin-left: 8.3333333333%;
        }

        &.offset-md-2 {
            margin-left: 16.6666666667%;
        }

        &.offset-md-3 {
            margin-left: 25%;
        }

        &.offset-md-4 {
            margin-left: 33.3333333333%;
        }

        &.offset-md-5 {
            margin-left: 41.6666666667%;
        }

        &.offset-md-6 {
            margin-left: 50%;
        }

        &.offset-md-7 {
            margin-left: 58.3333333333%;
        }

        &.offset-md-8 {
            margin-left: 66.6666666667%;
        }

        &.offset-md-9 {
            margin-left: 75%;
        }

        &.offset-md-10 {
            margin-left: 83.3333333333%;
        }

        &.offset-md-11 {
            margin-left: 91.6666666667%;
        }

        &.offset-md-12 {
            margin-left: 100%;
        }
    }

    //lg
    @media (min-width: 1264px) {
        &.col-lg-1 {
            flex: 0 0 8.3333333333%;
            max-width: 8.3333333333%;
        }

        &.col-lg-2 {
            flex: 0 0 16.6666666667%;
            max-width: 16.6666666667%;
        }

        &.col-lg-3 {
            flex: 0 0 25%;
            max-width: 25%;
        }

        &.col-lg-4 {
            flex: 0 0 33.3333333333%;
            max-width: 33.3333333333%;
        }

        &.col-lg-5 {
            flex: 0 0 41.6666666667%;
            max-width: 41.6666666667%;
        }

        &.col-lg-6 {
            flex: 0 0 50%;
            max-width: 50%;
        }

        &.col-lg-7 {
            flex: 0 0 58.3333333333%;
            max-width: 58.3333333333%;
        }

        &.col-lg-8 {
            flex: 0 0 66.6666666667%;
            max-width: 66.6666666667%;
        }

        &.col-lg-9 {
            flex: 0 0 75%;
            max-width: 75%;
        }

        &.col-lg-10 {
            flex: 0 0 83.3333333333%;
            max-width: 83.3333333333%;
        }

        &.col-lg-11 {
            flex: 0 0 91.6666666667%;
            max-width: 91.6666666667%;
        }

        &.col-lg-12 {
            flex: 0 0 100%;
            max-width: 100%;
        }

        //////////////////////////////////////////////////

        &.offset-lg-1 {
            margin-left: 8.3333333333%;
        }

        &.offset-lg-2 {
            margin-left: 16.6666666667%;
        }

        &.offset-lg-3 {
            margin-left: 25%;
        }

        &.offset-lg-4 {
            margin-left: 33.3333333333%;
        }

        &.offset-lg-5 {
            margin-left: 41.6666666667%;
        }

        &.offset-lg-6 {
            margin-left: 50%;
        }

        &.offset-lg-7 {
            margin-left: 58.3333333333%;
        }

        &.offset-lg-8 {
            margin-left: 66.6666666667%;
        }

        &.offset-lg-9 {
            margin-left: 75%;
        }

        &.offset-lg-10 {
            margin-left: 83.3333333333%;
        }

        &.offset-lg-11 {
            margin-left: 91.6666666667%;
        }

        &.offset-lg-12 {
            margin-left: 100%;
        }
    }
}
</style>

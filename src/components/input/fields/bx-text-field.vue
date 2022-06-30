<script setup>
import { ref, reactive, toRefs, defineProps, defineEmits, computed, inject } from "vue";
// import draggable from "vuedraggable-axis";

//////////////////////////////////////// Setup

const props = defineProps({
    modelValue: {
        type: [String, Array],
    },
    options: {
        type: Object,
        default: null,
    },
    prependIcon: {
        type: String,
    },
    prependIconInner: {
        type: String,
    },
    appendIcon: {
        type: String,
    },
    appendIconInner: {
        type: String,
    },
    type: {
        type: String,
        default: "text",
    },
    color: {
        type: String,
        default: "dark",
    },
    label: {
        type: String,
    },
    placeholder: {
        type: String,
    },
    hint: {
        type: String,
    },
    hideDetails: {
        type: Boolean,
        default: false,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    events: {
        type: Object,
        default: () => {
            return reactive({
                focused: false,
                touched: false,
                typed: false,
            });
        },
    },
});

const emits = defineEmits(["update:modelValue"]);

//////////////////////////////////////// Inject

const validate = inject("validate");

//////////////////////////////////////// Data

const { touched, typed } = toRefs(props.events);
const text = ref("");
const model = ref(props.modelValue);

//////////////////////////////////////// Computed

const inputPrependIcon = computed(() => {
    if (!props.prependIcon) return;

    return "prepend-icon";
});

const inputPrependIconInner = computed(() => {
    if (!props.prependIconInner) return;

    return "prepend-icon-inner";
});

const inputAppendIcon = computed(() => {
    if (!props.appendIcon) return;

    return "append-icon";
});

const inputAppendIconInner = computed(() => {
    if (!props.appendIconInner) return;

    return "append-icon-inner";
});

const inputNotEmpty = computed(() => {
    if (!props.modelValue || !props.modelValue.length) return;

    return "not-empty";
});

const inputColor = computed(() => {
    if (!props.color) return;

    return `${props.color}--text`;
});

const inputDetails = computed(() => {
    if (props.hideDetails) return;

    return "has-details";
});

const inputMessageColor = computed(() => {
    return `error--text`;
});

const inputValidateMessage = computed(() => {
    return validate(props.modelValue, props.options);
});

const inputValid = computed(() => {
    return (inputValidateMessage.value && touched.value) || (inputValidateMessage.value && typed.value);
});

const inputError = computed(() => {
    if (!inputValid.value) return;

    return "error--text";
});

// const dragOptions = computed(() => {
//     return {
//         animation: 250,
//         disabled: false,
//         ghostClass: "dragging",
//     };
// });

//////////////////////////////////////// Methods

function focus() {
    // focused.value = true;
}

function blur() {
    // focused.value = false;
    touched.value = true;
}

function isArray(model) {
    return Array.isArray(model);
}

function addItem(value) {
    let { max } = props?.options?.value;

    if (max !== 1 && (value.length || value)) {
        if (model.value.length <= max || max === 0) {
            model.value.push(value);
            text.value = "";
        }
    }
}

function removeItem(value) {
    let index = model.value.findIndex((index) => index == value);
    model.value.splice(index, 1);
    text.value = "";
}

function arrayError(index) {
    let valueError = inputError.value && props?.options?.value?.max < props?.modelValue?.length && index == props?.modelValue?.length - 1;

    let characterError =
        inputError.value &&
        props?.modelValue.some((value, itemIndex) => {
            let min = props?.options?.character?.min > value?.length && index == itemIndex;
            let max = props?.options?.character?.max < value?.length && index == itemIndex;

            return min || max;
        });

    let numberError =
        inputError.value &&
        props?.modelValue.some((value, itemIndex) => {
            let min = props?.options?.number?.min > value && index == itemIndex;
            let max = props?.options?.number?.max < value && index == itemIndex;

            return min || max;
        });

    return valueError || characterError || numberError;
}

function emit(e) {
    if (!typed.value) typed.value = true;

    let { max } = props?.options?.value;

    if (max === 1) {
        emits("update:modelValue", e.target.value);
    }
}

// function reset() {
//     focused.value = false;
//     touched.value = false;
//     typed.value = false;
// }
</script>

<template>
    <div class="bx-input">
        <template v-if="readOnly">
            <label class="bx-input__label" :class="[inputColor, inputError]" v-if="label">{{ label }}</label>

            <template v-if="isArray(modelValue)">
                <template v-if="modelValue && modelValue.length">
                    <ul>
                        <li v-for="(item, index) in modelValue" :key="index" v-html="item ? item : '—'"></li>
                    </ul>
                </template>

                <template v-else>
                    <p>—</p>
                </template>
            </template>

            <template v-else>
                <div v-html="modelValue ? modelValue : '—'"></div>
            </template>
        </template>

        <template v-else>
            <template v-if="isArray(modelValue)">
                <div class="mb-3">
                    <!-- <draggable :list="modelValue" v-bind="dragOptions" handle=".handle"> -->
                    <!-- <transition-group name="list"> -->
                    <bx-card class="pa-1 mb-2 rounded-md elevation-xs" :class="{ error: arrayError(index) }" v-for="(item, index) in modelValue" :key="index">
                        <div class="d-flex align-center justify-space-between fill-width">
                            <div class="mr-2 d-flex align-center">
                                <bx-btn class="handle mr-2" transparent color="dark" size="sm" icon :class="{ 'white--text': arrayError(index) }">
                                    <bx-icon color="dark" size="sm">grid</bx-icon>
                                </bx-btn>

                                <div class="text-overflow" :class="{ 'white--text': arrayError(index) }">
                                    <b class="small--text">{{ item }}</b>
                                </div>
                            </div>

                            <bx-btn class="ml-2" transparent color="dark" size="sm" icon @click="removeItem(item)" :class="{ 'white--text': arrayError(index) }">
                                <bx-icon color="dark" size="sm">close</bx-icon>
                            </bx-btn>
                        </div>
                    </bx-card>
                    <!-- </transition-group> -->
                    <!-- </draggable> -->
                </div>
            </template>

            <div class="bx-input__inner" :class="[inputPrependIcon, inputPrependIconInner, inputAppendIcon, inputAppendIconInner, inputError]">
                <label class="bx-input__label" :class="[inputColor, inputError]" v-if="label">{{ label }}</label>

                <span class="bx-input__icon prepend" :class="[inputDetails]" v-if="prependIcon">
                    <bx-icon :color="color">{{ prependIcon }}</bx-icon>
                </span>

                <div class="bx-input__content">
                    <input :type="type" v-model="text" @input="emit" class="bx-input__field" :class="[inputNotEmpty]" @focus="focus" @blur="blur" @keydown.enter.prevent="addItem(text)" placeholder />
                    <label class="bx-input__label">{{ placeholder }}</label>

                    <span class="bx-input__icon prepend-inner" v-if="prependIconInner">
                        <bx-icon :color="color">{{ prependIconInner }}</bx-icon>
                    </span>

                    <span class="bx-input__icon append-inner" v-if="appendIconInner">
                        <bx-icon :color="color">{{ appendIconInner }}</bx-icon>
                    </span>
                </div>

                <span class="bx-input__icon append" :class="[inputDetails]" v-if="appendIcon">
                    <bx-icon :color="color">{{ appendIcon }}</bx-icon>
                </span>

                <transition>
                    <div class="bx-input__details" v-if="!hideDetails">
                        <template v-if="inputValid">
                            <label class="bx-input__message" :class="[inputMessageColor]">{{ inputValidateMessage }}</label>
                        </template>

                        <template v-else-if="hint">
                            <label class="bx-input__hint">{{ hint }}</label>
                        </template>
                    </div>
                </transition>
            </div>
        </template>
    </div>
</template>

<style lang="scss"></style>

<script setup>
import { ref, reactive, toRefs, defineEmits, computed } from "vue";
import { validate, isArray, isNumber } from "../../../composables/bx-validate.js";
import draggable from "vuedraggable";

//////////////////////////////////////// Setup

const props = defineProps({
    modelValue: {
        type: [String, Array],
    },
    options: {
        type: Object,
        default: null,
    },
    minWidth: {
        type: [Number, String],
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
    loading: {
        type: Boolean,
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    simple: {
        type: Boolean,
        default: false,
    },
    shadow: {
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

const emits = defineEmits(["update:modelValue", "click:prepend", "click:prepend-inner", "click:append", "click:append-inner"]);

//////////////////////////////////////// Data

const { touched, typed, focused } = toRefs(props.events);

// We need to use model instead of modelValue for the draggable elements
// Computed values need to be props.modelValue?
const model = ref(props.modelValue);
const text = ref("");
const drag = ref(false);

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
    if ((text.value && text.value.length) || (text.value && isNumber(text.value))) return "not-empty";
    return;
});

const inputTextColor = computed(() => {
    if (!props.color) return;

    return `${props.color}--text`;
});

const inputBackgroundColor = computed(() => {
    if (!props.color || !focused.value) return "dark";

    return `${props.color}`;
});

const inputDetails = computed(() => {
    if (props.hideDetails) return;

    return "has-details";
});

const inputValidateMessage = computed(() => {
    return validate(model.value, props.options);
});

const inputInvalid = computed(() => {
    return (inputValidateMessage.value && touched.value) || (inputValidateMessage.value && typed.value);
});

const inputTextError = computed(() => {
    if (!inputInvalid.value) return;

    return "error--text";
});

const inputBackgroundError = computed(() => {
    if (!inputInvalid.value) return;

    return "error";
});

const inputDisabled = computed(() => {
    if (!props.disabled) return;

    return "disabled";
});

const inputSimple = computed(() => {
    if (!props.simple) return;

    return "simple";
});

const inputShadow = computed(() => {
    if (!props.shadow) return;

    return "shadow";
});

const inputSearch = computed(() => {
    if (!props.options || !props.options?.type || props?.options?.type !== "search") return false;

    return true;
});

const inputHasSearch = computed(() => {
    if (!inputSearch.value) return;

    return "has-search";
});

const inputActions = computed(() => {
    if (inputSearch.value || isArray(model.value)) return true;

    return false;
});

const inputHasEnter = computed(() => {
    if (!isArray(model.value)) return;

    return "has-enter";
});

const inputWidth = computed(() => {
    if (!props.minWidth) return {};

    return {
        minWidth: `${props.minWidth}px`,
    };
});

const dragOptions = computed(() => {
    return {
        animation: 200,
        // Add this for list swapping - causing me issues
        // group: "card",
        disabled: false,
        ghostClass: "ghost",
    };
});

const dragData = computed(() => {
    return {
        tag: "div",
        type: "transition-group",
        name: !drag.value ? "flip-list" : null,
    };
});

//////////////////////////////////////// Methods

function focus() {
    focused.value = true;
}

function blur() {
    focused.value = false;
    touched.value = true;
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

function removeItem(index) {
    model.value.splice(index, 1);
    text.value = "";
}

function arrayError(index) {
    let valueError = inputTextError.value && props?.options?.value?.max !== 0 && props?.options?.value?.max < model?.value?.length && index == model?.value?.length - 1;

    let characterError =
        inputTextError.value &&
        model?.value?.some((value, itemIndex) => {
            let min = props?.options?.character?.min > value?.length && index == itemIndex;
            let max = props?.options?.character?.max < value?.length && index == itemIndex;

            return min || max;
        });

    let numberError =
        inputTextError.value &&
        model?.value?.some((value, itemIndex) => {
            let min = props?.options?.number?.min > value && index == itemIndex;
            let max = props?.options?.number?.max < value && index == itemIndex;

            return min || max;
        });

    return valueError || characterError || numberError;
}

function clear() {
    text.value = "";
    emits("update:modelValue", text.value);
}

function emit(e) {
    if (!typed.value) typed.value = true;

    let { max } = props?.options?.value;

    if (max === 1) {
        model.value = e.target.value;
        emits("update:modelValue", e.target.value);
    }
}

// function dragUpdate(e) {
//     if (e.added) {
//         emits("update:modelValue", [e.added.element]);
//     }

//     // if (e.removed) {
//     //     removeItem(e.removed.index);
//     // }
// }

// function reset() {
//     focused.value = false;
//     touched.value = false;
//     typed.value = false;
// }
</script>

<template>
    <div class="bx-input" :class="[inputDisabled]">
        <template v-if="readOnly">
            <label class="bx-input__label" :class="[inputTextColor, inputTextError]" v-if="label">{{ label }}</label>

            <template v-if="isArray(model)">
                <template v-if="model && model.length">
                    <ul>
                        <li v-for="(item, index) in model" :key="index" v-html="item ? item : '—'"></li>
                    </ul>
                </template>

                <template v-else>
                    <p>—</p>
                </template>
            </template>

            <template v-else>
                <div v-html="model ? model : '—'"></div>
            </template>
        </template>

        <template v-else>
            <template v-if="isArray(model) && model.length">
                <div class="mb-3">
                    <draggable v-model="model" handle=".handle" :component-data="dragData" v-bind="dragOptions" @start="drag = true" @end="drag = false" item-key="index">
                        <template v-slot:item="{ element, index }">
                            <bx-card class="pa-1 mb-2 rounded-md elevation-xs" :class="{ error: arrayError(index) }" :key="index">
                                <div class="d-flex align-center justify-space-between fill-width">
                                    <div class="mr-2 d-flex align-center">
                                        <bx-btn class="handle mr-2" transparent :color="arrayError(index) ? 'white' : 'dark'" size="sm" icon>
                                            <bx-icon :color="arrayError(index) ? 'white' : 'dark'" size="sm" icon="move"></bx-icon>
                                        </bx-btn>

                                        <div class="text-overflow">
                                            <b class="small--text" :class="[arrayError(index) ? 'white--text' : 'dark--text']">{{ element }}</b>
                                        </div>
                                    </div>

                                    <bx-btn class="ml-2" transparent :color="arrayError(index) ? 'white' : 'dark'" size="sm" icon @click="removeItem(index)">
                                        <bx-icon :color="arrayError(index) ? 'white' : 'dark'" size="sm" icon="close"></bx-icon>
                                    </bx-btn>
                                </div>
                            </bx-card>
                        </template>
                    </draggable>
                </div>
            </template>

            <div class="bx-input__inner" :class="[inputPrependIcon, inputPrependIconInner, inputAppendIcon, inputAppendIconInner, inputTextError, inputHasEnter, inputHasSearch]">
                <label class="bx-input__label" :class="[inputTextColor, inputTextError]" v-if="label">{{ label }}</label>

                <span class="bx-input__icon prepend" :class="[inputDetails]" @click="$emit('click:prepend')" v-if="prependIcon" v-ripple>
                    <bx-icon :color="inputBackgroundColor" :icon="prependIcon"></bx-icon>
                </span>

                <div class="bx-input__content" :class="[inputSimple, inputShadow]">
                    <input :type="type" v-model="text" @input="emit" class="bx-input__field" :class="[inputNotEmpty]" :style="[inputWidth]" @focus="focus" @blur="blur" @keydown.enter.exact="addItem(text)" :disabled="disabled" placeholder />

                    <div class="bx-input__underline" v-if="inputSimple">
                        <div class="bx-input__underline-inner" :class="[inputBackgroundColor, inputBackgroundError]"></div>
                    </div>

                    <label class="bx-input__label">{{ placeholder }}</label>

                    <span class="bx-input__icon prepend-inner" @click="$emit('click:prepend-inner')" v-if="prependIconInner" v-ripple>
                        <bx-icon :color="inputBackgroundColor" :icon="prependIconInner"></bx-icon>
                    </span>

                    <template v-if="!loading">
                        <div class="action-buttons" v-if="inputActions">
                            <span class="bx-input__enter" v-if="isArray(model)">
                                <span class="styled-button" @click="addItem(text)">
                                    <bx-icon size="xs" icon="arrow-left"></bx-icon>
                                </span>
                            </span>

                            <bx-btn class="ml-1" transparent color="dark" size="sm" icon :disabled="!focused && !inputNotEmpty" @click="clear()" v-if="inputSearch">
                                <bx-icon color="dark" size="sm" icon="close"></bx-icon>
                            </bx-btn>
                        </div>

                        <span class="bx-input__icon append-inner" @click="$emit('click:append-inner')" v-if="appendIconInner" v-ripple>
                            <bx-icon :color="inputBackgroundColor" :icon="appendIconInner"></bx-icon>
                        </span>
                    </template>

                    <template v-else>
                        <bx-loading class="bx-input__loading" :color="[color, inputBackgroundError]"></bx-loading>
                    </template>
                </div>

                <span class="bx-input__icon append" :class="[inputDetails]" @click="$emit('click:append')" v-if="appendIcon" v-ripple>
                    <bx-icon :color="inputBackgroundColor" :icon="appendIcon"></bx-icon>
                </span>

                <div class="bx-input__details" v-if="!hideDetails">
                    <template v-if="inputInvalid">
                        <label class="bx-input__message" :class="[inputTextError]">{{ inputValidateMessage }}</label>
                    </template>

                    <template v-else-if="hint">
                        <label class="bx-input__hint">{{ hint }}</label>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss"></style>

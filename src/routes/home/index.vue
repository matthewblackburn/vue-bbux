<script setup>
import { ref } from "vue";

const one = ref("");
const two = ref([]);
const three = ref([]);
const four = ref([]);
const five = ref("");

const textOne = {
    component: "bx-text-field",
    type: "text",
    // Number of items
    value: {
        min: 1,
        max: 1,
    },
    // Characters per item
    character: {
        min: 3,
        max: 10,
        // text: "This is the error",
    },
};

const textTwo = {
    component: "bx-text-field",
    type: "text",
    // Number of items
    value: {
        min: 1,
        max: 10,
    },
    // Characters per item
    character: {
        min: 3,
        max: 10,
        // text: "This is the error",
    },
};

const textThree = {
    component: "bx-textarea",
    type: "text",
    rows: 6,
    // Number of items
    value: {
        min: 1,
        max: 1,
    },
    // Characters per item
    character: {
        min: 3,
        max: 10,
        // text: "This is the error",
    },
};

const number = {
    component: "bx-text-field",
    type: "number",
    // Number of items
    value: {
        min: 1,
        max: 5,
    },
    // Number value per item
    number: {
        min: 3,
        max: 100,
    },
};

let brush = ref(true);

function test() {
    brush.value = !brush.value;
}
</script>

<template>
    <bx-container>
        <bx-row>
            <bx-col class="d-flex flex-column justify-end" xs="12" sm="6">
                <bx-text-field v-model="one" :options="textOne" :type="textOne.type" shadow color="primary" prepend-icon-inner="search" label="Some label" placeholder="Placeholder"></bx-text-field>
            </bx-col>

            <bx-col class="d-flex flex-column justify-end" xs="12" sm="6">
                <bx-text-field v-model="two" :options="textTwo" :type="textTwo.type" simple color="success" :append-icon-inner="brush ? 'brush' : 'zip'" @click:append-inner="test()" label="Some label" placeholder="Placeholder" hint="Here is the hint"></bx-text-field>
            </bx-col>

            <bx-col class="d-flex flex-column justify-end" xs="12" sm="6">
                <bx-text-field v-model="three" :options="number" :type="number.type" prepend-icon="bookmark" label="Some label" placeholder="Placeholder" hint="Here is the hint"></bx-text-field>
            </bx-col>

            <bx-col class="d-flex flex-column justify-end" xs="12" sm="6">
                <bx-text-field v-model="four" :options="number" :type="number.type" append-icon="bolt" label="Some label" placeholder="Placeholder"></bx-text-field>
            </bx-col>

            <bx-col class="d-flex flex-column" xs="12">
                <bx-textarea v-model="five" :options="textThree" prepend-icon-inner="search" prepend-icon="bookmark" append-icon-inner="brush" append-icon="bolt" label="Some label" placeholder="Placeholder"></bx-textarea>
            </bx-col>
        </bx-row>
    </bx-container>
</template>

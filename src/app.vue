<script setup>
import { RouterView } from "vue-router";
</script>

<template>
    <div class="default">
        <h1>BBUX Plugin</h1>

        <bx-btn color="success" transparent> hello </bx-btn>
        <bx-btn color="warning" hover disabled size="lg"> hello </bx-btn>
        <bx-btn color="error" loading hover> hello </bx-btn>
        <bx-btn color="primary" icon size="xl" :to="{ name: 'home' }">
            <bx-icon>layers</bx-icon>
        </bx-btn>

        <router-view></router-view>
    </div>
</template>

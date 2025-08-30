<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const currentTime = ref<Date>(new Date());

const refreshTime = () => {
  currentTime.value = new Date();
};

let timer: number;

onMounted(() => {
  refreshTime();
  timer = window.setInterval(refreshTime, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <header class="mx-auto w-full">
    <h1 class="mb-2 rounded inline-block mx-auto p-1">Todo App</h1>
    <p class="text-center">Сегодня: {{ currentTime.toLocaleString() }}</p>
    <slot />
  </header>
</template>

<style lang="scss" scoped></style>

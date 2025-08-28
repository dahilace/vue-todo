<script setup lang="ts"></script>

<template>
  <header class="mx-auto">
    <h1 class="text-center">Todo App</h1>
    <p>Сегодня: {{ new Date().toLocaleDateString() }}</p>
    <slot />
  </header>
</template>

<style lang="scss" scoped></style>

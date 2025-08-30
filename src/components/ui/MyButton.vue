<script setup lang="ts">
defineProps<{
  name: string;
  dialog?: boolean;
}>();
</script>

<template>
  <button class="my-btn p-2 inline-block text-center cursor-pointer">
    {{ name }}
  </button>
</template>

<style lang="scss" scoped>
.my-btn.disabled {
  color: color-mix(in srgb, var(--main-color) 50%, transparent 50%);
}
</style>

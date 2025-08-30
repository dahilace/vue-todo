<script setup lang="ts">
import { ref } from 'vue';

const inputData = ref<string>('');

defineProps<{
  label?: string;
  placeholder?: string;
}>();
defineExpose({
  inputData,
});
</script>

<template>
  <label
    >{{ label }}
    <input
      class="bg-white p-1 rounded"
      v-model.trim="inputData"
      type="text"
      :placeholder
  /></label>
</template>

<style lang="scss" scoped></style>

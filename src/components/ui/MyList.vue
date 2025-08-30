<script setup lang="ts">
import MyListItem from './MyListItem.vue';

import type { Task } from '@/assets/types/types';
defineProps<{
  todoList: Task[];
}>();
</script>

<template>
  <ul
    class="list mx-auto px-6 py-2 flex flex-col gap-4 overflow-scroll relative"
  >
    <my-list-item
      v-for="todo in todoList"
      :data="todo"
      :key="todo.id"
      class="item"
    />
  </ul>
</template>

<style lang="scss" scoped>
.list {
  counter-set: abebe;
  height: 60vh;
}
:deep(.item:not(.marked)) {
  &::before {
    font-size: 3rem;
    position: absolute;
    right: 3rem;
    top: 50%;
    opacity: 0.05;
    transform: translateY(-50%);
    content: counter(abebe);
    counter-increment: abebe 1;
  }
}
</style>

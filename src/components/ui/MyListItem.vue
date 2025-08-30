<script setup lang="ts">
import SvgIcon from '../SvgIcon.vue';

import type { Task } from '@/assets/types/types';
import { nextTick, ref, watch } from 'vue';
import { useTasksStore } from '@/stores/tasksStore';

const tasksStore = useTasksStore();
const props = defineProps<{
  data: Task;
}>();

const isEditing = ref<boolean>(false);
const editedText = ref<string>(props.data.text);

const saveEdit = () => {
  if (editedText.value.trim()) {
    tasksStore.updateTask(props.data.id, editedText.value);
  }
  isEditing.value = false;
};

const handleEnter = (e: KeyboardEvent) => {
  if (!e.shiftKey) {
    saveEdit();
  }
};
</script>

<template>
  <li
    @dblclick="isEditing = !isEditing"
    class="todo__item relative flex justify-between p-4 mx-auto w-full min-w-60 z-111"
    :class="{ editing: isEditing, marked: data.isDone }"
  >
    <label class="flex flex-col justify-between">
      <p
        v-if="!isEditing"
        class="item__text text-balance whitespace-pre-wrap overflow-hidden"
      >
        {{ editedText }}
      </p>
      <textarea
        v-else
        class="item__text item__text--input resize-none overflow-visible"
        type="text"
        v-model="editedText"
        @keyup.enter="handleEnter"
      />
      <span class="item__date text-xs opacity-50 whitespace-nowrap">{{
        new Date(data.id).toLocaleString()
      }}</span>
    </label>
    <div>
      <svg-icon
        @click="tasksStore.removeTask(data.id)"
        name="delete"
        class="icon aspect-square w-7 cursor-pointer"
      ></svg-icon>
      <svg-icon
        @click="isEditing = !isEditing"
        name="edit"
        class="icon aspect-square w-7 cursor-pointer"
      ></svg-icon>

      <svg-icon
        v-if="!data.isDone"
        @click="tasksStore.markTask(data.id)"
        class="icon aspect-square w-7 cursor-pointer"
        name="complete"
      ></svg-icon>
      <svg-icon
        v-else
        @click="tasksStore.markTask(data.id)"
        class="icon aspect-square w-7 cursor-pointer"
        name="done"
      ></svg-icon>
    </div>
  </li>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as mixin;
.todo__item {
  max-width: 40rem;
  transition: 0.25s ease background-color;
  &.editing {
    background-color: var(--accent-color-op);
  }
  &.marked {
    opacity: 0.5;
  }
  @include mixin.card-visual;
}
.item__text {
  max-width: 35rem;
}
.item__text--input {
  &:focus {
    outline: none;
  }
}
.icon {
  padding: 0.25rem;
}
</style>

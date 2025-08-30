<script setup lang="ts">
import MyButton from '../ui/MyButton.vue';
import MyList from '../ui/MyList.vue';
import MyDialog from '../ui/MyDialog.vue';
import MyInput from '../ui/MyInput.vue';

import { ref, watch, onMounted } from 'vue';
import type { Task } from '@/assets/types/types';

import { useModalStore } from '@/stores/modalStore';
import { useTasksStore } from '@/stores/tasksStore';
const modalStore = useModalStore();
const tasksStore = useTasksStore();
tasksStore.loadFromLocalStorage();

// const filterList = Array.from(
//   new Set(tasksStore.tasks.map((el) => new Date(el.id).toLocaleDateString()))
// );

// const warningStatus = ref<boolean>(false);
// const tasksArr = ref<Task[]>([]);

// const savedTasks = localStorage.getItem('Dahilace:todos');
// if (savedTasks) {
//   tasksArr.value = JSON.parse(savedTasks);
// }

// watch(
//   tasksArr,
//   (newTasks) => {
//     localStorage.setItem('Dahilace:todos', JSON.stringify(tasksArr.value));
//   },
//   { deep: true }
// );

// function addTask() {
//   tasksArr.value.push({
//     id: Date.now(),
//     text: inputData.value,
//     isDone: false,
//   });
//   inputData.value = '';
// }

// function removeTask(id: number) {
//   tasksArr.value = tasksArr.value.filter((task) => task.id !== id);
// }

// function removeAllTasks() {
//   tasksArr.value.length = 0;
// }
// Аfunction showWarningDialog() {
//   warningStatus.value = true;
//   modalStore.isModalOpen = true;
// }
const inputRef = ref<InstanceType<typeof MyInput> | null>(null);
</script>

<template>
  <div class="flex justify-center items-center">
    <!-- <label for="">
      Фильтр:<select name="" id="">
        <option v-for="item in filterList" value="">
          {{ item }}
        </option>
      </select>
    </label> -->
    <my-input
      ref="inputRef"
      label="Новые задачи:"
      placeholder="Введите задачу..."
      @keydown.enter="
        [
          tasksStore.addTask(inputRef?.inputData.trim() as string),
          inputRef ? (inputRef.inputData = '') : '',
        ]
      "
    />
    <my-button
      :class="{ disabled: !inputRef?.inputData.trim() }"
      :disabled="!inputRef?.inputData.trim()"
      @click="
        [
          tasksStore.addTask(inputRef?.inputData as string),
          inputRef ? (inputRef.inputData = '') : '',
        ]
      "
      name="Добавить"
    />
  </div>
  <div class="flex flex-col gap-4">
    <div class="text-center">
      <p class="uppercase">
        {{ tasksStore.tasks.length ? 'Лист задач' : 'Лист задач пуст' }}
      </p>
      <div v-if="tasksStore.tasks.length">
        <p>Всего: {{ tasksStore.tasks.length }}</p>
        <p>
          {{
            tasksStore.tasks.filter((el) => !el.isDone).length
              ? `Осталось: ${
                  tasksStore.tasks.filter((el) => !el.isDone).length
                }`
              : 'Все задачи выполнены!'
          }}
        </p>
      </div>
    </div>
    <div class="list-wrapper relative">
      <my-list :todo-list="tasksStore.tasks" />
    </div>
    <my-button
      class="mx-auto"
      name="Удалить всё"
      v-if="tasksStore.tasks.length"
      @click="modalStore.openModal()"
    />
  </div>
  <my-dialog />
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as mixin;
.list-wrapper {
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.25rem;
    top: 0;
    z-index: 112;
    @include mixin.bg-gradient;
    background-attachment: fixed;
  }
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.25rem;
    bottom: 0;
    z-index: 112;
    @include mixin.bg-gradient;
    background-attachment: fixed;
  }
}
</style>

<script setup lang="ts">
import LayHeader from './components/layouts/LayHeader.vue';
import LayFooter from './components/layouts/LayFooter.vue';

import { ref, watch } from 'vue';
import { useModalStore } from './stores/modalStore';

const modalStore = useModalStore();

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

// const warningStatus = ref<boolean>(false);
const tasksArr = ref<Todo[]>([]);
const inputData = ref('');

const savedTasks = localStorage.getItem('Dahilace:todos');
if (savedTasks) {
  tasksArr.value = JSON.parse(savedTasks);
}

watch(
  tasksArr,
  (newTasks) => {
    localStorage.setItem('Dahilace:todos', JSON.stringify(tasksArr.value));
  },
  { deep: true }
);

function addTask() {
  tasksArr.value.push({
    id: Date.now(),
    text: inputData.value,
    isDone: false,
  });
  inputData.value = '';
}

function removeTask(id: number) {
  tasksArr.value = tasksArr.value.filter((task) => task.id !== id);
}

// Аfunction showWarningDialog() {
//   warningStatus.value = true;
//   modalStore.isModalOpen = true;
// }

function removeAllTasks() {
  tasksArr.value.length = 0;
}
</script>

<template>
  <div class="wrapper w-full h-full flex flex-col min-h-screen relative">
    <lay-header />
    <main>
      <div>
        <label
          >Задача:<input
            v-model="inputData"
            type="text"
            placeholder="Введите задачу..."
        /></label>
        <button
          :class="{ disabled: !inputData }"
          :disabled="!inputData"
          @click="addTask"
        >
          Добавить
        </button>
      </div>
      <div>
        <p class="uppercase">
          {{ tasksArr.length ? 'Лист задач' : 'Лист задач пуст' }}
        </p>
        <button v-if="tasksArr.length" @click="modalStore.openModal">
          Удалить всё
        </button>
        <ul v-if="tasksArr.length">
          <li v-for="todo in tasksArr">{{ todo }}</li>
        </ul>
      </div>
      <div @click.self="modalStore.closeModal" v-if="modalStore.isModalOpen">
        <div>
          <p>Вы уврены?</p>
          <button @click="[removeAllTasks(), modalStore.closeModal()]">
            Удалить
          </button>
          <button @click="modalStore.closeModal">Отмена</button>
        </div>
      </div>
    </main>
    <lay-footer class="mt-auto" />
  </div>
</template>

<style scoped>
/* .dialog {
  width: 100%;
  height: 100%;
  z-index: 1000;
  inset: 0;
  position: fixed;
  display: flex;
  background-color: var(--gray);
} */
</style>

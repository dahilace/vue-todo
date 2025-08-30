<script setup lang="ts">
import MyButton from './MyButton.vue';

import { useModalStore } from '@/stores/modalStore';
import { useTasksStore } from '@/stores/tasksStore';

const tasksStore = useTasksStore();
const modalStore = useModalStore();
</script>

<template>
  <div
    @click.self="modalStore.closeModal"
    v-if="modalStore.isModalOpen"
    class="dialog__overlay fixed top-0 left-0 flex h-screen w-screen overflow-hidden z-1111"
  >
    <div class="dialog__content mx-auto self-center text-center p-2">
      <p>Вы уврены, что хотите удалить всё?</p>
      <my-button
        name="Удалить"
        @click="[tasksStore.purgeTasks(), modalStore.closeModal()]"
      />
      <my-button name="Отмена" @click="modalStore.closeModal" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as mixin;
.dialog__overlay {
  background-color: var(--main-overlay);
}
.dialog__content {
  @include mixin.card-visual;
}
</style>

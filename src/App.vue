<script setup lang="ts">
import LayHeader from './components/shell/ShellHeader.vue';
import LayFooter from './components/shell/ShellFooter.vue';

import AppMain from './components/general/AppMain.vue';
</script>

<template>
  <div
    class="wrapper px-2 w-full h-screen overflow-hidden flex flex-col min-h-screen relative gap-4"
  >
    <lay-header />
    <main>
      <app-main />
    </main>
    <lay-footer class="mt-auto" />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixins' as mixin;
.wrapper {
  @include mixin.bg-gradient;
}
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

import { defineStore } from "pinia";

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalOpen: false
  }),
  actions: {
    openModal() {
      this.isModalOpen = true
      document.body.classList.add('overflow-hidden')
    },
    closeModal() {
      this.isModalOpen = false
      document.body.classList.remove('overflow-hidden')
    }
  }
})
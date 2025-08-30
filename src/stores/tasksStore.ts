import { defineStore } from "pinia";
import type { Task } from "@/assets/types/types";

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as Task[]
  }),
  actions: {
    addTask(task: string) {
      this.tasks.push({
        text: task,
        id: Date.now(),
        isDone: false,
      })
      this.saveToLocalStorage()
      this.sortTasks()
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter(el => el.id !== id)
      this.saveToLocalStorage()
    },
    updateTask(id: number, newText: string) {
      this.tasks[this.tasks.findIndex(el => el.id === id)].text = newText
      this.saveToLocalStorage()
    },
    purgeTasks() {
      this.tasks.length = 0
      this.saveToLocalStorage()
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('dahilace:todo')
      if (data) {
        this.tasks = JSON.parse(data)
      }
    },
    saveToLocalStorage() {
      localStorage.setItem('dahilace:todo', JSON.stringify(this.tasks))
    },
    markTask(id: number) {
      this.tasks[this.tasks.findIndex(el => el.id === id)].isDone = !this.tasks[this.tasks.findIndex(el => el.id === id)].isDone
      this.sortTasks()
      this.saveToLocalStorage()
    },
    sortTasks() {
      this.tasks.sort((a, b) => +a.isDone - +b.isDone)
    }
  }
})
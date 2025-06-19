import { ref } from "vue"
import { defineStore } from "pinia"

import Minesweeper from "./model"

export const useMinesweeperStore = defineStore('minesweeper', () => {
  const minesweeper = ref(null)

  const createMinesweeper = (level) => {
    minesweeper.value = new Minesweeper(level)
  }

  return {
    minesweeper,
    createMinesweeper,
  }
})

import { ref, toRaw } from "vue"
import { defineStore } from "pinia"

import Minesweeper from "./model"

export const useMinesweeperStore = defineStore('minesweeper', () => {
  const minesweeper = ref(null)

  const createMinesweeper = (level) => {
    minesweeper.value = new Minesweeper(level)
  }

  const reveal = (coords) => {
    if (!isValid(minesweeper)) {
      return
    }

    return toRaw(minesweeper.value).try(coords)
  }

  const isFlagMode = () => {
    if (!isValid(minesweeper)) {
      return
    }

    const result = minesweeper.value.isFlagMode()

    return result && !minesweeper.value.isFinished
  }

  const isWon = () => {
    return minesweeper.value?.isWon() || false
  }

  const isFinished = () => {
    return minesweeper.value?.isFinished() || false
  }

  const incrementScore = () => {
    if (!isValid(minesweeper)) {
      return
    }

    minesweeper.value.incrementScore(1)
  }

  const getNeighbors = (coords, strict = false) => {
    if (!isValid(minesweeper)) {
      return []
    }

    return toRaw(minesweeper.value).getNeighbors(coords, strict)
  }

  return {
    minesweeper,
    createMinesweeper,
    reveal,
    isFlagMode,
    isWon,
    isFinished,
    incrementScore,
    getNeighbors,
  }
})

const isValid = (minesweeper) => {
  return minesweeper.value && !minesweeper.value.isFinished();
}

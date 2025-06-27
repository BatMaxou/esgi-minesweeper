import { ref, toRaw, watch } from "vue"
import { defineStore } from "pinia"

import Minesweeper from "./model"

export const useMinesweeperStore = defineStore('minesweeper', () => {
  const minesweeper = ref(null)
  const isReset = ref(false)
  const isFinished = ref(false)
  const isWon = ref(false)
  const isFlagMode = ref(false)

  const resetMinesweeper = () => {
    isReset.value = true
    minesweeper.value = null
    isFinished.value = false
    isWon.value = false
    isFlagMode.value = false
  }

  const createMinesweeper = (level) => {
    isReset.value = false
    minesweeper.value = new Minesweeper(level)
  }

  const reveal = (coords) => {
    if (!isValid(minesweeper)) {
      return
    }

    const value = toRaw(minesweeper.value).try(coords)

    isFinished.value = minesweeper.value.isFinished()

    return value
  }

  const handleFlagMode = () => {
    if (!isValid(minesweeper)) {
      return
    }

    minesweeper.value.handleFlagMode()
    isFlagMode.value = minesweeper.value.isFlagMode()
  }

  const incrementScore = () => {
    if (!isValid(minesweeper)) {
      return
    }

    minesweeper.value.incrementScore(1)

    isWon.value = minesweeper.value.isWon()
    isFinished.value = minesweeper.value.isFinished()
  }

  const getNeighbors = (coords, strict = false) => {
    if (!isValid(minesweeper)) {
      return []
    }

    return toRaw(minesweeper.value).getNeighbors(coords, strict)
  }

  return {
    minesweeper,
    isWon,
    isFlagMode,
    isFinished,
    isReset,
    createMinesweeper,
    resetMinesweeper,
    reveal,
    incrementScore,
    getNeighbors,
    handleFlagMode,
  }
})

const isValid = (minesweeper) => {
  return minesweeper.value && !minesweeper.value.isFinished();
}

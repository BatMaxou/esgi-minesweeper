import { ref, toRaw } from "vue";
import { defineStore } from "pinia";

import Minesweeper from "./model";

export const useMinesweeperStore = defineStore("minesweeper", () => {
  // Récupération de la difficulté depuis le localStorage ou par défaut initialisé à 1
  const savedDifficulty = Number(localStorage.getItem("minesweeper-difficulty"));
  const difficulty = ref([1, 2, 3].includes(savedDifficulty) ? savedDifficulty : 1);
  const minesweeper = ref(null);

  const setDifficulty = (level) => {
    difficulty.value = level;
    localStorage.setItem("minesweeper-difficulty", level);
  };

  const createMinesweeper = (level) => {
    setDifficulty(level);
    minesweeper.value = new Minesweeper(level);
  };

  const reveal = (coords) => {
    if (!isValid(minesweeper)) {
      return;
    }

    return toRaw(minesweeper.value).try(coords);
  };

  const isFlagMode = () => {
    if (!isValid(minesweeper)) {
      return;
    }

    const result = minesweeper.value.isFlagMode();

    return result && !minesweeper.value.isFinished;
  };

  const isWon = () => {
    return minesweeper.value?.isWon() || false;
  };

  const isFinished = () => {
    return minesweeper.value?.isFinished() || false;
  };

  const incrementScore = () => {
    if (!isValid(minesweeper)) {
      return;
    }

    minesweeper.value.incrementScore(1);
  };

  const getNeighbors = (coords, strict = false) => {
    if (!isValid(minesweeper)) {
      return [];
    }

    return toRaw(minesweeper.value).getNeighbors(coords, strict);
  };

  return {
    minesweeper,
    difficulty,
    setDifficulty,
    createMinesweeper,
    reveal,
    isFlagMode,
    isWon,
    isFinished,
    incrementScore,
    getNeighbors,
  };
});

const isValid = (minesweeper) => {
  return minesweeper.value && !minesweeper.value.isFinished();
};

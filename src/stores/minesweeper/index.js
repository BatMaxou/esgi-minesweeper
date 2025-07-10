import { computed, ref, toRaw } from "vue";
import { defineStore } from "pinia";

import Minesweeper from "./model";

export const useMinesweeperStore = defineStore("minesweeper", () => {
  const minesweeper = ref(null);
  const isReset = ref(false);
  const isFinished = ref(false);
  const isWon = ref(false);
  const isFlagMode = ref(false);
  const difficulty = ref(parseInt(localStorage.getItem("minesweeper-difficulty")) || 1);
  const dimension = computed(() => (minesweeper.value ? minesweeper.value.dimension : 0));
  const durationByDifficulty = {
    1: 300,
    2: 180,
    3: 120,
  };
  const duration = computed(() => durationByDifficulty[difficulty.value]);

  const resetMinesweeper = () => {
    isReset.value = true;
    minesweeper.value = null;
    isFinished.value = false;
    isWon.value = false;
    isFlagMode.value = false;
  };

  const createMinesweeper = (level = difficulty.value) => {
    isReset.value = false;
    minesweeper.value = new Minesweeper(level);
  };

  const setDifficulty = (level) => {
    difficulty.value = level;
    localStorage.setItem("minesweeper-difficulty", level.toString());
  };

  const reveal = (coords) => {
    if (!isValid(minesweeper)) {
      return;
    }

    const value = toRaw(minesweeper.value).try(coords);

    isFinished.value = minesweeper.value.isFinished();

    return value;
  };

  const handleFlagMode = () => {
    if (!isValid(minesweeper)) {
      return;
    }

    minesweeper.value.handleFlagMode();
    isFlagMode.value = minesweeper.value.isFlagMode();
  };

  const incrementScore = () => {
    if (!isValid(minesweeper)) {
      return;
    }

    minesweeper.value.incrementScore(1);

    isWon.value = minesweeper.value.isWon();
    isFinished.value = minesweeper.value.isFinished();
  };

  const endGameByTimer = () => {
    if (!isValid(minesweeper)) {
      return;
    }

    isFinished.value = true;
    isWon.value = false;
  };

  const getNeighbors = (coords, strict = false) => {
    if (!isValid(minesweeper)) {
      return [];
    }

    return toRaw(minesweeper.value).getNeighbors(coords, strict);
  };

  return {
    minesweeper,
    isWon,
    isFlagMode,
    isFinished,
    isReset,
    dimension,
    difficulty,
    duration,
    createMinesweeper,
    resetMinesweeper,
    reveal,
    incrementScore,
    getNeighbors,
    handleFlagMode,
    endGameByTimer,
    setDifficulty,
  };
});

const isValid = (minesweeper) => {
  return minesweeper.value && !minesweeper.value.isFinished();
};

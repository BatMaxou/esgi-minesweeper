<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useMinesweeperStore } from "@/stores/minesweeper";
import Table from "@/components/minesweeper/Table.vue";
import Timer from "@/components/minesweeper/Timer.vue";

const store = useMinesweeperStore();
const { minesweeper, isFinished, dimension, difficulty, duration } = storeToRefs(store);
const { createMinesweeper, resetMinesweeper, handleFlagMode, setDifficulty, setDuration } = store;

const max = computed(() => {
  return minesweeper.value
    ? minesweeper.value.dimension * minesweeper.value.dimension -
        minesweeper.value.nbBombByDifficulty[minesweeper.value.level]
    : 0;
});

const difficultyLabels = {
  1: "Facile",
  2: "Moyen",
  3: "Difficile",
};

const handleDifficultyChange = (level) => {
  setDifficulty(level);
  if (minesweeper.value) {
    createMinesweeper(level);
  }
};
</script>

<template>
  <h1>Démineur</h1>

  <div>
    <button
      v-for="(label, level) in difficultyLabels"
      :key="level"
      :class="{ active: difficulty == level }"
      @click="handleDifficultyChange(parseInt(level))"
    >
      {{ label }}
    </button>
  </div>

  <button v-if="!minesweeper" @click="createMinesweeper()">Nouvelle partie</button>
  <button v-if="minesweeper" @click="resetMinesweeper()">Abandonner</button>

  <button v-if="minesweeper" @click="handleFlagMode()">Flag</button>
  <p v-if="minesweeper">{{ minesweeper.score }} / {{ max }}</p>

  <Timer :gameStarted="dimension > 0" :gameFinished="isFinished" :duration="duration" />
  <Table />
</template>

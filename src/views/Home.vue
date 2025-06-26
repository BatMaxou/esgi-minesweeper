<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useMinesweeperStore } from "@/stores/minesweeper";
import Table from "@/components/minesweeper/Table.vue";

const store = useMinesweeperStore();
const { createMinesweeper, setDifficulty } = store;
const { minesweeper, difficulty } = storeToRefs(store);

const difficultyLabel = computed(() => {
  switch (difficulty.value) {
    case 1:
      return "Facile";
    case 2:
      return "Moyen";
    case 3:
      return "Difficile";
    default:
      return "";
  }
});

const max = computed(() => {
  return minesweeper.value
    ? minesweeper.value.dimension * minesweeper.value.dimension -
        minesweeper.value.nbBombByDifficulty[minesweeper.value.level]
    : 0;
});
</script>

<template>
  <h1>Démineur</h1>
  <p>
    Difficulté : <b>{{ difficultyLabel }}</b>
  </p>
  <div style="display: flex; gap: 10px; margin-bottom: 20px">
    <button @click="() => setDifficulty(1)" :class="{ selected: difficulty === 1 }">Facile</button>
    <button @click="() => setDifficulty(2)" :class="{ selected: difficulty === 2 }">Moyen</button>
    <button @click="() => setDifficulty(3)" :class="{ selected: difficulty === 3 }">Difficile</button>
  </div>
  <button @click="() => createMinesweeper(difficulty)">Nouvelle partie</button>
  <p v-if="minesweeper">{{ minesweeper.score }} / {{ max }}</p>
  <Table />
</template>

<style scoped>
.selected {
  font-weight: bold;
  background: #e0e0e0;
}
</style>

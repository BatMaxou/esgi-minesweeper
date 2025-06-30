<script setup>
import {computed} from 'vue';
import {storeToRefs} from 'pinia';

import {useMinesweeperStore} from '@/stores/minesweeper';
import Table from '@/components/minesweeper/Table.vue';
import Timer from "@/components/minesweeper/Timer.vue";

const store = useMinesweeperStore();
const {minesweeper, isFinished, dimension} = storeToRefs(store);
const {createMinesweeper, resetMinesweeper, handleFlagMode} = store;

const max = computed(() => {
  return minesweeper.value
    ? minesweeper.value.dimension * minesweeper.value.dimension - minesweeper.value.nbBombByDifficulty[minesweeper.value.level]
    : 0;
});

</script>

<template>
  <h1>Démineur</h1>
  <button v-if="!minesweeper" @click="createMinesweeper(1)">Nouvelle partie</button>
  <button v-if="minesweeper" @click="resetMinesweeper()">Abandonner</button>

  <button v-if="minesweeper" @click="handleFlagMode()">Flag</button>
  <p v-if="minesweeper">{{ minesweeper.score }} / {{ max }}</p>

  <Timer
    :gameStarted="dimension > 0"
    :gameFinished="isFinished"
    :duration="3"
  />
  <Table/>
</template>

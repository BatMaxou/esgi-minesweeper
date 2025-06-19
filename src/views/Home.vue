<script setup>
  import { storeToRefs } from 'pinia';

  import { useMinesweeperStore } from '@/stores/minesweeper';

  const store = useMinesweeperStore();
  const { createMinesweeper } = store;
  const { minesweeper } = storeToRefs(store);
</script>

<template>
  <h1>Démineur</h1>
  <button @click="createMinesweeper(1)">Nouvelle partie</button>

  <p v-if="minesweeper">{{ minesweeper.level }}</p>
</template>

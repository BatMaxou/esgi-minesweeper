<script setup>
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';

  import { useMinesweeperStore } from '@/stores/minesweeper';
  import Table from '@/components/minesweeper/Table.vue';

  const store = useMinesweeperStore();
  const { createMinesweeper } = store;
  const { minesweeper } = storeToRefs(store);

  const max = computed(() => {
    return minesweeper.value
      ? minesweeper.value.dimension * minesweeper.value.dimension - minesweeper.value.nbBombByDifficulty[minesweeper.value.level]
      : 0;
  });
</script>

<template>
  <h1>Démineur</h1>
  <button @click="createMinesweeper(1)">Nouvelle partie</button>

  <p v-if="minesweeper">{{ minesweeper.score }} / {{ max }}</p>

  <Table />
</template>

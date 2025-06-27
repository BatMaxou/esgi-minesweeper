<script setup>
  import { computed, ref, toRaw } from 'vue';
  import { storeToRefs } from 'pinia';

  import { useMinesweeperStore } from '@/stores/minesweeper';
  import Cell from './Cell.vue';

  const toReveal = ref({});
  const store = useMinesweeperStore();
  const { minesweeper } = storeToRefs(store);
  const { getNeighbors } = store;

  const dimension = computed(() => minesweeper.value ? minesweeper.value.dimension : 0);

  const onSpreadReveal = ({ x, y }) => {
    const neighbors = getNeighbors({ x, y }).map(({ x, y }) => {
      return `${x},${y}`;
    });

    neighbors.forEach((neighbor) => {
      if (!toReveal.value[neighbor]) {
        toReveal.value[neighbor] = true;
      }
    });
  };

  const shouldReveal = ({ x, y }) => {
    return toReveal.value[`${x},${y}`] || false;
  };
</script>

<template>
  <table>
    <tbody>
      <tr v-for="x in dimension" :key="x - 1">
        <Cell @spreadReveal="onSpreadReveal" v-for="y in dimension" :key="y - 1" :x="x - 1" :y="y - 1" :forceReveal="shouldReveal({ x: x - 1, y: y - 1 })"/>
      </tr>
    </tbody>
  </table>
</template>

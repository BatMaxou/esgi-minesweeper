<script setup>
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';

  import { useMinesweeperStore } from '@/stores/minesweeper';
  import Cell from './Cell.vue';

  const { minesweeper } = storeToRefs(useMinesweeperStore());
  const dimension = computed(() => minesweeper.value ? minesweeper.value.dimension : 0);
</script>

<template>
  <table>
    <tbody>
      <tr v-for="x in dimension" :key="x - 1">
        <Cell v-for="y in dimension" :key="y - 1" :x="x - 1" :y="y - 1"/>
      </tr>
    </tbody>
  </table>
</template>

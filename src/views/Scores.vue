<script setup>
import {onMounted, ref} from 'vue';
import ScoresTab from '@/components/minesweeper/ScoresTab.vue';

import Button from '@/components/Button.vue';
import {useMinesweeperStore} from '@/stores/minesweeper';

const store = useMinesweeperStore();
const {getDifficultyLabels} = store;

const difficulty = ref(getDifficultyLabels()[1]);

// reset the minesweeper when the component is mounted
onMounted(() => {
  store.resetMinesweeper();
})
</script>

<template>
  <div class="scores-page">
    <h2>🏆 Tableau des scores</h2>

    <div class="tabs">
      <Button
        v-for="(label, level) in getDifficultyLabels()"
        :key="level"
        :active="difficulty == label"
        @click="difficulty = label"
      >
        {{ label }}
      </Button>
    </div>

    <ScoresTab :difficulty="difficulty"/>
  </div>
</template>

<style scoped>
.scores-page {
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
  background: #f9f9f9;
  border: 2px outset #c0c0c0;
  box-shadow: 4px 4px 0 #aaa;
}

h2 {
  text-align: center;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  gap: 8px;
}

.tab-button {
  padding: 8px 16px;
  border: 2px outset #c0c0c0;
  background: #eaeaea;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: 0.2s ease;
}

.tab-button.active {
  background: #fffacd;
  border-style: inset;
  color: #000;
}

.tab-button:hover {
  background-color: #fff;
}
</style>

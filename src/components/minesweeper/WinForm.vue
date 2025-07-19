<script setup>
import {ref} from 'vue';
import {storeToRefs} from 'pinia';

import {useMinesweeperStore} from '@/stores/minesweeper';
import Button from '@/components/Button.vue';

const store = useMinesweeperStore();
const {timeSpent, duration} = storeToRefs(store);
const {getDifficultyLabel, resetMinesweeper} = store;

const pseudo = ref('')

const onSubmit = () => {
  if (pseudo.value === '') {
    alert('Veuillez saisir un pseudo');

    return;
  }

  const key = `minesweeper-${getDifficultyLabel()}-scores`;
  const scores = JSON.parse(localStorage.getItem(key)) || {};
  const result = scores[pseudo.value];
  if (!result || result.time > timeSpent.value) {
    localStorage.setItem(key, JSON.stringify({
      ...scores,
      [pseudo.value]: {
        duration: duration.value,
        time: timeSpent.value,
        date: new Date().toISOString()
      }
    }));
  }

  resetMinesweeper();
}
</script>

<template>
  <h2 class="win-title">Félicitations ! Vous avez gagné !</h2>
  <ul class="win-details">
    <li>Temps passé : {{ timeSpent }} secondes</li>
    <li>Difficulté : {{ getDifficultyLabel() }}</li>
  </ul>
  <form @submit.prevent="onSubmit" class="win-form">
    <input v-model.trim.lazy="pseudo" class="pseudo-input" placeholder="Entrez votre pseudo"/>
    <Button type="submit">Enregistrer</Button>
  </form>
</template>

<style scoped>
.win-form {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pseudo-input {
  width: 100%;
  padding: 8px 12px;
  border: 2px inset #c0c0c0;
  border-radius: 0;
  font-size: 14px;
  background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%);
  box-shadow: inset 1px 1px 0 #808080,
  inset -1px -1px 0 #ffffff;
  box-sizing: border-box;
}

.pseudo-input::placeholder {
  color: #999;
  font-style: italic;
}

.win-title {
  font-size: 24px;
  font-weight: bold;
  color: #2e8b57;
  background-color: #e0ffe0;
  padding: 12px 16px;
  border: 2px solid #4CAF50;
  box-shadow: 2px 2px 0 #a9a9a9;
  margin-bottom: 16px;
  text-align: center;
}

.win-details {
  list-style: none;
  padding: 0;
  margin-bottom: 24px;
  background: #f0f0f0;
  border: 2px inset #c0c0c0;
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  box-shadow: inset 1px 1px 0 #ffffff,
  inset -1px -1px 0 #808080;
}

.win-details li {
  margin-bottom: 8px;
}
</style>

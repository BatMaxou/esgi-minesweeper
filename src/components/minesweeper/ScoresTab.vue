<script setup>
import { ref, onMounted, watch, computed } from 'vue';

const props = defineProps({
  difficulty: {
    type: String,
    required: true
  }
});

const scores = ref([]);

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
};

const formatDate = (date) => {
  return new Date(date).toLocaleString()
};

const getScores = () => {
  const key = `minesweeper-${props.difficulty}-scores`;
  const data = JSON.parse(localStorage.getItem(key)) || {};
  scores.value = Object.entries(data)
    .map(([pseudo, details]) => ({ pseudo, ...details }))
    .sort((a, b) => a.time - b.time);
};

onMounted(getScores);

watch(() => props.difficulty, getScores);
</script>

<template>
  <div class="scores-tab">
    <h3>Scores - Difficulté : {{ difficulty }}</h3>
    <table v-if="scores.length" class="scores-table">
      <thead>
        <tr>
          <th>Pseudo</th>
          <th>Temps (s)</th>
          <th>Durée</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in scores" :key="index">
          <td>{{ score.pseudo }}</td>
          <td>{{ formatTime(score.time) }}</td>
          <td>{{ formatTime(score.duration) }}</td>
          <td>{{ formatDate(score.date) }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucun score enregistré pour cette difficulté.</p>
  </div>
</template>

<style scoped>
.scores-tab {
  padding: 16px;
  background: #f4f4f4;
  border: 2px inset #c0c0c0;
  box-shadow: inset 1px 1px 0 #ffffff,
              inset -1px -1px 0 #808080;
}

.scores-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}

.scores-table th,
.scores-table td {
  border: 1px solid #999;
  padding: 8px 12px;
  text-align: left;
  background: #fff;
}

.scores-table th {
  background-color: #e0e0e0;
  font-weight: bold;
}
</style>

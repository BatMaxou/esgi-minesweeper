<script setup>
import { watch } from 'vue'
import { useTimer } from '@/composables/useTimer'
import { vTimerColor } from '@/directives/timerColor'

const props = defineProps({
  gameStarted: {
    type: Boolean,
    default: false
  },
  gameFinished: {
    type: Boolean,
    default: false
  }
})

const { elapsedTime, formattedTime, isRunning, start, stop, reset } = useTimer()

watch(() => props.gameStarted, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    reset()
    start()
  }
})

watch(() => props.gameFinished, (newValue) => {
  if (newValue && isRunning.value) {
    stop()
  }
})
</script>

<template>
  <div v-if="props.gameStarted" class="timer-container">
    <div class="timer-label">Temps:</div>
    <div 
      class="timer-display"
      v-timer-color="elapsedTime"
    >
      {{ formattedTime }}
    </div>
  </div>
</template>

<style scoped>
.timer-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Courier New', monospace;
  margin: 10px 0;
}

.timer-label {
  font-weight: bold;
  color: #333;
}

.timer-display {
  font-size: 1.2em;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  min-width: 60px;
  text-align: center;
  transition: all 0.3s ease;
}

.timer-display.timer-normal {
  background-color: #f9f9f9;
}

.timer-display.timer-warning {
  background-color: #fff3cd;
  border-color: #ffc107;
}

.timer-display.timer-danger {
  background-color: #f8d7da;
  border-color: #dc3545;
}
</style> 

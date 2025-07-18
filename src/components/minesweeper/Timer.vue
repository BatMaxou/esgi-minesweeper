<script setup>
import { computed, ref, watch } from "vue";
import { storeToRefs } from 'pinia';
import { useTimer } from "@/composables/useTimer";
import { vTimerColor } from "@/directives/timerColor";
import { useMinesweeperStore } from "@/stores/minesweeper";

const props = defineProps({
  gameStarted: {
    type: Boolean,
    default: false,
  },
  gameFinished: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 300,
  },
});

const store = useMinesweeperStore();
const { isFinished } = storeToRefs(store)
const { endGameByTimer, setTimeSpent } = store;

const { remainingTime, formattedTime, isRunning, isTimeUp, elapsedTime, start, stop, reset, setDuration } = useTimer(props.duration);

const showFailedMessage = ref(false);

const displayTime = computed(() => {
  if (showFailedMessage.value) {
    return "Failed";
  }
  return formattedTime.value;
});

watch(
  () => props.duration,
  (newDuration) => {
    setDuration(newDuration);
    reset();
    start();
  }
);

watch(
  () => props.gameStarted,
  (newValue, oldValue) => {
    if (newValue && !oldValue) {
      reset();
      start();
      showFailedMessage.value = false;
    }
  }
);

watch(
  () => props.gameFinished,
  (newValue) => {
    if (newValue && isRunning.value) {
      stop();
    }
  }
);

watch(isTimeUp, (timeUp) => {
  if (timeUp && isRunning.value) {
    stop();
    showFailedMessage.value = true;
    endGameByTimer();
  }
});

watch(isFinished, (isFinished) => {
  if (isFinished) {
    setTimeSpent(elapsedTime.value)
  }
})
</script>

<template>
  <div v-if="props.gameStarted" class="timer-container">
    <div class="timer-label">Temps:</div>
    <div class="timer-display" v-timer-color="{ remainingTime, totalDuration: props.duration }">
      {{ displayTime }}
    </div>
  </div>
</template>

<style scoped>
.timer-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 50%, #b0b0b0 100%);
  border: 2px outset #c0c0c0;
  border-radius: 0;
  padding: 12px 16px;
  box-shadow: inset 1px 1px 0 #ffffff,
  inset -1px -1px 0 #808080,
  2px 2px 3px rgba(0, 0, 0, 0.2);
  width: fit-content;
}

.timer-label {
  font-weight: bold;
  color: #2c3e50;
  text-shadow: 1px 1px 0 #ffffff;
  font-size: 14px;
  letter-spacing: 1px;
}

.timer-display {
  font-size: 16px;
  padding: 8px 12px;
  border: 2px inset #c0c0c0;
  border-radius: 0;
  background: linear-gradient(180deg, #2c2c2c 0%, #1a1a1a 100%);
  min-width: 80px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: inset -1px -1px 0 #ffffff,
  inset 1px 1px 0 #808080,
  0 1px 2px rgba(0, 0, 0, 0.1) inset;
}

.timer-display.timer-normal {
  background: linear-gradient(180deg, #2c2c2c 0%, #1a1a1a 100%);
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
}

.timer-display.timer-warning {
  background: linear-gradient(180deg, #4a3c00 0%, #2d2400 100%);
  color: #ffff00;
  text-shadow: 0 0 5px #ffff00;
  border-color: #8B7355;
}

.timer-display.timer-danger {
  background: linear-gradient(180deg, #4a0000 0%, #2d0000 100%);
  color: #ff0000;
  text-shadow: 0 0 5px #ff0000;
  border-color: #8B4513;
  animation: danger-pulse 1s infinite;
}

@keyframes danger-pulse {
  0%, 100% {
    box-shadow: inset -1px -1px 0 #ffffff,
    inset 1px 1px 0 #808080,
    0 1px 2px rgba(0, 0, 0, 0.1) inset;
  }
  50% {
    box-shadow: inset -1px -1px 0 #ffffff,
    inset 1px 1px 0 #808080,
    0 1px 2px rgba(0, 0, 0, 0.1) inset,
    0 0 10px rgba(255, 0, 0, 0.5);
  }
}

@media (max-width: 768px) {
  .timer-container {
    padding: 10px 12px;
    gap: 8px;
  }

  .timer-label {
    font-size: 12px;
  }

  .timer-display {
    font-size: 14px;
    padding: 6px 8px;
    min-width: 60px;
  }
}

@media (max-width: 480px) {
  .timer-container {
    padding: 8px 10px;
    gap: 6px;
  }

  .timer-label {
    font-size: 11px;
  }

  .timer-display {
    font-size: 12px;
    padding: 4px 6px;
    min-width: 50px;
  }


}
</style>

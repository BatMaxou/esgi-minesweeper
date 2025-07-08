<script setup>
import { computed, ref, watch } from "vue";
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
const { endGameByTimer } = store;

const { remainingTime, formattedTime, isRunning, isTimeUp, start, stop, reset, setDuration } = useTimer(props.duration);

const showBellAnimation = ref(false);
const showFailedMessage = ref(false);

const displayTime = computed(() => {
  if (showFailedMessage.value) {
    return "Failed";
  }
  if (showBellAnimation.value) {
    return ""; // To cancel the duration display
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
      showBellAnimation.value = false;
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

    showBellAnimation.value = true;

    setTimeout(() => {
      showBellAnimation.value = false;
      showFailedMessage.value = true;
    }, 1500); // AFter 1.5 seconds of bell animation

    endGameByTimer();
  }
});
</script>

<template>
  <div v-if="props.gameStarted" class="timer-container">
    <div class="timer-label">Temps:</div>
    <div class="timer-display" v-timer-color="{ remainingTime, totalDuration: props.duration }">
      {{ displayTime }}

      <div v-if="showBellAnimation" class="bell">
        <svg
          height="24px"
          width="24px"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 611.999 611.999"
          xml:space="preserve"
        >
          <g>
            <g>
              <g>
                <path
                  d="M570.107,500.254c-65.037-29.371-67.511-155.441-67.559-158.622v-84.578c0-81.402-49.742-151.399-120.427-181.203 C381.969,34,347.883,0,306.001,0c-41.883,0-75.968,34.002-76.121,75.849c-70.682,29.804-120.425,99.801-120.425,181.203v84.578 c-0.046,3.181-2.522,129.251-67.561,158.622c-7.409,3.347-11.481,11.412-9.768,19.36c1.711,7.949,8.74,13.626,16.871,13.626 h164.88c3.38,18.594,12.172,35.892,25.619,49.903c17.86,18.608,41.479,28.856,66.502,28.856 c25.025,0,48.644-10.248,66.502-28.856c13.449-14.012,22.241-31.311,25.619-49.903h164.88c8.131,0,15.159-5.676,16.872-13.626 C581.586,511.664,577.516,503.6,570.107,500.254z M484.434,439.859c6.837,20.728,16.518,41.544,30.246,58.866H97.32 c13.726-17.32,23.407-38.135,30.244-58.866H484.434z M306.001,34.515c18.945,0,34.963,12.73,39.975,30.082 c-12.912-2.678-26.282-4.09-39.975-4.09s-27.063,1.411-39.975,4.09C271.039,47.246,287.057,34.515,306.001,34.515z M143.97,341.736v-84.685c0-89.343,72.686-162.029,162.031-162.029s162.031,72.686,162.031,162.029v84.826 c0.023,2.596,0.427,29.879,7.303,63.465H136.663C143.543,371.724,143.949,344.393,143.97,341.736z M306.001,577.485 c-26.341,0-49.33-18.992-56.709-44.246h113.416C355.329,558.493,332.344,577.485,306.001,577.485z"
                ></path>
                <path
                  d="M306.001,119.235c-74.25,0-134.657,60.405-134.657,134.654c0,9.531,7.727,17.258,17.258,17.258 c9.531,0,17.258-7.727,17.258-17.258c0-55.217,44.923-100.139,100.142-100.139c9.531,0,17.258-7.727,17.258-17.258 C323.259,126.96,315.532,119.235,306.001,119.235z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timer-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Courier New", monospace;
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

@keyframes realistic-bell-ring {
  0% {
    transform: rotate(0deg);
  }
  5% {
    transform: rotate(-20deg);
  }
  10% {
    transform: rotate(20deg);
  }
  15% {
    transform: rotate(-18deg);
  }
  20% {
    transform: rotate(18deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  30% {
    transform: rotate(15deg);
  }
  35% {
    transform: rotate(-12deg);
  }
  40% {
    transform: rotate(12deg);
  }
  45% {
    transform: rotate(-8deg);
  }
  50% {
    box-shadow: inset -1px -1px 0 #ffffff,
    inset 1px 1px 0 #808080,
    0 1px 2px rgba(0, 0, 0, 0.1) inset,
    0 0 10px rgba(255, 0, 0, 0.5);
  }
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

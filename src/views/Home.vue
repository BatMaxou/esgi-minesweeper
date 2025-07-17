<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useMinesweeperStore } from "@/stores/minesweeper";
import Table from "@/components/minesweeper/Table.vue";
import Timer from "@/components/minesweeper/Timer.vue";
import WinForm from '@/components/minesweeper/WinForm.vue'
import FailedMessage from '@/components/minesweeper/FailedMessage.vue';
import Button from '@/components/Button.vue';
import Pokemon from '@/components/Pokemon.vue';

const store = useMinesweeperStore();
const { minesweeper, isFinished, dimension, difficulty, duration, isFlagMode, timeSpent, isWon } = storeToRefs(store);
const { createMinesweeper, resetMinesweeper, handleFlagMode, setDifficulty, setDuration, getDifficultyLabels  } = store;

const max = computed(() => {
  return minesweeper.value
    ? minesweeper.value.dimension * minesweeper.value.dimension -
        minesweeper.value.nbBombByDifficulty[minesweeper.value.level]
    : 0;
});

const handleDifficultyChange = (level) => {
  setDifficulty(level);
  if (minesweeper.value) {
    createMinesweeper(level);
  }
};
</script>

<template>
  <div class="container">
    <div class="minesweeper-section">
      <h1>Démineur</h1>
      <div v-if="!minesweeper">
        <div class="difficulty-container">
          <Button
            v-for="(label, level) in getDifficultyLabels()"
            :key="level"
            :active="difficulty == level"
            @click="handleDifficultyChange(parseInt(level))"
          >
            {{ label }}
          </Button>
        </div>
      </div>
      <Button v-if="!minesweeper" @click="createMinesweeper(difficulty)">
        <svg class="icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <defs></defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill-rule="evenodd">
              <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -4719.000000)">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M142,4570 C142,4569.448 141.552,4569 141,4569 L127,4569 C126.448,4569 126,4569.448 126,4570 L126,4576 C126,4576.552 126.448,4577 127,4577 L141,4577 C141.552,4577 142,4576.552 142,4576 L142,4570 Z M144,4569 L144,4577 C144,4578.105 143.105,4579 142,4579 L126,4579 C124.895,4579 124,4578.105 124,4577 L124,4569 C124,4567.895 124.895,4567 126,4567 L133,4567 L133,4563 C133,4561.895 133.895,4561 135,4561 L137,4561 C137.552,4561 138,4560.552 138,4560 L138,4559 L140,4559 L140,4561 C140,4562.105 139.105,4563 138,4563 L136,4563 C135.448,4563 135,4563.448 135,4564 L135,4567 L142,4567 C143.105,4567 144,4567.895 144,4569 L144,4569 Z M138,4574 L140,4574 L140,4572 L138,4572 L138,4574 Z M135,4572 C134.448,4572 134,4572.448 134,4573 C134,4573.552 134.448,4574 135,4574 C135.552,4574 136,4573.552 136,4573 C136,4572.448 135.552,4572 135,4572 L135,4572 Z M131,4572 L132,4572 L132,4574 L131,4574 L131,4575 L129,4575 L129,4574 L128,4574 L128,4572 L129,4572 L129,4571 L131,4571 L131,4572 Z"
                    id="game_controller_round-[#795]"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        Nouvelle partie
      </Button>
      <Button v-if="minesweeper" @click="resetMinesweeper()">
        <svg class="icon" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 552.4 552.4" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> <g> <path
            d="M465.7,26.2c0-9.2-4.9-17.1-11.6-22C452.9,3.6,452.3,3,451,2.4c-3.7-1.8-8-2.4-11.6-2.4H113.1l0,0 C98.4,0,86.2,11.6,86.2,26.9v67.9h136.5l-14.1-14.1c-3.7-3.7-3.1-9.2,0-12.9l9.2-9.2c1.8-1.8,3.7-2.4,6.1-2.4 c2.4,0,4.9,0.6,6.7,2.4l45.3,46c1.8,1.8,2.399,3.7,2.399,6.1s-1.199,4.9-2.399,6.7l-45.3,45.9c-3.7,3.7-9.2,3.7-12.9,0l-9.2-9.2 c-3.7-3.7-3.7-9.2,0-12.9l14.7-14.1H86.8v398.4c0,14.7,11.6,26.9,26.3,26.9h326.2c14.7,0,26.9-11.601,26.9-26.9L465.7,26.2z M352.4,170.7c18.399,0,33.7,15.3,33.7,33.7c0,18.4-15.301,33-33.7,33c-18.4,0-33-14.7-33-33C319.4,186.1,333.4,170.7,352.4,170.7z M235,403.8c-7.3,8.601-12.2,11.601-22,11l-74.1-1.199c-9.2-0.601-16.5-9.801-15.9-17.7c0.6-11,8-17.101,18.4-17.101l67.9-0.6 l15.9-21.5l0,0L254,380L235,403.8z M412.4,348.101L351.8,334.7c-4.3-1.2-7.3-4.3-9.199-8L328.5,295.5 c-1.2,1.2-32.399,52.601-32.399,52.601l35.5,26.899c11,9.2,12.199,17.7,8,29.4l-36.7,84.5c-3.101,8-12.2,13.5-21.4,10.399 c-9.2-3.1-15.3-13.5-11-22.6l31.8-76.5l-47.7-36.1c-12.9-8-17.7-23.301-8.6-38.601l42.8-69.8l-31.2-11l-56.3,28.2 c-7.3,4.3-16.5,0.6-20.2-6.1c-3.1-6.1-0.6-14.7,5.5-18.4l58.8-30.6c3.1-1.8,6.1-3.1,9.2-3.1s6.1,0.6,8.6,1.2l49.6,15.9 c1.801,0.6,3.101,1.2,4.301,2.4L344,254.4c3.7,2.4,4.9,6.7,6.101,9.8l13.5,42.2l54.5,14.1c7.3,1.8,11,8.601,11,15.3 C428.3,342,419.8,350,412.4,348.101z"></path> </g> </g></svg>
        Abandonner
      </Button>

      <Button v-if="minesweeper" @click="handleFlagMode()" :class="{'flag-mode': isFlagMode}">
        <svg class="icon" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M5 21V3.90002C5 3.90002 5.875 3 8.5 3C11.125 3 12.875 4.8 15.5 4.8C18.125 4.8 19 3.9 19 3.9V14.7C19 14.7 18.125 15.6 15.5 15.6C12.875 15.6 11.125 13.8 8.5 13.8C5.875 13.8 5 14.7 5 14.7"
              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </g>
        </svg>
        Flag
      </Button>
      <p v-if="minesweeper">{{ minesweeper.score }} / {{ max }}</p>

      <Timer
        :gameStarted="dimension > 0"
        :gameFinished="isFinished"
        :duration="duration"
      />
      <Table/>
      <WinForm v-if="isFinished && isWon" />
      <FailedMessage v-if="isFinished && !isWon" />
    </div>

    <div class="pokemon-section">
      <div class="pokemon-card">
        <div class="pokemon-card-header">
          <span class="pokemon-icon">🎯</span>
          <h3 class="pokemon-title">Random Pokémon</h3>
        </div>
        <div class="pokemon-card-content">
          <Pokemon/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

.minesweeper-section {
  flex: 1;
  min-width: 300px;
  max-width: 800px;
}

.pokemon-section {
  flex-shrink: 0;
  min-width: 200px;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .minesweeper-section {
    width: 100%;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .pokemon-section {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.pokemon-card {
  background: linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 50%, #b0b0b0 100%);
  border: 2px outset #c0c0c0;
  border-radius: 0;
  box-shadow: inset 1px 1px 0 #ffffff,
  inset -1px -1px 0 #808080,
  2px 2px 3px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  min-width: 250px;
  max-width: 300px;
}

.pokemon-card-header {
  background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #a0a0a0 100%);
  border-bottom: 2px solid #808080;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: inset 1px 1px 0 #ffffff,
  inset -1px -1px 0 #808080;
}

.pokemon-icon {
  font-size: 20px;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.pokemon-title {
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  text-shadow: 1px 1px 0 #ffffff;
  margin: auto;
  letter-spacing: 1px;
}

.pokemon-card-content {
  padding: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f8f8f8 100%);
  border: 1px inset #c0c0c0;
  margin: 2px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset -1px -1px 0 #ffffff,
  inset 1px 1px 0 #808080;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
    padding: 15px;
  }

  .minesweeper-section {
    width: 100%;
    max-width: none;
  }

  .pokemon-section {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .pokemon-card {
    min-width: 280px;
    max-width: 100%;
  }

  .pokemon-card-header {
    padding: 10px 14px;
  }

  .pokemon-title {
    font-size: 14px;
  }

  .pokemon-card-content {
    padding: 12px;
    min-height: 160px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
    gap: 15px;
  }

  .pokemon-card {
    min-width: 250px;
  }

  .pokemon-card-header {
    padding: 8px 12px;
  }

  .pokemon-icon {
    font-size: 16px;
  }

  .pokemon-title {
    font-size: 12px;
    letter-spacing: 0.5px;
  }

  .pokemon-card-content {
    padding: 10px;
    min-height: 140px;
  }
}

.icon {
  width: 20px;
  height: 20px;
}

.flag-mode {
  background: linear-gradient(180deg, #ff6b6b 0%, #e74c3c 50%, #c0392b 100%) !important;
  border-color: #a93226 !important;
  color: #ffffff !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5) !important;
  box-shadow: inset 1px 1px 0 #ff8a80,
  inset -1px -1px 0 #b71c1c,
  2px 2px 3px rgba(0, 0, 0, 0.3) !important;
}

.flag-mode:hover {
  background: linear-gradient(180deg, #ff8a80 0%, #f44336 50%, #d32f2f 100%) !important;
  border-color: #c62828 !important;
  transform: translateY(-1px) !important;
  box-shadow: inset 1px 1px 0 #ffab91,
  inset -1px -1px 0 #b71c1c,
  3px 3px 5px rgba(0, 0, 0, 0.4) !important;
}

.flag-mode:active {
  background: linear-gradient(180deg, #b71c1c 0%, #d32f2f 50%, #e74c3c 100%) !important;
  border: 2px inset #c62828 !important;
  transform: translateY(1px) !important;
  box-shadow: inset -1px -1px 0 #ff8a80,
  inset 1px 1px 0 #b71c1c,
  1px 1px 2px rgba(0, 0, 0, 0.2) !important;
}

.difficulty-container {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
</style>

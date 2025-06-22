<script setup>
  import { ref, computed } from 'vue';
  import { useMinesweeperStore } from '@/stores/minesweeper';

  const { x, y } = defineProps({
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  });

  const value = ref(null);
  const isFlagged = ref(false);
  const isBombRevealed = ref(false);
  const {
    reveal: tryCell,
    isFlagMode,
    isFinished,
    isWon,
    incrementScore,
  } = useMinesweeperStore();

  const reveal = () => {
    if (value.value !== null || isFinished()) {
      return
    }

    if (isFlagMode()) {
      isFlagged.value = !isFlagged.value

      return
    }

    const result = tryCell({ x, y });
    if (!result && isFinished() && !isWon()) {
      isBombRevealed.value = true

      return
    }

    incrementScore()
    value.value = result
  };

  const cellValue = computed(() => {
    if (isFlagged.value) {
      return '🚩'
    }

    if (isBombRevealed.value) {
      return '💣'
    }

    if (value.value === 0) {
      return ''
    }

    return value.value ?? ''
  });
</script>

<template>
  <td class="cell" @click="reveal">{{ cellValue }}</td>
</template>

<style scoped>
  .cell {
    width: 24px;
    height: 24px;
    border: 1px solid var(--light-grey);
    padding: 5px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    background-color: var(--light-grey);
    transition-property: background-color, box-shadow;
    transition-duration: .5s;
    transition-timing-function: ease-out;

    &:hover {
        background-color: var(--grey);
    }
  }

  @media (max-width:900px) {
    .cell {
      width: 15px;
      height: 15px;
      padding: 2px;
      font-size: 12px;
    }
  }
</style>

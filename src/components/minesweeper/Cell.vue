<script setup>
  import { ref, computed, watch } from 'vue';
  import { useMinesweeperStore } from '@/stores/minesweeper';

  const { x, y, forceReveal } = defineProps({
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    },
    forceReveal: {
      type: Boolean,
      default: false
    },
  });

  const emit = defineEmits(['spreadReveal']);

  const value = ref(null);
  const isFlagged = ref(false);
  const isBombRevealed = ref(false);
  const isRevealed = ref(false);
  const {
    reveal: tryCell,
    isFlagMode,
    isFinished,
    isWon,
    incrementScore,
  } = useMinesweeperStore();

  const reveal = () => {
    if (value.value !== null || isFinished()) {
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
    isRevealed.value = true
  };

  const cellValue = computed(() => {
    if (isFlagged.value) {
      return '🚩'
    }

    if (isBombRevealed.value) {
      return '💣'
    }

    if (value.value === '0') {
      emit('spreadReveal', { x, y });

      return ''
    }

    return value.value ?? ''
  });

  watch(() => forceReveal, newValue => newValue && reveal())
</script>

<template>
  <td :class="['cell', { 'revealed': isRevealed || isBombRevealed }]" @click="reveal">{{ cellValue }}</td>
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

    &.revealed {
      background-color: var(--white);
    }

    &:hover:not(.revealed) {
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

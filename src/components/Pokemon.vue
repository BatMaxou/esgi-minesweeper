<script setup>
import {onMounted, ref} from 'vue';
import Button from "@/components/Button.vue";

const pokemon = ref(null);
const isLoading = ref(false);

const getPokemon = async () => {
  isLoading.value = true;
  try {
    const randomId = Math.floor(Math.random() * 1024) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    pokemon.value = await response.json();
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getPokemon();
});
</script>

<template>
  <div class="pokemon-content">
    <div class="pokemon-info">
      <h2 class="pokemon-name">
        {{ isLoading ? 'Chargement...' : (pokemon?.name || 'Inconnu') }}
      </h2>
      <div class="pokemon-image-container">
        <img
          v-if="pokemon && !isLoading"
          :src="pokemon.sprites.front_default"
          :alt="`Pokemon ${pokemon.name} image`"
          class="pokemon-image"
        >
        <div v-else class="pokemon-placeholder">
          <svg
            v-if="isLoading"
            class="loading-spinner"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#c0c0c0"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-dasharray="31.416"
              stroke-dashoffset="31.416"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#2c3e50"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-dasharray="15.708"
              stroke-dashoffset="0"
            />
          </svg>
          <span v-else class="error-icon">❓</span>
        </div>
      </div>
    </div>

    <Button
      class="regenerate-button"
      @click="getPokemon"
      :disabled="isLoading"
    >
      <span class="button-icon">🎲</span>
      {{ isLoading ? 'Chargement...' : 'Nouveau Pokémon' }}
    </Button>
  </div>
</template>

<style scoped>
.pokemon-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
}

.pokemon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.pokemon-name {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  text-shadow: 1px 1px 0 #ffffff;
  margin: 0;
  text-align: center;
  text-transform: capitalize;
  letter-spacing: 1px;
  min-height: 24px;
}

.pokemon-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border: 2px inset #c0c0c0;
  background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%);
  box-shadow: inset -1px -1px 0 #ffffff,
  inset 1px 1px 0 #808080;
}

.pokemon-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.pokemon-placeholder {
  font-size: 48px;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  animation: spin 1.5s linear infinite;
}

.error-icon {
  font-size: 48px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.regenerate-button {
  background: linear-gradient(180deg, #f0f0f0 0%, #d0d0d0 50%, #b0b0b0 100%);
  border: 2px outset #c0c0c0;
  border-radius: 0;
  padding: 8px 16px;
  color: #2c3e50;
  font-weight: bold;
  font-size: 12px;
  transition: all 0.1s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: inset 1px 1px 0 #ffffff,
  inset -1px -1px 0 #808080,
  2px 2px 3px rgba(0, 0, 0, 0.2);
}

.regenerate-button:hover:not(:disabled) {
  background: linear-gradient(180deg, #ffffff 0%, #e0e0e0 50%, #c0c0c0 100%);
  border-color: #a0a0a0;
  transform: translateY(-1px);
  box-shadow: inset 1px 1px 0 #ffffff,
  inset -1px -1px 0 #808080,
  3px 3px 5px rgba(0, 0, 0, 0.3);
}

.regenerate-button:active:not(:disabled) {
  background: linear-gradient(180deg, #a0a0a0 0%, #c0c0c0 50%, #d0d0d0 100%);
  border: 2px inset #c0c0c0;
  transform: translateY(1px);
  box-shadow: inset -1px -1px 0 #ffffff,
  inset 1px 1px 0 #808080,
  1px 1px 2px rgba(0, 0, 0, 0.1);
}

.regenerate-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-icon {
  font-size: 14px;
}

@media (max-width: 480px) {
  .pokemon-name {
    font-size: 16px;
  }

  .pokemon-image-container {
    width: 100px;
    height: 100px;
  }

  .pokemon-placeholder {
    font-size: 36px;
  }

  .regenerate-button {
    padding: 6px 12px;
    font-size: 11px;
  }
}
</style>

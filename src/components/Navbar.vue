<script setup lang="ts">
import Button from "@/components/Button.vue";
</script>

<template>
  <nav class="minesweeper-navbar">
    <div class="navbar-container">

      <RouterLink :to="{ name: 'home' }" class="logo-section">
        <span class="mine-icon">💣</span>
        <h1 class="game-title">MINESWEEPER</h1>
      </RouterLink>

      <div class="nav-links">
        <Button as="router-link" :to="{ name: 'home' }">
          🎮 Jouer
        </Button>

        <Button as="router-link" :to="{ name: 'scores' }">
          🏆 Scores
        </Button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.minesweeper-navbar {
  padding: 8px 0;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  border: none;
  background: none;
}

.mine-icon {
  font-size: 32px;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.4));
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.game-title {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  text-shadow: 1px 1px 0 #ffffff,
  2px 2px 3px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 12px;
  align-items: center;
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 16px;
    padding: 0 15px;
  }

  .logo-section {
    justify-content: center;
  }

  .game-title {
    font-size: 20px;
  }

  .nav-links {
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .mine-icon {
    font-size: 24px;
  }

  .game-title {
    font-size: 16px;
    letter-spacing: 1px;
  }
}
</style>

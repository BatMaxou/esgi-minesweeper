<script setup>
import {RouterView} from 'vue-router'
import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <div id="app">
    <header class="minesweeper-header">
      <Navbar/>
    </header>

    <main class="main-content">
      <RouterView/>
    </main>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Courier New', monospace;
}

.minesweeper-header {
  background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #a0a0a0 100%);
  border-bottom: 3px solid #808080;
  box-shadow: inset 1px 1px 0 #ffffff,
  inset -1px -1px 0 #808080,
  0 2px 4px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.main-content {
  padding: 20px;
}
</style>

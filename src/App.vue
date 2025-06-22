<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Jouer</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
  body {
    --grey: #777;
    --light-grey: #d1cfcf;
  }
</style>

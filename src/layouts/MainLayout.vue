<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="main-layout">
    <header class="main-layout__header">
      <AppHeader />
    </header>

    <div class="main-layout__content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-layout__content {
  flex-grow: 1;
  padding: 10px;
}
</style>

<template>
  <div class="bar">
    <button class="dot" aria-label="preset 1"></button>
    <button class="dot" aria-label="preset 2"></button>
    <button class="dot" aria-label="preset 3"></button>
    <button class="dot" aria-label="preset 4"></button>
    <button class="dot" aria-label="preset 5"></button>
  </div>
</template>

<style scoped>
.bar { display:flex; justify-content: space-between; padding: 10px 6px; border-radius: 999px; background: #f6f6fb; }
.dot { width: 26px; height: 26px; border-radius: 999px; border: 0; background: #ddd; cursor: pointer; }
</style>

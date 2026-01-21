<script setup lang="ts">
  const props = defineProps<{
    brightness: number
  }>()
</script>

<template>
  <div class="preview">
    <div class="label">Brightness</div>
    <div class="value">{{ Math.round(props.brightness * 100) }}%</div>
  </div>
</template>

<style scoped>
.preview { padding: 8px 0; }
.label { font-size: 12px; opacity: 0.7; }
.value { font-weight: 600; }
</style>

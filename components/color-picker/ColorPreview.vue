<script setup lang="ts">
  import type { HSV } from '../../utils/color'
  import { brightnessToPercentage, hsvToHex } from '../../utils/color'
  import { computed } from 'vue'
  
  const props = defineProps<{
    hue: number
    saturation: number
    brightness: number
  }>()

  const hsv = computed<HSV> (() => ({
    h: props.hue,
    s: props.saturation,
    v: props.brightness,
  })) 

  const hex = computed(() => hsvToHex(hsv.value))
  const pct = computed(() => brightnessToPercentage(props.brightness))
</script>

<template>
  <div class="preview">
    <div class="swatch" :style="{ background: hex }" />
    <div class="meta">
      <code class="hex">{{ hex }}</code>
      <div class="sub">Brightness: {{ pct }}%</div>
    </div>
  </div>
</template>

<style scoped>
.preview { display:flex; align-items:center; gap:12px; }
.swatch { width: 22px; height: 22px; border-radius: 999px; border: 1px solid #eee; }
.meta { display:flex; flex-direction:column; gap:4px; }
.hex { font-size: 0.9rem; }
.sub { font-size: 0.8rem; opacity: 0.7; }
</style>

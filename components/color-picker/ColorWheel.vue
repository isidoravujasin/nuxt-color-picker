<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { clamp01 } from '../../utils/color'

const size = 220
const canvasRef = ref<HTMLCanvasElement | null>(null)

const props = defineProps<{
  hue: number
  saturation: number
}>()

const emit = defineEmits<{
  (e: 'select', payload: { hue: number; saturation: number }): void
}>()

function normalizeHue(h: number) {
  return ((h % 360) + 360) % 360
}

const markerStyle = computed(() => {
  const r = size / 2

  const h = normalizeHue(props.hue)
  const s = clamp01(props.saturation)

  const angle = ((h - 90) * Math.PI) / 180
  const dist = s * r

  const x = r + Math.cos(angle) * dist
  const y = r + Math.sin(angle) * dist

  return {
    left: `${x}px`,
    top: `${y}px`,
  }
})

function drawWheel(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.floor(size * dpr)
  canvas.height = Math.floor(size * dpr)
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const r = size / 2
  ctx.clearRect(0, 0, size, size)

  ctx.save()
  ctx.beginPath()
  ctx.arc(r, r, r, 0, Math.PI * 2)
  ctx.clip()

  const hue = ctx.createConicGradient(-Math.PI / 2, r, r)
  hue.addColorStop(0.0, 'rgb(255, 0, 0)')
  hue.addColorStop(1 / 6, 'rgb(255, 255, 0)')
  hue.addColorStop(2 / 6, 'rgb(0, 255, 0)')
  hue.addColorStop(3 / 6, 'rgb(0, 255, 255)')
  hue.addColorStop(4 / 6, 'rgb(0, 0, 255)')
  hue.addColorStop(5 / 6, 'rgb(255, 0, 255)')
  hue.addColorStop(1.0, 'rgb(255, 0, 0)')

  ctx.fillStyle = hue
  ctx.fillRect(0, 0, size, size)

  const sat = ctx.createRadialGradient(r, r, 0, r, r, r)
  sat.addColorStop(0, 'rgba(255,255,255,1)')
  sat.addColorStop(1, 'rgba(255,255,255,0)')

  ctx.fillStyle = sat
  ctx.fillRect(0, 0, size, size)

  ctx.restore()
}

function onPick(event: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const r = size / 2
  const dx = x - r
  const dy = y - r
  const dist = Math.sqrt(dx * dx + dy * dy)

  if (dist > r) return

  const saturation = clamp01(dist / r)

  const angle = Math.atan2(dy, dx)
  let hue = (angle * 180) / Math.PI
  hue = normalizeHue(hue + 90)

  emit('select', { hue, saturation })
}

onMounted(() => {
  if (canvasRef.value) drawWheel(canvasRef.value)
})
</script>

<template>
  <div class="wrap" @click="onPick">
    <canvas ref="canvasRef" class="wheel" />
    <div class="marker" :style="markerStyle"></div>
  </div>
</template>

<style scoped>
.wrap {
  width: 220px;
  height: 220px;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
  position: relative;
}
.wheel {
  display: block;
}
.marker {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  border: 2px solid white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>

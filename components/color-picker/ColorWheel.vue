<script setup lang="ts">
import { onMounted, ref } from 'vue'

const size = 220
const canvasRef = ref<HTMLCanvasElement | null>(null)

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

  // Clip to circle
  ctx.save()
  ctx.beginPath()
  ctx.arc(r, r, r, 0, Math.PI * 2)
  ctx.clip()

  // 1) Hue around the circle (conic gradient)
  const hue = ctx.createConicGradient(-Math.PI / 2, r, r) // start at top
  hue.addColorStop(0.0, 'rgb(255, 0, 0)')
  hue.addColorStop(1 / 6, 'rgb(255, 255, 0)')
  hue.addColorStop(2 / 6, 'rgb(0, 255, 0)')
  hue.addColorStop(3 / 6, 'rgb(0, 255, 255)')
  hue.addColorStop(4 / 6, 'rgb(0, 0, 255)')
  hue.addColorStop(5 / 6, 'rgb(255, 0, 255)')
  hue.addColorStop(1.0, 'rgb(255, 0, 0)')

  ctx.fillStyle = hue
  ctx.fillRect(0, 0, size, size)

  // 2) Saturation: white in the center fading outwards
  const sat = ctx.createRadialGradient(r, r, 0, r, r, r)
  sat.addColorStop(0, 'rgba(255,255,255,1)')
  sat.addColorStop(1, 'rgba(255,255,255,0)')

  ctx.fillStyle = sat
  ctx.fillRect(0, 0, size, size)

  ctx.restore()
}

onMounted(() => {
  if (canvasRef.value) drawWheel(canvasRef.value)
})
</script>

<template>
  <div class="wrap">
    <canvas ref="canvasRef" class="wheel" />
  </div>
</template>

<style scoped>
.wrap {
  width: 220px;
  height: 220px;
  border-radius: 999px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}
.wheel {
  display: block;
}
</style>

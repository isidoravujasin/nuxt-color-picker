<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { clamp01 } from '../../utils/color'
import { normalizeHue, hueSatFromPoint } from '../../utils/wheelMath'
import { drawColorWheel } from '../../utils/drawWheel'

const size = 220
const canvasRef = ref<HTMLCanvasElement | null>(null)
const isDragging = ref(false) 

const props = defineProps<{
  hue: number
  saturation: number
}>()

const emit = defineEmits<{
  (e: 'select', payload: { hue: number; saturation: number }): void
}>()

function pointInCanvas(event: PointerEvent, canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  }
}

function pickFromEvent(event: PointerEvent) {
  const canvas = canvasRef.value
  if (!canvas) return

  const { x, y } = pointInCanvas(event, canvas)
  const result = hueSatFromPoint(x, y, size)
  if (!result) return

  emit('select', result)
}

function onPointerDown(event: PointerEvent) {
  isDragging.value = true
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
  pickFromEvent(event)
}

function onPointerMove(event: PointerEvent) {
  if (!isDragging.value) return
  pickFromEvent(event)
}

function onPointerUp(event: PointerEvent) {
  pickFromEvent(event)
  isDragging.value = false
  const el = event.currentTarget as HTMLElement | null
  if (!el) return

  try {
    el.releasePointerCapture(event.pointerId)
  } catch {
    // ok 
  }
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

onMounted(() => {
  if (canvasRef.value) drawColorWheel(canvasRef.value, size)
})

</script>

<template>
  <div 
    class="wrap" 
    :class="{ dragging: isDragging }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove" 
    @pointerup="onPointerUp" 
    @pointercancel="onPointerUp"
  >
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
  touch-action: none;
  user-select: none;
  cursor: crosshair;
}

.wrap.dragging {
  cursor: grabbing;
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

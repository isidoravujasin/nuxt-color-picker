<script setup lang="ts">
import ColorWheel from './ColorWheel.vue'
import BrightnessSlider from './BrightnessSlider.vue'
import PresetsBar from './PresetsBar.vue'
import ColorPreview from './ColorPreview.vue'
import { hsvToHex } from '../../utils/color'

import { ref } from 'vue'

const hue = ref(210)       
const saturation = ref(0.8) 
const brightness = ref(1)  
const activePresetId = ref<string | null>(null)

type PresetHSV = { id: string; h: number; s: number; v: number }

const presetValues: PresetHSV[] = [
  { id: '1', h: 270, s: 0.45, v: 0.85 }, 
  { id: '2', h: 200, s: 0.70, v: 0.90 }, 
  { id: '3', h: 130, s: 0.65, v: 0.85 }, 
  { id: '4', h: 35,  s: 0.75, v: 0.95 }, 
  { id: '5', h: 0,   s: 0.70, v: 0.90 }, 
]

const presets = presetValues.map(p => ({
  id: p.id,
  color: hsvToHex({ h: p.h, s: p.s, v: p.v }),
}))

function onPresetSelect(id: string) {
  const found = presetValues.find(p => p.id === id)
  if (!found) return

  hue.value = found.h
  saturation.value = found.s
  brightness.value = found.v
  activePresetId.value = id
}


function onWheelSelect(payload: { hue: number; saturation: number }) {
  hue.value = payload.hue
  saturation.value = payload.saturation
  activePresetId.value = null
}

function onBrightnessChange(value: number) {
  brightness.value = value
  activePresetId.value = null
}

</script>

<template>
  <main class="page">
    <header class="header">
      <h1 class="title">New Color</h1>
    </header>

    <section class="card">
      <div class="wheelWrap">
        <ColorWheel
          :hue="hue"
          :saturation="saturation"
          @select="onWheelSelect"
        />
      </div>

      <div class="sliderWrap">
        <BrightnessSlider
          :model-value="brightness"
          @update:model-value="onBrightnessChange"
        />
      </div>

      <div class="previewWrap">
        <ColorPreview :hue="hue" :saturation="saturation" :brightness="brightness" />
      </div>

      <div class="presetsWrap">
        <PresetsBar 
          :presets="presets"
          :active-id="activePresetId ?? undefined"
          @select="onPresetSelect"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.page { min-height: 100vh; display: grid; place-items: center; font-family: system-ui, sans-serif; }
.card { width: 360px; padding: 20px; border-radius: 20px; background: white; box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
.header { margin-bottom: 12px; }
.title { font-size: 1.1rem; margin: 0; color: #6d5bd0; }
.wheelWrap { display: grid; place-items: center; padding: 12px 0; }
.sliderWrap { margin-top: 12px; }
.previewWrap { margin-top: 16px; }
.presetsWrap { margin-top: 18px; }
</style>

<script setup lang="ts">
import ColorWheel from './ColorWheel.vue'
import BrightnessSlider from './BrightnessSlider.vue'
import PresetsBar from './PresetsBar.vue'
import ColorPreview from './ColorPreview.vue'

import { ref } from 'vue'

const hue = ref(210)       
const saturation = ref(0.8) 
const brightness = ref(1)  
</script>

<template>
  <main class="page">
    <header class="header">
      <h1 class="title">New Color</h1>
    </header>

    <section class="card">
      <div class="wheelWrap">
        <ColorWheel :hue="hue" :saturation="saturation" />
      </div>

      <div class="sliderWrap">
        <BrightnessSlider v-model="brightness" />
      </div>

      <div class="previewWrap">
        <ColorPreview :hue="hue" :saturation="saturation" :brightness="brightness" />
      </div>

      <div class="presetsWrap">
        <PresetsBar />
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

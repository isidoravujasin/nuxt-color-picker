<script setup lang="ts">
  type Preset = {
    id: string;
    color: string;
  }

const props = defineProps<{
  presets: Preset[]
  activeId?: string
}>()

const emit= defineEmits<{
  (e: 'select', id: string): void;
}>();

function onSelect(id: string) {
  emit('select', id);
} 
</script>


<template>
  <div class="bar" role="group" aria-label="Preset colors">
    <button
      v-for="p in props.presets"
      :key="p.id"
      class="dot"
      :class="{ active: p.id === props.activeId }"
      type="button"
      :aria-label="`preset ${p.id}`"
      :style="{ background: p.color }"
      @click="onSelect(p.id)"
    ></button>
  </div>
</template>


<style scoped>
.bar {
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  border-radius: 999px;
  background: #f6f6fb;
}

.dot {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 0;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.dot.active {
  outline: 3px solid rgba(109, 91, 208, 0.9);
  outline-offset: 3px;
}

</style>
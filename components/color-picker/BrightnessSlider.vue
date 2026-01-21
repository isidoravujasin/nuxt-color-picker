<script setup lang="ts">
  type Props = {
    modelValue: number;
  };

const props = defineProps<Props>()

const emit=defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const next = clamp01(Number(target.value));
  emit('update:modelValue', next);
}

</script>

<template>
  <div class="slider">
    <span class="icon" aria-hidden>☾</span>

    <input
      class="range"
      type="range"
      min="0"
      max="1"
      step="0.01"
      :value="props.modelValue"
      @input="handleInput"
      aria-label="Brightness"
    />
    <span class="icon" aria-hidden>☀</span>
  </div>
</template>

<style scoped>
.slider {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.icon {
  width: 18px;
  text-align: center;
  opacity: 0.7;
  user-select: none;
}

.range {
  flex: 1;
}
</style>
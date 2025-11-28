<template>
  <q-btn
    :label="label"
    :icon="icon"
    :rounded="rounded"
    :unelevated="unelevated"
    @click="onClick"
    class="base-button q-pa-sm"
    size="lg"
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  icon: { type: String, default: '' },
  rounded: { type: Boolean, default: true },
  unelevated: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])
function onClick(evt) {
  emit('click', evt)
}
</script>

<style scoped>
.base-button {
  min-width: 220px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  background: linear-gradient(90deg,#6e5dfc,#8f56df); /* degradado atractivo */
  color: white;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
}
</style>

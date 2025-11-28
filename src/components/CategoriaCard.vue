<template>
  <q-card 
    class="categoria-card cursor-pointer overflow-hidden"
    @click="$emit('select')"
  >
    <img 
      :src="image" 
      :alt="label"
      class="category-image"
    />
    
    <q-card-section class="text-center absolute-bottom q-pb-md" :style="{ background: gradient }">
      <div class="text-h6 text-white text-weight-bold">
        {{ label }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  label: String,
  image: String,
  gradient: String
})

defineEmits(['select'])
</script>

<style scoped>
.categoria-card {
  width: 260px;
  height: 150px;
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.categoria-card:hover {
  transform: translateY(-5px);
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
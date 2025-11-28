<template>
  <q-page class="row items-center justify-center bg-grey-1">
    <div class="column q-pa-xl" style="max-width:900px; width:100%">
      <q-card flat class="q-pa-xl" style="border-radius:18px;">
        <div class="column items-center q-mb-xl">
          <div class="row items-center">
            <h1 class="text-h3" style="color:#6e5dfc; margin:0">AHORCADO</h1>
          </div>

          <p class="text-subtitle2 q-mt-md" style="color:rgba(0,0,0,0.55)">
            ¡Adivina la palabra antes de que sea tarde!
          </p>
        </div>

        <div class="row items-center justify-center q-my-xl">
          <div style="width:320px; height:220px; display:flex; align-items:center; justify-content:center;">
            <img 
              src="@/assets/ahorcado-placeholder.png" 
              alt="Juego del Ahorcado"
              style="max-width:100%; max-height:100%; object-fit: contain;"
            />
          </div>
        </div>

        <div class="row items-center justify-center q-mt-lg">
          <BaseButton label="¡JUGAR AHORA!" @click="irATemas" class="full-width text-center" />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'

const router = useRouter()

function irATemas() {
  router.push({ name: 'temas' }).catch((err) => {
    if (err && err.name !== 'NavigationDuplicated') {
      router.push('/temas').catch(() => {})
    }
  })
}
</script>

<style scoped>
.q-page {
  background: linear-gradient(135deg, #7b68ee22, #8f56df11);
  min-height: 100vh;
}
.q-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(16,24,40,0.12);
}
</style>
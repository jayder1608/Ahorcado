<template>
  <q-page class="column items-center justify-center bg-gradient-page">

    <q-card flat class="q-pa-xl bg-white" style="border-radius:25px; width:90%; max-width:900px">

      <h1 class="text-h4 text-center">Selecciona el Nivel</h1>

      <p class="text-center text-subtitle1 q-mt-sm">
        Categoría: <strong>{{ categoriaLabel }}</strong>
      </p>

      <div class="q-mt-xl column q-gutter-lg">

        <q-card class="nivel-card row items-center cursor-pointer"
          @click="seleccionarNivel('facil')">
          <div class="nivel-icon" style="background: linear-gradient(135deg,#6df3a0,#42d392)">😀</div>
          <div class="column q-ml-md">
            <div class="text-h6">Fácil</div>
            <div class="text-grey-7">Palabras de 4–6 letras • 8 intentos • 10 minutos</div>
          </div>
        </q-card>

        <q-card class="nivel-card row items-center cursor-pointer"
          @click="seleccionarNivel('medio')">
          <div class="nivel-icon" style="background: linear-gradient(135deg,#ff9be0,#ff6f90)">😳</div>
          <div class="column q-ml-md">
            <div class="text-h6">Medio</div>
            <div class="text-grey-7">Palabras de 7–9 letras • 6 intentos • 4 minutos</div>
          </div>
        </q-card>

        <q-card class="nivel-card row items-center cursor-pointer"
          @click="seleccionarNivel('dificil')">
          <div class="nivel-icon" style="background: linear-gradient(135deg,#ffd080,#ffa14a)">😵‍💫</div>
          <div class="column q-ml-md">
            <div class="text-h6">Difícil</div>
            <div class="text-grey-7">Palabras de 10+ letras • 5 intentos • 2 minutos</div>
          </div>
        </q-card>

      </div>
    </q-card>

  </q-page>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"

const route = useRoute()
const router = useRouter()

const categoria = computed(() => route.query.categoria || '')

const categoriaLabel = computed(() => {
  const labels = {
    frutas: "Frutas",
    animales: "Animales",
    paises: "Países",
    deportes: "Deportes",
    peliculas: "Películas",
    ciencia: "Ciencia"
  }
  return labels[categoria.value] || "Categoría"
})

function seleccionarNivel(nivel) {
  router.push({
    name: "juego",
    query: {
      categoria: categoria.value,
      nivel: nivel
    }
  })
}
</script>

<style scoped>
.bg-gradient-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #7b68ee33, #8f56df22);
}

.nivel-card {
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  transition: 0.2s ease;
  border: 2px solid #e6e6e6;
}
.nivel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 22px rgba(0,0,0,0.15);
}
.nivel-icon {
  width: 60px;
  height: 60px;
  border-radius: 100%;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
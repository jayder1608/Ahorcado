<template>
  <q-page class="row items-center justify-center bg-gradient-page">
    <!-- Botón para volver al inicio -->
    <div class="back-button-container">
      <button class="back-button" @click="volverAlInicio">
        <span class="back-arrow">←</span>
        Volver al Inicio
      </button>
    </div>

    <div class="column items-center q-pa-xl" style="max-width:1100px; width:100%">

      <q-card flat class="q-pa-xl bg-white" style="border-radius:25px;">
        <h1 class="text-h4 text-center q-mb-xl">
          Selecciona una Categoría
        </h1>

        <div class="row justify-center q-gutter-xl q-mb-xl">
          <CategoriaCard
            label="Frutas"
            image="https://libbys.es/wordpress/wp-content/uploads/2014/12/multifrutas.jpg"
            gradient="linear-gradient(135deg,#ff99cc,#ff6699)"
            @select="irADificultad('frutas')"
          />

          <CategoriaCard
            label="Animales"
            image="https://ecolec.es/greenblog/wp-content/uploads/2024/10/importancia-animales-salud-planeta_GreenBlog-1.jpg"
            gradient="linear-gradient(135deg,#5cd7ff,#1dc6ff)"
            @select="irADificultad('animales')"
          />

          <CategoriaCard
            label="Países"
            image="https://static.theclinic.cl/media/2013/10/paises_mapas_.jpg"
            gradient="linear-gradient(135deg,#64f7c1,#28d89a)"
            @select="irADificultad('paises')"
          />
        </div>

        <div class="row justify-center q-gutter-xl">
          <CategoriaCard
            label="Deportes"
            image="https://adars.org.do/wp-content/uploads/2024/10/El-Deporte-como-Prevencion-de-Enfermedades.webp"
            gradient="linear-gradient(135deg,#ffcf5c,#ff9b45)"
            @select="irADificultad('deportes')"
          />

          <CategoriaCard
            label="Películas"
            image="https://i.blogs.es/1b1edb/las-mejores-peliculas-de-accion-de-2018/1366_2000.jpg"
            gradient="linear-gradient(135deg,#5c74ff,#2d3ae8)"
            @select="irADificultad('peliculas')"
          />

          <CategoriaCard
            label="Ciencia"
            image="https://media.bahaiteachings.org/2022/08/18063051/cover-32-1__v1118x690__crop_upscale.jpeg"
            gradient="linear-gradient(135deg,#d0e1ff,#a8b8ff)"
            @select="irADificultad('ciencia')"
          />
        </div>

      </q-card>

    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router"
import CategoriaCard from "@/components/CategoriaCard.vue"

const router = useRouter()

function irADificultad(categoria) {
  router.push({
    name: "dificultad",
    query: { categoria }
  })
}

function volverAlInicio() {
  router.push('/')
}
</script>

<style scoped>
.bg-gradient-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #7b68ee33, #8f56df22);
  position: relative;
}

.back-button-container {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 10;
}

.back-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #6e5dfc, #8f56df);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(110, 93, 252, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(110, 93, 252, 0.4);
  background: linear-gradient(135deg, #5c4dff, #7b68ee);
}

.back-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(110, 93, 252, 0.3);
}

.back-arrow {
  font-size: 20px;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.back-button:hover .back-arrow {
  transform: translateX(-3px);
}
</style>
<template>
  <div class="records-container">
    <div class="back-button-container">
      <button class="back-button" @click="volverAlInicio">
        ← Volver al Inicio
      </button>
    </div>

    <div class="header">
      <img src="@/assets/trophy.png" class="icon" />
      <h1>Mejores Tiempos</h1>
      <p>Los jugadores más rápidos del ahorcado</p>
    </div>

    <div class="filters">
      <button v-for="f in filtros" :key="f" 
              @click="filtroActivo = f" 
              :class="{ active: filtroActivo === f }">{{ f }}</button>
    </div>
    <div v-if="sortedRecords.length >= 1" class="podium-section">
      <div class="podium-title">
        <h2>Podio - {{ filtroActivo }}</h2>
      </div>
      <div class="podium">
        <div v-if="podium[1]" class="podium-item second">
          <div class="place">🥈</div>
          <div class="player-name">{{ podium[1].nombre }}</div>
          <div class="time">{{ podium[1].tiempo }}</div>
          <div class="category">{{ podium[1].categoria }}</div>
        </div>

        <div v-if="podium[0]" class="podium-item first">
          <div class="place">🥇</div>
          <div class="player-name">{{ podium[0].nombre }}</div>
          <div class="time">{{ podium[0].tiempo }}</div>
          <div class="category">{{ podium[0].categoria }}</div>
        </div>

        <div v-if="podium[2]" class="podium-item third">
          <div class="place">🥉</div>
          <div class="player-name">{{ podium[2].nombre }}</div>
          <div class="time">{{ podium[2].tiempo }}</div>
          <div class="category">{{ podium[2].categoria }}</div>
        </div>
      </div>
    </div>

    <div v-else class="empty-message">
      <p>Aún no hay registros disponibles para {{ filtroActivo }}.</p>
    </div>

    <div v-if="sortedRecords.length > 3" class="records-list">
      <h3>Otras Posiciones</h3>
      <div v-for="(record, index) in sortedRecords.slice(3)" :key="index" class="record-item">
        <div class="rank">{{ index + 4 }}</div>
        <div class="player-info">
          <strong>{{ record.nombre }}</strong> <br />
          <small>{{ record.categoria }} • {{ record.dificultad }}</small>
        </div>
        <div class="time">{{ record.tiempo }}</div>
        <div class="date">{{ record.fecha }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const records = ref([]);
const filtroActivo = ref("Facil");
const filtros = ["Facil", "Medio", "Dificil"];

const volverAlInicio = () => {
  router.push('/');
};

onMounted(() => {
  records.value = JSON.parse(localStorage.getItem("records")) || [];
});

const filteredRecords = computed(() => {
  return records.value.filter(r => r.dificultad === filtroActivo.value);
});
const sortedRecords = computed(() => {
  return [...filteredRecords.value].sort((a, b) => {
    if (a.tiempoTotal && b.tiempoTotal) {
      return a.tiempoTotal - b.tiempoTotal;
    }
    const tiempoA = a.tiempo ? convertirTiempoASegundos(a.tiempo) : 0;
    const tiempoB = b.tiempo ? convertirTiempoASegundos(b.tiempo) : 0;
    return tiempoA - tiempoB;
  });
});


const convertirTiempoASegundos = (tiempo) => {
  if (!tiempo) return 0;
  const partes = tiempo.split(':');
  if (partes.length === 2) {
    return parseInt(partes[0]) * 60 + parseInt(partes[1]);
  }
  return 0;
};

const podium = computed(() => sortedRecords.value.slice(0, 3));
</script>

<style scoped>
.records-container { 
  max-width: 900px; 
  margin: auto; 
  padding: 40px; 
  text-align: center; 
  position: relative;
}

.back-button-container {
  position: absolute;
  top: 20px;
  left: 20px;
}

.back-button {
  padding: 10px 20px;
  background: #5c4dff;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-button:hover {
  background: #4a3dc9;
  transform: translateX(-5px);
}

.header {
  margin-bottom: 40px;
}

.icon { 
  width: 100px; 
  height: 100px;
  margin-bottom: 20px;
}

.filters { 
  display: flex; 
  justify-content: center; 
  gap: 15px; 
  margin-bottom: 40px;
}

.filters button { 
  padding: 12px 24px; 
  border-radius: 25px; 
  border: 2px solid #5c4dff;
  background: white;
  color: #5c4dff;
  cursor: pointer; 
  font-weight: bold;
  transition: all 0.3s ease;
}

.filters .active { 
  background: #5c4dff; 
  color: white; 
}

.podium-section {
  margin-bottom: 50px;
}

.podium-title h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
}

.podium { 
  display: flex; 
  justify-content: center; 
  align-items: flex-end;
  gap: 20px; 
  margin: 30px 0; 
  min-height: 300px;
}

.podium-item { 
  width: 180px; 
  padding: 25px 15px;
  border-radius: 15px; 
  text-align: center;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.podium-item:hover {
  transform: translateY(-5px);
}

.first { 
  background: linear-gradient(135deg, #FFD700, #FFEC8B);
  order: 2;
  height: 220px;
  margin-bottom: 0;
}

.second { 
  background: linear-gradient(135deg, #C0C0C0, #E8E8E8);
  order: 1;
  height: 180px;
  margin-bottom: 20px;
}

.third { 
  background: linear-gradient(135deg, #CD7F32, #E8B886);
  order: 3;
  height: 160px;
  margin-bottom: 30px;
}

.place { 
  font-size: 48px; 
  font-weight: bold; 
  margin-bottom: 15px;
}

.player-name { 
  font-size: 18px; 
  font-weight: 600; 
  margin-bottom: 10px;
  color: #333;
}

.time { 
  font-size: 20px; 
  font-weight: bold;
  color: #222;
  margin-bottom: 8px;
}

.category {
  font-size: 14px;
  color: #666;
  font-style: italic;
}

.records-list {
  margin: 50px auto;
  padding: 30px;
  background: #fafafa;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.records-list h3 {
  color: #333;
  margin-bottom: 25px;
  font-size: 24px;
}

.record-item { 
  display: flex; 
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px; 
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s ease;
}

.record-item:hover {
  background-color: #f0f0f0;
  border-radius: 10px;
}

.record-item:last-child {
  border-bottom: none;
}

.rank { 
  font-weight: bold; 
  font-size: 18px;
  color: #5c4dff;
  min-width: 40px;
}

.player-info {
  flex: 1;
  text-align: left;
  margin-left: 20px;
}

.player-info strong {
  font-size: 16px;
  color: #333;
}

.player-info small {
  color: #666;
}

.date {
  color: #888;
  font-size: 14px;
  min-width: 100px;
}

.empty-message {
  padding: 60px 20px;
  color: #666;
  font-size: 18px;
  background: #f9f9f9;
  border-radius: 15px;
  margin: 40px 0;
}
</style>x
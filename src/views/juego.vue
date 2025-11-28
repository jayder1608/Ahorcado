<template>
  <q-page class="q-pa-md bg-grey-2">
    <q-card class="q-pa-xl" style="max-width:900px; margin:auto; border-radius:25px;">
      <div class="row justify-between items-center q-mb-md">
        <div>
          <div class="text-h6">Categoría: {{ categoriaLabel }}</div>
          <div class="text-subtitle2">Nivel: {{ nivelLabel }}</div>
        </div>

        <div class="column items-end">
          <div class="text-h5">
            ⏱️ {{ formatoTiempo(tiempoRestante) }}
          </div>
          <div class="text-subtitle1">
            ❤️ {{ intentosMax - intentos }} / {{ intentosMax }} intentos
          </div>
        </div>
      </div>


      <div class="flex flex-center q-my-md">
        <svg width="240" height="220" viewBox="0 0 200 200">

          <line x1="10" y1="180" x2="150" y2="180" stroke="#333" stroke-width="6" />

          <line v-if="intentos >= 1 || (juegoTerminado && !gano)" x1="40" y1="180" x2="40" y2="20" stroke="#333" stroke-width="6" />

          <line v-if="intentos >= 2 || (juegoTerminado && !gano)" x1="40" y1="20" x2="120" y2="20" stroke="#333" stroke-width="6" />

          <line v-if="intentos >= 3 || (juegoTerminado && !gano)" x1="120" y1="20" x2="120" y2="50" stroke="#333" stroke-width="6" />

          <circle v-if="intentos >= 4 || (juegoTerminado && !gano)" cx="120" cy="70" r="18" stroke="#333" stroke-width="4" fill="none" />

          <line v-if="intentos >= 5 || (juegoTerminado && !gano)" x1="120" y1="88" x2="120" y2="130" stroke="#333" stroke-width="4" />

          <line v-if="intentos >= 6 || (juegoTerminado && !gano)" x1="120" y1="100" x2="100" y2="120" stroke="#333" stroke-width="4" />

          <line v-if="intentos >= 7 || (juegoTerminado && !gano)" x1="120" y1="100" x2="140" y2="120" stroke="#333" stroke-width="4" />

          <line v-if="intentos >= 8 || (juegoTerminado && !gano)" x1="120" y1="130" x2="100" y2="160" stroke="#333" stroke-width="4" />

          <line v-if="intentos >= 9 || (juegoTerminado && !gano)" x1="120" y1="130" x2="140" y2="160" stroke="#333" stroke-width="4" />
        </svg>
      </div>

      <div class="flex flex-center q-mb-xl text-h4" style="letter-spacing: 10px;">
        <span v-for="(l, i) in palabraOculta" :key="i">{{ l }}</span>
      </div>
      <div class="row wrap justify-center">
        <q-btn
          v-for="letra in abecedario"
          :key="letra"
          class="q-ma-xs"
          flat
          rounded
          :label="letra"
          :disable="(nivel !== 'dificil' && letrasUsadas.includes(letra)) || juegoTerminado"
          @click="manejarClickLetra(letra)"
          size="lg"
        />
      </div>

      <div v-if="juegoTerminado" class="text-center q-mt-lg">
        <div class="text-h6 q-mb-md">{{ mensajeFinal }}</div>

        <div class="row justify-center q-gutter-sm">
          <q-btn v-if="gano" color="primary" label="Guardar resultado" @click="abrirGuardar" />
          <q-btn color="secondary" label="Jugar de nuevo" @click="reiniciarJuego" />
          <q-btn flat label="Ver Records" @click="irARecords" />
        </div>
      </div>
    </q-card>

    <q-dialog v-model="dialogGuardar">
      <q-card style="min-width: 350px;">
        <q-card-section>
          <div class="text-h6">Guardar resultado</div>
          <div class="text-subtitle2">¡Felicidades! Ingresa tu nombre para guardar tu victoria</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="nombreJugador" label="Tu nombre" dense />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" :disable="!nombreJugador" label="Guardar" @click="confirmarGuardar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const categoria = (route.query.categoria || 'animales').toLowerCase()
const nivel = (route.query.nivel || 'medio').toLowerCase()

const categoriaLabel = categoria.charAt(0).toUpperCase() + categoria.slice(1)
const nivelLabel = nivel.charAt(0).toUpperCase() + nivel.slice(1)

const palabras = {
  animales: {
    facil: ['GATO', 'PERRO', 'OSO', 'RANA', 'PEZ', 'LOBO', 'CABRA', 'OVEJA', 'RATA', 'CONEJO', 'PATOS', 'GALLO', 'CISNE', 'BUHO', 'LORO'],
    medio: ['ELEFANTE', 'JIRAFA', 'LEOPARDO', 'DELFIN', 'CANGURO', 'ARDILLA', 'TIBURON', 'PINGUINO', 'CAMELLO', 'CEBRA', 'MURCIELAGO', 'HALCON'],
    dificil: ['HIPOPOTAMO', 'RINOCERONTE', 'CROCODILO', 'ARMADILLO', 'ORNITORRINCO', 'CHIMPANCE', 'MARIPOSA', 'ESCORPION', 'PEREZOSO', 'AVESTRUZ']
  },
  frutas: {
    facil: ['MANZANA', 'PERA', 'UVA', 'KIWI', 'CIRUELA', 'HIGO', 'DATIL', 'LIMA', 'MELON', 'SANDIA'],
    medio: ['NARANJA', 'PLATANO', 'CEREZA', 'MELOCOTON', 'ALBARICOQUE', 'FRAMBUESA', 'MANDARINA', 'POMELO', 'GRANADA', 'COCO'],
    dificil: ['PITAHAYA', 'MARACUYA', 'GUANABANA', 'CARAMBOLA', 'TAMARINDO', 'LICHI', 'RAMBUTAN', 'MANGOSTAN', 'DURAZNO', 'ZAPOTE']
  },
  paises: {
    facil: ['CHILE', 'PERU', 'CUBA', 'EGIPTO', 'INDIA', 'JAPON', 'ITALIA', 'CHINA', 'GRECIA', 'BRASIL'],
    medio: ['COLOMBIA', 'ARGENTINA', 'ECUADOR', 'PORTUGAL', 'ALEMANIA', 'CANADA', 'AUSTRALIA', 'ESPANA', 'FRANCIA', 'INGLATERRA'],
    dificil: ['ESTADOS UNIDOS', 'REPUBLICA CHECA', 'SUIZA', 'BELGICA', 'NUEVA ZELANDA', 'SUDAFRICA', 'INDONESIA', 'VENEZUELA', 'BOLIVIA', 'PARAGUAY']
  },
  deportes: {
    facil: ['FUTBOL', 'BOXEO', 'GOLF', 'TENIS', 'NATACION', 'CICLISMO', 'ATLETISMO', 'BEISBOL', 'HOCKEY', 'RUGBY'],
    medio: ['BALONCESTO', 'VOLEIBOL', 'BADMINTON', 'KARATE', 'JUDO', 'SURF', 'SKATE', 'ESQUI', 'PATINAJE', 'TIRO CON ARCO'],
    dificil: ['PADEL', 'SQUASH', 'TRIATLON', 'PENTATLON', 'ESGRIMA', 'GIMNASIA RITMICA', 'BUCEO', 'PARACAIDISMO', 'ESCALADA', 'WINDSURF']
  },
  peliculas: {
    facil: ['TITANIC', 'AVATAR', 'FROZEN', 'TOY STORY', 'SHREK', 'MATRIX', 'JURASSIC PARK', 'SPIDERMAN', 'BATMAN', 'SUPERMAN'],
    medio: ['GLADIADOR', 'INTERESTELAR', 'INCEPTION', 'FORREST GUMP', 'PULP FICTION', 'THE GODFATHER', 'CASABLANCA', 'PSYCHO', 'VERTIGO', 'APOCALYPSE NOW'],
    dificil: ['SCHINDLER LIST', 'THE SHAWSHANK REDEMPTION', 'FIGHT CLUB', 'GOODFELLAS', 'SCARFACE', 'THE SILENCE OF THE LAMBS', 'AMERICAN BEAUTY', 'BRAVEHEART', 'TAXI DRIVER', 'BLADE RUNNER']
  },
  ciencia: {
    facil: ['ATOMO', 'CELULA', 'GENES', 'OXIGENO', 'ENERGIA', 'LUZ', 'SONIDO', 'CALOR', 'FUERZA', 'MASA'],
    medio: ['MOLECULA', 'BIOLOGIA', 'QUIMICA', 'FISICA', 'GEOLOGIA', 'ASTRONOMIA', 'ECOLOGIA', 'GENETICA', 'EVOLUCION', 'CLOROFILA'],
    dificil: ['FOTOSINTESIS', 'MITOCONDRIA', 'CROMOSOMA', 'BACTERIA', 'ELECTRON', 'NEUTRON', 'PROTON', 'GRAVEDAD', 'RELATIVIDAD', 'QUANTUM']
  }
}

const config = {
  facil: { intentosMax: 8, tiempo: 600 },
  medio: { intentosMax: 6, tiempo: 240 },
  dificil: { intentosMax: 5, tiempo: 120 }
}

const intentosMax = config[nivel]?.intentosMax ?? 6
const tiempoTotal = config[nivel]?.tiempo ?? 240

const palabra = ref('')
const palabraOculta = ref([])
const letrasUsadas = ref([])
const intentos = ref(0)
const juegoTerminado = ref(false)
const gano = ref(false)
const mensajeFinal = ref('')
const tiempoRestante = ref(tiempoTotal)
let timer = null

const dialogGuardar = ref(false)
const nombreJugador = ref('')
const abecedario = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('')

onMounted(() => iniciarJuego())

function iniciarJuego() {
  const listaCategoria = palabras[categoria] || palabras.animales
  const listaDificultad = listaCategoria[nivel] || listaCategoria.medio
  palabra.value = listaDificultad[Math.floor(Math.random() * listaDificultad.length)].toUpperCase()
  palabraOculta.value = Array.from(palabra.value).map(() => '_')
  letrasUsadas.value = []
  intentos.value = 0
  juegoTerminado.value = false
  gano.value = false
  mensajeFinal.value = ''
  tiempoRestante.value = tiempoTotal
  nombreJugador.value = ''
  iniciarCronometro()
}

function iniciarCronometro() {
  clearInterval(timer)
  timer = setInterval(() => {
    if (tiempoRestante.value > 0 && !juegoTerminado.value) {
      tiempoRestante.value--
    } else if (tiempoRestante.value <= 0 && !juegoTerminado.value) {
      finalizarJuego(false, 'tiempo')
    }
  }, 1000)
}

function formatoTiempo(segundos) {
  const m = Math.floor(segundos / 60).toString().padStart(2, '0')
  const s = (segundos % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function manejarClickLetra(letra) {
  if (juegoTerminado.value) return
  seleccionarLetra(letra)
}

function seleccionarLetra(letra) {
  if (nivel !== 'dificil' && letrasUsadas.value.includes(letra)) return
  
  if (nivel !== 'dificil') {
    letrasUsadas.value.push(letra)
  }

  if (palabra.value.includes(letra)) {
    palabra.value.split('').forEach((l, i) => {
      if (l === letra) palabraOculta.value[i] = letra
    })
    if (!palabraOculta.value.includes('_')) {
      finalizarJuego(true)
    }
  } else {
    intentos.value++
    if (intentos.value >= intentosMax) {
      finalizarJuego(false, 'intentos')
    }
  }
}

function finalizarJuego(ganado, motivo = '') {
  juegoTerminado.value = true
  gano.value = ganado
  clearInterval(timer)
  
  if (!ganado) {
    palabraOculta.value = Array.from(palabra.value)
  }
  
  if (ganado) {
    mensajeFinal.value = `🎉 ¡Ganaste! La palabra era ${palabra.value}`
  } else {
    if (motivo === 'tiempo') {
      mensajeFinal.value = `⏰ ¡Se acabó el tiempo! Era ${palabra.value}`
    } else {
      mensajeFinal.value = `😞 ¡Se acabaron los intentos! Era ${palabra.value}`
    }
  }
}

function reiniciarJuego() {
  iniciarJuego()
}

function abrirGuardar() {
  if (gano.value) {
    dialogGuardar.value = true
  }
}

function confirmarGuardar() {
  if (!nombreJugador.value || !gano.value) return
  
  const record = {
    nombre: nombreJugador.value,
    categoria: categoriaLabel,
    dificultad: nivelLabel,
    tiempo: formatoTiempo(tiempoTotal - tiempoRestante.value),
    fecha: new Date().toLocaleDateString(),
    tiempoTotal: tiempoTotal - tiempoRestante.value
  }

  const existing = JSON.parse(localStorage.getItem('records') || '[]')
  existing.push(record)
  localStorage.setItem('records', JSON.stringify(existing))

  dialogGuardar.value = false
}

function irARecords() {
  router.push({ name: 'records' })
}

watch(() => juegoTerminado.value, (v) => {
  if (v) clearInterval(timer)
})
</script>

<style scoped>
.q-btn { min-width: 45px; min-height: 45px; font-weight: bold; }

</style>

import Inicio from "../views/inicio.vue"
import Temas from "../views/temas.vue"
import Dificultad from "../views/dificultad.vue"
import Juego from "../views/juego.vue"
import Records from "../views/records.vue"

import { createRouter, createWebHashHistory } from "vue-router"



const routes = [
    { path: "/", name: "inicio", component: Inicio },
    { path: "/temas", name: "temas", component: Temas },
    { path: "/dificultad", name: "dificultad", component: Dificultad },
    { path: "/juego", name: "juego", component: Juego },
    { path: "/records", name: "records", component: Records },
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

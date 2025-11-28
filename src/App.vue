<template> 
  <q-layout view="hHh lpR fFf">


    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="mobile" bordered>
      <q-list>

        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Inicio</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/temas">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>Temas</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/dificultad">
          <q-item-section avatar>
            <q-icon name="flag" />
          </q-item-section>
          <q-item-section>Dificultad</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/juego">
          <q-item-section avatar>
            <q-icon name="sports_esports" />
          </q-item-section>
          <q-item-section>Juego</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/records">
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>
          <q-item-section>Records</q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>

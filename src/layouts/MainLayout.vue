<template>
  <q-card>
    <q-card-section>
      <h6>
        Notas creadas
      </h6>
    </q-card-section>
  </q-card>
  <router-link to="/new">
    <q-btn>
      Crear nueva Nota
    </q-btn>
   </router-link> 
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

})
</script>

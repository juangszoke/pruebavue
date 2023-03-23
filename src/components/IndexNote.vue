<template>
  <q-card class="q-pa-md q-mb-md" flat bordered>
    <q-card-section>
      <div class="row justify-between">
        <h3 class="q-ma-none">Notas</h3>
        <router-link class="q-pl-md ron" to="/login">
          <q-btn color="primary" class="q-ml-auto q-mt-md">Cerrar sesion</q-btn>
        </router-link>
      </div>
    </q-card-section>
    <q-card-section>
      <q-card
        class="note q-pa-sm q-mb-sm"
        v-for="(note, index) in notes"
        :key="index"
      >
        <h2 class="text-h6">{{ note.title }}</h2>
        <p class="text-body1 q-mb-xs">
          {{ note.description }}
        </p>
        <p
          class="importance text-caption"
          :class="
            note.importance === 'Alta'
              ? 'text-negative'
              : note.importance === 'Media'
              ? 'text-warning'
              : 'text-positive'
          "
          style="margin-top: 10px"
        >
          Importancia: {{ note.importance }}
        </p>
      </q-card>
    </q-card-section>
    <div align="right" class="q-pa-md">
      <q-btn @click="openDialog" color="primary" class="q-ml-auto q-mt-md"
        >Crear nueva Nota</q-btn
      >
    </div>
  </q-card>
  <my-dialog
    v-if="showDialog"
    @submit="(data) => addNote(data)"
    @cancel="closeDialog"
  />
</template>

<script>
import { defineComponent } from "vue";
import MyDialog from "src/components/MyDialog";
export default defineComponent({
  name: "IndexNote",
  components: {
    MyDialog,
  },

  data() {
    const notes = [
      {
        title: "Comprar leche",
        description: "Ir al supermercado y comprar leche descremada",
        importance: "Baja",
      },
      {
        title: "Llamar al médico",
        description: "Hacer una cita para la próxima semana",
        importance: "Media",
      },
      {
        title: "Pagar el alquiler",
        description: "Hacer la transferencia bancaria antes del 30 de este mes",
        importance: "Alta",
      },
    ];

    return {
      notes,
      showDialog: false,
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    addNote(note) {
      this.showDialog = false;
      this.notes.push(note);
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
});
</script>

<style scoped>
.note {
  background-color: #f9f9f9;
  border-left: 4px solid #3f51b5;
}

.note:hover {
  background-color: #e8e8e8;
}

.text-negative {
  color: #f44336;
}

.text-warning {
  color: #ff9800;
}

.text-positive {
  color: #4caf50;
}
.ron {
  text-decoration: none;
}

.ron:visited {
  color: black;
}
</style>

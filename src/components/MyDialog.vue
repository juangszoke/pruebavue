<template>
  <q-dialog v-model="dialog" persistent>
    <q-card class="q-pa-md q-mb-md maincard" flat bordered>
      <q-card-section>
        <h4 class="q-ma-none">Crear nueva nota</h4>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submitForm">
          <q-input
            v-model="newNote.title"
            label="Título"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Este campo es obligatorio.']"
          />
          <q-input
            v-model="newNote.description"
            label="Descripción"
            type="textarea"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Este campo es obligatorio.']"
          />
          <q-select
            v-model="newNote.importance"
            label="Importancia"
            :options="importanceOptions"
            dense
            class="q-mb-md"
            :rules="[(val) => !!val || 'Debes seleccionar un tipo']"
          />
          <div align="right">
            <q-btn type="submit" color="primary" :v-close-popup="completed"
              >crear nota</q-btn
            >
            <q-btn
              class="q-ml-md"
              color="negative"
              @click="$emit('cancel')"
              v-close-popup
              >Cancelar</q-btn
            >
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    editNote: {
      type: Object,
      required: false
    }
  },
  data() {
    
    return {
      dialog: true,
      newNote: {...this.editNote},
      completed: true,
      importanceOptions: ["Baja", "Media", "Alta"],
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit", this.newNote);
    },
  },
});
</script>

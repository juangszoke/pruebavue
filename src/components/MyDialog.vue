<template>
  <q-dialog v-model="dialog" persistent>
    <q-card class="dialog q-pa-md q-mb-md" flat bordered>
      <q-card-section>
        <h4 class="q-ma-none text-center">{{ action }}</h4>
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
            <q-btn type="submit" push color="primary" :v-close-popup="completed">
              {{action}}</q-btn>
            <q-btn
              class="q-ml-md"
              color="negative"
              push
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
      required: false,
    },
    action: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: true,
      newNote: { ...this.editNote },
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

<style lang="scss" scoped>
.dialog{

width: 100%;

}
</style>
<template>
  <q-card class="q-px-md q-mb-md cardPrincipal" flat bordered>
    <q-card-section class="full-width">
      <div class="row q-pa-md full-width flex justify-between">
        <h5 class="title q-ma-none">Bienvenido {{ userActive }}</h5>
        <router-link @click="logout()" class="q-pl-md logout" to="/login">
          <q-btn color="primary" size="sm">Cerrar sesión</q-btn>
        </router-link>
      </div>
      <div class="flex justify-center">
        <h3 class="q-ma-none">Notas</h3>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="row q-px-md flex justify-around">
        <q-card
          class="note q-pa-md q-ma-lg flex justify-between"
          v-for="(note, index) in notes"
          :key="index"
        >
          <div class="full-width">
            <h6 class="q-my-md">{{ note.title }}</h6>
            <p class="q-mb-xs text-justify">
              {{ note.description }}
            </p>
            <p
              class="text-caption q-mt-md"
              :class="
                note.importance === 'Alta'
                  ? 'text-negative'
                  : note.importance === 'Media'
                  ? 'text-warning'
                  : 'text-positive'
              "
            >
              Importancia: {{ note.importance }}
            </p>
            <p class="text-caption">Escrito por: {{ note.creator }}</p>
          </div>
          <div class="flex content-center">
            <q-icon
              v-if="!checkNote(note.creator)"
              @click="deleteNote(note.id)"
              color="negative"
              class="q-pa-md"
              size="lg"
              name="delete"
            />
            <q-icon
              v-if="!checkNote(note.creator)"
              @click="selectedNote(note.id)"
              color="yellow-6"
              class="q-pa-md"
              size="lg"
              name="edit"
            />
          </div>
        </q-card>
      </div>
    </q-card-section>
    <div align="right" class="q-pa-md">
      <q-btn
        @click="openDialog"
        size="sm"
        color="primary"
        class="q-ml-auto q-mt-md"
        >Crear nueva Nota</q-btn
      >
    </div>
  </q-card>
  <my-dialog
    v-if="showDialog"
    :edit-note="edit"
    :action="action"
    @submit="(data) => addNote(data)"
    @cancel="closeDialog"
  />
</template>

<script>
import { defineComponent } from "vue";
import MyDialog from "src/components/MyDialog";
import axios from "axios";

export default defineComponent({
  name: "IndexNote",
  components: {
    MyDialog,
  },

  data() {
    return {
      notes: null,
      showDialog: false,
      edit: {
        title: null,
        description: null,
        importance: null,
      },
      action: null,
      userActive: localStorage.getItem("user"),
    };
  },
  methods: {
    async updateNotes() {
      try {
        const response = await axios.get("http://localhost:3000/notes");
        this.notes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    openDialog() {
      this.action = "Crear nota";
      this.showDialog = true;
    },
    addNote(note) {
      this.edit.id ? this.editNote(note) : this.createNote(note);
    },
    createNote(note) {
      axios
        .post("http://localhost:3000/notes", {
          title: note.title,
          description: note.description,
          importance: note.importance,
          creator: localStorage.getItem("user"),
        })
        .then(() => {
          this.updateNotes();
          this.closeDialog();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editNote(note) {
      axios
        .put(`http://localhost:3000/notes/${this.edit.id}`, {
          title: note.title,
          description: note.description,
          importance: note.importance,
          creator: localStorage.getItem("user"),
        })
        .then(() => {
          this.updateNotes();
          this.closeDialog();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteNote(id) {
      axios
        .delete(`http://localhost:3000/notes/${id}`, {})
        .then(() => {
          this.updateNotes();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async selectedNote(id) {
      const response = await axios.get(`http://localhost:3000/notes/${id}`);
      this.edit = response.data;
      this.action = "Editar nota";
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.edit = {
        title: null,
        description: null,
        importance: null,
      };
    },
    logout() {
      localStorage.clear();
    },
    checkNote(user) {
      return localStorage.getItem("user") !== user;
    },
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:3000/notes");
      this.notes = response.data;
    } catch (error) {
      console.log(error);
    }
  },
});
</script>

<style scoped>
.cardPrincipal {
  background-color: #f5f5dc;
}
.note {
  background-color: #f9f9f9;
  border-left: 4px solid #3f51b5;
  width: 40%;
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
.logout {
  text-decoration: none;
}

.logout:visited {
  color: black;
}
.head-title {
  width: 93%;
}

@media (max-width: 700px) {
  .note {
    width: 100%;
  }
}
</style>

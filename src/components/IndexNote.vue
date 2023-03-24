<template>
  <q-card class="q-px-md q-mb-md principal-card" flat bordered>
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
          <div class="title-note full-width">
            <h5 class="q-mb-md q-mt-none">{{ note.title }}</h5>
            <p class="information q-mb-none q-py-sm text-justify">
              {{ note.description }}
            </p>
            <p
              class="information text-caption q-mb-none q-py-sm"
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
          <div class="row justify-between">
            <p class="q-pt-sm q-mb-none information text-caption">Escrito por: {{ note.creator }}</p>
            <div>
            <q-icon
                @click="deleteNote(note.id, checkNote(note.creator))"
                color="black"
                class="q-pa-sm"
                :class="{allow: checkNote(note.creator)}"
                size="sm"
                name="delete"
              />
              <q-icon
                @click="selectedNote(note.id, checkNote(note.creator) )"
                color="black"
                class="q-pa-sm"
                :class="{allow: checkNote(note.creator)}"
                size="sm"
                name="edit"
              />
              </div>
            </div> 
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
import { useQuasar } from 'quasar'
import axios from "axios";

export default defineComponent({
  name: "IndexNote",
  components: {
    MyDialog,
  },

  data() {
    const $q = useQuasar()
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
      $q
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
    deleteNote(id, value) {
      if(!value){
        axios
          .delete(`http://localhost:3000/notes/${id}`, {})
          .then(() => {
            this.updateNotes();
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        this.$q.notify({
          type: 'negative',
          message: 'Esta no es tu nota'
        })
      }
    },
    async selectedNote(id, value) {
      if(!value){
        const response = await axios.get(`http://localhost:3000/notes/${id}`);
        this.edit = response.data;
        this.action = "Editar nota";
        this.showDialog = true;
      }else{
        this.$q.notify({
          type: 'negative',
          message: 'Esta no es tu nota'
        })
      }
      
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
.principal-card {
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

.allow{
  cursor: not-allowed;
}
.information{
  font-size: 18px;
}


@media (max-width: 700px) {
  .note {
    width: 100%;
  }
}
</style>

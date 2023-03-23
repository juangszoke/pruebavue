<template>
  <q-card class="q-pa-md q-mb-md" flat bordered>
    <q-card-section>
      <div class="row justify-between">
        <h3 class="q-ma-none">Notas</h3>
        <router-link class="q-pl-md logout" to="/login">
          <q-btn color="primary" class="q-ml-auto q-mt-md">Cerrar sesion</q-btn>
        </router-link>
      </div>
    </q-card-section>
    <q-card-section>
      <q-card
        class="note q-pa-md q-mb-lg flex justify-between"
        v-for="(note, index) in notes"
        :key="index"
      >
        <div class="size-note">
          <h2 class="text-h6 q-pl-sm">{{ note.title }}</h2>
          <p class="q-mb-xs text-justify">
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
        </div>
        <div class="flex content-center"> 
          <q-icon @click="deleteNote(note.id)" color="negative" class="q-pa-md" size="lg" name="delete" />
          <q-icon @click="selectedNote(note.id)" color="yellow-6" class="q-pa-md" size="lg" name="edit" />
        </div>
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
    :edit-note="edit"
    @submit="(data) => addNote(data)"
    @cancel="closeDialog"
  />
</template>

<script>
import { defineComponent } from "vue";
import MyDialog from "src/components/MyDialog";
import axios from 'axios';

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
        importance: null
      }
    }
  },
  methods: {
    async updateNotes(){
      try {
        const response = await axios.get('http://localhost:3000/notes')
        this.notes = response.data
      }catch (error) {
        console.log(error)
      }
    },
    openDialog() {
      this.showDialog = true;
    },
    addNote(note) {
      this.edit.id ? this.editNote(note) : this.createNote(note);
    },
    createNote(note){
      console.log('creandoo')
      axios
      .post("http://localhost:3000/notes", {
        title: note.title,
        description: note.description,
        importance: note.importance
      })
      .then(() => {
        this.updateNotes()
        this.closeDialog()
        })
      .catch((error) => {
        console.log(error);
      });

    },
    editNote(note){
      
    console.log('editandoo')
      axios
      .put(`http://localhost:3000/notes/${this.edit.id}`, {
        title: note.title,
        description: note.description,
        importance: note.importance
      })
      .then(() => {
        this.updateNotes()
        this.closeDialog()
        })
      .catch((error) => {
        console.log(error);
      });
    },
    deleteNote(id){
      axios
      .delete(`http://localhost:3000/notes/${id}`, {
      })
      .then(() => {
        this.updateNotes()
        })
      .catch((error) => {
        console.log(error);
      });

    },
    selectedNote(id){
      this.edit = this.notes[id]
      this.showDialog = true;

    },
    closeDialog() {
      this.showDialog = false;
      this.edit = {
        title: null,
        description: null,
        importance: null
      }
    }
    
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/notes')
      this.notes = response.data
    }catch (error) {
      console.log(error)
    }
  }
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
.logout {
  text-decoration: none;
}

.logout:visited {
  color: black;
}
.size-note {
  width: 85%;
}
@media (max-width: 1053px) {
  .size-note {
     width: 100%;
  }
}

</style>

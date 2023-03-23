<template>
  <div class="window-height window-width column justify-center items-center">
    <q-card class="login-card q-pa-md">
      <q-card-section class="column flex items-center q-px-none">
        <h4 class="q-ma-none text-bold">Register</h4>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-none">
        <p class="q-mb-xs q-mt-lg text-bold">Usuario</p>
        <q-input
          class="q-ma-none"
          outlined
          v-model="user"
          dense
          placeholder="Ingresa un usuario"
        />
        <p class="q-mb-xs q-mt-md text-bold">Clave</p>
        <q-input
          outlined
          v-model="password"
          placeholder="Ingresa una contraseña"
          type="password"
          dense
        />
      </q-card-section>
      <q-card-section class="q-px-none q-py-md q-pt-none">
        <q-btn
          @click="submitForm"
          class="full-width"
          color="primary"
          label="register"
        >
        </q-btn>
      </q-card-section>
      <p v-if="error" class="text-bold">Usuario ya registrado</p>
    </q-card>
    <router-link class="q-pa-md enlace" to="/login">
      <q-btn color="primary">Log in</q-btn>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "RegisterPage",

  data() {
    return {
      user: null,
      password: null,
      error: false
    };
  },
  methods: {
    submitForm() {

      axios.get(`http://localhost:3000/users?user=${this.user}`)
      .then((response) => {
          if (response.data[0]) {
            this.error = true;
          } else {
            this.error = false
            axios
            .post("http://localhost:3000/users", {
              user: this.user,
              password: this.password,
            })
            .then(() => {
              this.$router.push("/login");
             })
            .catch((error) => {
              console.log(error);
             });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      
    },
  },
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 30%;
  min-width: 300px;
}

@media only screen and (max-width: 700px) {
  .login-card {
    width: 58%;
    min-width: none;
  }
}

.enlace {
  text-decoration: none;
}

.enlace:visited {
  color: black;
}
</style>

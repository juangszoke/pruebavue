<template>
  <div class="window-height window-width column justify-center items-center">
    <q-card class="login-card q-pa-md">
      <q-card-section class="column flex items-center q-px-none">
        <h4 class="q-ma-none text-bold">Login</h4>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-none">
        
          <p class="q-mb-xs q-mt-lg text-bold">Usuario</p>
          <q-input
            class="q-ma-none"
            outlined
            v-model="user"
            dense
            placeholder="Ingresa tu usuario"
            :rules="[(val) => !!val || 'Debes ingresar tu usuario']"
          />
          <p class="q-mb-xs q-mt-md text-bold">Clave</p>
          <q-input
            outlined
            v-model="password"
            placeholder="Ingresa tu contraseña"
            type="password"
            dense
            :rules="[(val) => !!val || 'Debes ingresar tu contraseña']"
          />
      </q-card-section>
      <q-card-section class="q-px-none q-py-md q-pt-none">
        <q-btn @click="login" class="full-width" color="primary" label="Login">
        </q-btn>
      </q-card-section>
    </q-card>
    <router-link class="q-pa-md enlace" to="/register">
      <q-btn color="primary">sign up</q-btn>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from 'quasar'
import axios from "axios";

export default defineComponent({
  name: "LoginPage",

  data() {
    const $q = useQuasar()
    return {
      user: null,
      password: null,
      $q
    };
  },
  methods: {
    login() {
      axios
        .get(
          `http://localhost:3000/users?user=${this.user}&password=${this.password}`
        )
        .then((response) => {
          if (response.data[0]) {
            this.error = false;
            localStorage.setItem("user", response.data[0].user);
            localStorage.setItem("id", response.data[0].id);
            this.$router.push("/");
          } else {
            this.$q.notify({
              type: 'negative',
              message: 'Usuario o clave incorrecta'
              })
              this.user = null
              this.password = null
            
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

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
        />
        <p class="q-mb-xs q-mt-md text-bold">Clave</p>
        <q-input
          outlined
          v-model="password"
          placeholder="Ingresa tu contraseña"
          type="password"
          dense
        />
      </q-card-section>
      <q-card-section class="q-px-none q-py-md q-pt-none">
        <q-btn class="full-width" color="primary" label="Login"> </q-btn>
      </q-card-section>
    </q-card>
    <router-link class="q-pa-md ron" to="/register">
      <q-btn color="primary">register</q-btn>
    </router-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",

  data() {
    return {
      user: null,
      password: null,
    };
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

.ron {
  text-decoration: none;
}

.ron:visited {
  color: black;
}
</style>

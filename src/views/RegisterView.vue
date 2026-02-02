<template>
  <v-container fluid class="login-container">
    <v-dialog v-model="dialog" persistent max-width="400">
      <v-card dark>
        <v-card-title class="text-center"> Registro </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field v-model="name" label="Name" required></v-text-field>
            <v-text-field v-model="email" label="Email" required></v-text-field>
            <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center flex-column">
          <v-btn color="primary" @click="register">Registrar</v-btn>

          <router-link to="/" class="mt-3 text-decoration-none">
            <span class="login-link">Login</span>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Auth from "@/services/auth";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      dialog: true,
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      Auth.register({ name: this.name, email: this.email, password: this.password })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Usuário registrado com êxito!",
            showConfirmButton: false,
            timer: 3500,
          });
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.error("Erro ao registrar:", error);
          Swal.fire({
            icon: "error",
            title: "Erro ao registrar.",
            text: error.response.data.message,
            showConfirmButton: false,
            timer: 3500,
          });
        });
    },
  },
};
</script>

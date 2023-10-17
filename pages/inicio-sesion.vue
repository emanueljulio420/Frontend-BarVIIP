<template>
  <div>
    <div class="container">
      <v-img class="mx-auto my-6" max-width="300"
        src="../images/_c26d19c6-e2c2-4f86-8148-2e602efa170b-removebg-preview.png" />
      <v-card class="my-5 text-center mx-auto transparent-card" min-width="400" min-height="300">
        <v-card-title class="my-3">
          <h2>Iniciar sesión</h2>
        </v-card-title>
        <form class="mx-5" action="#" @submit.prevent="handleSubmit()">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="email" :rules="[rules.required, rules.correo]" label="Correo" variant="outlined"
                requiered />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"><v-text-field v-model="password" :rules="[rules.required]" label="Contraseña" type="password"
                placeholder="Contraseña" variant="outlined" requiered />
            </v-col>
          </v-row>
          <v-btn class="custom-button" type="submit">
            Iniciar sesión
          </v-btn>
        </form>
        <v-card-actions class="mx-3 my-2">
          <v-btn class="custom-button" type="submit">
            Iniciar sesión
          </v-btn>
          <v-spacer />
          <v-btn border class="custom-button" @click="openDialog()">
            <svg-icon type="mdi" :path="path"></svg-icon>
            Crear perfil
          </v-btn>
        </v-card-actions>
      </v-card>
      <usuarios-crearUsuario v-if="openD" :dialog="openD" @close="closeDialog" />
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2/dist/sweetalert2.js';
const openD = ref(false);
const password = ref()
const email = ref()
const errorMessage = ref()
const router = useRouter();
const openDialog = () => {
  openD.value = true;
};

const closeDialog = () => {
  openD.value = false;
};
const existe_usuario = ref([]);
const validar = async () => {
  const { data } = await axios.get("http://localhost:3001/usuario");

  existe_usuario.value = data.value.find(
    (x) => x.correo == usuario.correo && x.contrasena == usuario.contrasena
  );
};

const handleSubmit = async () => {
  // Validación del correo electrónico
  if (!email.value || !/^\S+@\S+\.\S+$/.test(email.value)) {
    errorMessage.value = "Por favor, ingresa un correo electrónico válido.";
    mostrarError(errorMessage.value);
    return;
  }

  // Validación de la contraseña
  if (!password.value) {
    errorMessage.value = "Por favor, ingresa tu contraseña.";
    mostrarError(errorMessage.value);
    return;
  }

  errorMessage.value = "";
  await login();
};

const mostrarError = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: mensaje,
  });
};
const login = async () => {
  try {
    const users = await getUsers();
    const foundUser = users.find(user => user.email === email.value && user.password === password.value);

    if (foundUser) {
      console.log('Inicio de sesión exitoso para el usuario:', foundUser);
      let stringUser = JSON.stringify(foundUser);
      sessionStorage.setItem('USER', stringUser);
      router.push({path:"/reservas" , query:{id:foundUser.id}})
      

    } else {
      mostrarError('Credenciales incorrectas. Inicio de sesión fallido.');
      password.value = ""

    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado en otro lugar si es necesario
  }
};

</script>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencilPlus } from "@mdi/js";
import axios from "axios";
export default {
  name: "my-component",
  components: {
    SvgIcon,
  },
  data() {
    return {
      correo: "",
      rules: {
        required: (value) => !!value || "Campo necesaro.",
        correo: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Correo invalido.";
        },
      },
      path: mdiPencilPlus,
    };
  },
};
</script>

<style scoped>
@import "../styles/inicio.module.css"
</style>

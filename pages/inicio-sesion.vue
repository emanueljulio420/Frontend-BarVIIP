<template>
  <div>
    <div class="container">
      <v-img class="mx-auto my-6" max-width="300"
        src="../images/_c26d19c6-e2c2-4f86-8148-2e602efa170b-removebg-preview.png" />
      <v-card class="my-5 text-center mx-auto transparent-card" min-width="400" min-height="300">
        <v-card-title class="my-3">
          <h2>Login</h2>
        </v-card-title>
        <v-form class="mx-5" action="javascript:void(0)" ref="form" @submit="handleSubmit($refs.form)" required>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="email" :rules="[rules.required, rules.correo]" label="Email" variant="outlined"
                required />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"><v-text-field v-model="password" :rules="[rules.required]" label="Password" type="password"
                placeholder="Password" variant="outlined" required />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn class="custom-button" type="submit">
                Loginnnnn
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn @click="openDialog()">
                <svg-icon type="mdi" :path="path"/>
                Create profile
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
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

const handleSubmit = async (form) => {
  const { valid } = await form.validate();
  if (!valid) {
    return;
  }
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
    const barbers = await getBarbers();
    const foundBarber = barbers.find(barber => barber.email === email.value && barber.password === password.value)
    if (foundUser || foundBarber) {
      console.log('Successful login for the user:', foundUser || foundBarber);
      let stringUser = JSON.stringify(foundUser || foundBarber);
      sessionStorage.setItem('USER', stringUser);
      if (foundUser) {
        router.push({ path: "/reservas", query: { id: foundUser.id } })
      } else {
        router.push({ path: "/agenda", query: { id: foundBarber.id } })
      }
    }
    else{
      mostrarError("The email or password is incorrect")
    }
  } catch (error) {
    console.error('Failed to get users:', error);
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/usuarios');
    return response.data;
  } catch (error) {
    console.error('Failed to get users:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado en otro lugar si es necesario
  }
};

const getBarbers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/barberos');
    return response.data;
  } catch (error) {
    console.error('Failed to get users:', error);
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
      email: "",
      rules: {
        required: (value) => !!value || "Required Field.",
        correo: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email invalid.";
        },
      },
      path: mdiPencilPlus,
    };
  },
};
</script>

<style scoped>@import "../styles/inicio.module.css"</style>

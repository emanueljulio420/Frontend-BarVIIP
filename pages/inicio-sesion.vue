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
                <svg-icon type="mdi" :path="path" />
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

import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import config from '../config/default.json'
1
const router = useRouter();
const password = ref()
const email = ref()

const login = async () => {
  try {
    const url = `${config.api_host}/auth`
    const { data } = await axios.post(url, { email: email.value, password: password.value })
    if (data?.ok) {
      Swal.fire(
        'Welcome',
        `${data?.message}`,
        'success'
      );
      if (data?.info.type === "User") {
        sessionStorage.setItem("TOKEN",data?.info.token)
        sessionStorage.setItem("TYPE",data?.info.type) 
        router.push({ path: "/reservas" });
      } else {
        sessionStorage.setItem("TYPE",data?.info.type) 
        sessionStorage.setItem("TOKEN",data?.info.token) 
        router.push({ path: "/agenda" });
      }
    } else {
      Swal.fire({
        title: "Oops...",
        text: data?.message,
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Not found api",
      icon: "error",
    });
  }
}

const openD = ref(false);

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

</script>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencilPlus } from "@mdi/js";
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

<style scoped>
@import "../styles/inicio.module.css"
</style>

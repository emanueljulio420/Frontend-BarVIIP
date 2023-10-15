<template>
    <div>
        <v-dialog v-model="open" width="50%" id="crearUsuarioDialog" persistent>
            <v-card class="text-center">
                <h1 class="my-6">Actualizar datos</h1>
                <form class="mx-5" action="javascript:void(0)"  @submit.prevent="handleSubmit()" requiered>
                    <v-container class="my-3">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="new_user.name" :rules="[rules.required]" label="Nombres"
                                    placeholder="Nombres" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_user.lastname" :rules="[rules.required]" label="Apellidos"
                                    placeholder="Apellidos" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete v-model="new_user.type" :rules="[rules.required]" :items="Tipos_usu"
                                    label="Tipo de usuario" placeholder="Select..."></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="new_user.image" :rules="[rules.required,rules.image]"
                                    accept="image/png, image/jpeg, image/bmp" placeholder="Ingresa tu foto"
                                    prepend-icon="mdi-camera" label="Foto"></v-file-input>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_user.email" :rules="[rules.required, rules.email]"
                                    label="Correo" variant="outlined" cols="6" disabled/>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="new_user.password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                                    :type="show1 ? 'text' : 'password'" hint="Minimo 8 caracteres" counter
                                    @click:append="show1 = !show1" label="Contraseña" placeholder="Contraseña"
                                    variant="outlined" />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="new_user.confipassword"
                                    :rules="[rules.required, rules.min]"
                                    type="password"
                                    hint="Minimo 8 caracteres" counter label="Confirmar contraseña"
                                    placeholder="Confirmar contraseña" variant="outlined" />
                            </v-col>
                            <v-col cols="6">
                                <v-btn class="text-none" color="#616161" variant="flat" type="submit" size="large" block>
                                    Actualizar
                                    <v-icon class="mx-1" end icon="mdi-checkbox-marked-circle" />
                                </v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn border class="text-none" variant="text" @click="closeDialog()" size="large">
                                    Cancelar
                                    <v-icon class="mx-1" end icon="mdi-cancel" />
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.min.css';


const open = ref()

const errorMessage = ref()

const new_user = ref({})

const emit = defineEmits(['close'])

const props = defineProps({
    dialog: {
        type: Boolean,
        required: true
    },
    edit_user: {
        type: Object,
        required: true
    }
})
const actualizar_usuario = async () => {
    const url = `http://localhost:3001/usuarios/${new_user.value.id}`
    const result = await axios.put(url, new_user.value)
    console.log(result);
    open.value = false
    emit('close')
}
onBeforeMount(() => {
    open.value = props.dialog
    new_user.value=props.edit_user
    console.log(new_user.value);
    /* new_user.value=props.user */
});

const handleSubmit = async () => {
  // Validación del correo electrónico
  if (!new_user.value.name) {
    errorMessage.value = "Por favor, ingresa tu nombre.";
    mostrarError(errorMessage.value);
    return;
  }
  if (!new_user.value.lastname) {
    errorMessage.value = "Por favor, ingresa tu nombre.";
    mostrarError(errorMessage.value);
    return;
  }
  if (!new_user.value.type) {
    errorMessage.value = "Por favor, ingresa el tipo de tu usuario.";
    mostrarError(errorMessage.value);
    return;
  }
  if (!new_user.value.image) {
    errorMessage.value = "Por favor, ingresa tu foto.";
    mostrarError(errorMessage.value);
    return;
  }
  if (!new_user.value.email || !/^\S+@\S+\.\S+$/.test(new_user.value.email)) {
    errorMessage.value = "Por favor, ingresa un correo electrónico válido.";
    mostrarError(errorMessage.value);
    return;
  }
  // Validación de la contraseña
  if (!new_user.value.password) {
    errorMessage.value = "Por favor, ingresa tu contraseña.";
    mostrarError(errorMessage.value);
    return;
  }
  if (!new_user.value.confipassword) {
    errorMessage.value = "Por favor, confirma tu contraseña.";
    mostrarError(errorMessage.value);
    return;
  }
  
  errorMessage.value = "";
  await actualizar_usuario();
};
const mostrarError = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: mensaje,
  });
};

const closeDialog = () => {
    open.value = false
    emit('close')
};

</script>

<script>
export default {
    data() {
        return {
            show1: false,
            show2: true,
            email: '',
            Tipos_usu: ['Barbero', 'Cliente'],
            rules: {
                required: value => !!value || 'Campo necesaro.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Correo invalido.'
                },
                min: v => v.length >= 8 || 'Min 8 characters',
                /* image: value => {
                    return !value || !value.length || value[0].size < 2000000 || 'El tamaño de la imagen debe ser de menos de 2MB!'
                } */
            }
        }
    }
};
</script>
<style scoped>
.v-card {
    background-color: white;
    border-radius: 15px;
    /* Esquinas redondeadas */
    padding: 1;
    /* Padding en unidades relativas */
    color: black;
    /* Color del texto dentro de la carta */
}

</style>
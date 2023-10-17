<template>
    <div>
        <v-dialog v-model="open" width="50%" id="crearUsuarioDialog" persistent>
            <v-card class="text-center">
                <h1 class="my-6">Registrarme</h1>
                <v-form class="mx-5" action="javascript:void(0)" ref="form" @submit.prevent="handleSubmit($refs.form)" required>
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
                                    label="Correo" variant="outlined" cols="6" />
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
                                    Registrarme
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
                    <div v-html="errorMessage">
                    </div>
                </v-form>
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
    }
})

onBeforeMount(() => {
    open.value = props.dialog
});

const handleSubmit = async (form) => {
  const { valid } = await form.validate();
  if (!valid) {
    return;
  }
  await guardarUsuario();
};

const mostrarError = (mensaje) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: mensaje,
  });
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

const guardarUsuario = async () => {
    try {
        const users = await getUsers();
        const foundUser = users.find(user => user.email === new_user.value.email);
        if (foundUser) {
            mostrarError('El correo ya existe');
        } else {
            if (new_user.value.password === new_user.value.confipassword) {
                await axios.post("http://localhost:3001/usuarios", new_user.value);
                closeDialog();
                Swal.fire(
                    'Cuenta creada con éxito!',
                    'Felicidades'
                );
                
            } else {
                mostrarError('Las contraseñas no son iguales');
            }
        }
    } catch (error) {
        console.error(error);
        mostrarError('Error al guardar el usuario. Por favor, inténtalo de nuevo más tarde.');
    }
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
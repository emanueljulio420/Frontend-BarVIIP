<template>
    <div>
        <v-dialog v-model="open" width="50%" persistent>
            <v-card class="text-center">
                <h1 class="my-6">Registrarme</h1>
                <form class="mx-5" action="javascript:void(0)" @submit="guardarUsuario">
                    <v-container class="my-3">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="usuarioNuevo.nombres" :rules="[rules.required]" label="Nombres"
                                    placeholder="Nombres" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="usuarioNuevo.apellidos" :rules="[rules.required]" label="Apellidos"
                                    placeholder="Apellidos" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete v-model="usuarioNuevo.tipo" :rules="[rules.required]" :items="Tipos_usu"
                                    label="Tipo de usuario" placeholder="Select..." ></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="usuarioNuevo.correo" :rules="[rules.required, rules.email]"
                                    label="Correo" variant="outlined" cols="6" />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="usuarioNuevo.contrasena"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                                    :type="show1 ? 'text' : 'password'" hint="Minimo 8 caracteres" counter
                                    @click:append="show1 = !show1" label="Contraseña" placeholder="Contraseña"
                                    variant="outlined" />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="usuarioNuevo.conficontrasena"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                                    :type="show1 ? 'text' : 'password'" hint="Minimo 8 caracteres" counter
                                    @click:append="show1 = !show1" label="Confirmar contraseña"
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
                </form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import axios from 'axios';


const open = ref()

const usuarioNuevo = ref({})

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

const guardarUsuario = () => {
    if (usuarioNuevo.value.contrasena === usuarioNuevo.value.conficontrasena) {
        console.log("Hola");
        axios.post("http://localhost:3001/usuario", usuarioNuevo.value)
            .then(() => {
                closeDialog();
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        alert("Contraseñas incorrectas");
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
                min: v => v.length >= 8 || 'Min 8 characters'
            }
        }
    }
};
</script>
<template>
    <div>
        <v-dialog v-model="open" width="50%" id="crearUsuarioDialog" persistent>
            <v-card class="text-center">
                <h1 class="my-6">Actualizar datos</h1>
                <v-form class="mx-5" action="javascript:void(0)" ref="form" @submit.prevent="handleSubmit($refs.form)"
                    requiered>
                    <v-container class="my-3">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="new_user.name" :rules="[rules.required]" label="Names"
                                    placeholder="Names" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_user.lastName" :rules="[rules.required]" label="Lastnames"
                                    placeholder="Lastnames" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete v-model="new_user.type" :rules="[rules.required]" :items="Tipos_usu"
                                    label="Type of user" placeholder="Select..." disabled></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="new_user.image" :rules="[rules.required, rules.image]"
                                    accept="image/*" placeholder="Enter your photo" prepend-icon="mdi-camera"
                                    label="Photo"></v-file-input>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_user.email" :rules="[rules.required, rules.email]" label="Email"
                                    variant="outlined" cols="6" />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="new_user.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                    hint="Minimun 8 characters" counter @click:append="show1 = !show1" label="Password"
                                    placeholder="Password" variant="outlined" />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="new_user.confipassword" :rules="[rules.required, rules.min]"
                                    type="password" hint="Minimum 8 characters" counter label="Confirm password"
                                    placeholder="Confirm password" variant="outlined" />
                            </v-col>
                            <v-col cols="6">
                                <v-btn class="text-none" color="#616161" variant="flat" type="submit" size="large" block>
                                    Update
                                    <v-icon class="mx-1" end icon="mdi-checkbox-marked-circle" />
                                </v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn border class="text-none" variant="text" @click="closeDialog()" size="large">
                                    Cancel
                                    <v-icon class="mx-1" end icon="mdi-cancel" />
                                </v-btn>

                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import config from '../../config/default.json'
import { getHeaders } from "../../src/auth/jwt";


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
    try {
        const token = sessionStorage.getItem("TOKEN")
        const urlVerify = `${config.api_host}/verify`
        const { data } = await axios.post(urlVerify, {token})
        const id = data.info._id
        console.log(id, "Id")
        console.log(token, "token")
        const headers = getHeaders(token)
        const url = `${config.api_host}/users/${id}`
        const response = await axios.post(url, new_user.value, { headers })
        if (response.ok) {
            closeDialog()
            Swal.fire(
                'Congratulations',
                `${response?.message}`,
                'success'
            );

        }
        else {
            closeDialog()
            Swal.fire(
                'oppps',
                `${response?.message}`,
                'error'
            );
        }

    } catch (error) {
        console.log(error)
    }


}
onBeforeMount(() => {
    open.value = props.dialog
    new_user.value = props.edit_user
    console.log(new_user.value);
    /* new_user.value=props.user */
});

const handleSubmit = async (form) => {
    const { valid } = await form.validate();
    if (!valid) {
        return;
    }

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
            Tipos_usu: ['Barber', 'Client'],
            rules: {
                required: value => !!value || 'Required field.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid email.'
                },
                min: v => v.length >= 8 || 'Min 8 characters',
                image: value => {
                    return !value || !value.length || value[0].size < 2000000 || 'The image size must be less than 2 mb!'
                }
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
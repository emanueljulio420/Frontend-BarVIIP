<template>
    <div class="centrar container">
        <v-container class="my-3">
            <v-card class="rounded-lg mx-auto" max-width="600">
                <v-img class="my-6 rounded-circle centrar-imagen" width="250" height="250" :src='user && user.img ? user.img.slice() : ""' cover />
                <v-card-title>My Profile</v-card-title>
                <v-container>
                    <v-row no-gutters>
                        <v-col>
                            <v-sheet class="pa-2 ma-2">
                                Name
                            </v-sheet>
                        </v-col>
                        <v-col>
                            <v-sheet class="pa-2 ma-2" v-if="user">{{ user.name }}
                            </v-sheet>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-sheet class="pa-2 ma-2">
                                Last name
                            </v-sheet>
                        </v-col>
                        <v-col>
                            <v-sheet class="pa-2 ma-2" v-if="user">{{ user.lastName }}
                            </v-sheet>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-sheet class="pa-2 ma-2">
                                Email
                            </v-sheet>
                        </v-col>
                        <v-col>
                            <v-sheet class="pa-2 ma-2" v-if="user">{{ user.email }}
                            </v-sheet>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col>
                            <v-sheet class="pa-2 ma-2">
                                Type
                            </v-sheet>
                        </v-col>
                        <v-col>
                            <v-sheet class="pa-2 ma-2" v-if="user">{{ user.type }}
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions class="mx-2 my-4">
                    <v-btn variant="flat" @click="openDialog()">Edit</v-btn>
                    <v-spacer />
                    <v-btn variant="flat" @click="deleteCliente()">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
        <UsuariosEditarUsuario v-if="openD" :dialog="openD" :edit_user="copy_user" @close="closeDialog" />
    </div>
</template>

<script setup>

import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config/default.json'
import { getHeaders } from "../src/auth/jwt.js";

const router = useRouter();
const openD = ref(false)
const user = ref();
const copy_user = ref()
const citas = ref();

onBeforeMount(async () => {
    await info()
});

const info = async () => {
    try {
        const token = sessionStorage.getItem("TOKEN")
        const url = `${config.api_host}/verify`
        const { data } = await axios.post(url, { token })
        if (data.ok == false) {
            throw {
                message: data.message
            }
        }
        else {
            const userData = data.info
            user.value = userData
        }


    } catch (error) {
        console.log(error)
    }
}

const deleteCliente = async () => {
    try {
        const result = await Swal.fire({
            icon: 'question',
            title: 'Are you sure you want to delete your user?',
            showDenyButton: true,
            denyButtonColor: '#8F8F8F',
            confirmButtonText: 'Yes',
        });

        if (result.isConfirmed) {
            const token = sessionStorage.getItem("TOKEN");
            const headers = getHeaders(token);
            const url_very = `${config.api_host}/verify`;

            // Realizar la solicitud POST con await
            const { data } = await axios.post(url_very, { token });
            console.log("Entre");
            console.log(data);

            const id = data.info._id;
            const url = `${config.api_host}/users/${id}`;

            const urlget = `${config.api_host}/appointments/`
            const { data: otro } = await axios.get(urlget, { headers })
            citas.value = otro.info.filter(cita => cita.idUser === id)
            citas.value.map(cita => axios.delete(`${config.api_host}/appointments/${cita._id}`));
            const response = await axios.delete(url, { headers });
            Swal.fire('Delete!', '', 'success');
            router.push({ path: '/' });
        }
    } catch (error) {
        // Manejar errores aquí
        console.error(error);
        Swal.fire('Error', 'There was an error deleting the user', 'error');
    }
};

const openDialog = () => {
    openD.value = true;
    copy_user.value = { ...user.value }
    console.log(copy_user.value);

    console.log("Opend " + openD.value)

};
const closeDialog = () => {
    openD.value = false;
    user.value = copy_user.value
};
definePageMeta({
    layout: 'iniciocliente'
});

</script>

<style>
.centrar {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
}

.centrar-imagen {
    margin: auto;
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.container {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Ocupa toda la altura de la ventana */
    background-image: url("https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg");
    /* https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg */
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}

.white {
    color: white;
    text-decoration: none;
    font-size: 1em;
}

.black {
    color: black;
}
</style>
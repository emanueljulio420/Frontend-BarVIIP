<template>
    <div class="aling-center">
        <v-container class="text-center">
            <h1>Appointments</h1>
            <v-row class="my-10">
                <v-col v-for="cita of citas" :key="cita.id" cols="4" class="my-5">
                    <v-card class="mx-auto" max-width="400">
                        <v-card-title>{{ cita.date }}</v-card-title>
                        <v-container>
                            <v-row no-gutters>
                                <v-col>
                                    <v-sheet class="pa-2 ma-2">
                                        Barber
                                    </v-sheet>
                                </v-col>
                                <v-col>
                                    <v-sheet class="pa-2 ma-2">
                                        {{ cita.nameBarber }}
                                    </v-sheet>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col>
                                    <v-sheet class="pa-2 ma-2">
                                        Address
                                    </v-sheet>
                                </v-col>
                                <v-col>
                                    <v-sheet class="pa-2 ma-2">
                                        {{ cita.address }}
                                    </v-sheet>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col>
                                    <v-sheet class="pa-2 ma-2">
                                        Hour
                                    </v-sheet>
                                </v-col>
                                <v-col>
                                    <v-sheet class="pa-2 ma-2">
                                        {{ cita.hour }}
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-card-actions class="mx-2 my-4">
                            <v-btn color="red" variant="flat" @click="editCita(cita)">Edit</v-btn>
                            <v-spacer />
                            <v-btn variant="flat" @click="deleteCita(cita)">Delete</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <citas-editar-cita v-if="openD" :dialog="openD" :cita="copy_cita" @close="closeDialog" />
    </div>
</template>
<script setup>

import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';
import config from '../../config/default.json'
import { getHeaders } from "../../src/auth/jwt";

const openD = ref(false);
const citas = ref({})
const copy_cita = ref()

const user = ref()

onBeforeMount(() => {
    getCitas();
});

const getCitas = async () => {
    const token = sessionStorage.getItem("TOKEN")
    const urlverify = `${config.api_host}/verify`
    const { data } = await axios.post(urlverify, { token })
    const type = sessionStorage.getItem("TYPE")
    const headers = getHeaders(token)
    const urlget = `${config.api_host}/appointments/`
    const { data: response } = await axios.get(urlget, { headers })
    console.log(response);
    citas.value = response.info.filter(x => x.idUser === data.info._id)
    console.log(citas.value);
};

const editCita = (cita) => {
    copy_cita.value = { ...cita }
    openD.value = true;
};

const deleteCita = async (cita) => {
    Swal.fire({
        icon: 'question',
        title: 'Are you sure you delete the quote ?',
        showDenyButton: true,
        denyButtonColor: '#8F8F8F',
        confirmButtonText: 'Yes',
    }).then((result) => {
        if (result.isConfirmed) {
            const token = sessionStorage.getItem("TOKEN");
            const headers = getHeaders(token);
            const url = `${config.api_host}/appointments/${cita._id}`
            const { data } = axios.delete(url, { headers })
            console.log(data)
            getCitas()
            Swal.fire('Delete!', '', 'success')
        }
    })
}

const closeDialog = () => {
    openD.value = false;
    getCitas();
}

</script>
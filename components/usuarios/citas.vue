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

const openD = ref(false);
const agendarBarber = ref({})
const citas = ref({})
const copy_cita = ref()

const user = ref()

onBeforeMount(() => {
    getCitas();
    if (process.client) {
        const userData = sessionStorage.getItem("USER");
        if (userData) {
            user.value = JSON.parse(userData);
        }
    }
});

const getCitas = async () => {
    const { data } = await axios.get('http://localhost:3001/citas');
    if (user.value.type === 'Cliente') {
        citas.value = data.filter(cita => cita.idCliente === user.value.id);
    }
    else {
        citas.value = data.filter(cita => cita.idBarbero === user.value.id);
    }
    console.log(citas.value);
};

const editCita = (cita) => {
    copy_cita.value = { ...cita }
    openD.value = true;
};

const deleteCita = async (cita) => {
    Swal.fire({
        title: 'Are you sure you delete the quote ?',
        showDenyButton: true,
        denyButtonColor: '#8F8F8F',
        confirmButtonText: 'Yes',
    }).then((result) => {
        if (result.isConfirmed) {
            const { data } = axios.delete(`http://localhost:3001/citas/${cita.id}`)
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
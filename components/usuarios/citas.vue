<template>
    <div class="aling-center">
        <v-container class="text-center">
            <h1>Appointments</h1>
            <v-row class="my-10">
                <v-col v-for="cita of citas" :key="cita.id" cols="4" class="my-5">
                    <v-card class="mx-auto" max-width="344">
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
                                            hour
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
                            <v-btn color="red" variant="flat" @click="agendar(cita)">Agendar</v-btn>
                        <v-spacer/>
                            <v-btn color="red" variant="flat" @click="agendar(cita)">Agendar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <citas-editar-cita v-if="openD" :dialog="openD" :cita="agendarBarber" @close="closeDialog" />
    </div>
</template>
<script setup>

import axios from 'axios';

const openD = ref(false);
const agendarBarber = ref({})
const citas = ref({})

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
    citas.value = data.filter(cita => cita.idCliente === user.value.id);
    console.log(citas.value);
};

const agendar = (barbero) => {
    agendarBarber.value = barbero
    openD.value = true;
};

const closeDialog = () => {
    openD.value = false;
}

</script>
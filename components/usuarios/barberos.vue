<template>
    <div class="aling-center">
        <v-container class="text-center">
            <h1>Barberos</h1>
            <v-row class="my-10">
                <v-col v-for="barber of barbers" :key="barber.id" cols="4" class="my-5">
                    <v-card class="mx-auto" max-width="344">
                        <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="400" width="auto" cover />
                        <v-card-title>{{ barber.name }}</v-card-title>
                        <v-card-actions>
                            <v-btn color="red" variant="flat" @click="agendar(barber)" block>Agendar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <citas-crear-cita v-if="openD" :dialog="openD" :barbero="agendarBarber" @close="closeDialog" />
    </div>
</template>
<script setup>

import axios from 'axios';

const openD = ref(false);
const agendarBarber = ref({})
const barbers = ref({})

onBeforeMount(() => {
    getBarbers();

});

const getBarbers = async () => {
    const { data } = await axios.get('http://localhost:3001/barberos');
    barbers.value = data
};

const agendar = (barbero) => {
    agendarBarber.value = barbero
    openD.value = true;
};

const closeDialog = () => {
    openD.value = false;
}

</script>
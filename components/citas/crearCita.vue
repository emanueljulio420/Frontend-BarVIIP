<template>
    <div>
        <v-dialog v-model="open" width="50%" id="crearUsuarioDialog" persistent>
            <v-card class="text-center">
                <h1 class="my-6">Schedule appointment</h1>
                <v-form class="mx-5" action="javascript:void(0)" ref="form" @submit="handleSubmit($refs.form)" required>
                    <v-container class="my-3">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="new_cita.date" :rules="[rules.required]" label="Date" type="date"
                                    variant="outlined" cols="6" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_cita.hour" :rules="[rules.required]" label="Hour" type="time"
                                    variant="outlined" cols="6" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_cita.address" :rules="[rules.required]" label="Address"
                                    variant="outlined" cols="6" />
                            </v-col>
                            <v-col cols="12" class="red" v-html="errorMessage" />
                            <v-col cols="6">
                                <v-btn class="text-none" color="#616161" variant="flat" type="submit" size="large" block>
                                    Agendar
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
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script setup>

import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';
import config from '../../config/default.json'
import { getHeaders } from "../../src/auth/jwt";

const new_cita = ref({})
const open = ref()
const barber = ref({})
const emit = defineEmits(['close'])
const errorMessage = ref()

const props = defineProps({
    dialog: {
        type: Boolean,
        required: true
    },
    barbero: {
        type: Object,
        required: true
    }
})

onBeforeMount(async () => {
    open.value = props.dialog
    barber.value = props.barbero

    new_cita.value.idBarber = barber.value._id
    new_cita.value.nameBarber = barber.value.name

    if (process.client) {
        const token = sessionStorage.getItem("TOKEN");
        const url = `${config.api_host}/verify`
        const { data } = await axios.post(url, { token })
        new_cita.value.idUser = data.info._id
    }
});


const handleSubmit = async (form) => {
    const { valid } = await form.validate();
    if (!valid) {
        return;
    }
    await guardarCita();
};

const guardarCita = async () => {
    try {
        const token = sessionStorage.getItem("TOKEN");
        const headers = getHeaders(token);
        console.log(new_cita.value);
        const url = `${config.api_host}/appointments/`
        const response = await axios.post(url, new_cita.value , { headers })
        console.log(response);
        closeDialog();
        Swal.fire(
            'Appointment created successfully!',
            'Congratulations',
            'success'
        );
    } catch (error) {
        console.error(error);
        errorMessage.value = '<strong>Error saving appointment. Please try again later.</strong>'
    }
}
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
            rules: {
                required: value => !!value || 'Required field.'
            }
        }
    }
};
</script>

<style scoped>
.red {
    color: red;
}
</style>
<template>
    <div>
        <v-dialog v-model="open" width="50%" id="crearUsuarioDialog" persistent>
            <v-card class="text-center">
                <h1 class="my-6">Agendar cita</h1>
                <v-form class="mx-5" action="javascript:void(0)" ref="form" @submit="handleSubmit($refs.form)" required>
                    <v-container class="my-3">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="new_cita.date" :rules="[rules.required]" label="Dia" type="date"
                                    variant="outlined" cols="6" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_cita.hour" :rules="[rules.required]" label="Dia" type="time"
                                    variant="outlined" cols="6" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_cita.address" :rules="[rules.required]" label="Dirección"
                                    variant="outlined" cols="6" />
                            </v-col>
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
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';

const user = ref()
const new_cita = ref({})
const open = ref()
const barber = ref({})
const emit = defineEmits(['close'])

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

onBeforeMount(() => {
    open.value = props.dialog
    barber.value = props.barbero
    new_cita.value.idBarbero = barber.value.id
    new_cita.value.nameBarber = barber.value.name

    if (process.client) {
        const userData = sessionStorage.getItem("USER");
        if (userData) {
            user.value = JSON.parse(userData);
        }
    }
});

const getCitas = async () => {
    try {
        const response = await axios.get('http://localhost:3001/citas');
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error; // Re-lanzar el error para que pueda ser manejado en otro lugar si es necesario
    }
}

const handleSubmit = async (form) => {
    const { valid } = await form.validate();
    if (!valid) {
        return;
    }
    await guardarCita();
};

const guardarCita = async () => {
    try {
        const citas = await getCitas();
        const foundCita = citas.find(cita => cita.idBarbero === new_cita.value.idBarbero && cita.date === new_cita.value.date);
        new_cita.value.idCliente = user.value.id 
        console.log(new_cita.value);
        if (foundCita) {
            mostrarError('Cita ya agendada');
        } else {
            console.log('entre');
            await axios.post("http://localhost:3001/citas", new_cita.value);
            closeDialog();
            Swal.fire(
                'Cita creada con éxito!',
                'Felicidades'
            );
        }
    } catch (error) {
        console.error(error);
        mostrarError('Error al guardar el usuario. Por favor, inténtalo de nuevo más tarde.');
    }
}

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
            rules: {
                required: value => !!value || 'Campo necesaro.'
            }
        }
    }
};
</script>
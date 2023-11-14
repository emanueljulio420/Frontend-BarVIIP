<template>
    <div>
        <v-dialog v-model="open" width="50%" id="crearUsuarioDialog" persistent>
            <v-card class="text-center">
                <h1 class="my-6">Register</h1>
                <v-form class="mx-5" action="javascript:void(0)" ref="form" @submit="handleSubmit($refs.form)" required>
                    <v-container class="my-3">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="new_user.name" :rules="[rules.required]" label="Names"
                                    placeholder="Names" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_user.lastname" :rules="[rules.required]" label="Lastnames"
                                    placeholder="Lastnames" variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-autocomplete v-model="new_user.type" :rules="[rules.required]" :items="Tipos_usu"
                                    label="Type of user" placeholder="Select..."></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-file-input v-model="new_user.image" :rules="[rules.required,rules.image]"
                                    accept="image/*" placeholder="Enter your photo"
                                    prepend-icon="mdi-camera" label="Photo"></v-file-input>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="new_user.email" :rules="[rules.required, rules.email]"
                                    label="Email" variant="outlined" cols="6" />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="new_user.password"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                                    :type="show1 ? 'text' : 'password'" hint="Minimum 8 characters" counter
                                    @click:append="show1 = !show1" label="Password" placeholder="Password"
                                    variant="outlined" />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="new_user.confipassword"
                                    :rules="[rules.required, rules.min]"
                                    type="password"
                                    hint="Minimum 8 characters" counter label="Confirm Password"
                                    placeholder="Confirm Password" variant="outlined" />
                            </v-col>
                            <v-col cols="12" class="red" v-html="errorMessage"/>
                            <v-col cols="6">
                                <v-btn class="text-none" color="#616161" variant="flat" type="submit" size="large" block>
                                    Register
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
    console.error('Error getting users:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado en otro lugar si es necesario
  }
};

const getBarbers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/barberos');
    return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error; // Re-lanzar el error para que pueda ser manejado en otro lugar si es necesario
  }
};

const guardarUsuario = async () => {
    try {
        const users = await getUsers();
        const barbers = await getBarbers();
        const foundUser = users.find(user => user.email === new_user.value.email);
        const foundBarber = barbers.find(barber => barber.email === new_user.value.email);
        if (foundUser || foundBarber) {
            errorMessage.value= '<strong>Email already exists</strong>';
        } else {
            if (new_user.value.password === new_user.value.confipassword) {
                if(new_user.value.type === 'Barber'){
                    await axios.post("http://localhost:3001/barberos", new_user.value);
                }else{
                    await axios.post("http://localhost:3001/usuarios", new_user.value);
                }
                closeDialog();
                Swal.fire(
                    'Successfully created account!',
                    'Congratulations'
                );
                
            } else {
                mostrarError('Passwords are not equal');
            }
        }
    } catch (error) {
        console.error(error);
        mostrarError('Error saving the user. Please try again later.');
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
.red{
    color: red;
}

</style>
<template>
    <div>
        <div class="container">
            <v-img class="mx-auto my-6" max-width="300"
                src="../images/_c26d19c6-e2c2-4f86-8148-2e602efa170b-removebg-preview.png" />
            <v-card class="my-5 text-center mx-auto transparent-card" min-width="400" min-height="300">
                <v-card-title class="my-3">
                    <h2>Iniciar sesión</h2>
                </v-card-title>
                <form class="mx-5">
                    <v-text-field :rules="[rules.required, rules.email]" label="Correo" variant="outlined" />
                    <v-text-field :rules="[rules.required]" label="Contraseña" placeholder="Contraseña" variant="outlined"
                        required />
                </form>
                <v-card-actions class="mx-3 my-2">
                    <v-btn  class="custom-button">
                        Iniciar sesión
                    </v-btn>
                    <v-spacer />
                    <v-btn border class="custom-button" @click="openDialog()">
                        <v-icon left>
                            mdi mdi-check
                        </v-icon>
                        Crear perfil
                    </v-btn>
                </v-card-actions>
            </v-card>
            <usuarios-crearUsuario v-if="openD" :dialog="openD" @close="closeDialog" />

        </div>

    </div>
</template>

<script setup>

const openD = ref(false);

const openDialog = () => {
    openD.value = true;
};

const closeDialog = () => {
    openD.value = false;
    ;
}



</script>

<script>
export default {
    data() {
        return {
            email: '',
            rules: {
                required: value => !!value || 'Campo necesaro.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Correo invalido.'
                },
            },
        }
    },
};
</script>
<style scoped>
/* 
@import "../styles/inicio.module.css" */
.container {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Ocupa toda la altura de la ventana */
    background-image: url("https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}

.transparent-card {
    background-color: rgba(255, 255, 255, 0.7);
    /* Color de fondo semi-transparente */
    border-radius: 15px;
    /* Esquinas redondeadas */
    padding: 1.5em;
    /* Padding en unidades relativas */
    /* Agrega otras propiedades de estilo según sea necesario para que la carta sea responsive */
}
.custom-button {
    background-color: rgba(255, 217, 0, 0.71); /* Fondo dorado */
    color: white; /* Texto blanco */
    border-radius: 5px; /* Bordes redondeados */
    padding: 10px 20px; /* Espaciado interno */
    cursor: pointer; /* Cambia el cursor al pasar el ratón */
}


;</style>
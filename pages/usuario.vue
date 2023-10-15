<template>
    <div class="centrar container">
        <v-container class="my-3">

            <v-row>
                <v-col cols="12" class="white">
                
                    <v-btn border class="custom-button" @click="openDialog()">
                    </v-btn>
                    <h1>Mi perfil </h1>

                    <v-img class=" centrar-imagen" width="300" height="200" :src="userProfileImageUrl" cover></v-img>
                    <template v-if="user">
                        <h2> Nombre: {{ user.name }}</h2>
                        <h2> Apellido: {{ user && user.lastname }}</h2>
                        <h2> Email: {{ user && user.email }}</h2>
                        <h2> Tipo de usuario: {{ user && user.type }}</h2>
                    </template>
                </v-col>
                </v-row>
        </v-container>

        <UsuariosEditarUsuario v-if="openD" :dialog="openD" :edit_user="copy_user" @close="closeDialog" />
    </div>
</template>
  
<script setup>
import { ref, onBeforeMount } from 'vue';
const openD = ref(false)
const user = ref();

const copy_user = ref()


onBeforeMount(() => {
    if (process.client) {
        const userData = sessionStorage.getItem("USER");
        if (userData) {
            user.value = JSON.parse(userData);
        }
    }

});
const userProfileImageUrl = 'https://cdn.vuetifyjs.com/images/parallax/material.jpg';
const openDialog = () => {
    openD.value = true;
    copy_user.value = { ...user.value }
    console.log(copy_user.value);

};
const closeDialog = () => {
    openD.value = false;
    user.value = copy_user.value
};
definePageMeta({
    layout: 'inicio'
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
<template>
    <div class="centrar container">
        <v-container class="my-3">
            <v-card class="rounded-lg mx-auto" max-width="600">
                <v-img class="my-6 rounded-circle centrar-imagen" width="300" height="200" :src="userProfileImageUrl" cover></v-img>
                        <v-card-title>My Profile</v-card-title>
                            <v-container>
                                <v-row no-gutters>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            Name
                                        </v-sheet>
                                    </v-col>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            {{ user.name }}
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                        Apellido
                                        </v-sheet>
                                    </v-col>
                                    <v-col>
                                        <v-sheet class="pa-2 ma-2">
                                            {{ user.lastname }}
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
                                        <v-sheet class="pa-2 ma-2">
                                            {{ user.email }}
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
                                        <v-sheet class="pa-2 ma-2">
                                            {{ user.type }}
                                        </v-sheet>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-card-actions class="mx-2 my-4">
                            <v-btn variant="flat" @click="openDialog()">Edit</v-btn>
                        </v-card-actions>
                    </v-card>
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
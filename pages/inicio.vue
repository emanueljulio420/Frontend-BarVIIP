<template>
    <div>
        <v-img class="mx-auto my-6" max-width="228" src="https://th.bing.com/th/id/OIG.eR6aHfNHV3MX4wohNPt6?pid=ImgGn"/>
        <v-card class="my-5 text-center mx-auto" max-width="400">
            <v-card-title class="my-3">
                <h2>Iniciar sesión</h2>
            </v-card-title>
            <form class="mx-5">
                <v-text-field :rules="[rules.required, rules.email]" label="Correo" variant="outlined"/>
                <v-text-field :rules="[rules.required]" label="Contraseña" placeholder="Contraseña" variant="outlined" required/>
            </form>
                <v-card-actions class="mx-3 my-2">
                    <v-btn class="text-none" color="#616161" variant="flat">
                        Iniciar sesión
                    </v-btn>
                    <v-spacer />
                    <v-btn border class="text-none" prepend-icon="mdi-check" variant="text" @click="openDialog()">
                        Crear perfil
                    </v-btn>
                </v-card-actions>
        </v-card>
        <usuarios-crearUsuario v-if="openD" :dialog="openD" @close="closeDialog"/>
    </div>
</template>

<script setup>

const openD = ref(false);

const openDialog = () =>{
    openD.value = true;
};

const closeDialog = () =>{
    openD.value = false;
;}

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
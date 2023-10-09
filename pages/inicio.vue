<template>
    <div>
        <v-toolbar class="toolbar primary" dark prominent height="50%">
            <v-app-bar-nav-icon class="white"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <v-img width="100px" src="https://cdn-icons-png.flaticon.com/512/595/595777.png">
                </v-img>

            </v-toolbar-title>
            <h1>BarVIIP</h1>

            <v-spacer></v-spacer>
            <v-toolbar-content>
                <NuxtLink to="/quienes-somos" class="white toolbar-link">Quiénes somos</Nuxtlink>
                <NuxtLink to="/reservas" class="white toolbar-link">Reservas</Nuxtlink>
            </v-toolbar-content>

            <v-btn icon class="white">
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-toolbar>
        <slot />
    </div>
</template>

<script setup>
</script>

<style scoped>
.toolbar.primary {
    background-color: black;
    /* Establece el fondo del toolbar en negro */
}

.white {
    color: white;
    text-decoration: none;
}

h1 {
    color: white;
}
.toolbar-link {
    margin-right: 20px; /* Ajusta la cantidad de espacio entre los enlaces según tus necesidades */
}
</style>

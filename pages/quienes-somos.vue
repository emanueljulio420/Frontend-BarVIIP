<template>
    <div class="container_i">
        <v-container>
            <v-row class="align-start">
                <v-col cols="12">
                    <h1 class="display-2 text-white ">Quiénes Somos</h1>
                    <p class="subtitle-1 text-white">
                        En Barviip, nos dedicamos a brindar servicios de barbería de calidad en la comodidad de tu hogar.
                        Nuestro equipo de barberos profesionales está aquí para ofrecerte cortes de pelo elegantes,
                        afeitados precisos y tratamientos de barbería de primera clase, todo en el lugar que prefieras.
                    </p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-carousel>
                        <v-carousel-item src="https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg" cover></v-carousel-item>

                        <v-carousel-item src="https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg" cover></v-carousel-item>

                        <v-carousel-item src="https://images.pexels.com/photos/2040189/pexels-photo-2040189.jpeg" cover></v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <h2 class="headline text-white">Nuestra Misión</h2>
                    <p class="text-white">
                        Nuestra misión en Barviip es proporcionar servicios de barbería convenientes y accesibles para
                        todos. Creemos que la apariencia personal es importante y queremos ayudarte a lucir tu mejor versión
                        sin tener que salir de casa.
                    </p>
                </v-col>
                <v-col cols="6">
                    <h2 class="headline text-white">Nuestro Compromiso</h2>
                    <p class="text-white">
                        Estamos comprometidos con la satisfacción del cliente. Nos esforzamos por ofrecer servicios de alta
                        calidad, puntualidad y profesionalismo en cada visita. Tu satisfacción es nuestra prioridad.
                    </p>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
  
<style>
.container_i {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    /* Alinear elementos en una columna */
    justify-content: flex-start;
    /* Alinear elementos desde la parte superior */
    align-items: center;
    min-height: 100vh;
    /* Mínimo de altura del 100% del viewport */
    background-image: url("https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}

.text-white {
    color: #ffffff;
    /* Texto blanco */
}
</style>
  
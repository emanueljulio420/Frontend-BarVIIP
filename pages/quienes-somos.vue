<template>
    <div class="container_i">
        <v-container>
            <v-row class="align-start">
                <v-col cols="12">
                    <h1 class="display-2 text-white ">Who we are?</h1>
                    <p class="subtitle-1 text-white">
                        At Barviip, we are dedicated to providing quality barbering services in the comfort of your home.
                        Our team of professional barbers is here to offer you stylish haircuts,
                        Precise shaves and first-class barber treatments, all in the place you prefer.
                    </p>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-carousel>
                        <v-carousel-item src="https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg"
                            cover></v-carousel-item>

                        <v-carousel-item src="https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg"
                            cover></v-carousel-item>

                        <v-carousel-item src="https://images.pexels.com/photos/2040189/pexels-photo-2040189.jpeg"
                            cover></v-carousel-item>
                    </v-carousel>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <h2 class="headline text-white">Our mission</h2>
                    <p class="text-white">
                        Our mission at Barviip is to provide convenient and accessible barbering services for
                         all. We believe that personal appearance is important and we want to help you look your best.
                         without having to leave home.
                    </p>
                </v-col>
                <v-col cols="6">
                    <h2 class="headline text-white">Our commitment</h2>
                    <p class="text-white">
                        We are committed to customer satisfaction. We strive to offer high quality services
                        quality, punctuality and professionalism in each visit. Your satisfaction is our priority.
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
  
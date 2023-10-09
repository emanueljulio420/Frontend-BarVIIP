<template>
    <div>
        <v-toolbar class="toolbar primary" dark prominent height="50%">
            <v-app-bar-nav-icon class="white"></v-app-bar-nav-icon>

            <v-toolbar-title>
                <v-img width="10vh" src="https://cdn-icons-png.flaticon.com/512/595/595777.png">
                </v-img>

            </v-toolbar-title>
            <h1>BarVIIP</h1>

            <v-spacer></v-spacer>
            <v-toolbar-content>
                <NuxtLink to="/quienes-somos" class="white toolbar-link">Quiénes somos</Nuxtlink>
                <NuxtLink to="/reservas" class="white toolbar-link">Reservas</Nuxtlink>
                <NuxtLink to="/inicio" class="white toolbar-link"><svg-icon type="mdi" :path="path"></svg-icon></Nuxtlink> 
            </v-toolbar-content>

            <v-btn icon class="white">
                <v-icon>mdi-export</v-icon>
            </v-btn>
        </v-toolbar>

    <div class="container">
        <div class="word-container">
            <transition name="fade">
                <div class="word">{{ currentWord }}</div>
            </transition>
        </div>
    </div>
    </div>
       
</template>
<script setup>
import { ref, onMounted } from 'vue';

const words = ['Corte de cabello', 'Arreglo de barba', 'Barberos profesionales', 'Limpieza Facial']; // Lista de palabras
const currentWordIndex = ref(0);

onMounted(() => {
  setInterval(() => {
    currentWordIndex.value = (currentWordIndex.value + 1) % words.length;
  }, 3000); // Cambia la palabra cada 3 segundos (3000 milisegundos)
});

const currentWord = computed(() => {
  return words[currentWordIndex.value];
});
</script>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount } from '@mdi/js';

export default {
	name: "my-cool-component",

	components: {
		SvgIcon
	},

	data() {
		return {
	  		path: mdiAccount,
		}
	}
}
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


.toolbar-link {
    margin-right: 20px;

    /* Ajusta la cantidad de espacio entre los enlaces según tus necesidades */
}

.inicio {
    background-repeat: no-repeat;
    background-size: cover;
    /* Cubre todo el elemento, manteniendo la relación de aspecto */
    background-attachment: fixed;
}

.container {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Ocupa toda la altura de la ventana */
    background-image: url("https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
}


h1 {
    color: white;
    /* Establece el color del texto */
    text-align: center;
    /* Centra el texto horizontalmente */
}

.word-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* Ocupa toda la altura de la ventana */
}

.word {
    font-size: 4em;
    /* Tamaño grande de la palabra */
    opacity: 0;
    animation: fadeInOut 3s infinite;
    color: white;
    /* Animación de desvanecimiento */
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    80%{
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
}
</style>

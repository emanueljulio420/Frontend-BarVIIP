<template>
    <div>
        <!-- <v-toolbar class="toolbar primary" dark prominent height="50%">
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
        </v-toolbar> -->

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

<style scoped >
@import "../styles/index.module.css";

</style>

<template>
    <div class="container">
        <div class="word-container">
            <transition name="fade">
                <div class="word">{{ currentWord }}</div>
            </transition>
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

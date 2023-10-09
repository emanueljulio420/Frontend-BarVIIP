<template>
  <div>
    <v-toolbar class="toolbar primary" dark prominent height="50%">

      <v-toolbar-title>
        <v-img width="10vh" src="https://th.bing.com/th/id/OIG..bsrCO8FXIZrYA0W4fUL?pid=ImgGn">
        </v-img>

      </v-toolbar-title>
      <h1>BarVIIP</h1>

      <v-spacer></v-spacer>
      <v-toolbar-content>
        <NuxtLink to="/" class="white toolbar-link">Inicio</Nuxtlink>
        <NuxtLink to="/quienes-somos" class="white toolbar-link">Quiénes somos</Nuxtlink>
        <NuxtLink to="/reservas" class="white toolbar-link">Reservas</Nuxtlink>
        <NuxtLink to="/inicio" class="white toolbar-link">
          <v-btn icon class="white">
            <svg-icon type="mdi" :path="path"></svg-icon>
          </v-btn></Nuxtlink>
        
        
      </v-toolbar-content>


    </v-toolbar>
    <slot />
  </div>
</template>
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
@import "../styles/index.module.css";

</style>


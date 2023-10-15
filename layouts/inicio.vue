<template>
    <div>
        <v-toolbar class="toolbar primary toolbar" dark prominent height="50%">

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
                <!-- <NuxtLink to="/reservas" class="white toolbar-link">Reservas</Nuxtlink> -->
                <v-menu>
                    <template v-slot:activator="{ props: menu }">
                        <v-tooltip location="top">
                            <template v-slot:activator="{ props: tooltip }">
                                <v-btn color="primary" v-bind="mergeProps(menu, tooltip)">
                                    <svg-icon type="mdi" :path="path"></svg-icon>
                                </v-btn>
                            </template>
                            <span>Mi perfil</span>
                        </v-tooltip>
                    </template>
                    <v-list>
                        <v-list-item v-for="(item, index) in items" :key="index">
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>


            </v-toolbar-content>


        </v-toolbar>
        <slot />
    </div>
</template>
<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount } from '@mdi/js';
import { mergeProps } from 'vue'

export default {
    name: "my-cool-component",

    components: {
        SvgIcon
    },

    data() {
        return {
            path: mdiAccount,
            items: [
                { title: 'Ver perfil' },
                { title: 'Editar perfil' },
                { title: 'Eliminar perfil' }
            ]
        };
    },

    methods: {
        mergeProps
    }
}
</script>


  export default {
    data: () => ({
      
    }),
    
  }
<style scoped>
@import "../styles/index.module.css";
</style>
  
  
<template>
    <div>
        <v-toolbar class="toolbar primary toolbar" dark prominent height="50%" v-if="!loading">

            <v-toolbar-title>
                <v-img width="10vh" src="https://th.bing.com/th/id/OIG..bsrCO8FXIZrYA0W4fUL?pid=ImgGn">
                </v-img>

            </v-toolbar-title>
            <h1>BarVIIP</h1>

            <v-spacer></v-spacer>
            <v-toolbar-content>
                <NuxtLink to="/reservas" class="white toolbar-link">Bookings</Nuxtlink>
                <NuxtLink to="/mis-citas" class="white toolbar-link">My dates</Nuxtlink>
                <v-menu>
                    <template v-slot:activator="{ props: menu }">
                        <v-tooltip location="top">
                            <template v-slot:activator="{ props: tooltip }">
                                <v-btn color="primary" v-bind="mergeProps(menu, tooltip)">
                                    <svg-icon type="mdi" :path="path"></svg-icon>
                                </v-btn>
                            </template>
                            <span>My profile</span>
                        </v-tooltip>
                    </template>
                    <v-list>
                        <v-list-item-title class="mx-3 my-1">
                            <NuxtLink to="/cliente" class="black toolbar-link">My profile</Nuxtlink>
                        </v-list-item-title>
                        <v-list-item-title class="mx-3 my-1">
                            <NuxtLink @click="salir" class="black toolbar-link">Leave</Nuxtlink>
                        </v-list-item-title>


                    </v-list>
                </v-menu>


            </v-toolbar-content>


        </v-toolbar>
        <slot />
    </div>
</template>
<script setup>
import axios from 'axios';

import config from '../config/default.json'
const loading = ref()

onBeforeMount( async ()=>{
  const token = sessionStorage.getItem("TOKEN");
  if (token) {
        loading.value = true
        const url = `${config.api_host}/verify`
        axios.post(url, { token }).then(()=>{
            loading.value = false
        }).catch(
            useRouter().push('/reservas')
        );
    }else{
        useRouter().push('/inicio-sesion')
    }
})

const salir = ()=>{
    sessionStorage.setItem("TOKEN","")
    sessionStorage.setItem("TYPE","")
    useRouter().push('/inicio-sesion')
}

</script>

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
                { title: 'View profile' },
                { title: 'Edit profile' },
                { title: 'Delete profile' }
            ]
        };
    },

    methods: {
        mergeProps,

    }

}
</script>
<style scoped>
@import "../styles/index.module.css";
</style>
  
  
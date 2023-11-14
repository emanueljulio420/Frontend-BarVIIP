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
                <NuxtLink to="/agenda" class="white toolbar-link">Diary</Nuxtlink>
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
                            <NuxtLink to="/barber" class="black toolbar-link">My profile</Nuxtlink>
                        </v-list-item-title>
                        <v-list-item-title class="mx-3 my-1">
                            <NuxtLink to="/" class="black toolbar-link">Leave</Nuxtlink>
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

const user = ref();

const router = useRouter();

onBeforeMount(() => {
    if (process.client) {
        const userData = sessionStorage.getItem("USER");
        if (userData) {
            user.value = JSON.parse(userData);
        }
    }

});

const deleteUser = async (item) => {
    console.log(item.value)
    const url = `http://localhost:3001/usuarios/${item.id}`
    const { data } = await axios.delete(url)
    console.log(data.value)
    router.push({ path: '/' });
    
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
  
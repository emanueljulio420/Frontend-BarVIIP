<template>
  <div>
    <h1 v-if="user">{{ user.name }}</h1>
    <p v-if="user">{{ user.email }}</p>
    <h1>Hola</h1>
    <!-- Otras propiedades de user -->
  </div>
</template>

<script setup>
let user = null;
const router=useRoute()

console.log(router.query)
if (process.client) {
  // Verificar si sessionStorage está definido
  const userData = sessionStorage.getItem("USER");
  
  // Si userData es una cadena JSON válida, parsea y asigna a user
  if (userData) {
    user = JSON.parse(userData);
  }
}

definePageMeta({
  layout: 'inicio'
});

onBeforeMount(() => {
  console.log(user);
});
</script>

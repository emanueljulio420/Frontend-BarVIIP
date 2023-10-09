<template>
  <div>
    <v-toolbar class="toolbar"
      dark
      prominent
      height="50%"
    
    >
      <v-app-bar-nav-icon>
        
      </v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-img
        width="150px"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Marvel-Comics-Logo.svg/1200px-Marvel-Comics-Logo.svg.png">
        </v-img>
      </v-toolbar-title>

      <v-spacer>
      </v-spacer>
      
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <slot/>
  </div>
</template>
<script setup>

</script>
<style>
.layout {
  background-color: black;
  display: grid;
  grid-template-columns: auto auto auto;
/*   display: block; */
  height: 10%;
  width: auto;
}
</style>

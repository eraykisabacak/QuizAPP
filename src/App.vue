<template>
  <v-app>
    <Navbar/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',

  components: {
    Navbar
  },

  data(){
    return {
      
    }
  },
  created(){
    this.$store.dispatch('initAuth');
  }
};
</script>

<style scoped>
  .theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: #fff;
  }
</style>

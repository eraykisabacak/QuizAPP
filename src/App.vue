<template>
  <v-app>
    <Navbar/>
    <Container>
      <router-view></router-view>
    </Container>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Container from './components/Container.vue';

export default {
  name: 'App',

  components: {
    Navbar,
    Container
  },

  data(){
    return {
      
    }
  },
  created(){
    this.$store.dispatch('initAuth');
    console.log("Backend: ", process.env.VUE_APP_ROOT_URL)
  }
};
</script>

<style scoped>
  .theme--light.v-app-bar.v-toolbar.v-sheet {
    background-color: #fff;
  }
</style>

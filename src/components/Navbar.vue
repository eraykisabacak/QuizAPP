<template>
    <v-app-bar max-height="64">
        <v-container fluid class="align-start px-12 py-12">
          <v-row class="mx-0">
            <v-toolbar flat class="px-6">
              <div class="text-h5"><h3><router-link to="/" style="display:inline-block;text-decoration:none;">Quiz App</router-link></h3></div>
              <v-spacer />
              <v-btn class="mx-5" to="/register" color="primary" v-if="!isAuthenticated">
                  Register
              </v-btn>
              <v-btn to="/login" color="teal darken-1" class="white--text" v-if="!isAuthenticated">
                Login
              </v-btn>  
              <NavProfile v-if="isAuthenticated"></NavProfile>
            </v-toolbar>  
          </v-row>
        </v-container>
    </v-app-bar>
      
</template>

<script>
import NavProfile from './NavProfile'; 
import {mapGetters} from 'vuex';

    export default {
       name: 'Navbar',
       components: {
          NavProfile,
        },
        data: () => ({
            dialog: false,
        }),
        computed:{
          ...mapGetters([
            'isAuthenticated'
          ])
        },
        methods:{
          logout(){
            this.$store.dispatch("logout");
          }
        }
    }
</script>

<style lang="sass" scoped>

</style>
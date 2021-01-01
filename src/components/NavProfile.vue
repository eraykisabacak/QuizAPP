<template>
  <v-container
    style="height: 64px;width:150px;margin-top:-10px"
  >
    <v-row justify="center">
      <v-menu
        bottom
        max-width="220px"
        rounded
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            x-large
            v-on="on"
          >
            <v-avatar
              color="brown"
              size="48"
            >
              <span class="white--text headline">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3 class="mt-3">{{ user.username }}</h3>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click.prevent="$router.push('/profile')"
              >
                Soru & Cevapladıklarım
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click.prevent="logout"
              >
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      user: {
        initials: '',
        username: '',
      },
    }),
    computed: {
        ...mapGetters([
            'getToken',
        ])
    },
    created(){
        this.getUser();
    },
    methods:{
        getUser(){
                axios.get('http://localhost:3000/api/auth/user'
                ,{
                    headers: {
                        'Authorization': 'Bearer: ' + this.getToken
                    }
                }
                ).then(res => {
                    console.log(res);
                    this.user.username = res.data.data.username;
                    console.log(res.data.data.username)
                    this.user.initials = res.data.data.username[0]
                });
        },
        logout(){
            this.$store.dispatch("logout");
        }
    }
    
  }
</script>

<style>

</style>
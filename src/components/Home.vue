<template>
  <v-container align="center">
    <v-row class="text-center">
      <v-col cols="10" align="right">
         <h2 class="font-weight-light" style="max-width:1200px" align="center" v-if="!isAuthenticated">
            Quizlere Giriş Yapmak ve Quiz Oluşturmak için Giriş Yapınız.
          </h2>
      </v-col>
      <v-col cols="2">
        <v-btn color="success" large v-if="isAuthenticated">Yeni Quiz</v-btn>
      </v-col>
      <v-col cols="12" v-for="quiz in getQuiz" :key="quiz.id">
        <v-card class="mx-auto" color="success" dark max-width="1200">
          <v-card-title>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            {{quiz.name}}
          </v-card-text>

          <v-card-actions @click="quizClick" :style="{cursor: isAuthenticated ? 'pointer' : ''}">
            <v-list-item class="grow">

              <v-list-item-content>
                <v-list-item-title>Evan You</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'Home',

  data: () => ({}),
  computed:{
    ...mapGetters([
      'isAuthenticated','getQuiz'
    ]),
  },
  methods:{
    quizClick(){
      if(this.$store.getters.isAuthenticated){
        console.log("true")
      }
      else{
        console.log("not authenticat")
      }
    }
  },
  created(){
    this.$store.dispatch("getAllQuiz");
  }
};
</script>

<style scoped>

</style>
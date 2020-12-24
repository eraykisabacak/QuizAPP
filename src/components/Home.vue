<template>
  <v-container align="center">
    <v-row class="text-center">
      <v-col cols="10" align="right">
         <h2 class="font-weight-light" style="max-width:1200px" align="center" v-if="!isAuthenticated">
            Quizlere Giriş Yapmak ve Quiz Oluşturmak için Giriş Yapınız.
          </h2>
      </v-col>
      <v-col cols="2">
        <v-btn color="success" large v-if="isAuthenticated" @click="$router.push('new_quiz')">Yeni Quiz</v-btn>
      </v-col>
      <v-col cols="12" v-for="quiz in getQuiz" :key="quiz.id">
        <v-card class="mx-auto" color="success" dark max-width="1200">
          <v-card-title>
          </v-card-title>

          <v-card-text class="text-h4 font-weight-medium">
            {{quiz.name}}
          </v-card-text>

          <v-card-actions @click="quizClick(quiz._id)" :style="{cursor: isAuthenticated ? 'pointer' : ''}">
            <v-list-item class="grow">

              <v-list-item-content>
                <span class="col-md-6">{{quiz.createdUser.username}}</span>
                <span class="col-md-6">{{quiz.questions.length}} Soru</span>
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
    quizClick(id){
      if(this.$store.getters.isAuthenticated){
        if (confirm('Sınava gireceğinizden emin misiniz?')) {
          console.log('Sınava girdi ' + id);
          this.$router.push({path: 'quiz', query: { quizId: id } });
        } else {
          console.log('Sınava girmekten vazgeçti');
        }
      }
      else{
        alert("Lütfen Giriş Yapınız");
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
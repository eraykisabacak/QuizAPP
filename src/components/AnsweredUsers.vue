<template>
  <div>
    <div v-for="(item,index) in answeredUsers" :key="index">
      <template>
        <v-card
          class="mx-auto l-5 r-5"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                username : <b>{{item.user.username}}</b> | correct : <b>5</b>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              @click="showQuestionAndAnswers(index)"
            >
              {{openShowUserQuestionAndAnswers == -1 ? 'Questions' : 'Kapat' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
      <div v-if="openShowUserQuestionAndAnswers == index">
        <div v-for="(answer,index) in item.userAnswer" :key="index">
              <p>{{index + 1}}.Question : {{answer.questionId.questionContent}}</p>
              <v-alert :type="answer.success ? 'success' : 'warning'" >
                {{answer.answerId.answer}}
              </v-alert>
        </div>
      </div>
    </div>
    <div v-if="!answeredUsers.length && !loading">
      <v-alert type="warning">
          Bir kayıt bulunamadı
      </v-alert>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  props:["quizId"],
  computed: {
    ...mapGetters([
        'getToken',
    ]),
  },
  methods : {
    showQuestionAndAnswers(index){
      if(this.openShowUserQuestionAndAnswers == -1){
        this.openShowUserQuestionAndAnswers = index;
      }
      else{
        this.openShowUserQuestionAndAnswers = -1;
      }
    }
  },
  data(){
    return { 
      answeredUsers:[],
      loading:false,
      openShowUserQuestionAndAnswers:-1
    }
  },
  async created(){
    this.loading = true;
    await axios.get( process.env.VUE_APP_ROOT_URL + '/api/quiz/quizUserAnswersAndAnswer/' + this.quizId 
      ,{
        headers: {
          'Authorization': 'Bearer: ' + this.getToken
        }
      })
      .then(async res => {
          this.answeredUsers = await res.data;
          this.loading = false;
      })
  }
}
</script>

<style>

</style>
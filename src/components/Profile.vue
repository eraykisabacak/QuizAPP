<template>
    <div style="margin-top:25px">
        <h3 v-if="myQuiz.length > 0">Quizleriniz</h3>
        <v-card
            elevation="9"
            outlined
            shaped
            style="margin-top:25px"
            v-for="(item,index) in myQuiz" 
            :key="index"
        >
            <v-card-title>Quiz Adı : {{item.name}}</v-card-title>
            <v-card-text>Soru Sayısı : {{item.questions.length}}</v-card-text>
            <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                    color="teal accent-4"
                    @click="openAddQuestion(index)"
                >
                    Soru Ekle
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="teal accent-4"
                    @click="openDeleteQuestion(index)"
                >
                    Soru Sil
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="teal accent-4"
                >
                    Soru Güncelle
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="blue lighten-1"
                >
                    Cevap Ekle 
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="blue lighten-1"
                >
                    Cevap Sil 
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="blue lighten-1"
                >
                    Cevap Güncelle
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="red darken-31"
                    @click="deleteQuiz(item._id)"
                >
                    Quiz Sil
                </v-btn>
            </v-card-actions>
            <div v-if="addQuestionShow == index">
               <profile-add-question :id="item._id"></profile-add-question>
            </div>
            <div v-if="deleteQuestionShow == index">
                <h4>Lütfen Silmek İstediğiniz Soruya Tıklayınız</h4>
                <div v-for="deleteItem in item.questions" :key="deleteItem._id">
                    <v-btn color="error">
                        {{ deleteItem.questionContent }}Soruyu Sil
                    </v-btn>
                </div>
            </div>    
        </v-card>
        <h3 style="margin-top:25px" v-if="myAnsweredQuiz.length > 0">Cevapladığınız Quizler</h3>
        <v-card
            elevation="9"
            outlined
            shaped
            style="margin-top:25px" 
            v-for="item in myAnsweredQuiz" 
            :key="item.id"
        >
            <v-card-title>{{item.userAnsweredQuiz.name}}</v-card-title>
            <v-card-text>Doğru Sayısı : <span color="green darken-31">{{item.correctCount}}</span> Yanlış Sayısı : <span color="red darken-31">{{item.incorrectCount}}</span></v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import ProfileAddQuestion from './ProfileAddQuestion.vue'

    export default {
  components: { ProfileAddQuestion },
        data(){
            return {
                myQuiz:[],
                myAnsweredQuiz:[],
                addQuestionShow:-1,
                deleteQuestionShow:-1
            }
        },
        computed: {
        ...mapGetters([
                'getToken',
            ]),
            
        },
        created(){
            this.getMyQuiz();
            this.getMyAnsweredQuiz();
        },
        methods:{
            getMyQuiz(){
                axios.get('http://localhost:3000/api/quiz/myQuiz'
                ,{
                    headers: {
                        'Authorization': 'Bearer: ' + this.getToken
                    }
                })
                .then(res => {
                    this.myQuiz = res.data.quizzes;
                })
            },
            getMyAnsweredQuiz(){
                axios.get('http://localhost:3000/api/quiz/myAnsweredQuiz'
                ,{
                    headers: {
                        'Authorization': 'Bearer: ' + this.getToken
                    }
                })
                .then(res => {
                    this.myAnsweredQuiz = res.data.quizzes;
                })
                .catch(err => console.log(err))
            },
            deleteQuiz(id){
                if(confirm("Quiz silmek istiyor musunuz")){
                    axios.delete('http://localhost:3000/api/quiz/' + id
                    ,{
                        headers: {
                            'Authorization': 'Bearer: ' + this.getToken
                        }
                    })
                    .then(() => {
                        this.getMyQuiz();
                    })
                    .catch(err => console.log(err));
                }
            },
            openAddQuestion(index){
                this.addQuestionShow = index;
            },
            openDeleteQuestion(index){
                this.deleteQuestionShow = index;
            }
        },
    }
</script>

<style scoped>

</style>
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
                    @click="openUpdateQuestion(index)"
                >
                    Soru Güncelle
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="blue lighten-1"
                    @click="openAddAnswer(index)"
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

            <!-- New Question Add -->
            <div v-if="addQuestionShow == index">
               <profile-add-question :id="item._id"></profile-add-question>
            </div>

            <!-- Delete Question -->
            <div v-if="deleteQuestionShow == index" style="margin-left:15px;margin-bottom:15px">
                <h4 style="margin-bottom:15px">Lütfen Silmek İstediğiniz Soruya Tıklayınız</h4>
                <div v-for="deleteItem in item.questions" :key="deleteItem._id" style="margin-top:10px">
                    <span style="font-weight:bold">Soru: </span> {{ deleteItem.questionContent }}
                    <v-spacer></v-spacer> 
                    <v-btn color="error" @click="deleteQuestion(deleteItem._id)">
                        Soruyu Sil
                    </v-btn>
                </div>
            </div>    

            <!-- Update Question -->
            <div v-if="updateQuestionShow == index" style="margin-left:15px;margin-bottom:15px">
                <h4 style="margin-bottom:15px">Lütfen Güncellemek İstediğiniz Soruya Tıklayınız</h4>
                <div v-for="(updateItem,index) in item.questions" :key="updateItem._id" style="margin-top:10px">
                    <span style="font-weight:bold">Soru: </span> {{ updateItem.questionContent }}
                    <v-spacer></v-spacer> 
                    <v-btn color="success" @click="clickUpdateQuestionShow(index,updateItem.questionContent)">
                        Soruyu Güncelle
                    </v-btn>
                    <div v-if="updateQuestionShowComp == index">
                        <h4>Soruyu Güncelleyiniz</h4>
                        <v-form>
                            <v-text-field
                                v-model="updateQuestionContent"
                                prepend-icon="mdi-comment-question"
                                label="Question"
                                :rules="[v => !!v || 'Item is required']"
                                required>
                            </v-text-field>
                            <v-col class="text-right">
                                <v-btn color="green" class="white--text" :disabled="buttonDisabledNewQuestion" @click="updateQuestion(updateItem._id)">Question Güncelle</v-btn>
                            </v-col>
                        </v-form>
                    </div>
                </div>  
            </div> 

            <!-- Add Answer -->
            <div v-if="addAnswerShow == index" style="margin-left:15px;margin-bottom:15px">
                <h4 style="margin-bottom:15px">Lütfen Cevap Eklemek İstediğiniz Soruya Tıklayınız</h4>
                <div v-for="(addAnswerItem,index) in item.questions" :key="addAnswerItem._id" style="margin-top:10px">
                    <span style="font-weight:bold">Soru: </span> {{ addAnswerItem.questionContent }}
                    <v-spacer></v-spacer> 
                    <v-btn color="success" @click="clickAddAnswerShow(index)">
                        Cevap Ekle
                    </v-btn>
                    <div v-if="addAnswerShowComp == index">
                            <h4>Soruyu Güncelleyiniz</h4>
                            <v-btn v-if="correctAnswers.length == 0" depressed color="primary" @click="addCorrectAnswer" v-show="correctAnswers.length-1">Yeni Doğru Cevap Ekle</v-btn>
                            <v-btn  v-if="incorrectAnswers.length == 0" depressed color="primary" @click="addInCorrectAnswer" v-show="incorrectAnswers.length-1">Yeni Yanlış Cevap Ekle</v-btn>
                            <v-form>  
                                <v-col cols="12"
                                    md="12" v-for="(correctAnswer,ca) in correctAnswers" :key="ca+1000">
                                <v-text-field 
                                    v-model="correctAnswer.answer"
                                    prepend-icon="mdi-check-outline"
                                    label="CorrectAnswer"
                                    :rules="[v => !!v || 'Item is required']"
                                    required>
                                </v-text-field>
                                <span>
                                    <v-btn depressed color="primary" @click="addCorrectAnswer" v-show="ca == correctAnswers.length-1">Yeni Doğru Cevap Ekle</v-btn>
                                    <v-btn depressed color="error" @click="removeCorrectAnswer(ca)" v-show="ca || ( !ca && correctAnswers.length > 1)">Doğru Cevap Sil</v-btn>            
                                </span>
                            </v-col>
                            <v-col cols="12" 
                                    md="12" v-for="(incorrectAnswer,ia) in incorrectAnswers" :key="ia + 10000">
                                <v-text-field 
                                    v-model="incorrectAnswer.answer"
                                    prepend-icon="mdi-close-circle-outline"
                                    label="InCorrectAnswer"
                                    :rules="[v => !!v || 'Item is required']"
                                    required>
                                </v-text-field>
                                <span>
                                    <v-btn depressed color="primary" @click="addInCorrectAnswer" v-show="ia == incorrectAnswers.length-1">Yeni Yanlış Cevap Ekle</v-btn>
                                    <v-btn depressed color="error" @click="removeInCorrectAnswer(ia)" v-show="ia || ( !ia && incorrectAnswers.length > 1)">Yanlış Cevap Sil</v-btn> 
                                </span>
                            </v-col>
                            <v-col class="text-right">
                                <v-btn color="green" class="white--text" :disabled="buttonDisabledNewAnswer" @click="addAnswer(addAnswerItem._id)" v-if="correctAnswers.length > 0 || incorrectAnswers.length > 0">Cevap Ekle</v-btn>
                            </v-col>
                        </v-form>
                    </div>
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
                deleteQuestionShow:-1,
                updateQuestionShow:-1,
                updateQuestionContent:'',
                updateQuestionShowComp:-1,
                addAnswerShow:-1,
                addAnswerShowComp:-1,
                correctAnswers : [],
                incorrectAnswers : []
            }
        },
        computed: {
        ...mapGetters([
                'getToken',
            ]),
          buttonDisabledNewQuestion(){
                if(this.updateQuestionContent == ''){
                    return true;    
                }
                return false;
            },
            buttonDisabledNewAnswer(){
                let status = false;
                if(this.correctAnswers.length == 0 && this.incorrectAnswers.length  == 0){
                    return true;
                }
                if(this.correctAnswers.length > 0){
                    this.correctAnswers.forEach( item => {
                        if(item.answer == ''){
                            status = true;
                            return status;
                        }
                    })
                }
                else if(this.incorrectAnswers.length > 0){
                    this.incorrectAnswers.forEach( item => { 
                        if(item.answer == ''){
                            status = true;
                            return status;
                        }
                    })
                }
                return status;
            } 
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
            },
            openUpdateQuestion(index){
                this.updateQuestionShow = index;
            },
            openAddAnswer(index){
                this.addAnswerShow = index;
            },
            deleteQuestion(id){
                if(confirm("Soruyu silmek istiyor musunuz")){
                    axios.delete('http://localhost:3000/api/question/' + id
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
            clickUpdateQuestionShow(id,questionContent){
                this.updateQuestionShowComp = id;
                this.updateQuestionContent = questionContent;
            },
            clickAddAnswerShow(id){
                this.addAnswerShowComp = id;
            },
            updateQuestion(id){
                if(confirm("Soruyu güncellemek istiyor musunuz")){
                    axios.put('http://localhost:3000/api/question/' + id,
                    {
                        questionContent : this.updateQuestionContent
                    }
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
            // Correct Answer
            addCorrectAnswer(){
                this.correctAnswers.push({
                    answer:''
                })
                console.log(this.correctAnswers)
            },
            removeCorrectAnswer (questionIndex,correctIndex) {
                this.correctAnswers.splice(correctIndex, 1)
                console.log(this.correctAnswers)
            },

            // InCorrect Answer
            addInCorrectAnswer(){
                this.incorrectAnswers.push({
                    answer:''
                })
                console.log(this.incorrectAnswers)
            },
            removeInCorrectAnswer (questionIndex,incorrectIndex) {
                this.incorrectAnswers.splice(incorrectIndex, 1)
                console.log(this.incorrectAnswers)
            },
            addAnswer(id){
                let answers = [];
                this.correctAnswers.forEach( item => {
                    answers.push({answer:item.answer, correct:1});
                })
                this.incorrectAnswers.forEach( item => {
                    answers.push({answer:item.answer,correct:0});
                })
                if(confirm("Cevabı kayıt etmek istiyor musunuz")){
                    axios.post('http://localhost:3000/api/answer/' + id,
                    {
                        answers
                    }
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
            }
        },
    }
</script>

<style scoped>

</style>
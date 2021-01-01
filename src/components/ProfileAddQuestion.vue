<template>
    <div>
         <h4 style="margin-left:15px">Soru Ekleme Alanı</h4>
                <v-form>
                <v-row style="align-items: center;justify-content: center;">
                    <v-col cols="8"
                            md="8" v-for="(question,q) in inputs.questions" :key="q">
                            <h3>Yeni Soru</h3>
                        <v-text-field
                            v-model="question.questionContent"
                            prepend-icon="mdi-comment-question"
                            label="Question"
                            :rules="[v => !!v || 'Item is required']"
                            required>
                        </v-text-field>
                        <span>
                            <v-btn depressed color="primary" @click="addQuestion(q)" v-show="q == inputs.questions.length-1">Yeni Soru Ekle</v-btn>
                            <v-btn depressed color="error" @click="removeQuestion(q)" v-show="q || ( !q && inputs.questions.length > 1)">Soru Sil</v-btn>            
                        </span>
                        <v-col cols="12"
                                md="12" v-for="(correctAnswer,ca) in question.correctAnswers" :key="ca+1000">
                            <v-text-field 
                                v-model="correctAnswer.answer"
                                prepend-icon="mdi-check-outline"
                                label="CorrectAnswer"
                                :rules="[v => !!v || 'Item is required']"
                                required>
                            </v-text-field>
                            <span>
                                <v-btn depressed color="primary" @click="addCorrectAnswer(q)" v-show="ca == question.correctAnswers.length-1">Yeni Doğru Cevap Ekle</v-btn>
                                <v-btn depressed color="error" @click="removeCorrectAnswer(q,ca)" v-show="ca || ( !ca && question.correctAnswers.length > 1)">Doğru Cevap Sil</v-btn>            
                            </span>
                        </v-col>
                        <v-col cols="12"
                                md="12" v-for="(incorrectAnswer,ia) in question.incorrectAnswers" :key="ia + 10000">
                            <v-text-field 
                                v-model="incorrectAnswer.answer"
                                prepend-icon="mdi-close-circle-outline"
                                label="InCorrectAnswer"
                                :rules="[v => !!v || 'Item is required']"
                                required>
                            </v-text-field>
                            <span>
                                <v-btn depressed color="primary" @click="addInCorrectAnswer(q)" v-show="ia == question.incorrectAnswers.length-1">Yeni Yanlış Cevap Ekle</v-btn>
                                <v-btn depressed color="error" @click="removeInCorrectAnswer(q,ia)" v-show="ia || ( !ia && question.incorrectAnswers.length > 1)">Yanlış Cevap Sil</v-btn> 
                            </span>
                        </v-col>
                    </v-col>
                </v-row>
                <v-col class="text-right">
                        <v-btn color="green" class="white--text" :disabled="buttonDisabledNewQuestion" @click="newQuizQuestion(id)">Quiz Kaydet ></v-btn>
                </v-col>
                </v-form>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

    export default {
        props:['id'],
        data(){
            return {
                inputs: {
                    name: '',
                    questions: [{
                        questionContent:'',
                        correctAnswers : [{
                            answer:''
                        }],
                        incorrectAnswers : [{
                            answer: ''
                        }]
                    }]
                }
            }
        },
        computed:{
            ...mapGetters([
                'getToken',
            ]),
            buttonDisabledNewQuestion(){
                if(this.inputs.questions[0].questionContent == ''){
                    return true;    
                }
                else{
                    let res = false;
                    this.inputs.questions.forEach( object => {
                        if(object.questionContent == ''){
                            res = true;
                        }
                        object.correctAnswers.forEach( correctObject => {
                            if(correctObject.answer == ''){
                                res = true;
                            }
                        });

                        object.incorrectAnswers.forEach( incorrectObject => {
                            if(incorrectObject.answer == ''){
                                res = true;
                            }
                        })  
                    });
                    return res;
                }
            }
        },
        methods:{
            // Correct Answer
            addCorrectAnswer(index){
                this.inputs.questions[index].correctAnswers.push({
                    answer:''
                })
                console.log(this.inputs.questions)
            },
            removeCorrectAnswer (questionIndex,correctIndex) {
                this.inputs.questions[questionIndex].correctAnswers.splice(correctIndex, 1)
                console.log(this.inputs.questions)
            },

            // InCorrect Answer
            addInCorrectAnswer(index){
                this.inputs.questions[index].incorrectAnswers.push({
                    answer:''
                })
                console.log(this.inputs.questions)
            },
            removeInCorrectAnswer (questionIndex,incorrectIndex) {
                this.inputs.questions[questionIndex].incorrectAnswers.splice(incorrectIndex, 1)
                console.log(this.inputs.questions)
            },
            newQuizQuestion(id){
                axios.post('http://localhost:3000/api/question/' + id,
                {
                    questionContent: this.inputs.questions[0].questionContent,
                    correctAnswers:this.inputs.questions[0].correctAnswers,
                    incorrectAnswers:this.inputs.questions[0].incorrectAnswers
                }
                ,{
                    headers: {
                        'Authorization': 'Bearer: ' + this.getToken
                    }
                })
                .then( () => {
                    alert("Question Kayıt Edildi");
                    this.inputs = { 
                                    name: '',
                                    questions: [{
                                        questionContent:'',
                                        correctAnswers : [{
                                            answer:''
                                        }],
                                        incorrectAnswers : [{
                                            answer: ''
                                        }]
                                    }]
                                };
                })
                .catch(err => console.log(err))
            },
        }
    }
</script>

<style scoped>

</style>
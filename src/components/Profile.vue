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
                    @click="openDeleteAnswer(index)"
                >
                    Cevap Sil 
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                    color="blue lighten-1"
                    @click="openUpdateAnswer(index)"
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
                        <v-btn color="green" class="white--text" :disabled="buttonDisabledNewSaveQuestion" @click="newQuizQuestion(item._id)">Quiz Kaydet ></v-btn>
                </v-col>
                </v-form>
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

            <!-- Delete Answer -->
            <div v-if="deleteAnswerShow == index" style="margin-left:15px;margin-bottom:15px">
                <h4 style="margin-bottom:15px">Lütfen Cevabını Silmek İstediğiniz Soruya Tıklayınız</h4>
                <div v-for="(addAnswerItem,index) in item.questions" :key="addAnswerItem._id" style="margin-top:10px">
                    <span style="font-weight:bold">Soru: </span> {{ addAnswerItem.questionContent }}
                    <v-spacer></v-spacer> 
                    <v-btn color="success" @click="clickAddAnswerShow(index)">
                        Cevap Seç
                    </v-btn>
                    <div v-if="addAnswerShowComp == index" style="margin-top:15px">
                            <h4>İstediğiniz Cevabı Silebilirsiniz</h4>
                            <v-form>  
                                <v-col cols="12"
                                    md="12" v-for="(correctAnswer,ca) in addAnswerItem.correctAnswers" :key="ca+1000">
                                <v-btn color="success" @click="deleteAnswer(correctAnswer._id)">
                                    Doğru Cevap - {{correctAnswer.answer}}
                                </v-btn>
                            </v-col>
                            <v-col cols="12" 
                                    md="12" v-for="(incorrectAnswer,ia) in addAnswerItem.incorrectAnswers" :key="ia + 10000">
                                <v-btn color="warning" @click="deleteAnswer(incorrectAnswer._id)">
                                    Yanlış Cevap - {{incorrectAnswer.answer}}
                                </v-btn>
                            </v-col>
                        </v-form>
                    </div>
                </div> 
            </div>

            <!-- Update Answer -->
            <div v-if="updateAnswerShow == index" style="margin-left:15px;margin-bottom:15px">
                <h4 style="margin-bottom:15px">Lütfen Cevabını Güncellemek İstediğiniz Soruya Tıklayınız</h4>
                <div v-for="(addAnswerItem,index) in item.questions" :key="addAnswerItem._id" style="margin-top:10px">
                    <span style="font-weight:bold">Soru: </span> {{ addAnswerItem.questionContent }}
                    <v-spacer></v-spacer> 
                    <v-btn color="success" @click="clickUpdateAnswerShow(index)">
                        Cevap Seç
                    </v-btn>
                    <div v-if="updateAnswerShowComp == index" style="margin-top:15px">
                            <h4>İstediğiniz Cevabı Düzenleyebilirsiniz</h4>
                            <v-form>  
                                <v-col cols="12"
                                    md="12" v-for="(correctAnswer,ca) in addAnswerItem.correctAnswers" :key="ca+1000">
                                <v-btn color="success" @click="updateAnswerTextShow(index,correctAnswer.answer,correctAnswer._id)">
                                    Doğru Cevap - {{correctAnswer.answer}}
                                </v-btn>
                            </v-col>
                            <v-col cols="12" 
                                    md="12" v-for="(incorrectAnswer,ia) in addAnswerItem.incorrectAnswers" :key="ia + 10000">
                                <v-btn color="warning" @click="updateAnswerTextShow(index,incorrectAnswer.answer,incorrectAnswer._id)">
                                    Yanlış Cevap - {{incorrectAnswer.answer}}
                                </v-btn>
                            </v-col>
                        </v-form>
                        <div v-if="updateAnswerShowTextComp == index">
                            <h4>Güncelleme</h4>
                            <v-form>  
                                <v-col cols="12" md="12">
                                    <v-text-field 
                                                v-model="updateAnswerContent"
                                                :rules="[v => !!v || 'Item is required']"
                                                required>
                                    </v-text-field>
                                </v-col>
                                <v-col class="text-right" cols="12" md="12">
                                    <v-btn color="green" class="white--text" :disabled="buttonDisabledUpdateAnswer" @click="updateAnswer()" >Cevabı Güncelle</v-btn>
                                </v-col>
                            </v-form>
                        </div>
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
            <v-card-text>Doğru Sayısı : <span color="green darken-31">{{item.correctCount}}</span> Yanlış Sayısı : <span color="red darken-31">{{!item.incorrectCount ? 0 : item.incorrectCount}}</span></v-card-text>
            <v-card-actions>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

    export default {
        data(){
            return {
                myQuiz:[],
                myAnsweredQuiz:[],
                addQuestionShow:-1,
                deleteQuestionShow:-1,
                updateQuestionShow:-1,
                updateQuestionContent:'',
                updateQuestionShowComp:-1,
                deleteAnswerShow:-1,
                deleteAnswerShowComp:-1,
                updateAnswerShow:-1,
                updateAnswerShowComp:-1,
                addAnswerShow:-1,
                addAnswerShowComp:-1,
                correctAnswers : [],
                incorrectAnswers : [],
                updateAnswerShowTextComp : -1,
                updateAnswerContent:'',
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
            },
            buttonDisabledUpdateAnswer(){
                if(this.updateAnswer == ''){
                    return true;
                }
                return false;
            },
            buttonDisabledNewSaveQuestion(){
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
        created(){
            this.getMyQuiz();
            this.getMyAnsweredQuiz();
        },
        methods:{
            getMyQuiz(){
                axios.get( process.env.VUE_APP_ROOT_URL + '/api/quiz/myQuiz'
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
                axios.get(process.env.VUE_APP_ROOT_URL + '/api/quiz/myAnsweredQuiz'
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
                    axios.delete(process.env.VUE_APP_ROOT_URL + '/api/quiz/' + id
                    ,{
                        headers: {
                            'Authorization': 'Bearer: ' + this.getToken
                        }
                    })
                    .then(() => {
                        this.getMyQuiz();
                        this.getMyAnsweredQuiz();
                    })
                    .catch(err => console.log(err));
                }
            }, 
            defaultReturnState(){
                this.addQuestionShow = -1;
                this.deleteQuestionShow = -1;
                this.updateQuestionShow = -1;
                this.updateQuestionShowComp =-1;
                this.addAnswerShow = -1;
                this.addAnswerShowComp = -1;
                this.deleteAnswerShow = -1;
                this.deleteAnswerShowComp = -1;
                this.updateAnswerShow = -1;
                this.updateAnswerShowComp = -1;
            },
            openAddQuestion(index){
                this.defaultReturnState();
                this.addQuestionShow = index;
            },
            openDeleteQuestion(index){
                this.defaultReturnState();
                this.deleteQuestionShow = index;
            },
            openUpdateQuestion(index){
                this.defaultReturnState();
                this.updateQuestionShow = index;
            },
            openAddAnswer(index){
                this.defaultReturnState();
                this.addAnswerShow = index;
            },
            openDeleteAnswer(index){
                this.defaultReturnState();
                this.deleteAnswerShow = index;
            },
            openUpdateAnswer(index){
                this.defaultReturnState();
                this.updateAnswerShow = index;
            },
            updateAnswerTextShow(index,answer,id){
                this.updateAnswerShowTextComp = index;
                this.updateAnswerContent = answer;
                this.updateAnswerId = id;
            },
            deleteQuestion(id){
                if(confirm("Soruyu silmek istiyor musunuz")){
                    axios.delete(process.env.VUE_APP_ROOT_URL + '/api/question/' + id
                    ,{
                        headers: {
                            'Authorization': 'Bearer: ' + this.getToken
                        }
                    })
                    .then(() => {
                        alert("Soru Silindi");
                        this.getMyQuiz();
                    })
                    .catch(err => console.log(err));
                }
            },
            deleteAnswer(id){
                if(confirm("Cevabı silmek istiyor musunuz")){
                    axios.delete(process.env.VUE_APP_ROOT_URL + '/api/answer/' + id
                    ,{
                        headers: {
                            'Authorization': 'Bearer: ' + this.getToken
                        }
                    })
                    .then(() => {
                        alert("Cevap Silindi");
                        this.getMyQuiz();
                    })
                    .catch(err => console.log(err));
                }
            },
            updateAnswer(){
                if(confirm("Cevabı güncellemek istiyor musunuz")){
                    axios.put(process.env.VUE_APP_ROOT_URL + '/api/answer/' + this.updateAnswerId,
                    {
                        answer: this.updateAnswerContent
                    }
                    ,{
                        headers: {
                            'Authorization': 'Bearer: ' + this.getToken
                        }
                    })
                    .then(() => {
                        alert("Cevap Güncellendi");
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
            clickDeleteAnswerShow(id){
                this.deleteAnswerShowComp = id;
            },
            clickUpdateAnswerShow(id){
                this.updateAnswerShowComp = id;
            },
            updateQuestion(id){
                if(confirm("Soruyu güncellemek istiyor musunuz")){
                    axios.put( process.env.VUE_APP_ROOT_URL + '/api/question/' + id,
                    {
                        questionContent : this.updateQuestionContent
                    }
                    ,{
                        headers: {
                            'Authorization': 'Bearer: ' + this.getToken
                        }
                    })
                    .then(() => {
                        alert("Soru Güncellendi");
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
                    axios.post(process.env.VUE_APP_ROOT_URL + '/api/answer/' + id,
                    {
                        answers
                    }
                    ,{
                        headers: {
                            'Authorization': 'Bearer: ' + this.getToken
                        }
                    })
                    .then(() => {
                        alert("Cevap kayıt edildi");
                        this.getMyQuiz();
                    })
                    .catch(err => console.log(err));
                }
            },
            newQuizQuestion(id){
                axios.post( process.env.VUE_APP_ROOT_URL + '/api/question/' + id,
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
                    this.getMyQuiz();
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
        },
    }
</script>

<style scoped>

</style>
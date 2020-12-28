<template>
  <div class="main">
      <div v-if="questions.length > 0">
        <v-icon
        large
        class="before-question"
        :style="this.selectedQuestion == 0 ? 'display:none': ''"
        @click="beforeQuestion"
        >
        mdi-chevron-left-circle-outline 
        </v-icon>
        <v-icon
        large
        class="after-question"
        :style="this.selectedQuestion == (this.questions.length-1) ? 'display:none': ''"
        @click="afterQuestion"
        >
        mdi-chevron-right-circle-outline
        </v-icon>
        <div class="header">
            <div class="questionAmount">
                Question <span>{{this.selectedQuestion + 1}}</span>/<span class="totalAmount">{{this.questions.length}}</span>
            </div>
            <p class="question">{{this.questions[this.selectedQuestion].questionContent}}</p>
        </div>

        <div class="answers">
            <div  v-for="(item) in this.answers[this.selectedQuestion]" :key="item._id">
                <input type="radio" v-model="item.id" class="radio-button" :id="item._id" name="answer" @click="userAnswerClick(item)" /> 
                <label :for="item._id" class="answer">{{item.answer}}</label>
            </div>
        </div>

        <div>
            <span class="endQuiz" :style="userAnswers.length < 1 ? 'display:none' : '' " @click="endQuiz">Sınavı Bitir</span>
        </div>
    </div>
    <div v-else>
        <h3 style="margin-bottom:15px">Doğru ve Yanlış Cevaplar</h3>
        <div v-for="item in questionAndAnswer" :key="item.questionId._id">
            <v-alert :type="item.color" >
               {{item.questionId.questionContent}}
            </v-alert>
        </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'getToken',
        ])
    },
    data(){
        return {
            questions:[],
            answers:[],
            selectedQuestion:0,
            userAnswers:[],
            question:true,
            questionAndAnswer: []
        }
    },
    created(){
        let vm = this;
        console.log(this.$route.query.quizId);

        axios.get('http://localhost:3000/api/quiz/' + this.$route.query.quizId).then(res => {
            this.questions = res.data.quiz.questions;
            for(var j = 0 ; j < this.questions.length;j++){
                vm.answers.push([]);
            }
            for(var i = 0 ; i < this.questions.length ; i++){
                res.data.quiz.questions[i].correctAnswers.forEach(function(item){ 
                    vm.answers[i].push(item); 
                });
                
                res.data.quiz.questions[i].incorrectAnswers.forEach(function(item){         
                    vm.answers[i].push(item);
                });    
            }

            // Answer Mixing
            for(i = 0 ; i < this.answers.length;i++){
                for(j = 0 ; j < this.answers[i].length;j++){ 
                    var random = Math.floor(Math.random() * this.answers[i].length);
                    var random2 = Math.floor(Math.random() * this.answers[i].length);

                    var cache = this.answers[i][random];
                    this.answers[i][random] = this.answers[i][random2];
                    this.answers[i][random2] = cache;          
                }
            }
        }).catch(err => console.log(err));
    },
    methods:{
        afterQuestion(){
            let vm = this;
            vm.selectedQuestion += 1;
        },
        beforeQuestion(){
            let vm = this;
            vm.selectedQuestion -= 1;
        },
        userAnswerClick(item){
            let questionId = this.questions[this.selectedQuestion]._id;
            //let answerId = item._id;
            if(this.userAnswers.length > 0){
                let status = 1 ;
                for(var i = 0 ; i < this.userAnswers.length;i++){
                    if (questionId in this.userAnswers[i]){
                       // Varsa değiştir
                       status = 0;
                       console.log("var")
                       console.log( this.userAnswers);
                       this.userAnswers[i][questionId] = item;
                       console.log( this.userAnswers);
                    }
                }
                if(status){
                    // Dizide yoksa ekle
                    console.log("yok");
                    let answer = {};
                    answer[questionId] = item;
                    console.log(answer);
                    this.userAnswers.push(answer);
                }
            }
            else{
                let answer = {};
                answer[questionId] = item;
                console.log(answer);
                this.userAnswers.push(answer);
            }
        },
        async endQuiz(){
            if(confirm("Sınavı bitirmek istiyor musunuz?")){
                let request = {};
                request["userAnswers"] = this.userAnswers;
                console.log(request);
                await axios.post('http://localhost:3000/api/quiz/userAnswer/' + this.$route.query.quizId,{userAnswers:this.userAnswers},{
                    headers: {
                        'Authorization': 'Bearer: ' + this.getToken
                    }
                    })
                    .then(res => {
                        console.log(res);
                        if(res.data.success){
                            this.questionAndAnswer = res.data.questionAndAnswer;
                            console.log(res.data.questionAndAnswer);
                            this.question = false;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }else{
                console.log('Sınava girmekten vazgeçti');
            }
        }
    }
}
</script>

<style  scoped>
.main{
    height: 200px;
    width: 500px;
    margin-top: 35px;
    margin-left: auto;
    margin-right: auto;
}
.header{
    justify-content: center;
    align-items: center;
    border-radius: 35px;
    border: 2px solid #f4f4f4;
    -webkit-box-shadow: rgba(138, 43, 226, .6) 0px 0 15px;
    -moz-box-shadow: rgba(138, 43, 226, .6) 0 0 15px;
    box-shadow: rgb(138, 43, 226, .6) 0 0 15px;
}
.questionAmount{
    justify-content: center;
    align-items: center;
    display: flex;
    color:blueviolet;
    font-weight: bold;
    margin:35px 0 25px 0;
}
.question{
    margin:70px 0 35px 0;
    text-align: center;
    font-weight: bold;
    vertical-align: baseline;
}
.answers{
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    margin-top:55px;
}
.answer{
    display: block;
    width: 500px;
    height: 45px;
    border: 1px solid;
    border-radius: 20px;
    margin-left: 0;
    margin-right: 0;
    padding-top: 10px;
    padding-left: 20px;
    font-weight: 450;
}
.answer:hover{
    border: 2px solid blueviolet;
    padding-top: 9px;
    padding-left: 19px;
}
.answer:active{
    border: 2px solid blueviolet;
}
.before-question{
    position: absolute;
    top: 300px;
    left:640px;
}
.after-question{
    position: absolute;
    top: 300px;
    right: 640px;
}
.before-question:hover
,.after-question:hover{
    color:blueviolet;
}
.questionAmount span:first-child{
    font-size:22px;
    margin-left:3px;
    margin-right:3px;
    margin-top:-3px;
}
.radio-button{
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.radio-button:checked + .answer{
    color:blueviolet;
    border: 2px solid blueviolet;
    padding-top: 9px;
    padding-left: 19px;
}
.totalAmount{
    margin-left:4px;
}
.endQuiz{
    font-size: 20px;
    font-weight: 650;
    display: block;
    margin-top: 55px;
    text-align: center;
    border-bottom: 1px solid;
    border-radius: 25px;
    transition: all .2s ease-in-out
}
.endQuiz:hover{
    border-bottom: 2px solid blueviolet;
    color:blueviolet;
    transform: scale(1.05);
    -webkit-box-shadow: rgba(138, 43, 226, .6) 0px 0 15px;
    -moz-box-shadow: rgba(138, 43, 226, .6) 0 0 15px;
    box-shadow: rgb(138, 43, 226, .6) 0 0 15px;
}
</style>
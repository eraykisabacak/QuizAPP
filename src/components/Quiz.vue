<template>
  <div class="main">
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
            Question <span>{{this.selectedQuestion + 1}}</span>/<span class="totalAmount">20</span>
        </div>
        <p class="question">{{this.questions[this.selectedQuestion].questionContent}}</p>
    </div>

    <div class="answers">
        <div  v-for="item in this.answers[this.selectedQuestion]" :key="item._id">
            <input type="radio" class="radio-button" :id="item._id" name="answer"/> 
            <label :for="item._id" class="answer">{{item.answer}}</label>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    
    data(){
        return {
            questions:[],
            answers:[],
            selectedQuestion:0,
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
            console.log(this.questions);
            console.log(this.answers);
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
</style>
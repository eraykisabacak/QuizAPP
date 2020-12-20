<template>
  <v-container class="justify-center text-center" align="center">
            <v-form v-model="valid">
                <v-row style="align-items: center;justify-content: center;">
                    <v-col
                    cols="8"
                    md="8"
                    >
                        <v-text-field
                            v-model="inputs.quizname"
                            label="Quiz Name"
                            required
                        ></v-text-field>
                    </v-col>
                    <v-col cols="8"
                            md="8" v-for="(question,q) in inputs.questions" :key="q">
                            <h3>{{q + 1}}.Soru</h3>
                        <v-text-field
                            v-model="question.questionName"
                            prepend-icon="mdi-comment-question"
                            label="Question"
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
                                required>
                            </v-text-field>
                            <span>
                                <v-btn depressed color="primary" @click="addInCorrectAnswer(q)" v-show="ia == question.incorrectAnswers.length-1">Yeni Yanlış Cevap Ekle</v-btn>
                                <v-btn depressed color="error" @click="removeInCorrectAnswer(q,ia)" v-show="ia || ( !ia && question.incorrectAnswers.length > 1)">Yanlış Cevap Sil</v-btn> 
                            </span>
                        </v-col>
                    </v-col>
                </v-row>
            </v-form>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            valid: false,
            inputs: {
                quizname: '',
                questions: [{
                    questionName:'',
                    correctAnswers : [{
                        answer:''
                    }],
                    incorrectAnswers : [{
                        answer: ''
                    }]
                }]
            }
        }),
        methods:{
            //Question
            addQuestion () {
                this.inputs.questions.push({
                    questionName:'',
                    correctAnswers : [{
                        answer:''
                    }],
                    incorrectAnswers : [{
                        answer: ''
                    }]
                })
                console.log(this.inputs)
            },
            removeQuestion (index) {
                this.inputs.questions.splice(index, 1)
            },

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
        },
    }
</script>

<style scoped>

</style>
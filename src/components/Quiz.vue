<template>
  <div class="main">
     <v-icon
      large
      class="before-question"
    >
      mdi-chevron-left-circle-outline 
    </v-icon>
     <v-icon
      large
      class="after-question"
    >
      mdi-chevron-right-circle-outline
    </v-icon>
    <div class="header">
        <div class="questionAmount">
            Question <span>13</span>/<span class="totalAmount">20</span>
        </div>
        <p class="question">How many students in your class from korea ?</p>
    </div>

    <div class="answers">
        <input type="radio" class="radio-button" id="ans1" name="answer"/> 
        <label for="ans1" class="answer">Cevap 1</label>

        <input type="radio" class="radio-button" id="ans2"  name="answer"/>
        <label for="ans2" class="answer">Cevap 2</label>
    </div>
  </div>
</template>

<script>
export default {
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
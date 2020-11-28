<template>
  <v-container align="center">
    <v-row class="text-center">
      <v-col cols="10" align="right">
         <h2 class="font-weight-light" style="max-width:1200px" align="center" v-if="!isAuthenticated">
            Quizlere Giriş Yapmak ve Quiz Oluşturmak için Giriş Yapınız.
          </h2>
      </v-col>
      <v-col cols="2">
        <v-btn color="success" large v-if="isAuthenticated">Yeni Quiz</v-btn>
      </v-col>
      <v-col cols="12" v-if="getQuiz">
        <v-card class="mx-auto" color="success" dark max-width="1200">
          <v-card-title>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because
            most gotcha edge cases are type invalid as well."
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Evan You</v-list-item-title>
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
    ])
  },
  created(){
    this.$store.dispatch("getAllQuiz");
  }
};
</script>

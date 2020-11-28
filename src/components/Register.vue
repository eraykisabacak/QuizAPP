<template>
    <v-content>
        <v-card width="500" class="mx-auto mt-15">
            <v-card-title align="center">Register</v-card-title>
           <v-card-text>
                <v-text-field   
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    prepend-icon="mdi-email"
                    required />

                <v-text-field   
                    v-model="username"
                    label="Username"
                    :rules="usernameRules"
                    prepend-icon="mdi-account"
                    required />

                <v-text-field
                        v-model="password"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        prepend-icon="mdi-account-lock"
                        name="input-10-1"
                        label="Password"
                        hint="At least 6 characters"
                        counter
                        @click:append="show1 = !show1"
                    ></v-text-field>
            </v-card-text>    

            <v-card-actions>
                <v-btn color="success" @click="register">Register</v-btn>
            </v-card-actions>
        </v-card>
    </v-content>                    
</template>

<script>
    export default {
       name: 'Register',

        data() {
            return {
                username:'',
                email: '',
                emailRules: [
                    v => !!v || 'E-mail zorunlu alandır',
                    v => /.+@.+\..+/.test(v) || 'Lütfen Email giriniz',
                ],
                usernameRules: [
                    v => !!v || 'Username zorunlu alandır',
                    v => /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(v) || 'Lütfen 3 - 20 arasında karakter giriniz Ve Noktalama işaretleri ile başlamaz, bitmez'
                ],
                show1: false,    
                password: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Min 6 characters',
                    emailMatch: () => (`The email and password you entered don't match`),
                    emailMin: v => v.length >= 3 || 'Min 3 characters'
                }
            }
        },
        methods:{
            register(){
                console.log("register");
            }
        }
    }
</script>

<style scoped>

</style>
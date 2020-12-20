<template>
    <v-content>
        <v-card width="500" class="mx-auto mt-15">
            <v-card-title align="center">Login</v-card-title>
            <h2 align="center" class="red--text text--lighten-1" v-if="error">{{error}}</h2>
            <v-card-text>
                <v-text-field   v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                prepend-icon="mdi-email"
                                v-on:keyup.enter="login"
                                required />
                <v-text-field
                    v-model="password"
                    prepend-icon="mdi-account-lock"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 6 characters"
                    counter
                    @click:append="show1 = !show1"
                    v-on:keyup.enter="login"
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-btn color="success" @click="login">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-content>                    
</template>

<script>
    export default {
       name: 'Login',
        data() {
            return {
                email: '',
                emailRules: [
                    v => !!v || 'E-mail zorunlu alandır',
                    v => /.+@.+\..+/.test(v) || 'Lütfen Email giriniz',
                ],
                show1: false,    
                password: '',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 6 || 'Min 6 characters',
                    emailMatch: () => (`The email and password you entered don't match`),
                },
                error:''
            }        
        },
        methods: {
            login(){
                let user = {email:this.email,password:this.password}
                if(user.email == '' || user.password == ''){
                    this.error = "Lütfen Email ve Password Giriniz";
                    return;
                }
                this.$store.dispatch("login",user)
                .then( (res) => {
                    if(res) {
                        this.error = res;
                        this.email = '';
                        this.password = '';
                    }
                })
                .catch( (err) => {console.log("err",err)});                
            }
        },
        watch:{
            error: function(val){
                if(val){
                    setTimeout(() => this.error = '', 5000)
                }
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>
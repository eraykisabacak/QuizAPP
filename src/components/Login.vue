<template>
    <v-content>
        <v-card width="500" class="mx-auto mt-15">
            <v-card-title align="center">Login</v-card-title>
            <v-card-text>
                <v-text-field   v-model="email"
                                :rules="emailRules"
                                label="E-mail"
                                required />
                <v-text-field
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 6 characters"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-btn color="success" right>Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-content>                    
</template>

<script>
    export default {
        data: () => ({
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
        })
    }
</script>

<style lang="sass" scoped>

</style>
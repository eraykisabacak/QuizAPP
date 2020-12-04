import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home';
import AddQuiz from './components/AddQuiz';


export const router = new VueRouter({
    routes: [
        {
            path: '/', component: Home
        },
        {
            path: '/login', component: Login
        },
        {
            path: '/register', component: Register
        },
        {
            path: '/new_quiz', component: AddQuiz,

        }
    ],
    mode:"history"
})
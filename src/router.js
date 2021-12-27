import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home';
import AddQuiz from './components/AddQuiz';
import Quiz from './components/Quiz';
import Profile from './components/Profile';

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("token")) {
                    router.push('/');
                }
                next();
            }
        },
        {
            path: '/register',
            component: Register,
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem("token")) {
                    router.push('/');
                }
                next();
            }
        },
        {
            path: '/new_quiz',
            component: AddQuiz,
            beforeEnter: (to, from, next) => {
                if (!localStorage.getItem("token"))
                {
                    router.push('/');
                }
                next();
            }
        },
        {
            path: '/quiz',
            component: Quiz,
            params:true,
            beforeEnter: (to, from, next) => {
                if (!localStorage.getItem("token") || to.query.quizId == undefined)
                {
                    router.push('/');
                }
                next();
            }
        },
        {
            path: '/profile',
            component: Profile,
            beforeEnter: (to, from, next) => {
                if (!localStorage.getItem("token"))
                {
                    router.push('/');
                }
                next();
            }
        }
    ],
    mode: "history"
});
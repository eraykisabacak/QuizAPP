import Login from './components/Login.vue';
import Register from './components/Register.vue';

export const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Home from './components/Home';

export const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
];
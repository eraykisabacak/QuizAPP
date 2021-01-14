import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { router } from '.././router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: "",
    quizs: []
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = "";
    },
    setQuiz(state, quiz) {
      state.quizs = quiz;
    }
  },
  actions: {
    initAuth() {
      let token = localStorage.getItem("token");
      if (token) {
        let expires = localStorage.getItem("expirationDate");
        if (Date.now >= +expires) {
          console.log("Token Süresi geçmiştir");
          store.dispatch("logout");
        }
        else {
          store.commit("setToken", token);
          let timerSecond = (+expires) - Date.now();
          console.log("Timer second ", timerSecond);
          this.dispatch("setTimeoutTimer", timerSecond);
        }
      }
    },
    async login({ commit, dispatch }, user) {
      return await axios.post("http://localhost:3000/api/auth/login",
        {
          email: user.email,
          password: user.password
        })
        .then(res => {
          console.log("Login");
          commit("setToken", res.data.access_token);
          localStorage.setItem("token", res.data.access_token); 
          localStorage.setItem("expirationDate",Date.now() + 3600000);

          dispatch("setTimeoutTimer", 3600000);

          router.push("/");
        })
        .catch(err => err);
    },
    logout({ commit }) {
      commit('clearToken');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('expirationDate');
      
      if (router.history.current.path != '/') {
        console.log("Çalıştı");
        router.replace('/');
      }
    },
    getAllQuiz({ commit }) {
      return axios.get("http://localhost:3000/api/quiz")
        .then(res => {
          console.log(res.data.quizs);
          commit("setQuiz", res.data.quizs);
        })
    },
    setTimeoutTimer({ dispatch }, expiresIn) {
      console.log(expiresIn);
      setTimeout(() => {
        console.log("logout", expiresIn);
        dispatch("logout");
      }, expiresIn)
    },
    register({ commit, dispatch }, user) {
      return axios.post("http://localhost:3000/api/auth/register",
        {
          email: user.email,
          username: user.username,
          password: user.password
        })
        .then(res => {
          commit("setToken", res.data.access_token);
          localStorage.setItem("token", res.data.access_token); 
          localStorage.setItem("expirationDate",Date.now() + 3600000);
          dispatch("setTimeoutTimer", 3600000)
          router.push("/");
        })
        .catch(err => console.log(err));
    },
    async submitQuiz({commit} ,[ name, questions ]) {
      console.log(name,questions);
      return await axios.post('http://localhost:3000/api/quiz',
        {
          name:name,questions:questions
        },
        {
          headers: {
            'Authorization': 'Bearer: ' + this.state.token
          }
        })
        .then(res => {
          console.log(res);
          router.push("/");
          commit();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.token != "";
    },
    getQuiz(state) {
      return state.quizs;
    },
    getToken(state) {
      return state.token;
    }
  }
});

export default store;
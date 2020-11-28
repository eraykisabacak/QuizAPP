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
        console.log("expires ", expires);
        console.log("date now", Date.now);
        if (Date.now >= +expires) {
          console.log("Token Süresi geçmiştir");
          store.dispatch("logout");
        }
        else {
          store.commit("setToken", token);
          let timerSecond = +expires - Date.now();
          console.log(timerSecond)
          this.dispatch("setTimeoutTimer", timerSecond);
          router.push('/');
          }
        }
      },
      login({ commit },user) {
        return axios.post("http://localhost:3000/api/auth/login",
          {
            email: user.email,
            password: user.password
          })
          .then(res => {
            console.log(res);
            commit("setToken", res.data.access_token);
            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("expirationDate", Date.now() + 30000)
            router.push("/");
          })
          .catch(err => console.log(err));
      },
      logout({ commit }) {
            commit('clearToken');
            router.replace('/');
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('expirationDate');
      },
      getAllQuiz({ commit }) {
        return axios.get("http://localhost:3000/api/quiz")
          .then(res => {
            commit("setQuiz", res.data);
          })
    },
      setTimeoutTimer({ dispatch }, expiresIn) {
            setTimeout(() => {
                dispatch("logout");
            },expiresIn)
        }
    },
    getters: {
      isAuthenticated(state) {
          return state.token != "";
      },
      getQuiz(state) {
        return state.quizs;
      }
    }
});

export default store;
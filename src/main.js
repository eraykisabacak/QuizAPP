import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';

import { router } from './router';
import store from './store/store';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

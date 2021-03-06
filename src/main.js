import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


Vue.config.productionTip = true
axios.defaults.baseURL='http://localhost:8085'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

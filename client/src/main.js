import Vue from 'vue'
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '17355066347-n66ns0b6bue9lpi2uogn2krl925gk1j3.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.use(BootstrapVue)
new Vue(App).$mount('#app')
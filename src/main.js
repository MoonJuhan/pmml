import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(VueRouter)

import About from './components/about/About.vue'
import Main from './components/main/Main.vue'

var routes = [
  {path: '/', component: Main},
  {path: '/about', component: About}
];

var router = new VueRouter({
  mode: 'history',
  routes:routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router
})

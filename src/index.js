import Vue from 'vue'
import App from './app.vue'
import store from './store'
import router from './router'
import '@/assets/style/reset.styl'
const vm = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})

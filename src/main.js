import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routes'
import store from './store';

import { MdCard,MdButton, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdCard)
Vue.use(MdButton)
Vue.use(MdField)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

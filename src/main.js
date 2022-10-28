import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import AOS from 'aos'
import 'aos/dist/aos.css'
// import axios from 'axios';

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App),
  mounted() {
    AOS.init()
  },
}).$mount('#app')

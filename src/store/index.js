import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    isLogin: false,
  },
  getters: {
  },
  mutations: {
    LOGGED_IN(state, data) {
      state.name = data;
      state.isLogin = true;
    },
    LOGGED_OUT(state) {state.isLogin = false;}
  },
  actions: {
  },
  modules: {
  }
})

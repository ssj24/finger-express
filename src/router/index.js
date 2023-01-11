import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Admin from '../components/Admin.vue';
import Application from '../components/Application.vue';
import Basket from '../components/Basket.vue';
import Signup from '../components/Signup.vue';

Vue.use(VueRouter);

export default new VueRouter({
	mode:'history', //해쉬값 제거 방식
    routes: [
      {
        path: '/', 
        component: Home,
      }, {
        path: '/admin',
        component: Admin
      }, {
        path: '/application',
        component: Application
      }, {
        path: '/cart',
        component: Basket
      }, {
        path: '/accounts/login',
        component: Signup
      }
    ]
});
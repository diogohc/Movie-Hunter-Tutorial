import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App.vue'
import Carousel3d from 'vue-carousel-3d';
import "./input.css"
import api from "./services/api"
import store from "./store"

Vue.prototype.$http = api;
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Carousel3d);

new Vue({
  render: h => h(App),
  router: routes,
  store,
}).$mount('#app')

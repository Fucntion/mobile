import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)
const router = new VueRouter({
	routes
});


import VueResource from 'vue-resource'
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;





new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

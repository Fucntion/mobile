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

Vue.http.interceptors.push((request, next) => {


	var url = 'http://saas.icloudinn.com/api/v1',
		token = '?access-token='+'6m3vB_FtMzXHeVDN0-fkSPk6GdwoIkMQdvhHG02q';
	//万洲的url也有毒
	if(request.url.indexOf('shop=') == 0) {
		request.url = request.url.substr(5) + token + '&system_id=10';
	} else {
		request.url = url + request.url + token;
	}



	next((response) => {
		return response
	});

});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

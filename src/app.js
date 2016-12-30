import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
	path: '/room/:id',
	name:'room',
	component: function(resolve) {
		require(['./page/room.vue'], resolve)
	}
},{
	path: '/404',
	name:'notfound',
	component: function(resolve) {
		require(['./page/404.vue'], resolve)
	}
},{
	path: '*',
	redirect: '/404',
}]

const router = new VueRouter({
	routes
})


import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true

Vue.http.interceptors.push((request, next) => {

	var url = 'http://saas.icloudinn.com/api/v1'
	var token = '?access-token=' + '6m3vB_FtMzXHeVDN0-fkSPk6GdwoIkMQdvhHG02q'
		

	if(request.url.indexOf('shop=') == 0) {
		request.url = request.url.substr(5) +'?system_id=10'
	} else if(request.url.indexOf('mock=') == 0){
		request.url = request.url.substr(5)
	}else{
		request.url = url + request.url + token
	}

	next((response) => {
		return response
	})

})

//处理一些公共的配置
import App from './app.vue'
new Vue({
	el:'#app',
	router,
	render: h => h(App)
})
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
	path: '/pay',//需要把这个规则写在前面，不然会被/:id拦截
	name:'pay',
	component: function(resolve) {
		require(['./page/pay.vue'], resolve)
	}
},{
	path: '/:id',
	name:'room',
	component: function(resolve) {
		require(['./page/room.vue'], resolve)
	}
},{
	path: '/goods/:goodsId',
	name:'goods',
	component: function(resolve) {
		require(['./page/goods.vue'], resolve)
	}
},
// {
// 	path: '/:id',
// 	name:'cover',
// 	component: function(resolve) {
// 		require(['./page/cover.vue'], resolve)
// 	}
// },
{
	path: '*',
	name:'notfound',
	component: function(resolve) {
		require(['./page/404.vue'], resolve)
	}
}
]

const router = new VueRouter({
	mode: 'history',
	routes
})


import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.emulateJSON = true
// Vue.http.options.emulateHTTP = true

Vue.http.interceptors.push((request, next) => {

	var url = 'http://saas.icloudinn.com/api/v1'
	var token = '?access-token=' + localStorage.getItem('token')	

	if(request.url.indexOf('shop=') == 0) {
		request.url = request.url.substr(5)+token
	} else if(request.url.indexOf('mock=') == 0){
		//针对没有token的接口
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
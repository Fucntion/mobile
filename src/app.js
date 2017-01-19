import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
{
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
},{
	path: '/order/:orderId',
	name:'order',
	component: function(resolve) {
		require(['./page/order.vue'], resolve)
	}
},
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
		var oldTime = localStorage.getItem('login_old_time'),
			d = new Date(),
			newTime = d.getTime()

			if(newTime-parseInt(oldTime)>3600*4*1000){
				alert('登录过期，请重新登录')
				localStorage.clear()
				//进到直播间，如果地址不对的话交给404，这里不用管
				this.$router.push('/'+sessionStorage.getItem('roomid'))
			}
		
		request.url = request.url.substr(5)+token
	} else if(request.url.indexOf('mock=') == 0){
		//针对没有token的接口
		request.url = request.url.substr(5)
	}else{
		var oldTime = localStorage.getItem('login_old_time'),
			d = new Date(),
			newTime = d.getTime()

			if(newTime-parseInt(oldTime)>3600*4*1000){
				alert('登录过期，请重新登录')
				localStorage.clear()
				//进到直播间，如果地址不对的话交给404，这里不用管
				this.$router.push('/'+sessionStorage.getItem('roomid'))
			}

		request.url = url + request.url + token
	}

	next((response) => {
		return response
	})

})


import Vuex from 'vuex'
Vue.use(Vuex)
//处理一些公共的配置

import App from './app.vue'


new Vue({
	el:'#app',
	router,
	render: h => h(App)
})
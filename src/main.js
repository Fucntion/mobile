import Vue from 'vue'

//默认页面,用来获取微信信息等初始化工作
const App = require('./app')
//首页,用来挡原子弹，专治各种不服
const Home = require('./page/home')
//直播间
const Room = require('./page/room')
//封面
const Cover = require('./page/cover')

const routes = {
  '/:id': Room,
  '/cover': Cover,
  '/':Home,
  '*':Home
}




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
  render: h => h(App)
})

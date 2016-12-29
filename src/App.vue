<template>

	<router-view></router-view>

</template>

<script>
	export default {
		name: 'app',
		data() {
			return {

			}
		},
		methods: {

			setRoomId: function() {

				var hashArr = location.hash.split('/')
				var index = hashArr.indexOf('room') + 1
				var roomid =hashArr.splice(index, 1).toString()
				if(roomid!==sessionStorage.getItem('roomid')){
					sessionStorage.setItem('roomid', roomid)
				}
	
			},
			setUsrInfo: function() {
				
				if(localStorage.isLogin==1&&typeof(localStorage.openid)!='undefined'&&typeof(localStorage.surInfo)!='undefined'){	
					return	
				}
				
				var openidUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7c5d202b6c5c830f&redirect_uri='+encodeURIComponent(location.href)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
				
				if(localStorage.isLogin != '1') {
					localStorage.setItem('isLogin', '1')
					location.href = openidUrl
				}
				
				if(location.href.indexOf('code') != -1) {

					function getUrlParam(name) {
						var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
						var r = window.location.search.substr(1).match(reg) //匹配目标参数
						if(r != null) return unescape(r[2])
						return null//返回参数值
					}
					
					var code = getUrlParam('code');

					this.$http.get('mock=http://tv.icloudinn.com/wx.php?code=' + code).then((response) => {
						//sucss dosomething
						localStorage.setItem('usrInfo', response.body)
						localStorage.setItem('openid', JSON.parse(response.body).openid)
						location.reload()
					}, (response) => {
						//error dosomething
					})

					
					return
				}
				


			}
		},
		mounted() {
			this.setRoomId()
			this.setUsrInfo()
		}
	}
</script>

<style lang="less">
	@import './assets/app.less';
</style>
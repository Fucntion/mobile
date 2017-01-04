<template>
	<div class="room" v-if="show">
		<Player-Box :room="roomObj"></Player-Box>
		 <Advert-Box :room="roomObj"></Advert-Box> 
		<Menu-Box :room="roomObj"></Menu-Box>
		<button @click="clear()" style="position:absolute;left:0;top:0;font-size: 16px;padding: 5px 10px;">双清</button>
	</div>
</template>

<script>
	import PlayerBox from 'plugin/player.vue'
	import AdvertBox from 'plugin/advert.vue'
	import MenuBox from 'plugin/menu.vue'
	export default {

		name: 'room',
		data() {

			return {
				roomObj:null,
				show:false
			}

		},
		components: {
			PlayerBox,
			AdvertBox,
			MenuBox
		},
		methods: {
			clear:function(){
				localStorage.clear()
				sessionStorage.clear()
			},
			setRoomId: function() {

				var hashArr = location.hash.split('/')
				var index = hashArr.indexOf('room') + 1
				var roomid =hashArr.splice(index, 1).toString()
				if(roomid!==sessionStorage.getItem('roomid')||!sessionStorage.getItem('roomid')){
					sessionStorage.setItem('roomid', roomid)
				}
	
			},
			setUsrInfo: function() {

				
				if(localStorage.isLogin==1&&typeof(localStorage.usrInfo)!='undefined'&&typeof(sessionStorage.token)!='undefined'){	
					console.log('已经登陆了')
					return	
				}
				
				var openidUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a150a2811c36060&redirect_uri='+encodeURIComponent(location.href)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
				
				if(localStorage.isLogin != '1') {
					localStorage.setItem('isLogin', '1')
					location.href = openidUrl
				}

				if(location.href.indexOf('code') != -1 &&localStorage.isLogin=='1') {
					
					function getUrlParam(name) {
						var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
						var r = window.location.search.substr(1).match(reg) //匹配目标参数
						if(r != null) return unescape(r[2])
						return null//返回参数值
					}
					
					var code = getUrlParam('code')
					this.$http.post('/deal/wxlogin',{code:code}).then((response) => {
						//sucss dosomething
						if(response.body.code!=100 || response.body.msg!='success'){
							this.$router.push('/404')
							return
						}
						localStorage.setItem('usrInfo', JSON.stringify(response.body.data))
						var result = response.body.data
						sessionStorage.setItem('token', result.accessToken)


					}, (response) => {
						this.$router.push('/404')
					})

				}
				

			},
			getRoomInfo:function(){
				var url ='/rooms/'+sessionStorage.getItem('roomid')
				this.$http.get(url).then((response)=>{

					this.roomObj = response.body
					this.roomObj.pluginObj = JSON.parse(this.roomObj.plugin)
					this.$nextTick(function () {
				    	document.title = this.roomObj.title
				    	if(this.roomObj.logo_url!=''){
				    		document.getElementById('shareImg').src=this.roomObj.logo_url
				    	}
				    })
					this.show =true
				},(response)=>{
					this.$router.push('/404')
				})
			}
		},
		mounted(){							
			this.setRoomId()
			this.getRoomInfo()
			this.setUsrInfo()

		}
	}
</script>

<style lang="less">

</style>
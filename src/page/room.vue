<template>
	
	<div class="room" v-if="show">
		<template v-if="!cover">
			<Player-Box  :room="roomObj"></Player-Box>
			<Advert-Box :room="roomObj"></Advert-Box> 
			<Menu-Box :room="roomObj"></Menu-Box>	
		</template>
		<template v-else>
			<div class="cover" @click="cover=false" :style="{backgroundImage: 'url(' + roomObj.cover_img_url + ')'}">
				<div class="mask_cover"></div>
				<div class="player_box"><h5>点击进入</h5><img src="~assets/player.png"></div>
			</div>
		</template>
	</div>

</template>

<script>
	
	import AdvertBox from 'plugin/advert.vue'
	import PlayerBox from 'plugin/player.vue'
	import MenuBox from 'plugin/menu.vue'
	export default {

		name: 'room',
		data() {

			return {
				roomObj:null,
				show:false,
				cover:false
			}

		},
		components: {
			PlayerBox,
			AdvertBox,
			MenuBox
		},
		methods: {
			getRoomInfo: function () {
				
				var url = '/consumers/room/' + sessionStorage.getItem('roomid')
				this.$http.get(url).then((response) => {

					this.roomObj = response.body.data
					document.title = this.roomObj.title

					if (this.roomObj.plugin != '') {
						this.roomObj.pluginObj = JSON.parse(this.roomObj.plugin)
					}

					if(this.roomObj.cover_img_url!=''&&sessionStorage.getItem('cover')!='1'){
						console.log('有封面的哦')
						this.cover = true
						sessionStorage.setItem('cover',1)
					}
					
					this.show = true
				}, (response) => {
					// this.$router.push('/404')
				})
			},
			setRoomId: function () {

				var hashArr = location.hash.split('/')
				var index = hashArr.indexOf('#') + 1
				var roomid = hashArr.splice(index, 1).toString()

				// 房间id是字符而且与现有不相同才替换
				if (roomid !== sessionStorage.getItem('roomid') || !sessionStorage.getItem('roomid')) {
					if (isNaN(parseInt(roomid))) {
						console.log('roomid 参数为非整数')
						return
					}
					sessionStorage.setItem('roomid', roomid)
				}
			},
			setUsrInfo: function() {
	
				if(localStorage.isLogin==1&&typeof(localStorage.openid)!='undefined'&&typeof(localStorage.usrInfo)!='undefined'&&typeof(localStorage.token)!='undefined'){		
					console.log('已经登陆了')
					this.getRoomInfo()
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
						
						if(response.body.code!=100 || response.body.msg!='success'){
							// this.$router.push('/404')
							return
						}
						localStorage.setItem('usrInfo', JSON.stringify(response.body.data))
						var result = response.body.data
						localStorage.setItem('token', result.accessToken)
						localStorage.setItem('account', result.account)
						localStorage.setItem('openid',result.openid)

						this.getRoomInfo()
					}, (response) => {
						// this.$router.push('/404')
					})

				}
				
			}
			
		},
		mounted(){							
			this.setRoomId()
			this.setUsrInfo()
		}
	}
</script>

<style lang="less">

</style>
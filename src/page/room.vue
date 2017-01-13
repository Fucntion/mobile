<template>
	
	<div class="room" v-if="show">
		<template v-if="!cover">
			<Player-Box  :room="roomObj"></Player-Box>
			<!--<Advert-Box :room="roomObj"></Advert-Box> -->
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
	import store from 'store'
	export default {

		name: 'room',
		data() {

			return {
				roomObj:null,
				show:false,
				cover:false,
			}

		},
		components: {
			PlayerBox,
			AdvertBox,
			MenuBox
		},
		methods: {
			getRoomInfo: function () {
				
				var url = 'mock=http://saas.icloudinn.com/api/v1/deals/room/' + sessionStorage.getItem('roomid')
				this.$http.get(url).then((response) => {
					
					this.roomObj = response.body.data
					document.title = this.roomObj.title

					if (this.roomObj.plugin != '') {
						this.roomObj.pluginObj = JSON.parse(this.roomObj.plugin)
					}

					if(sessionStorage.getItem('cover')!='1'&&this.roomObj.cover_img_url!=''){
						this.cover = true
						sessionStorage.setItem('cover',1)
					}

					//如果不是第一次登录就直接显示，如果是第一次登录就在登录后显示
					if(localStorage.isLogin=='1'){

						this.show = true
						var self =this
						var obj ={
							text:self.roomObj.titel,
							load:true
						}
						store.commit('setRoom',obj)

					}else{
						alert('需要登录')
						localStorage.clear()
						this.$router.push('/'+sessionStorage.getItem('roomid'))
					}
					
					
						
				}, (response) => {
					// this.$router.push('/404')
				})
			},
			setRoomId: function () {


				var roomid = this.$route.params.id;

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

				//一厢情愿。。。微信的localStorage隔几分钟就清空了,希望什么时候谷歌把腾讯买了，然后微信丢掉垃圾x5
				if(localStorage.isLogin=='1'&&typeof(localStorage.openid)!='undefined'&&typeof(localStorage.usrInfo)!='undefined'&&typeof(localStorage.token)!='undefined'){		
					this.getRoomInfo()
					return	
				}else{
					
					//未登录但是已经打开页面，说明是微信登录的回调
					if(typeof(localStorage.isopenLogin)=='undefined'||localStorage.isopenLogin != '1') {
						//记录是否打开过微信登录页面
						localStorage.setItem('isopenLogin', '1')
						var openidUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a150a2811c36060&redirect_uri='+encodeURIComponent(location.href)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
						
						location.href = openidUrl
					}

					//第一次打开微信
					if(location.href.indexOf('code') != -1 &&localStorage.isopenLogin=='1') {
					
	
						store.commit('openLoading','加载信息')
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
							localStorage.setItem('isLogin',1)
											
							store.commit('openLoading')

							this.getRoomInfo()
											
					
							//修改登录的状态，但凡需要登录的操作都需要在这个后面执行	
						}, (response) => {
							// this.$router.push('/404')
							store.commit('openLoading')
						})

					}

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
.room{
	position: absolute;
	top:0;
	left: 0;
	right: 0;
	bottom: 0;
}
</style>
<template>

	<div class="room" v-if="show">
		<template v-if="!cover">
			<Player-Box :room="roomObj"></Player-Box>
			<Advert-Box :room="roomObj"></Advert-Box>
			<Menu-Box :room="roomObj"></Menu-Box>
			<div v-if='islimit' class="zhehzao">

			</div>
			<div @click='gopay' v-if='pay && islimit' class='paystyle'>
				<p>￥{{paymoney}} 付费观看</p>
			</div>
			<div @click='tankuang = true' v-if='password && islimit' class="paystyle">
				输入密码可观看
			</div>
			<div v-if='tankuang' class="tankuang">
				<div @click='tankuang = false' class="close">
					关闭
				</div>
				<div class="passcontent">
					<input type='number' v-model='model1' @keyup='typepass(1,model1)'>
					<input type='number' v-model='model2' @keyup='typepass(2,model2)'>
					<input type='number' v-model='model3' @keyup='typepass(3,model3)'>
					<input type='number' v-model='model4' @keyup='typepass(4,model4)'>
					<input type='number' v-model='model5' @keyup='typepass(5,model5)'>
					<input type='number' v-model='model6' @keyup='typepass(6,model6)'>
				</div>
				<div class="result">
					<p>请输入密码</p>
					<p v-if='wrongpass' style='color:red;'>密码不正确</p>
				</div>
				<div @click='gocheck' class="sure">
					确认
				</div>
			</div>
		</template>
		<template v-else>
			<div class="cover" @click="cover=false" :style="{backgroundImage: 'url(' + roomObj.cover_img_url + ')'}">
				<div class="mask_cover"></div>
				<div class="player_box">
					<img src="~assets/player.png"><h5>点击进入</h5></div>
			</div>
		</template>
	</div>

</template>

<script>
	import $ from 'jquery'
	import AdvertBox from 'plugin/advert.vue'
	import PlayerBox from 'plugin/player.vue'
	import MenuBox from 'plugin/menu.vue'
	import store from 'store'
	export default {

		name: 'room',
		data() {

			return {
				merchant:'',
				wrongpass:false,
				correctpass:'',
				tankuang:false,
				roomObj: null,
				show: false,
				cover: false,
				// 用户是否有设置观看权限
				islimit:false,
				// 密码
				password:false,
				// 付费
				pay:false,
				// 付费金额
				paymoney:'',
				model1:'',
				model2:'',
				model3:'',
				model4:'',
				model5:'',
				model6:'',
			}

		},
		components: {
			PlayerBox,
			AdvertBox,
			MenuBox
		},
		methods: {
			gopay:function(){
				var self=this
				this.$http.post('/pay/wx-pay',{
					merchant_id:this.merchant,
					trade_type:"2",
					action:"live_watch",
					money:this.paymoney,
					open_id:sessionStorage.getItem('openid'),
					room_id:this.$route.params.id
				}).then((response)=>{
					console.log('success');
					console.log(response.body);
					if(response.body.code=='100'){
						store.commit('openLoading')
						WeixinJSBridge.invoke('getBrandWCPayRequest',response.body.data,
						function(res){
							alert(res)
							store.commit('closeLoading')
							if(res.err_msg == "get_brand_wcpay_request:ok" ) {
								alert('支付成功,将返回直播间');
								self.islimit=self.pay=false
							}else{
								alert(res.err_msg)
								alert('支付失败')
							}
						})
					}else{
						alert(response.body.msg)
					}

				},(response)=>{
					console.log('error');
					console.log(response.body);
				})
			},
			getRoomInfo: function() {

				var url = 'mock=http://saas.icloudinn.com/api/v1/deals/room/' + sessionStorage.getItem('roomid')

				this.$http.get(url).then((response) => {
					console.log(response.body)
					this.roomObj = response.body.data
					document.title = this.roomObj.title
					console.log('fuddsdasdasdasdasdasd')
					console.log(this.roomObj)
					if(this.roomObj.plugin != '') {
						this.roomObj.pluginObj = JSON.parse(this.roomObj.plugin)
					}

					if(sessionStorage.getItem('cover') != '1' && this.roomObj.cover_img_url != '') {
						this.cover = true
						sessionStorage.setItem('cover', 1)
					}

					//如果不是第一次登录就直接显示，如果是第一次登录就在登录后显示
					console.log('isLogin1');
					this.show = true
					var self = this
					var obj = {
						text: self.roomObj.titel,
						load: true
					}
					store.commit('setRoom', obj)
					// 这里访问最新进入直播间接口 目的只是为了拿到heartid 为后面的心跳接口参数
					// 2017.5.23注释
					var url1='/consumers/room/'+sessionStorage.getItem('roomid')
					this.$http.get(url1,{}).then((response)=>{
						console.log(response)
						sessionStorage.setItem('heartid',response.body.data.heartid)
						this.heatbeat()
					},(response)=>{
						console.log('error')
						console.log(response)
					})
					// 这里拿到js sdk
					this.$http.post('/signature/we-chat-jssdk',{
						current_url:location.href.split('#')[0]
					}).then((response)=>{
						console.log('success');
						console.log(response.body);
						window.wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: response.body.data.appId, // 必填，公众号的唯一标识
							timestamp: response.body.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: response.body.data.nonceStr, // 必填，生成签名的随机串
							signature: response.body.data.signature,// 必填，签名，见附录1
							jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage']
						})
						window.wx.onMenuShareTimeline({
							title: this.roomObj.title, // 分享标题
							link: 'http://test.icloudinn.com/'+this.roomObj.id, // 分享链接
							imgUrl: this.roomObj.share_img_url, // 分享图标
							success: function () {
								// 用户确认分享后执行的回调函数
							},
							cancel: function () {
								// 用户取消分享后执行的回调函数
							}
						});
						window.wx.onMenuShareAppMessage({
							title:this.roomObj.title,
							desc:this.roomObj.share_intro,
							link:'http://test.icloudinn.com/'+this.roomObj.id,
							imgUrl:this.roomObj.share_img_url,
							type:'link',
							success:function(){

							},
							cancel:function(){

							}
						})
					},(response)=>{
						console.log('error');
						console.log(response.body);
					})

				}, (response) => {

					//this.$router.push('notfound')
				})
			},
			//页面加载时响应这个函数
			setRoomId: function() {
				console.log('setRoomId');
				var roomid = this.$route.params.id;
				// 房间id是字符而且与现有不相同才替换
				if(roomid !== sessionStorage.getItem('roomid') || !sessionStorage.getItem('roomid')) {
					if(isNaN(parseInt(roomid))) {
						console.log('roomid 参数为非整数')
						return
					}
					sessionStorage.setItem('roomid', roomid)
				}
			},
			//页面加载时响应这个函数
			setUsrInfo: function() {
				console.log('setUsrInfo');
				// 如果isopenlogin没有就设置成1 并且跳转微信登录路由
				if(typeof(sessionStorage.isopenLogin) == 'undefined' || sessionStorage.isopenLogin != '1') {
					//记录是否打开过微信登录页面
					sessionStorage.setItem('isopenLogin', '1')
					if(window.danteng == 0) {
						//测试
						var openidUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx59f95d5febc26d71&redirect_uri=http://test.icloudinn.com/' + sessionStorage.roomid + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
					} else {
						//正式
						var openidUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx8884a4a5b234d465&redirect_uri=http://tv.icloudinn.com/' + sessionStorage.roomid + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
					}
					location.href = openidUrl
					return false;
				}
				// 跳转为重定向 isopenlogin为1 执行这段
				if(sessionStorage.isopenLogin == '1') {
					// 第一次登录后，将登录的标记清除
					sessionStorage.setItem('isopenLogin', '0')
					// 用于用户直接在当前页面刷新 code会过期 如果sessionStorage有token就直接跳过拿token接口 直接访问getRoomInfo方法 从sessionStorage中拿取数据
					if(sessionStorage.token == null || sessionStorage.token == undefined || sessionStorage.token == '') {
						function getUrlParam(name) {
							var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)") //构造一个含有目标参数的正则表达式对象
							var r = window.location.search.substr(1).match(reg) //匹配目标参数
							if(r != null) return unescape(r[2])
							return null //返回参数值
						}
						var code = getUrlParam('code')
						this.$http.post('/deal/wxlogin', { code: code }).then((response) => {
							console.log(response.body)
							if(response.body.code != 100) {
								//this.$router.push('notfound')
								alert(JSON.stringify(response.body))
								console.log(JSON.stringify(response.body))
								return
							}
							sessionStorage.setItem('usrInfo', JSON.stringify(response.body.data))
							var result = response.body.data
							sessionStorage.setItem('token', result.accessToken)
							sessionStorage.setItem('account', result.account)
							sessionStorage.setItem('openid', result.openid)

							this.getRoomInfo()

							//修改登录的状态，但凡需要登录的操作都需要在这个后面执行
						}, (response) => {
							//this.$router.push('notfound')
						})

					} else if(sessionStorage.token != null & sessionStorage.token != undefined & sessionStorage.token != '') {
						this.getRoomInfo()
					} else {
						//this.$router.push('notfound')
					}

				}

				//

			},
			//这里是房间心跳包
			heatbeat:function(){
				// 2017.5.23注释
				this.$http.post('/consumers/heartbeat',{roomid:sessionStorage.getItem('roomid'),heartid:sessionStorage.getItem('heartid')}).then((response)=>{
					console.log('success')
					console.log(response)
				},(response)=>{
					console.log('error')
					console.log(response)
				})
			},
			// 拿到是否有用户限制
			getlimit:function(){
				this.$http.get('/deals/room/'+this.$route.params.id).then((response)=>{
					console.log('success');
					console.log(response.body);
					this.merchant=response.body.data.merchant_id
					if(response.body.data.watch_permission==3 && response.body.data.watch_pay_bill!==null){
						// 付费
						this.islimit=this.pay=true
						this.paymoney=response.body.data.watch_pay_bill
					}else if(response.body.data.watch_permission==2 && response.body.data.room_password!==null){
						this.islimit=this.password=true
						this.correctpass=response.body.data.room_password
					}else{
						this.islimit=this.pay=this.password=false
					}
				},(response)=>{
					console.log('error');
					console.log(response.body);
				})
			},
			typepass:function(num,text){
				// 是数字
				if(isNaN(text) == false){
					if(num<6){
						$('.passcontent input')[num-1].blur()
						$('.passcontent input')[num].focus()
					}
				}

			},
			gocheck:function(){
				var wholepass=this.model1+this.model2+this.model3+this.model4+this.model5+this.model6
				if(wholepass == this.correctpass){
					alert('here')
					this.wrongpass=false
					this.islimit=this.password=this.tankuang=false
				}else{
					alert('there')
					this.wrongpass=true
				}
			}
		},
		mounted() {
			this.getlimit()
			if(isNaN(this.$route.params.id)) {
				//this.$router.push('notfound')
			}
			this.setRoomId()
			//			this.getRoomInfo()
			console.log('开干吧 新地址')
			this.setUsrInfo()
			// 这里拿到微信jssdk
			// this.$http.get('/signature/we-chat-jssdk').then((response)=>{
			// 	console.log('success');
			// 	console.log(response.body);
			// },(response)=>{
			// 	console.log('error');
			// 	console.log(response.body);
			// })
			// 这里隔两分钟 心跳包一次
			var that=this
			setInterval(function(){
				that.heatbeat()
			},120000)
		}
	}
</script>

<style lang="less">
	.room {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow:hidden;
	}
	.zhehzao{
		width: 100%;
		height: 100%;
		background: black;
		filter: alpha(opacity=50);
		-moz-opacity: 0.5;
		opacity: 0.5;
		position: absolute;
		top: 0;
		z-index: 999999;
	}
	.paystyle{
		color: white;
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    background: orange;
    z-index: 999999;
	}
	.tankuang{
		position: absolute;
    top: 0;
    width: 70%;
    height: 10rem;
    border: 1px solid black;
    z-index: 999999;
    background: white;
    margin-left: 15%;
    margin-top: 50%;
	}
	.close{
		position: absolute;
    top: -1.7rem;
    right: 0;
    background: white;
    border: 1px solid black;
    height: 1.5rem;
	}
	.passcontent{
		display: flex;
	}
	.passcontent input {
    border-top: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    width: 20%;
    height: 3rem;
    text-align: center;
    font-size: 2rem;
}
.sure{
	background: orange;
    position: absolute;
    bottom: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
    width: 100%;
    text-align: center;
    color: white;
}
.result{
	display: flex;
    justify-content: space-around;
}
</style>

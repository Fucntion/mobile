<template>
	<div id="app">
		
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {

			}
		},
		methods: {
			init: function() {
				
				//url中没有room参数，就炸了
				if(location.href.indexOf('room')==-1){return}
				
				function getRoomId(){
					var hashArr =location.hash.split('/')
					var index =hashArr.indexOf('room')+1
					return hashArr.splice(index,1).toString()
				}

				//获取room参数
				var roomid = sessionStorage.getItem('roomid') || getRoomId();
				sessionStorage.setItem('roomid', roomid);
				
//				url = "/rooms"+sessionStorage.getItem('roomId');
//				this.$http.post(url, data).then((response) => {
//
//					this.$router.push('studio/' + response.body.id);
//
//				}, (response) => {
//
//				});
			}
		},
		mounted(){
			this.init()
		}
	}
</script>

<style lang="less">
	@import './assets/app.less';
</style>
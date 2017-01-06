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
				console.log('roomid is'+roomid)
				if(roomid!==sessionStorage.getItem('roomid')||!sessionStorage.getItem('roomid')){
					// console.log('old room id is'+sessionStorage.getItem('roomid'))
					if(isNaN(parseInt(roomid))){
						console.log('roomid 参数为非整数')
						return
					}
					sessionStorage.setItem('roomid', roomid)
				}
	
			},
			
		},
		mounted() {
			this.setRoomId()

		}
	}
</script>

<style lang="less">
	@import './assets/app.less';
</style>
<template>
	<div class="room" v-if="show">
		<Player-Box :room=roomObj></Player-Box>
		<Advert-Box :room=roomObj></Advert-Box>
		<Menu-Box :room=roomObj></Menu-Box>
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
			init:function(){
				var url ='/rooms/'+sessionStorage.getItem('roomid')
				this.$http.get(url).then((response)=>{
					console.log(response.body)
					this.roomObj =response.body
					this.roomObj.pluginObj =JSON.parse(this.roomObj.plugin)
					this.show =true
				},(response)=>{
					
				})
			}
		},
		mounted(){
			this.init()
		}
	}
</script>

<style lang="less">

</style>
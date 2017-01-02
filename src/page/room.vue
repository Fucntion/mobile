<template>
	<div class="room" v-if="show">
		<Player-Box :room="roomObj"></Player-Box>
		 <Advert-Box :room="roomObj"></Advert-Box> 
		<Menu-Box :room="roomObj"></Menu-Box>
		<!--<button @click="clear()" style="position:absolute;left:0;top:0;font-size: 16px;padding: 5px 10px;">双清</button>-->
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
			init:function(){
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
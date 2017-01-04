<template>
<div id="TcPlayer"></div>
</template>


<script>

	export default {

		name: 'player',
		props:['room'],
		data() {

			return {
				
			}

		},
		components: {
		
		},
		methods: {

		},
		mounted(){

			this.$nextTick(function(){
				var width = document.body.offsetWidth
				var option={
						"m3u8": this.room.hls_downstream_address||"http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8",
						"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
						"coverpic" : this.room.logo_url||"http://live.icloudinn.com/img3/logo.png",
						"width" :  width,//视频的显示宽度，请尽量使用视频分辨率宽度
						"height" : width*9/16//视频的显示高度，请尽量使用视频分辨率高度
					}
				var player = new TcPlayer('TcPlayer',option)
			})
		}
	}
</script>

<style lang="less">


</style>
<template>

	<div id="TcPlayer"><iframe id="TcPlayer_iframe" name="TcPlayer" src="./static/TcPlayer.html"  frameborder="0" scrolling="no"></iframe></div>
</template>


<script>

	export default {

		name: 'player',
		props:['room'],
		data() {

			return {
				videoOptions: {
					source: {
						type: "application/x-mpegURL",
						src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8',
						withCredentials: false
					},
					poster: "http://live.icloudinn.com/img3/logo.png",
					live: true,
					autoplay: false,
					height: 414 * 9 / 16,
					language: 'zh-cn'

				}

			}

		},
		components: {
		
		},
		methods: {

		},
		mounted(){

			document.getElementById('TcPlayer').style.height = document.body.clientWidth*9/16+'px'
			window.hls = this.room.hls_downstream_address
		}
	}
</script>

<style lang="less">


</style>
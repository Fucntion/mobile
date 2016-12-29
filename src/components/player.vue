<template>
	<video-player :options="videoOptions"></video-player>
</template>

<script>
	import { videoPlayer } from 'vue-video-player'

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
			videoPlayer
		},
		methods: {

		},
		mounted(){

			this.videoOptions.source.src =this.room.hls_downstream_address
		}
	}
</script>

<style lang="less">

</style>
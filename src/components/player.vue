<template>
<div id="TcPlayer"></div>
</template>


<script>
	import $ from 'jquery'
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
				var self =this
				var width = document.body.offsetWidth
				var liveurl=''
				var liveway=''
				var switch1=''
				document.getElementById('TcPlayer').style.height = width*9/16+'px'

				function callback(params) {
					var option={}
					self.$http.get('/deals/room/'+self.$route.params.id).then((response)=>{
						console.log('success');
						console.log(response.body);
						var id=response.body.data.video_id
						switch1=response.body.data.video_live_way
						if(id!==null){
							self.$http.get('/videos/'+id).then((response)=>{
								console.log('success');
								console.log(response.body);
								for(var a=0;a<response.body.play_set.length;a++){
									if(response.body.play_set[a].url.indexOf('mp4')!==-1){
										liveurl=response.body.play_set[a].url
									}
								}
//								liveurl=response.body.play_set[0].url
								liveway=response.body.set_live_way
								console.log('草拟吗怎么没有')
								console.log('switch='+switch1)
								console.log('liveway='+liveway)
								// 正在直播
								if(self.room.status=='1'){
									option={
											"m3u8": self.room.hls_downstream_address,
											"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
											"coverpic" : self.room.logo_url||"http://live.icloudinn.com/img3/logo.png",
											"width" :  width,//视频的显示宽度，请尽量使用视频分辨率宽度
											"height" : width*9/16,//视频的显示高度，请尽量使用视频分辨率高度
											'listener':function(msg){
												if(msg.type=='load'){
													$('.vcp-player').css('z-index','9999')
												}
											},
											"x5_type":"h5"
										}
								}else{
									if(switch1==0){
										option={
												"m3u8": self.room.hls_downstream_address,
												"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
												"coverpic" : self.room.logo_url||"http://live.icloudinn.com/img3/logo.png",
												"width" :  width,//视频的显示宽度，请尽量使用视频分辨率宽度
												"height" : width*9/16,//视频的显示高度，请尽量使用视频分辨率高度
												'listener':function(msg){
													if(msg.type=='load'){
														$('.vcp-player').css('z-index','9999')
													}
												},
												"x5_type":"h5"
											}
									}else if(switch1==1){
										if(liveway==2){
											option={
													"mp4": liveurl,
													"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
													"coverpic" : self.room.logo_url||"http://live.icloudinn.com/img3/logo.png",
													"width" :  width,//视频的显示宽度，请尽量使用视频分辨率宽度
													"height" : width*9/16,//视频的显示高度，请尽量使用视频分辨率高度
													'listener':function(msg){
														if(msg.type=='load'){
															$('.vcp-player').css('z-index','9999')
														}
													},
													"x5_type":"h5"
												}
										}else{
											option={
													"m3u8": self.room.hls_downstream_address,
													"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
													"coverpic" : self.room.logo_url||"http://live.icloudinn.com/img3/logo.png",
													"width" :  width,//视频的显示宽度，请尽量使用视频分辨率宽度
													"height" : width*9/16,//视频的显示高度，请尽量使用视频分辨率高度
													'listener':function(msg){
														if(msg.type=='load'){
															$('.vcp-player').css('z-index','9999')
														}
													},
													"x5_type":"h5"
												}
										}
									}else if(switch1==2){
										if(liveway==1){
											option={
													"mp4": liveurl,
													"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
													"coverpic" : self.room.logo_url||"http://live.icloudinn.com/img3/logo.png",
													"width" :  width,//视频的显示宽度，请尽量使用视频分辨率宽度
													"height" : width*9/16,//视频的显示高度，请尽量使用视频分辨率高度
													'listener':function(msg){
														if(msg.type=='load'){
															$('.vcp-player').css('z-index','9999')
														}
													},
													"x5_type":"h5"
												}
										}else{
											option={
													"mp4": liveurl,
													"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
													"coverpic" : self.room.logo_url||"http://live.icloudinn.com/img3/logo.png",
													"width" :  width,//视频的显示宽度，请尽量使用视频分辨率宽度
													"height" : width*9/16,//视频的显示高度，请尽量使用视频分辨率高度
													'listener':function(msg){
														if(msg.type=='load'){
															$('.vcp-player').css('z-index','9999')
														}
													},
													"x5_type":"h5"
												}
										}
									}
								}
								console.log('option是这样的');
								console.log(option);
								var player = new TcPlayer('TcPlayer',option)
							},(response)=>{
								console.log('error');
								console.log(response.body);
							})
						}else{
							option={
									"m3u8": self.room.hls_downstream_address,
									"autoplay" : false,      //iOS下safari浏览器是不开放这个能力的
									"coverpic" : self.room.logo_url||"http://live.icloudinn.com/img3/logo.png",
									"width" :  width,//视频的显示宽度，请尽量使用视频分辨率宽度
									"height" : width*9/16,//视频的显示高度，请尽量使用视频分辨率高度
									'listener':function(msg){
										if(msg.type=='load'){
											$('.vcp-player').css('z-index','9999')
										}
									},
									"x5_type":"h5"
								}
								var player = new TcPlayer('TcPlayer',option)
						}
					},(response)=>{
						console.log('error');
						console.log(response.body);
					})

				}
				var head= document.getElementsByTagName('head')[0];
				var script= document.createElement('script');
				script.type= 'text/javascript';
				script.onreadystatechange= function () {
				if (self.readyState == 'complete')
					callback();
				}
				script.onload= function(){
					callback();
				}
				script.src= '//imgcache.qq.com/open/qcloud/video/vcplayer/TcPlayer.js';
				head.appendChild(script);
			})
		}
	}
</script>

<style lang="less">
#TcPlayer{
	width: 100%;
	min-height: 200px;
}

</style>

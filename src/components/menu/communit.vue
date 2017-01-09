<template>
<div class="communit_box">
	<div class="open_Communit_Box" v-if="!isIframeLoading"><button  class="open_Communit" @click="onload()">开始聊天</button></div>
	
	<iframe v-else id="communit_iframe"  name="communit" src="./static/communit_dev.html"  frameborder="0" scrolling="no"></iframe>
</div>
</template>

<script>
	export default {
		name: 'communit',
		props:['propsMenu','room'],
		data() {

			return {
				isIframeLoading:false
			}

		},
		components: {
			
		},
		methods: {
			onload:function(){
				this.isIframeLoading =true
				sessionStorage.setItem('isCommunit',1)
			}
		},
		mounted(){
			window.channel_id =this.room.channel_id
			if(typeof(sessionStorage.getItem('isCommunit'))!='undefined'&&sessionStorage.getItem('isCommunit')=='1'){
				this.onload()
			}

		

		}
	}
</script>

<style lang="less">
.open_Communit_Box{
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
	position: absolute;
	bottom: 0;
}
.open_Communit{
	font-size: 16px;
	width: 100%;
	height: 40px;
	line-height: 40px;
	color: white;
	background: #09bb07;
	border: 0;
	border-radius: 6px;
	/*box-sizing: border-box;*/
}
</style>
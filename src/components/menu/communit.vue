<template>
<div class="communit_box">
	{{room.channel_id}}
	<iframe id="communit_iframe" name="communit" src="./static/communit_dev.html"  frameborder="0" scrolling="no"></iframe>
</div>
</template>

<script>
	export default {
		name: 'communit',
		props:['propsMenu','room'],
		data() {

			return {
				
			}

		},
		components: {
			
		},
		methods: {

		},
		mounted(){
			window.channel_id =this.room.channel_id
			window.account = JSON.parse(localStorage.getItem('usrInfo')).account
			console.log(window.account)
		}
	}
</script>

<style lang="less">

</style>
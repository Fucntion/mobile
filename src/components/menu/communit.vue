<template>
<div class="communit_box">
	<iframe id="communit_iframe" name="communit" src="./static/communit.html"  frameborder="0" scrolling="no"></iframe>
</div>
</template>

<script>
	export default {
		name: 'communit',
		props:['propsMenu'],
		data() {

			return {
				
			}

		},
		components: {
			
		},
		methods: {

		},
		mounted(){
			this.$nextTick(function () {
//					document.getElementById('communit_iframe').style.height=document.querySelector('.content_box').style.height    	
			})
		}
	}
</script>

<style lang="less">

</style>
<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {

//				this.$http
			}
		},
		methods: {
			init: function() {
				url = "/rooms"+sessionStorage.getItem('roomId');
				this.$http.post(url, data).then((response) => {

					this.$router.push('studio/' + response.body.id);

				}, (response) => {

				});
			}
		}
	}
</script>

<style lang="less">
	@import './assets/app.less';
</style>
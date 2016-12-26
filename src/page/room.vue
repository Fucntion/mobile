<template>
	<div class="room">
		<Player-Box></Player-Box>
		<Advert-Box></Advert-Box>
		<Menu-Box></Menu-Box>
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

			}

		},
		components: {
			PlayerBox,
			AdvertBox,
			MenuBox
		},
		methods: {

		}
	}
</script>

<style lang="less">

</style>
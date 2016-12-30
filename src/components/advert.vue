<template>
	<swiper :options="swiperOption" class="advertBox" v-if="advertListData.length>0">
		<swiper-slide v-for="(value,index) in advertListData" :style="{backgroundImage: 'url(' + value.pic + ')'}"></swiper-slide>
	</swiper>
</template>

<script>
	import {
		swiper,
		swiperSlide,
		swiperPlugins
	} from 'vue-awesome-swiper'
	export default {
		name: 'advert',
		props:['room'],
		data() {

			return {
				advertListData: [],
				swiperOption: {
					// 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个名字
					name: 'currentSwiper',
					// // 所有配置均为可选（同Swiper配置）
					notNextTick: true,
					autoplay: 3000
				},
			}

		},
		components: {
			swiper,
			swiperSlide,
			swiperPlugins
		},
		methods: {

		},
		mounted(){
			this.advertListData = this.room.pluginObj.advert
		}
	}
</script>

<style lang="less">

</style>
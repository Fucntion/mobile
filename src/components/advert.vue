<template>
	<swiper :options="swiperOption" class="advertBox">
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
		data() {

			return {
				advertListData: [{
					pic: 'http://static.blog.csdn.net/skin/default/images/head_bg.jpg',
					title: 'test'
				}, {
					pic: 'https://sf-sponsor.b0.upaiyun.com/2f8a9f042fcc293226964a7c3f075193.jpg',
					title: 'test'
				}, {
					pic: 'http://www.ctoutiao.com/uploads/2015/11/734b0_04f11fd9bfeb19571241aa7e6d68bc87.jpg',
					title: 'test'
				}],
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

		}
	}
</script>

<style lang="less">
.advertBox{
	height: 100px;
}
</style>
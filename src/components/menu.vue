<template>
	<div class="menuBox">
		<template v-for="(menu,index) in menuListData">
			<div :class="{active: menu.isActive}" class="menuItem" @click="isActive(index)">{{menu.title}}</div>
		</template>
	</div>
</template>

<script>
	export default {

		name: 'menu',
		data() {

			return {
				menuListData: [{
					title: '讨论区',
					type: 'communit',
					isActive:true
				}, {
					title: '特价商品',
					type: 'goods',
					isActive:false
				}, {
					title: '关于我们',
					type: 'article',
					isActive:false
				}, {
					title: '联系我们',
					type: 'article',
					isActive:false
				}]
			}

		},
		methods: {
			isActive: function(index) {
			
				var self = this;
				for(var key in self.menuListData) {
					
					if(key != index) {
						self.menuListData[key].isActive = false;
						continue;
					}
					if(self.menuListData[key].isActive==true)return;//如果已经选中就别重新设置了
					self.menuListData[key].isActive = true;

				}
			}
		}
	}
</script>

<style lang="less">
	.menuBox {
		display: flex;
		.menuItem {
			flex: 1;
			text-align: center;
			height: 44px;
			line-height: 44px;
			background: #f2f2f2;
		}
		.active{
			background: white;
		}
	}
</style>
<template>
	<div class="menuBox" v-if="menuListData.length>0">
		<template v-for="(menu,index) in menuListData">
			<div :class="{active: menu.isActive}" class="menuItem" @click="isActive(index)">{{menu.title}}</div>
		</template>
	</div>
</template>

<script>
	export default {

		name: 'menu',
		props:['room'],
		data() {

			return {
				menuListData:[]
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
		},
		mounted(){
			console.log(this.room.pluginObj.menu)
			this.menuListData = this.room.pluginObj.menu
			this.menuListData.push({
					title: '边看边聊',
					type: 'communit',
					isActive:true
				})
			
			console.log(this.menuListData)
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
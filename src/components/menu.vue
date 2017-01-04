<template>
	<div class="menuBox" v-if="menuListData.length>0">
		<div class="menuItemBox">
			<template v-for="(menu,index) in menuListData">
				<div :class="{active: menu.isActive}" class="menuItem" @click="isActive(index,menu.type)">{{menu.title}}</div>
			</template>
		</div>
		<div class="content_box" :is="curretView" :room="room" :propsMenu="propsMenu" :key="propsMenu">

		</div>
	</div>
</template>

<script>
	import Communit from './menu/communit.vue'
	import Show from './menu/show.vue'
	import Goods from './menu/goods.vue'
	export default {

		name: 'menu',
		props:['room'],
		data() {

			return {
				menuListData:[],
				curretView:''
			}

		},
		components:{
			Communit,
			Show,
			Goods
		},
		computed:{
			propsMenu:function(){

				if(this.curretView==''){return null}
				for(var k in this.menuListData){
					if(this.menuListData[k].isActive==true){
						return this.menuListData[k]
					}
				}
				
			}
		},
		methods: {

			isActive: function(index,type) {
			

				for(var key in this.menuListData) {
					
					this.menuListData[key].isActive = false
					
					if(key == index) {
						//需要在初始化的时候就加上isActive属性，不然vue检测不到运行后动态添加的属性
						this.menuListData[key].isActive = true
						this.curretView =type 
						continue;
					}
					

				}
				this.$nextTick(function () {
					this.$el.querySelector('.content_box').style.height=document.body.offsetHeight-this.$el.offsetTop-36+'px'    	
				})		
			}
		},
		mounted(){
			var tempArr =this.room.pluginObj.menu.map(function(x){ 
				x.isActive=false
				return x
			})
			this.menuListData = [{title: '边看边聊',type: 'communit',isActive:true}].concat(tempArr)
			this.curretView = 'communit'
			this.$nextTick(function () {
				//margin-top 10
				this.$el.querySelector('.content_box').style.height=document.body.offsetHeight-this.$el.offsetTop-36+'px'  	
			})

			
		}
	}
</script>

<style lang="less">
	
</style>
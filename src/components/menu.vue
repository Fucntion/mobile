<template>
	<div class="menuBox" v-if="menuListData.length>0&&isLogin" >
		<div class="menuItemBox">
			<template v-for="(item,index) in menuListData">
				<!--意味着菜单名称不能一样了哥哥-->
				<div :class="{active:item.title==menu.title}" class="menuItem" @click="isActive(index,item)">{{item.title}}</div>
			</template>
		</div>
		<div class="content_box">
			<div :is="menu.type" :room="room" :propsMenu="menu" :key="menu.title"></div>
		</div>
	</div>
</template>

<script>
	import Communit from './menu/communit.vue'
	import Show from './menu/show.vue'
	import Goods from './menu/goods.vue'
	import store from 'store'
	export default {

		name: 'menu',
		store,
		props:['room'],
		data() {

			return {
				menuListData:[],
				
			}

		},
		components:{
			Communit,
			Show,
			Goods
		},
		computed:{
			menu:function(){
				return store.getters.getMenu
			},
			isLogin:function(){
				var isLogin =localStorage.getItem('isLogin')
				console.log(isLogin)
				if(isLogin=='1'){
					return true
				}else{
					return false
				}
			}
		},
		methods: {
			isActive: function(index,itemMenuInfo) {

				store.commit('setCurrentMenu',itemMenuInfo)

				this.$nextTick(function () {
					// this.$el.querySelector('.content_box').style.height=document.body.offsetHeight-this.$el.offsetTop-36+'px'    	
				})		
			}
			// isActive: function(type) {
			// 	store.commit('setCurrentView',type)
		
				
			// 	this.$nextTick(function () {
			// 		// this.$el.querySelector('.content_box').style.height=document.body.offsetHeight-this.$el.offsetTop-36+'px'    	
			// 	})		
			// }
		},
		mounted(){
			var tempArr =this.room.pluginObj.menu.map(function(x){ 
				x.isActive=false
				return x
			})
			this.menuListData = [{title: '边看边聊',type: 'communit',isActive:true}].concat(tempArr)

			this.$nextTick(function () {
				//margin-top 10
				document.querySelector('.content_box').style.height=document.body.offsetHeight-this.$el.offsetTop-36+'px'  	
			})

			
		}
	}
</script>

<style lang="less">
	
</style>
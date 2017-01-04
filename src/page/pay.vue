<template>
<div class="goods" v-if="show">
    <div class="topbar"><i class="left" @click="$router.go(-1)" ></i></div>  
    <div class="img">
        <template v-if="goodsInfo.goodsImgs.length>0">
            <swiper :options="swiperOption" class="advertBox" v-if="advertListData.length>0">
                <swiper-slide v-for="(value,index) in advertListData" :style="{backgroundImage: 'url(' + value.pic + ')'}"></swiper-slide>
            </swiper>
        </template>
        <template v-else>
            <img :src="goodsInfo.goodsImg">
        </template>
        
    </div>
    <div class="info">
        <h3 class="name">{{goodsInfo.goodsName}}</h3>
        <div class="price">￥<span>{{goodsInfo.shopPrice}}</span></div>
        <!--<div class="clear"></div>-->
        <div class="stock-detail">
            <dl><dt>运费:免运费</dt></dl>
            <dl><dt>销量:3.6万</dt></dl>
            <dl><dt>产地:金华</dt></dl>
        </div>
    </div>
   
    <div class="more">
        <div class="detail btn" :class="{ active: isActive=='detail' }" @click="changeActive('detail')">产品详情</div>
        <div class="order btn" :class="{ active: isActive=='order' }" @click="changeActive('order')">成交订单</div>
    </div>
    <div class="bottom">
        <button class="buy" @click="isBuy=true">立即购买</button>
    </div>
    <div class="container_detail" v-show="isActive=='detail'" >
        <!--{{goodsInfo.goodsDetails.goodsDesc}}-->
        <div id="J_DivItemDesc" class="content"><img align="absmiddle" src="https://img.alicdn.com/imgextra/i4/1640165576/TB2mCNuXjzyQeBjy1zdXXaInpXa_!!1640165576.jpg"></div>
    </div>
    <div class="container_order" v-show="isActive=='order'" >
        <table>
            <tr>
                <th>用户</th>
                <th>数量</th>
                <th>购买时间</th>
            </tr>
            <tr>
                <td>用户</td>
                <td>数量</td>
                <td>购买时间</td>
            </tr>
        </table>
    </div> 
    <div class="mask" v-show="isBuy"></div>
    <div class="select_box"  v-show="isBuy">
        <div class="select_info">
            <i class="close" @click="isBuy=false"></i>
            <img :src="goodsInfo.goodsImg"> <h5 class="name">{{goodsInfo.goodsName}}</h5> <span class="price">￥{{goodsInfo.shopPrice}}</span>
        </div>

        <div class="select_number">
            <span class="tip">购买数量:</span>
            <div class="control">
                 <button ref="minus" @click="total--" class="minus"></button>
            <input type="text" v-model="total" class="total" />
             <button ref="plus" @click="total++" class="plus"></button>
          
            </div>
            
            <p class="stock">剩余{{goodsInfo.goodsStock}}件</p>
        </div>

        <button class="pay">去支付</button>
    </div>

</div>
</template>

<script>
import {
		swiper,
		swiperSlide,
		swiperPlugins
	} from 'vue-awesome-swiper'
export default {

	name: 'cover',
    watch:{
        total:function(n,o){
            
            if(n==1){
                this.$refs.minus.disabled =true
            }else{
                this.$refs.minus.disabled =false
            }

            if(n==this.goodsInfo.goodsStock){
                this.$refs.plus.disabled =true
            }else{
                this.$refs.plus.disabled =false
            }


        }
    },
	data() {

		return {
                
		}

	},
	methods: {

        init:function(){
        this.goodsInfo = JSON.parse(sessionStorage.getItem('isActiveGoodsInfo'))
        console.log(this.goodsInfo)
        this.show = true
        }
	},
    mounted(){
        this.init()
    }
}
</script>
<style lang="less">


</style>


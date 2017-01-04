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
                total:1,
                isBuy:false,
                show:false,
                isActive:'detail',
                goodsInfo:{},
				swiperOption: {
					// 如果你后续需要找到当前实例化后的swiper对象以对其进行一些操作的话，可以自定义配置一个名字
					name: 'currentSwiper',
					// // 所有配置均为可选（同Swiper配置）
					notNextTick: true,
					loop : true,
					autoplay: 5000
				},
		}

	},
	methods: {
        changeActive:function(current){
            this.isActive =current
        },
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
.mask{
    background: rgba(0,0,0,0.6);
    position: absolute;
    top: 0;
    left:0;
    right: 0;
    bottom:0;
    z-index: 3;
}
.select_box{
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 5;
    background: white;
    padding: 10px 0 0;
    box-sizing: border-box;

    .select_info{
        
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        padding:0 60px 10px 80px;
        img{
            position: absolute;
            left: 10px;
            top:0;
            width: 60px;
            border: 1px solid #e5e5e5;
        }
        h5.name{
                font-size: 16px;
                margin:0 0 5px 0;
        }
        .price{
            color:#f44;
        }
        .close{
            width: 20px;
            height: 20px;
            display: block;
            position: absolute;
            right: 10px;
            top: 0;
            background: url('~assets/close.png');
            background-size:cover;

        }
        p.stock{

        }
    }
    .select_number{
        padding: 10px;
        border-bottom: 1px solid #e5e5e5;
        /*overflow:hidden;*/
        display: flex;
        p.stock{
            flex:1;
            text-align: center;
            line-height: 29px;
            font-size:14px;
        }
        .tip{
            line-height: 29px;
            flex:1;
            
        }
        .control{
            flex:2;
            display: flex;
            .plus,.total,.minus{
                height: 29px;
                width:37px;
                display:block;
                border:0;
                box-sizing: border-box;
                background:white;
                border:1px solid #999;
            }
            .total{
                text-align: center;
                border-left: 0;
                border-right:0;
            }
            .plus,.minus{
                
                background-size: 16px 16px;
                background-position: center;
                background-repeat:no-repeat;
            }
            .plus{
                background-image: url('~assets/plus.png');
                
            }
            .minus{
                background-image: url('~assets/minus.png')
            }
        }
        
    }
    .pay{
        
    width: 100%;
    line-height: 50px;
    font-size: 16px;
    border: none;
    border-top:10px #f8f8f8 solid;
    vertical-align: top;
    background-color: #F44;
    color: #fff;
    }
}
.goods{
    background: #eee;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    .img{
        width: 100%;
     
    }
    .topbar{
        width:100%;
        z-index: 4;
        background: #1e1d22;
        height: 36px;
        .left{
            
            height: 36px;
            width:30px;
            background-image:url('~assets/left.png');
            background-size:cover;
            display:block;

        }
    }
    .info{

        padding: 10px 0 0 10px;
        border-top: 1px solid #f2f2f2;
        background-color: #fff;
        margin-bottom: 20px;

        .name{

                font-size: 16px;
                line-height: 22px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
        }
        .price{
            color: #F44;
            /*font-size: 18px;*/
            padding: 10px 0px 2px;
            text-align: left;
            span{
                font-size:18px;
            }
        }
        .clear{
            height: 1px;
            background: #999;
            opacity: 0.4;
            font-size: 12px;
            margin: 5px 0;
        }
        .stock-detail {
            line-height: 12px;
            color: #999;
            background-color: #fff;
            display: flex;
            dl{
                flex:1;
                margin:5px 0 10px;
                display: inline-block;
                font-size: 12px;
                text-align:left;
                /*border-right:1px solid #999;               */
            }
            dl:last-child{
                border: 0;
            }
        }
    }
    .more{
        display: flex;
        margin-bottom: 10px;
        .btn{
            flex:1;
            text-align:center;
            background:white;
            line-height: 40px;
        }
        .active{
                color: #F44;
                border-bottom: 1px solid #F44;
        }
        .detail{

        }
        .order{

        }
    }
    .bottom{
        width: 100%;
        position: fixed;
        bottom:0;
        button.buy{
            width:100%;
            line-height: 50px;
    font-size: 16px;
    padding: 0;
    border: none;
    vertical-align: top;
    background-color: #F44;
    color: #fff;
        }
    }
    .container_detail{
        padding:0 10px 60px;
        img{
            max-width:100%;
        }
    }
    .container_order{
        padding: 0 10px  60px;
        table{
            font-size:14px;
            width:100%;
            border-collapse:collapse;

            tr{
                th{
                    width:33%;
                }
                td{
                    width:33%;
                    text-align: center;
                    padding: 5px 0;
                }
            }

        }
    }

}

</style>


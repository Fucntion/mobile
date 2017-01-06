<template>
<div class="paybox" v-if="show">
    <div class="express">
        <div class="express-panel">
            <ul class="express-detail">
                <li class="clearfix"><span class="name">
                        收货人：汪君相
                </span><span class="tel">15607683921</span></li>
                <li class="address-detail">
                        收货地址：海南省海口市美兰区桂林洋高校区海南师范大学3507
                </li>
            </ul>
        </div>
    </div>
    <div class="order_info block">
        <img class="thumb" :src="goodsInfo.goodsImg" >
        <div class="detail">
            <div class="detail_row">
                <div class="right_col"><div class="price">{{goodsInfo.shopPrice}}</div></div>
                <div class="left_col"><span class="name">{{goodsInfo.goodsName}}</span></div>   
            </div>
            <div class="detail_row">
                <div class="right_col"><div class="number">x{{orderInfo.buyNum}}</div></div>   
            </div>
            <div class="detail_row"></div>
        </div> 
    </div>

    <div class="block-item">
        <span class="liuyan">买家留言：</span>
        <div class="input-wrapper">
            <textarea class="msg-container" placeholder="点击给商家留言"></textarea>
        </div>
    </div>
    <div class="block-item">
        <span class="heji">合计</span>
        <div class="pull_right total">￥{{total}}       
        </div>
    </div>

    <div class="block-item youhui_box">
        <span class="heji">优惠</span>
        <div class="pull_right">无       
        </div>
    </div>

    <div class="pay_bottom">
        <div class="pull_right ">
            <span class="tip">合计：</span>
            <span class="js_price">￥{{total}}.</span>
            <span class="price_sub">00</span>
            
                <button class="commit_btn" @click="getOrder()">提交订单</button>
            
        </div>

    </div>

</div>
</template>
<style lang="less">


</style>
<script>

export default {

	name: 'pay',
    watch:{
       
    },
	data() {

		return {
            goodsInfo:{},
            addrList:'',
            total:null,
            show:false,
            orderInfo:{
//                 字段名称	字段说明	类型	必填	备注
// goodsId	商品ID	string	必填	-
// buyNum	购买数量	string	必填	-
// putAddrWay	提交收货地址方式	string	必填	1：系统已存在的收货地址ID，2：新增收货地址
// addrId	收货地址ID	string	putAddrWay为1时必填	系统中存在的收货地址
// userName	收货人姓名	string	putAddrWay为2时必填	-
// phone	收货人电话	string	putAddrWay为2时必填	-
// addr	收货地址	string	putAddrWay为2时必填	-
                goodsId:null,
                buyNum:null,
                putAddrWay:null,
                addrId:null,
                userName:null,
                phone:null,
                addr:null
            }   
		}

	},
	methods: {
        getOrder:function(){
            var url = "shop=http://shop.icloudinn.com/index.php/Api/Orders/submitOrder"
                

				this.$http.post(url,this.orderInfo).then((response)=>{
                    console.log(response.body.data)
                    this.getPayConfig(response.body.data.orderId)
                    
				},(response)=>{
					alert(response.boday.msg)
				})
        },
        getPayConfig:function(orderId){
            var payurl ='shop=http://shop.icloudinn.com/index.php/Api/WxPay/wxpay',
                xhrObj = {
                    openid:localStorage.getItem('openid'),    
                    trade_type : 'JSAPI',
                    orderid : orderId
                }
                this.$http.post(payurl,xhrObj).then(function(response){
                    console.log(response.body)
                    var result = response.body.data
                    this.pay(result.prepay_id,result.time_stamp,result.nonce_str,result.sign)
                },function(response){
                    alert(response.boday.msg)
                })
        },
        pay:function(prepay_id,timeStamp,nonceStr,sign){

            WeixinJSBridge.invoke('getBrandWCPayRequest', {
                    "appId" : 'wx4a150a2811c36060',     //公众号名称，由商户传入
                    "timeStamp":timeStamp+'',         //需要string，服务器返回的是int,万洲接口有毒
                    "nonceStr" : nonceStr, //随机串
                    "package" :'prepay_id='+prepay_id,
                    "signType": 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    "paySign": sign // 支付签名
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request：ok" ) {
                        alert(res.err_msg);
                        // location.href = 'http://wx.icloudinn.com/livepay/example/success.html';
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                }
            );
        },
        init:function(){

            this.goodsInfo = JSON.parse(sessionStorage.getItem('isActiveGoodsInfo'))

            //初始化订单信息
            this.orderInfo.goodsId = this.goodsInfo.goodsId
            this.orderInfo.buyNum = sessionStorage.getItem('total')
            this.orderInfo.putAddrWay = 2 //先用2测试下
            this.orderInfo.addr ='海南省海口市美兰区桂林洋高校区海南师范大学3507'
            this.orderInfo.phone = 15607683921
            this.orderInfo.userName = '汪君相'

            this.total = parseFloat(this.orderInfo.buyNum)*parseFloat(this.goodsInfo.shopPrice)//重要
            
            // orderInfo.userName = 
            // orderInfo.phone = 
            // orderInfo.addr = 
                //收货地址
				var url = "shop=http://shop.icloudinn.com/index.php/Api/Users/getUserInfo"

				this.$http.get(url).then((response)=>{
                    var result = response.body.data

                    this.addrList = result.addrList
					this.show=true
				},(response)=>{
					
				})
            

        }
	},
    mounted(){
        this.init()
    }
}
</script>



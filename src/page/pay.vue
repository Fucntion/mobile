<template>
<div class="paybox" v-if="show">

	<div class="express" >
		<template v-if="addrList.length>0">
			<div class="empty" @click="isAddress=true">
				<ul class="express-detail">

					<li class="clearfix">
						<span class="name">
							收货人：{{defaultAddr.userName}}
                        </span>
						<span class="tel">{{defaultAddr.userPhone}}</span>
					</li>
					<li class="address-detail">
						收货地址：{{defaultAddr.address}}
					</li>
				</ul>
			</div>
		</template>
		<template v-else>
			<div class="express-panel" >
				<div class="js-logistics-content logistics-content js-self-fetch">
					<div class="">
						<div class="selffetch-panel form no-user-select border-top-0 border-bottom-0">
							<div class="clearfix block-item">
								<label>收货人：</label>
								<input class="txt txt-black ellipsis js-name" value="" placeholder="请填写收货人姓名">
							</div>
							<div class="clearfix block-item">
								<label>手机号码：</label>
								<input type="text" class="txt txt-black ellipsis js-tel" value="" placeholder="请填写收货人手机号码">
							</div>
							<div class="clearfix block-item arrow">
								<label>收货地址：</label>
								<input type="text" class="txt txt-black ellipsis js-tel" value="" placeholder="请输入收货地址">
								<!--<span class="js-address c-gray-dark">
									请输入收货地址
                                    </span>-->

							</div>

						</div>
					</div>
				</div>
			</div>
		</template>

	</div>
	<div class="order_info block">
		<img class="thumb" :src="goodsInfo.goodsImg">
		<div class="detail">
			<div class="detail_row">
				<div class="right_col">
					<div class="price">{{goodsInfo.shopPrice}}</div>
				</div>
				<div class="left_col"><span class="name">{{goodsInfo.goodsName}}</span></div>
			</div>
			<div class="detail_row">
				<div class="right_col">
					<div class="number">x{{orderInfo.buyNum}}</div>
				</div>
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


	<div class="mask" @click="isAddress=false" v-show="isAddress"></div>
	<div class="select_address_box" v-show="isAddress">
		<div class="address-ui address-list">
			<h4 class="address-title">选择收货地址</h4>
			<div class="cancel-img js-cancel" @click="isAddress=false"></div>

			<div class="js-address-container address-container block block-list border-top-0">

				<div :id="address.addressId" @click="checkAddress(address.addressId)" v-for="address in addrList" class="js-address-item block-item ">
					<div>

						<div v-if="isCheckId!=address.addressId" class="icon-check"></div>
						<div v-else class="icon-check icon-checked"></div>
						<p>
							<span class="address-name" style="margin-right: 5px;">{{address.userName}}</span>,
							<span class="address-tel">{{address.userPhone}}</span>
						</p>
						<span class="address-str address-str-sf">收货地址：{{address.address}}</span>

						<div @click.stop="editAddress(address)" class="address-opt  js-edit-address ">

							<i class="icon-circle-info"></i>

						</div>
					</div>

				</div>
			</div>
			<div class="add-address js-add-address" @click="addAddress()">
				<span class="icon-add"></span>
				<a class="" href="javascript:;">新增地址</a>
				<span class="icon-arrow-right"></span>
			</div>
		</div>
	</div>
	
	
	
	<div class="mask-full" @click="isEditAddress=false" v-show="isEditAddress"></div>
	<div class="select_address_box edit_address_box " v-show="isEditAddress">
		<div class="address-ui address-list">
			<h4 class="address-title">修改收货地址</h4>
			<div class="cancel-img js-cancel" @click="isEditAddress=false"></div>
			<div class="edit_address_container">

					<div class="edit_item">
						<label>收货人：</label> 
						<input value="" placeholder="请填写收货人姓名"  v-model="isEditAddressInfo.userName" class="txt txt-black ellipsis js-name">
					</div>
					<div class="edit_item">
						<label>手机号码：</label> 
						<input type="text" value="" v-model="isEditAddressInfo.userPhone" placeholder="请填写收货人手机号码" class="txt txt-black ellipsis js-tel">
					</div>
					<div class="edit_item">
						<label>收货地址：</label> 
						<input type="text" value="" v-model="isEditAddressInfo.address" placeholder="请输入收货地址" class="txt txt-black ellipsis js-tel">
					</div>

				</div>
				<div class="action-container">
		        <a class="js-address-save">保存</a>
		        
		            <a class="js-address-delete">删除收货地址</a>
		        
		    </div>
			
		</div>
	</div>
	
	<div class="mask-full" @click="isAddAddress=false" v-show="isAddAddress"></div>
	<div class="select_address_box edit_address_box " v-show="isAddAddress">
		<div class="address-ui address-list">
			<h4 class="address-title">新增收货地址</h4>
			<div class="cancel-img js-cancel" @click="isAddAddress=false"></div>
			<div class="edit_address_container">

					<div class="edit_item">
						<label>收货人：</label> 
						<input value="" placeholder="请填写收货人姓名"  v-model="isAddressInfo.userName" class="txt txt-black ellipsis js-name">
					</div>
					<div class="edit_item">
						<label>手机号码：</label> 
						<input type="text" value="" v-model="isAddressInfo.userPhone" placeholder="请填写收货人手机号码" class="txt txt-black ellipsis js-tel">
					</div>
					<div class="edit_item">
						<label>收货地址：</label> 
						<input type="text" value="" v-model="isAddressInfo.address" placeholder="请输入收货地址" class="txt txt-black ellipsis js-tel">
					</div>

				</div>
				<div class="action-container">
		        <a class="js-address-save">保存</a>
		        
		    </div>
			
		</div>
	</div>

</div>
</template>
<style lang="less">

</style>
<script>
	export default {

		name: 'pay',
		watch: {

		},
		data() {

			return {
				isCheckId: null, //当前选中的地址id
				isAddAddress:false,
				isAddressInfo:{
					userName:null,
					userPhone:null,
					address:null
				},
				isEditAddress:false,
				isEditAddressInfo:{},//当前编辑的地址
				isAddress: false,
				goodsInfo: {},
				addrList: [],
				defaultAddr:{},
				total: null,
				show: false,
				orderInfo: {
					goodsId: null,
					buyNum: null,
					putAddrWay: null,
					addrId: null,
					userName: null,
					phone: null,
					addr: null
				}
			}

		},
		methods: {
			addAddress:function(){
				this.isAddAddress=true
			},
			editAddress: function(item) {
				console.log(item)
				this.isEditAddress =true
				this.isEditAddressInfo =item
				
			},
			checkAddress: function(checkAddress) {
				this.isCheckId = checkAddress
				this.isAddress = false
			},
			getOrder: function() {
				var url = "shop=http://shop.icloudinn.com/index.php/Api/Orders/submitOrder"

				this.$http.post(url, this.orderInfo).then((response) => {
					console.log(response.body.data)
					this.getPayConfig(response.body.data.orderId)

				}, (response) => {
					alert(response.boday.msg)
				})
			},
			getPayConfig: function(orderId) {
				var payurl = 'shop=http://shop.icloudinn.com/index.php/Api/WxPay/wxpay',
					xhrObj = {
						openid: localStorage.getItem('openid'),
						trade_type: 'JSAPI',
						orderid: orderId
					}
				this.$http.post(payurl, xhrObj).then(function(response) {

					this.pay(response.body.data)
				}, function(response) {
					alert(response.boday.msg)
				})
			},

			pay: function(paras) {
				WeixinJSBridge.invoke('getBrandWCPayRequest',paras,
					function(res) {
						if(res.err_msg == "get_brand_wcpay_request：ok") {
							alert(res.err_msg);
							// location.href = 'http://wx.icloudinn.com/livepay/example/success.html';
						} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
					}
				);
			},
			init: function() {

				this.goodsInfo = JSON.parse(sessionStorage.getItem('isActiveGoodsInfo'))

				//初始化订单信息
				this.orderInfo.goodsId = this.goodsInfo.goodsId
				this.orderInfo.buyNum = sessionStorage.getItem('total')
				this.orderInfo.putAddrWay = 2 //先用2测试下
				this.orderInfo.addr = '海南省海口市美兰区桂林洋高校区海南师范大学3507'
				this.orderInfo.phone = 15607683921
				this.orderInfo.userName = '汪君相'

				this.total = parseFloat(this.orderInfo.buyNum) * parseFloat(this.goodsInfo.shopPrice) //重要

				// orderInfo.userName = 
				// orderInfo.phone = 
				// orderInfo.addr = 
				//收货地址
				var url = "shop=http://shop.icloudinn.com/index.php/Api/Users/getUserInfo"

				this.$http.get(url).then((response) => {
					var result = response.body.data.addrList
					this.addrList = result
					for(var k in result){

						if(result[k].isDefault=='1'){
							this.defaultAddr = result[k]
							console.log(this.defaultAddr)
							break
						}
						
					}

					// isDefault
					this.show = true
				}, (response) => {

				})

			}
		},
		mounted() {
			this.init()
		}
	}
</script>
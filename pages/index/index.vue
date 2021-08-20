<template>
	<view>
		<!-- <view class="titleNview-placing"></view> -->
		<view class="home-header pd5_15" :style="'background: '+mbgColor+';'">				
			<view class="mt10">
				<swiper class="home-swiper-banner" indicator-color="rgba(255, 255, 255, 0.3)" indicator-active-color="#FFFFFF" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
					<swiper-item v-for="(item,index) in banners" :key="index">
						<navigator :url="item.link">
						<image :src="item.src" style="border-radius: 16rpx"></image>
						</navigator>
					</swiper-item>					
				</swiper>
			</view>
		</view>
		<view class="integral-mall-main plr15" style="margin-top: 140upx;">			
			<view class="mt24" v-if="dataindex[1]">
				<view class="flex alcenter space">
					<view class="flex alcenter">
						<image style="width: 40rpx;height: 40rpx;" src="../../static/cs/vipcard_icon_integralmall01@2x.png"></image>
						<text class="ft16 ftw600 cl-main ml15">战力查询</text>
					</view>
					<!-- <navigator >
					<view class="ft14 cl-notice">更多</view>
					</navigator> -->
				</view>
				
				<view class="mt16 flex space direction wrap">
					<block v-for="(value,key) in dataindex[1]" :key="key">
					<view class="box pd16_15" style="width: 48%; position: relative;margin-top: 25rpx;" :data-index="key" @click="toHero">
						<view class="btn-mini" style="position: absolute; top: 40upx; right: 40upx; border-radius: 10upx;font-size: 18upx;width: 60upx; height: 36upx; z-index: 999;" :style="getBtnStyle">{{value.lxname}}</view>
						<image class="integral-mall-goods" mode="aspectFill" :src="value.img"></image>
						<view class="mt8 ft14 ftw600 text-center text-over cl-main">{{value.name}}</view>						
					</view>
					</block>	
			
				</view>
				
			</view>	
		
		</view>		
	</view>
</template>
<script>
	
	export default{
		data(){
			return {
				navLock:false,
				dataconfig:[],
				banners:[],
				dataindex:[],
				mbgColor:this.$mbgColor,
			}
		},
		computed:{
			
		},
		onPageScroll(e){
			if(e.scrollTop > 44){
				if(this.navLock == false){
					this.navLock = true;
					uni.setNavigationBarColor({
						frontColor:"#000000",
						backgroundColor:"#FFFFFF",
						complete:()=>{
							this.navLock = false;
						}
					});
				}
			}else{
				if(this.navLock == false){
					this.navLock = true;
					let this_=this
					uni.setNavigationBarColor({
						frontColor:"#ffffff",
						backgroundColor:this_.mbgColor,
						complete:()=>{
							this.navLock = false;
						}
					});
				}
			}
		},
		onShareAppMessage(e){
			
		},
		onShareTimeline(e){
			
		},
		onLoad(e){
			//this.getList();
		},
		onShow() {
			this.getList(1);
			let this_=this			
		},
		methods:{
			getBtnStyle(){
				let style = 'background:'+this.tempColor+';color:#ffffff;';
				style+="box-shadow: 0px "+uni.upx2px(8)+"px "+uni.upx2px(32)+"px -"+uni.upx2px(8)+"px rgba("+this.tempColorRgb.r+", "+this.tempColorRgb.g+", "+this.tempColorRgb.b+", 0.3);";
				return style;
			},
			toHero(e){
				let index = parseInt(e.currentTarget.dataset.index);
				uni.navigateTo({
					url: this.dataindex[1][index].uplink
				});
				console.log(this.dataindex[1][index].uplink);
			},
			getList(lx) {
				let this_=this
				let data = {};
				uni.request({
					url: '你的首页数据接口',
					data: data,
					success: data => {
						console.log(data.data)
						uni.setStorage({//缓存配置信息
							key: 'config',  
							data: data.data.config
						})
						this.banners=data.data.config.banner
						if(data.data.config.name){
							uni.setNavigationBarTitle({
							    title: data.data.config.name
							});
						}
						if(data.data.config.mbgColor){
							this.mbgColor=data.data.config.mbgColor
							uni.setNavigationBarColor({
								frontColor:"#ffffff",
								backgroundColor:this_.mbgColor,
								complete:()=>{
									this.navLock = false;
								}
							});
						}						
						if (data.data.total>0) {
							this.dataconfig=data.data.config
							this.dataindex[lx]=data.data.rows
						}
					},
					fail: (data, code) => {
					}
				});
			},
		},
	}
</script>
	
<style>
	.home-header{
		height: 130rpx;
		width: 100%;
		position: relative;
		border-radius: 0rpx 0rpx 48rpx 48rpx;
	}
	.home-swiper-banner{
		height: 200rpx;
		box-shadow: 0rpx 4rpx 32rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 16rpx;
		overflow: hidden;
	}
	.home-swiper-banner image{
		width: 100%;
		height: 200rpx;
	}
	.home-mendian{
		width: 100%;
		height: 84rpx;
		background:rgba(255,255,255,0.1);
		border-radius: 42rpx;
	}
	.integral-mall-header{
		position: relative;
		height: 320rpx;
	}
	.integral-mall-header .bg{
		width: 100%;
		height: 320rpx;
	}
	.integral-mall-header .main{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 320rpx;
	}
	.swiper-integral{
		height: 32rpx;
		width: 100%;
	}
	.integral-mall-main{
		position: relative;
		margin-top: -104rpx;
	}
	.integal-mall-menu{
		width: 100%;
		height: 176rpx;
		background: #FFFFFF;
		border-radius: 48rpx;
	}
	.integral-tuan-l{
		width: 240rpx;
		height: 180rpx;
		background: #f2f2f2;
		border-radius: 16rpx;
	}
	
	
	.integral-mall-coupon{
		height: 408rpx;
		width: 330rpx;
		background: #FFFFFF;
		position: relative;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.integral-mall-coupon  .top{
		padding: 32rpx 40rpx 24rpx 40rpx;
		border-bottom: 2rpx dashed #FEC675;
	}
	.integral-mall-coupon  .y-l,.integral-mall-coupon  .y-r{
		width: 20rpx;
		height: 20rpx;
		border-radius: 10rpx;
		background: #F5F6FA;
		position: absolute;
		z-index: 2;
		top: 284rpx;
	}
	.integral-mall-coupon  .y-l{
		left: -10rpx;
	}
	.integral-mall-coupon  .y-r{
		right: -10rpx;
	}
	.integral-mall-coupon   .coupon-value{
		width: 100%;
		height: 180rpx;
		position: relative;
	}
	.integral-mall-coupon  .coupon-value image{
		width: 100%;
		height: 180rpx;
	}
	.integral-mall-coupon  .coupon-value .num{
		width: 100%;
		height: 64rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
	}
	.integral-mall-goods{
		width: 100%;
		height: 200rpx;
		background: #F2F2F2;
		border-radius: 16upx;
	}
	.titleNview-placing {
		height: var(--status-bar-height);
		padding-top: 44px;
		box-sizing: content-box;
	}
	.home-main{
		width: 100%;
		position: relative;
		margin-top: -156rpx;
		padding: 0 30rpx;
	}
	

	
	
	.flex{display: flex;}
	.flex.space{justify-content: space-between;}
	.flex.alcenter{align-items: center;}
	.flex.col2{width: 50%;}
	.flex.direction{flex-direction: row;}
	.flex.wrap{flex-wrap: wrap;width: 100%;}

	
	
	.ft12{font-size: 24rpx;}
	
	.ft16{font-size: 32rpx;}
	.ft24{font-size: 48rpx;}

	
	/*字体加粗*/

	.ftw600{font-weight: 600;}
	
	.text-center{text-align: center;}
	.text-line{text-decoration:line-through;}

	
	.cl-w{color:#FFFFFF;}
	.cl-w9{color:rgba(255,255,255,0.9)}
	.cl-main{color:#2E2F33;}
	.cl-info{color:#666666;}
	.cl-notice{color:#AEB2C1;}
	.cl-orange{color:#FF6600}
	
	
	.mt2{margin-top: 4rpx;}
	.mt4{margin-top: 8rpx;}
	.mt5{margin-top: 10rpx;}
	.mt6{margin-top: 12rpx;}
	.mt8{margin-top: 16rpx;}
	.mt10{margin-top: 0rpx;}
	.mt16{margin-top: 32rpx;}
	
	.mb4{margin-bottom: 8rpx;}
	.mb5{margin-bottom: 10rpx;}
	.mb7{margin-bottom: 15rpx;}
	.mb10{margin-bottom: 20rpx;}
	.mb15{margin-bottom: 30rpx;}
	.mb16{margin-bottom: 32rpx;}
	.mb20{margin-bottom: 40rpx;}
	.mb24{margin-bottom: 48rpx;}
	.mb25{margin-bottom: 50rpx;}
	.mb30{margin-bottom: 60rpx;}
	
	.ml4{margin-left: 8rpx;}
	.ml5{margin-left: 10rpx;}
	.ml7{margin-left: 15rpx;}
	.ml10{margin-left: 20rpx;}
	.ml15{margin-left: 30rpx;}
	.ml20{margin-left: 40rpx;}
	.ml25{margin-left: 50rpx;}
	.ml30{margin-left: 60rpx;}
	.ml60{margin-left: 120rpx;}
	
	.mr5{margin-right: 10rpx;}
	.mr7{margin-right: 15rpx;}
	
	
	.mr15{margin-right: 30rpx;}
	.mr20{margin-right: 40rpx;}
	.mr25{margin-right: 50rpx;}
	.mr30{margin-right: 60rpx;}
	.mr60{margin-right: 120rpx;}
	
	/**一般PADDING需要用到的值,其他的不通用的单独设置**/
	.pt5{padding-top: 10rpx;}
	.pt10{padding-top: 20rpx;}
	.pt12{padding-top: 24rpx;}
	.pt15{padding-top: 30rpx;}
	.pt16{padding-top: 32rpx;}
	.pt18{padding-top: 36rpx;}
	.pt20{padding-top: 40rpx;}
	.pt24{padding-top: 48rpx;}
	.pt30{padding-top: 60rpx;}
	.pt32{padding-top: 64rpx;}
	.pt40{padding-top: 80rpx;}
	.pt60{padding-top: 120rpx;}
	.pt80{padding-top: 160rpx;}
	
	.pb5{padding-bottom: 10rpx;}
	.pb10{padding-bottom: 20rpx;}
	.pb12{padding-bottom: 24rpx;}
	.pb15{padding-bottom: 30rpx;}
	.pb16{padding-bottom: 32rpx;}
	.pb20{padding-bottom: 40rpx;}
	.pb24{padding-bottom: 48rpx;}
	.pb30{padding-bottom: 60rpx;}
	.pb32{padding-bottom: 64rpx;}
	
	.pd5{padding: 10rpx;}
	.pd10{padding: 20rpx;}
	.pd15{padding:30rpx;}
	.pd20{padding: 40rpx;}
	.pd30{padding: 60rpx;}
	.pd32{padding: 64rpx;}
	
	.plr5{padding:0rpx 10rpx;}
	.plr10{padding:0rpx 20rpx;}
	.plr15{padding:0rpx 30rpx;}
	.plr20{padding:0rpx 40rpx;}
	.plr30{padding: 0rpx 60rpx;}
	.plr40{padding: 0rpx 80rpx;}
	
	.pr5{padding-right: 10rpx;}
	.pr10{padding-right: 20rpx;}
	.pr15{padding-right: 30rpx;}
	.pr20{padding-right: 40rpx;}
	.pr30{padding-right: 60rpx;}
	
	.pl5{padding-left: 10rpx;}
	.pl10{padding-left: 20rpx;}
	.pl15{padding-left: 30rpx;}
	.pl20{padding-left: 40rpx;}
	.pl30{padding-left: 60rpx;}
	.pd5_15{
		padding: 10rpx 30rpx;
	}
	.pd10_15{
		padding: 20rpx 30rpx;
	}
	.pd12_10{
		padding: 24rpx 20rpx;
	}
	.pd20_15{
		padding: 40rpx 30rpx;
	}
	.pd16_15{
		padding: 32rpx 30rpx;
	}
	.pd16_20{
		padding: 32rpx 40rpx;
	}
	.pd24_15{
		padding: 48rpx 30rpx;
	}
	.pd24_20{
		padding: 48rpx 40rpx;
	}
	/*缩小*/
	.scale6{transform: scale(.6);}
	.scale8{transform: scale(.8);}
	
	/*透明度*/
	.op3{opacity: .3;}
	.op5{opacity: .5;}
	.op8{opacity: .8;}
	.op9{opacity: .9;}
	
	.picker-view{
		height: 400rpx;
	}
	.picker-view .item{
		line-height: 100rpx;
		font-size: 32rpx;
		color:#333333;
	}
	
	.box{
		width:100%;
		background:#FFFFFF;
		box-shadow:0rpx 8rpx 40rpx 0rpx rgba(0,0,0,0.04);
		border-radius:32rpx;
	}
	.box.noshadow{
		box-shadow:none;
	}
	
	.bd-line{
		height: 2rpx;
		width: 100%;
		background: #E4E6ED;
	}
	.bd-bottom{
		border-bottom: 2rpx solid rgba(230, 230, 230, 0.8);
	}
	.bd-left{
		border-left: 2rpx solid rgba(230, 230, 230, 0.8);
	}
	
	
	
	
	.form-footer-h{
		height: 140rpx;
		height: calc(140rpx + constant(safe-area-inset-bottom));
		height: calc(140rpx + env(safe-area-inset-bottom));
	}
	.form-footer{
		width: 100%;
		position: fixed;
		z-index: 10;
		left: 0;
		bottom: 0;
		background: #FFFFFF;
		box-shadow:0rpx -4rpx 16rpx 0rpx rgba(0,0,0,0.04);
	}
	.form-footer-main{
		width: 100%;
		height: 140rpx;
	}
	.form-footer-item{
		padding: 0;
		margin: 0;
		background: #FFFFFF;
		line-height: 1;
		color:#AEB2C1;
	}
	
	.btn-big,.btn-manage,.btn-mid,.btn-manage-mid,.btn-small,.btn-mini,.btn-manage-small,.btn-manage-mini{
		width: 100%;
		height: 88rpx;
		border-radius:50rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32rpx;
		font-weight: 500;
		color: #000000;
		background: #FFFFFF;
		margin: 0;
		padding: 0;
		transition: all 0.4s;
	}
	.btn-big.dis,.btn-manage.dis,.btn-mid.dis,.btn-manage-mid.dis,.btn-small.dis,.btn-mini.dis,.btn-manage-small.dis,.btn-manage-mini.dis{
		background:#F0F1F5;
		color:#AEB2C1;
	}
	
	.btn-manage,.btn-manage-mid,.btn-manage-small,.btn-manage-mini{
		background:#5E40FF;
		color:#FFFFFF;
	}
	.btn-mid,.btn-manage-mid{
		width: 300rpx;
		height: 80rpx;
		border-radius:40rpx;
		font-size: 28rpx;
	}
	.btn-manage.plan,.btn-manage-mid.plan,.btn-manage-small.plan,.btn-manage-mini.plan{
		border:2rpx solid #5E40FF;
		background: #FFFFFF;
		color:#5E40FF;
	}
	.btn-big.plan,.btn-mid.plan,.btn-small.plan,.btn-mini.plan{
		border:2rpx solid #E4E6ED;
		background: #FFFFFF;
		color:#353535;
	}
	.btn-small,.btn-mini,.btn-manage-small,.btn-manage-mini{
		width: 176rpx;
		font-size: 28rpx;
		height: 64rpx;
		border-radius: 32rpx;
	}
	.btn-mini,.btn-manage-mini{
		width: 120rpx;
	}
</style>
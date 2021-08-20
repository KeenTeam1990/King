<!--云程开源战力查询，作者唯一QQ：779259529，请某三楼，某芥子的某些人不要那么无耻，搬过去就是自己的-->
<template>
	<view>
		<ls-loading text="英雄加载中..." animation="progress"  highlight-color="#027cff" v-if="pageLoading" style="margin-top: 300rpx;"></ls-loading>
		<carousel :img-list="swiperList" url-key="url"/>
		<view class="index">
			<view class="action">
				苹果Q区英雄
			</view>
			<view class="list-box">
				<view class="lists" v-for="(item,index) in herolists" :key="index" :style="{background:tag_color[index]}" @tap="showyx"
				 :data-hero="item.yxm">
					<image class="yximg" :src="item.yxpic" mode="widthFix" lazy-load="true"></image>
					<view class="yxname">{{item.yxm}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	var t = require("../../util/utils.js"),
		e = null,
		o = null;
	import carousel from '@/components/vear-carousel/vear-carousel';
	import lsLoading from '@/components/ls-loading/ls-loading.vue';
	export default {
		components: {
			carousel,
			lsLoading
		},
		data() {
			return {
				pageLoading: true,
				herolists: [],
				tag_color: [
					'rgba(50, 144, 224, 0.6)', 'rgba(255, 170, 0, 0.6)', 'rgba(85, 255, 127, 0.6)', 'rgba(199, 21, 133, 0.6)',
					'rgba(0, 255, 247, 0.6)', 'rgba(92, 64, 51, 0.6)', 'rgba(153, 204, 51, 0.6)', 'rgba(217, 135, 25, 0.6)',
					'rgba(33, 145, 103, 0.6)', 'rgba(170, 85, 255, 0.6)',
					'rgba(36, 153, 141, 0.6)', 'rgba(0, 151, 227, 0.6)', 'rgba(255, 0, 0, 0.6)', 'rgba(85, 85, 0, 0.6)',
					'rgba(61, 170, 105, 0.6)', 'rgba(170, 81, 73, 0.6)', 'rgba(136, 0, 255, 0.6)', 'rgba(200, 255, 1, 0.6)',
					'rgba(140, 1, 145, 0.6)', 'rgba(72, 26, 255, 0.6)',
					'rgba(85, 0, 255, 0.6)', 'rgba(255, 0, 0, 0.6)', 'rgba(255, 85, 127, 0.6)', 'rgba(255, 170, 255, 0.6)',
					'rgba(255, 170, 0, 0.6)', 'rgba(92, 64, 51, 0.6)', 'rgba(0, 170, 127, 0.6)', 'rgba(85, 0, 127, 0.6)',
					'rgba(255, 85, 0, 0.6)', 'rgba(0, 255, 0, 0.6)',
					'rgba(255, 85, 0, 0.6)', 'rgba(85, 85, 0, 0.6)', 'rgba(85, 0, 0, 0.6)', 'rgba(170, 0, 255, 0.6)',
					'rgba(0, 85, 127, 0.6)', 'rgba(170, 0, 0, 0.6)', 'rgba(170, 85, 0, 0.6)', 'rgba(170, 255, 0, 0.6)',
					'rgba(255, 0, 0, 0.6)', 'rgba(203, 69, 255, 0.6)',
					'rgba(255, 0, 0, 0.6)', 'rgba(85, 170, 0, 0.6)', 'rgba(170, 255, 255, 0.6)', 'rgba(170, 0, 0, 0.6)',
					'rgba(0, 170, 255, 0.6)', 'rgba(170, 85, 127, 0.6)', 'rgba(0, 85, 127, 0.6)', 'rgba(170, 0, 127, 0.6)',
					'rgba(0, 0, 127, 0.6)', 'rgba(255, 170, 127, 0.6)',
					'rgba(170, 255, 0, 0.6)', 'rgba(255, 85, 0, 0.6)', 'rgba(0, 255, 255, 0.6)', 'rgba(0, 85, 0, 0.6)',
					'rgba(85, 255, 0, 0.6)', 'rgba(0, 170, 127, 0.6)', 'rgba(0, 85, 127, 0.6)', 'rgba(0, 0, 127, 0.6)',
					'rgba(0, 255, 0, 0.6)', 'rgba(85, 255, 255, 0.6)',
					'rgba(0, 170, 255, 0.6)', 'rgba(255, 170, 0, 0.6)', 'rgba(170, 170, 255, 0.6)', 'rgba(255, 0, 255, 0.6)',
					'rgba(170, 170, 255, 0.6)', 'rgba(0, 255, 127, 0.6)', 'rgba(170, 170, 127, 0.6)', 'rgba(170, 0, 127, 0.6)',
					'rgba(0, 0, 255, 0.6)', 'rgba(170, 0, 255, 0.6)',
					'rgba(255, 85, 127, 0.6)', 'rgba(85, 255, 0, 0.6)', 'rgba(0, 170, 255, 0.6)', 'rgba(170, 0, 127, 0.6)',
					'rgba(255, 170, 0, 0.6)', 'rgba(170, 85, 255, 0.6)', 'rgba(0, 170, 255, 0.6)', 'rgba(0, 255, 255, 0.6)',
					'rgba(170, 255, 255, 0.6)', 'rgba(85, 0, 0, 0.6)',
					'rgba(255, 170, 127, 0.6)', 'rgba(255, 255, 0, 0.6)', 'rgba(170, 85, 255, 0.6)', 'rgba(85, 0, 0, 0.6)',
					'rgba(85, 170, 0, 0.6)', 'rgba(255, 0, 0, 0.6)', 'rgba(85, 85, 0, 0.6)', 'rgba(255, 85, 0, 0.6)',
					'rgba(85, 170, 0, 0.6)', 'rgba(255, 170, 0, 0.6)',
					'rgba(0, 85, 0, 0.6)', 'rgba(85, 0, 127, 0.6)', 'rgba(0, 85, 255, 0.6)', 'rgba(85, 0, 127, 0.6)',
					'rgba(255, 85, 127, 0.6)', 'rgba(85, 255, 0, 0.6)', 'rgba(255, 255, 0, 0.6)', 'rgba(85, 0, 127, 0.6)',
					'rgba(255, 0, 127, 0.6)', 'rgba(85, 85, 127, 0.6)',
					'rgba(170, 170, 0, 0.6)', 'rgba(255, 0, 127, 0.6)', 'rgba(170, 0, 255, 0.6)', 'rgba(85, 0, 255, 0.6)',
					'rgba(85, 85, 255, 0.6)', 'rgba(255, 255, 127, 0.6)', 'rgba(85, 255, 127, 0.6)', 'rgba(255, 170, 127, 0.6)',
					'rgba(85, 170, 127, 0.6)', 'rgba(255, 85, 127, 0.6)',
					'rgba(0, 255, 255, 0.6)', 'rgba(85, 85, 127, 0.6)', 'rgba(0, 0, 255, 0.6)', 'rgba(170, 85, 0, 0.6)',
					'rgba(85, 0, 127, 0.6)', 'rgba(0, 0, 127, 0.6)', 'rgba(170, 0, 127, 0.6)', 'rgba(0, 85, 127, 0.6)',
					'rgba(0, 85, 127, 0.6)', 'rgba(0, 170, 255, 0.6)',
					'rgba(85, 170, 255, 0.6)', 'rgba(255, 85, 127, 0.6)', 'rgba(170, 255, 127, 0.6)', 'rgba(170, 170, 0, 0.6)',
					'rgba(85, 0, 255, 0.6)', 'rgba(0, 0, 255, 0.6)', 'rgba(170, 0, 255, 0.6)', 'rgba(0, 85, 255, 0.6)',
					'rgba(170, 85, 255, 0.6)', 'rgba(0, 255, 255, 0.6)',
					'rgba(255, 255, 0, 0.6)', 'rgba(85, 170, 127, 0.6)', 'rgba(0, 255, 127, 0.6)', 'rgba(0, 0, 127, 0.6)',
					'rgba(85, 0, 255, 0.6)', 'rgba(85, 0, 0, 0.6)', 'rgba(255, 0, 0, 0.6)', 'rgba(85, 85, 0, 0.6)',
					'rgba(255, 85, 0, 0.6)', 'rgba(85, 170, 0, 0.6)',
					'rgba(85, 85, 255, 0.6)', 'rgba(255, 170, 127, 0.6)', 'rgba(0, 170, 127, 0.6)', 'rgba(170, 0, 127, 0.6)',
					'rgba(255, 0, 255, 0.6)', 'rgba(85, 0, 127, 0.6)', 'rgba(255, 0, 127, 0.6)', 'rgba(85, 85, 127, 0.6)',
					'rgba(255, 85, 127, 0.6)', 'rgba(85, 170, 127, 0.6)',
					'rgba(255, 255, 127, 0.6)', 'rgba(85, 255, 127, 0.6)', 'rgba(170, 85, 127, 0.6)', 'rgba(0, 85, 127, 0.6)',
					'rgba(85, 255, 0, 0.6)', 'rgba(85, 0, 255, 0.6)', 'rgba(255, 0, 255, 0.6)', 'rgba(85, 85, 255, 0.6)',
					'rgba(255, 85, 255, 0.6)', 'rgba(85, 170, 255, 0.6)',

				],
				swiperList: [{
					url: "https://ht.diysqq.cn/5.png",
					id: 1
				}, {
					url: "https://ht.diysqq.cn/4.jpg",
					id: 2
				}, {
					url: "https://ht.diysqq.cn/3.jpg",
					id: 3
				}, {
					url: "https://ht.diysqq.cn/2.jpg",
					id: 4
				}],
			}
		},
		onLoad: function(t) {
			this.pageLoading = true;
			uni.request({
				//英雄列表接口
				url: 'https://ht.diysqq.cn/xyx.json', 
				success: (res) => {					
					setTimeout(() => {
						this.herolists = res.data;
						this.pageLoading = false;
					}, 100)
				}
			});
		},
		methods: {
			popupState(state) {
			    console.log(state);
			},
			showyx: function(e) {
				uni.showLoading({
					title:'查询中...'
				});
				var yxm = e.currentTarget.dataset.hero;
				console.log(e);
				uni.request({
					url: "https://api.28php.com/api/hero/select?hero_name=" + yxm,
					header: {
						"Content-Type": "application/json"
					},
					success: function(e) {
						console.log(e.data);
						uni.hideLoading();
						uni.showModal({
							title: '苹果Q区：' + yxm,
							content: "最低县标：" + e.data.data.ios_qq_area + "\r\n英雄战力：" + e.data.data.ios_qq_area_power + "\r\n最低市标：" + e.data.data.ios_qq_city + "\r\n英雄战力：" + e.data.data.ios_qq_city_power + "\r\n最低省标：" + e.data.data.ios_qq_province + "\r\n英雄战力：" + e.data.data.ios_qq_province_power + "\r\n更新时间：" + e.data.data.ios_qq_update_time,
							// content: '最低县标：' + e.data.area + '\r\n英雄战力：' + e.data.areaPower + '\r\n最低市标：' + e.data.city + '\r\n英雄战力：' + e.data.cityPower + '\r\n最低省标：' + e.data.prov + '\r\n英雄战力：' + e.data.provPower,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							},
						});
					},
				});
				
			},
		}
	}
</script>

<style>
	page {
		background-color: #f5f4f8;
	}

	.index {
		margin: 30rpx;
	}

	.action {
		left: 0;
		right: 0;
		margin: auto;
		position: relative;
		text-align: center;
		font-size: 20px;
		color: #007AFF;
		margin-bottom: 15px;

	}

	.action:after {
		content: '';
		position: absolute;
		bottom: -9upx;
		left: 0;
		right: 0;
		margin: auto;
		width: 170upx;
		height: 25upx;
		border-radius: 200upx;
		background: rgba(55, 110, 234, 0.5);
	}

	.list-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		width: 100%;
	}

	.lists {
		width: 18%;
		height: 180rpx;
		margin-top: 20rpx;
		border-radius: 32rpx;
		box-shadow: 0px 0px 4px rgba(161, 161, 161, 0.6);
		/* border: #d9d9d9; */
		/* box-sizing: 1px; */
		/* border-style: solid; */
	}
	
	.yxname {
		text-align: center;
		margin-bottom: 10rpx;
		color: #FFFFFF;
	}
	
	.yximg {
		width: 180rpx;
		height: 180rpx;
		border-radius: 30rpx;
		/* box-shadow: 0px 1px 2px #434343; */
		border: #747474;
		box-sizing: 1px;
		border-style: dashed;
	}
</style>

<template>
	<view class="overfor-x">
		<view class="body-list-container">
		    <image class="body-list-image" :src="img_one"></image>
		    <image class="body-list-image" :src="img_two"></image>
		</view>
		<view class="ch-preview-action">
		    <view class="ch-preview-bar">
					<view class="box">
						<button hoverClass="ch-hover" @click="imgsave()">
							<image src="/static/icons/rz.png"></image>
							<text>保存</text>
						</button>
					</view>
					<view class="box">
						<button class="btn-download btn" data-name="shareBtn" open-type="share">
							<image src="/static/icons/txrz.png"></image>
							<text>分享</text>
						</button>
					</view>
					
			</view>
		</view>
	</view>
</template>

<script>
	import downloader from '../../components/img-downloader.js';
	export default {
		data() {
			return {
				img_one: "",
				img_two: ""
			}
		},
		onLoad(e) {
			var o = e.data;
			var s = JSON.parse(o);
			console.log(s.imgone);
			this.img_one = s.imgone;
			this.img_two = s.imgtwo;
			console.log(this.img_one);
		},
		onShareAppMessage(res){
		        let that = this;
		        if (res.from === 'button') {// 来自页面内分享按钮
		                console.log(res.target)
		        }
		        return {
		                title: '情侣头像大全',
		                path: '/pages/imgd/imgd?data=' + that.data,
		                imageUrl:'你的分享图'
		        }
		                         
		},
		methods: {
			imgsave: function(){
				for(var imgs = [this.img_one, this.img_two], n = 0; n < imgs.length; n++){
					let promise = downloader.load(imgs[n],'aaaa');
					promise.then(([error, res])=>{
						console.log(error, res);
					});
				}
				uni.showToast({
					title: '下载成功',
					icon: 'none'
				})
			},			
		}
	}
</script>

<style>
	.body-list-container {
	    width: 710rpx;
	    display: flex;
	    flex-direction: row;
	    justify-content: space-between;
	    margin-top: 20rpx;
	}
	
	.body-list-image {
	    width: 344rpx;
	    height: 344rpx;
	    border-radius: 36rpx;
	}
	.overfor-x{
		    width: 100%;
		    display: flex;
		    flex-direction: column;
		    align-items: center;
	}
	button::after{ border: none;}
	
	.ch-preview-bar {
	    display: flex;
	    align-items: center;
	    height: 126rpx;		
	}
	
	.ch-preview-action.for-iphonex {
	    bottom: 68rpx;
	    z-index: 91;
		
	}
	
	.ch-preview-action.for-hidden {
	    bottom: -120rpx;
		
	}
	

	
	.ch-preview-action button {
	    flex: 1;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    flex-direction: column;
	    height: 100%;
	}
	
	.ch-preview-action button image {
	    position: relative;
	    width: 52rpx;
	    height: 52rpx;
	    display: block;
	}
		
	.ch-preview-action button text {
	    font-size: 20rpx;
	    color: #999a9b;
	    line-height: 28rpx;
	}
	.box {
	    display: inline-block;
	    width: 100%;
	    height: 90px;
	}
	.box:last-child {
	        margin-right: 0;
	}
	
	.ch-preview-action {
	    position: fixed;
		right: 0;
		left: 0;
		bottom: 0;
	    z-index: 9;
	    border-radius: 40rpx;
	    overflow: hidden;
	    box-shadow: 0px -4px 5px rgba(0,0,0,0.1);

	}
	page {
		background-color: #ffffff;
		overflow-x: hidden;
	}

</style>

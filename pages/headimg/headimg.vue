<template>
	<view class="overfor-x">
		<ad unit-id="d13207f2780526b86d515abaea7702c2"></ad>
		<view  @tap="detailAction" class="body-list-container" :data-img-one="item.img_one" :data-img-two="item.img_two" v-for="(item,index) in imglist" :key="index">
		    <image class="body-list-image":src="item.img_one"></image>
		    <image class="body-list-image" :src="item.img_two"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imglist:[]
			}
		},
		onLoad() {
			// 自定义php接口请求
			this.getProfileList();
		},
		onReachBottom() {
			this.getProfileList();
		},
		onShareAppMessage(res){
		        let that = this;
		        if (res.from === 'button') {// 来自页面内分享按钮
		                console.log(res.target)
		        }
		        return {
		                title: '情侣头像大全',
		                path: '/pages/search/search',
		                imageUrl:'你的分享图'
		        }
		                         
		},
		methods: {
			getProfileList: function(){
				var t = parseInt(80 * Math.random() + 1);
				
				uni.request({
					url:'https://elf-deco.maibaapp.com/content/wxapp/loversProfile/json/lovers-'+ t + '.json',
					success: (res) =>{
						this.imglist = this.imglist.concat(res.data.list);
					}
				})
				
			},
			detailAction(e){
				var img1 = e.currentTarget.dataset.imgOne, img2 = e.currentTarget.dataset.imgTwo, i = JSON.stringify({
				    imgone: img1,
				    imgtwo: img2
				});
				// console.log(e)
				uni.navigateTo({
					url:'/pages/imgd/imgd?data=' + i
				});
			}
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
	page {
		background-color: #F7F7F7;
		overflow-x: hidden;
	}

</style>

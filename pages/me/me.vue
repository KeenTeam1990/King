<template>
	<view class="testList">
		<!-- #ifdef MP-WEIXIN -->
		<navigator v-for="(item,index) in apps[0].vxfriend" :key="index" :app-id="item.appid" openType="navigate" target="miniProgram">
		    <view class="item">
		        <!-- <view class="icon new">都在玩</view> -->
		        <image :src="item.frimg"></image>
		        <view class="content">
		            <view class="t">{{item.appname}}</view>
		            <view class="p">{{item.appcontent}}</view>
		        </view>
		        <button>{{item.appbtn}}</button>
		    </view>
		</navigator>
		<!-- #endif -->
	    <!-- #ifdef MP-QQ -->
	    <navigator v-for="(item,index) in apps[0].qqfriend" :key="index" :app-id="item.appid" openType="navigate" target="miniProgram">
	        <view class="item">
	            <!-- <view class="icon new">都在玩</view> -->
	            <image :src="item.frimg"></image>
	            <view class="content">
	                <view class="t">{{item.appname}}</view>
	                <view class="p">{{item.appcontent}}</view>
	            </view>
	            <button>{{item.appbtn}}</button>
	        </view>
	    </navigator>
	    <!-- #endif -->
		<!-- #ifdef MP-TOUTIAO -->
		<navigator v-for="(item,index) in apps[0].ttfriend" :key="index" :app-id="item.appid" openType="navigate" target="miniProgram">
		    <view class="item">
		        <!-- <view class="icon new">都在玩</view> -->
		        <image :src="item.frimg"></image>
		        <view class="content">
		            <view class="t">{{item.appname}}</view>
		            <view class="p">{{item.appcontent}}</view>
		        </view>
		        <button>{{item.appbtn}}</button>
		    </view>
		</navigator>
		<!-- #endif -->
		<!-- #ifdef MP-BAIDU -->
		<navigator v-for="(item,index) in apps[0].bdfriend" :key="index" :app-id="item.appid" openType="navigate" target="miniProgram">
		    <view class="item">
		        <!-- <view class="icon new">都在玩</view> -->
		        <image :src="item.frimg"></image>
		        <view class="content">
		            <view class="t">{{item.appname}}</view>
		            <view class="p">{{item.appcontent}}</view>
		        </view>
		        <button>{{item.appbtn}}</button>
		    </view>
		</navigator>
		<!-- #endif -->
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				apps: "",
			}
		},
		onLoad() {
			this.appload();
		},
		onShareAppMessage(res){
		        let that = this;
		        if (res.from === 'button') {// 来自页面内分享按钮
		                console.log(res.target)
		        }
		        return {
		                title: '战力查询',
		                path: '/pages/imgd/imgd?data=' + that.data,
		                imageUrl:'你的分享图'
		        }
		                         
		},
		methods: {
			appload(){
				uni.request({
					url:'你的首页数据链接',
					success: (res) =>{
						console.log(res.data.friend[0].vxfriend);
						this.apps = res.data.friend;
					}
				})
			}
		}
	}
</script>

<style>
	.menu-btn {
	    display: none;
	}
	
	page {
	    font-size: 16px;
	    color: #fff;
	}
	
	.wap-content {
	    padding-top: 320rpx;
	    position: relative;
	    background: #151a20;
	    border-radius: 20px 20px 0 0;
	}
	
	.button,button {
	    font-size: 14px;
	    background: linear-gradient(90deg,#f00056 70%,#ef4aaf);
	    color: #fff;
	    font-weight: 700;
	    border: none;
	    border-radius: 30px;
	    padding: 0 18px;
	    line-height: 2.1;
	}
	
	button:after {
	    border: none;
	}
	
	button:active {
	    color: #fff;
	}
	
	.blod {
	    font-weight: 700;
	    display: inline;
	}
	
	.button.lock,button.lock {
	    opacity: .5;
	}
	
	.button.ok,button.ok {
	    opacity: .3;
	}
	
	button>view {
	    position: relative;
	    display: inline-block;
	    text-align: center;
	    padding-left: 26px;
	}
	
	button>view image {
	    position: absolute;
	    left: 0;
	    top: 11px;
	    width: 20px;
	    height: 20px;
	}
	
	.button.yellow,button.yellow {
	    background: #eac206!important;
	}
	
	.button.blue,button.blue {
	    background: linear-gradient(90deg,#4b5cc4 70%,#a1afc9);
	}
	
	.link {
	    text-decoration: underline;
	    display: inline;
	}
	
	.fc {
	    color: #f00056;
	}
	
	.f_12 {
	    font-size: 12px;
	}
	
	.loading {
	    padding: 25px 0;
	    text-align: center;
	}
	
	.ads {
	    padding: 10px;
	}
	
	.ads.baidu {
	    background: #fff;
	    border-radius: 5px;
	}
	
	.ads.baidu,.ads.wechat {
	    text-align: left;
	}
	
	.h1 {
	    font-size: 18px;
	    font-weight: 700;
	    margin-top: 15px;
	    padding: 10px 0;
	    text-align: center;
	}
	
	.f_desc {
	    font-size: 12px;
	    color: hsla(0,0%,100%,.3);
	}
	
	.mline {
	    border-bottom: 1px solid #eee;
	    margin: 15px 0;
	}
	
	.button.large,.button.large_line,button.large,button.large_line {
	    padding: 3px 0;
	    font-size: 16px;
	    border-radius: 30px;
	    line-height: 2.6;
	}
	
	.hover {
	    opacity: .6;
	}
	
	.center,.message {
	    text-align: center;
	}
	
	.message {
	    position: fixed;
	    font-size: 16px;
	    z-index: 999999999;
	    width: 85%;
	    left: 7.5%;
	    top: 70px;
	    font-weight: 700;
	}
	
	.message view {
	    display: block;
	    background: #3de1ad;
	    padding: 15px 20px;
	    color: #fff;
	    text-align: center;
	    border-radius: 5px;
	}
	
	.message.warning view {
	    background: hsla(0,0%,100%,.9);
	    color: #000;
	}
	
	.wapper-bg {
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    background-color: rgba(0,0,0,.7);
	    display: block;
	    z-index: 9998;
	    top: 0;
	    left: 0;
	}
	
	.dialog {
	    position: fixed;
	    z-index: 10001;
	    left: 5%;
	    top: 25%;
	    background-color: rgba(21,26,32,.9);
	    border-radius: 20px;
	    width: 90%;
	    box-shadow: 0 3px 15px 0 rgba(0,0,0,.2);
	}
	
	.dialog-close {
	    position: absolute;
	    z-index: 1001;
	    right: 5px;
	    top: 10px;
	    width: 50px;
	    height: 50px;
	    text-align: center;
	}
	
	.dialog-close image {
	    width: 16px;
	    height: 16px;
	    margin-top: 11px;
	    opacity: .5;
	}
	
	.dialog-content {
	    padding: 0 0 25px;
	    text-align: center;
	}
	
	.dialog-content .title {
	    text-align: center;
	    padding: 15px 0;
	    font-size: 18px;
	    font-weight: 700;
	}
	
	.dialog-content .title span {
	    text-align: center;
	    display: block;
	    color: rgba(0,0,0,.6);
	}
	
	.dialog.full {
	    left: 0;
	    width: 100%;
	    color: #fff;
	    bottom: 0;
	    margin-bottom: -300px;
	    top: auto;
	    height: auto;
	    opacity: 0;
	    border-radius: 15px 15px 0 0;
	}
	
	.dialog.full .f_desc {
	    color: hsla(0,0%,100%,.6);
	}
	
	.bottom-photo {
	    margin: 15px 0;
	}
	
	.line_title {
	    position: relative;
	    border-top: 1px solid hsla(0,0%,100%,.1);
	    width: 100%;
	    height: 20px;
	    margin-top: 20px;
	}
	
	.line_title view {
	    position: absolute;
	    width: 60px;
	    text-align: center;
	    left: calc(50% - 30px);
	    top: -13px;
	    background: #151a20;
	    color: hsla(0,0%,100%,.4);
	}
	
	.progress {
	    width: 90%;
	    margin-left: 5%;
	    min-height: 70px;
	}
	
	.progress .progress_bg {
	    display: block;
	    height: 6px;
	    border-radius: 5px;
	    background: #151a20;
	}
	
	.progress .progress_bg view {
	    display: block;
	    border-radius: 6px;
	    height: 6px;
	    background: #eac206;
	    width: 5%;
	}
	
	.progress.max {
	    position: relative;
	    width: 70%;
	    margin-left: 15%;
	    display: block;
	    min-height: 80px;
	    margin-top: 30px;
	}
	
	.progress.max .t {
	    margin-bottom: 5px;
	    font-style: italic;
	    text-align: center;
	    color: hsla(0,0%,100%,.3);
	}
	
	.progress.max .progress_bg {
	    position: relative;
	    height: 10px;
	    background: #262a30;
	}
	
	.progress.max .progress_bg view {
	    height: 10px;
	    left: 1%;
	    background: linear-gradient(90deg,#fd2f5a 70%,#ff95b5);
	}
	
	.progress.max .progress_bg .bg1 {
	    position: absolute;
	    top: 0;
	    left: 0;
	}
	
	.progress.max .progress_bg .value {
	    bottom: -32px;
	    left: 0;
	    position: absolute;
	    width: 60px;
	    height: 24px;
	    line-height: 24px;
	    background: #f00056;
	    margin-top: 10px;
	    margin-left: -30px;
	    color: #fff;
	    text-align: center;
	    font-size: 14px;
	    border-radius: 5px;
	    font-weight: 700;
	}
	
	.progress.max .progress_bg .value::before {
	    content: "";
	    width: 0;
	    height: 0;
	    position: absolute;
	    top: -16px;
	    left: 21px;
	    border: 8px solid transparent;
	    border-bottom-color: #f00056;
	}
	
	.icon,.load {
	    width: 24px;
	    height: 24px;
	}
	
	.footer {
	    text-align: center;
	    padding: 15px 0;
	    font-size: 12px;
	    color: hsla(0,0%,100%,.4);
	    line-height: 22px;
	}
	
	.footer .b {
	    display: inline-block;
	    font-weight: 700;
	}
	
	.menu-btn {
	    position: fixed;
	    left: 5px;
	    top: 20px;
	    z-index: 20001;
	}
	
	.menu-btn .icon {
	    width: 50px;
	    height: 50px;
	    text-align: center;
	}
	
	.menu-btn image {
	    width: 16px;
	    height: 16px;
	    margin-top: 15px;
	}
	
	.testList {
	    padding: 20px;
	}
	
	.testList .item {
	    position: relative;
	    background: #202430;
	    margin-bottom: 15px;
	    border-radius: 10px;
	}
	
	.testList .item image {
	    width: 100%;
	    height: 160px;
	    background: #000;
	    border-radius: 10px 10px 0 0;
	}
	
	.testList .item .content {
	    padding: 10px 10px 15px;
	    text-align: left;
	}
	
	.testList .item .content .p {
	    margin-top: 5px;
	    display: block;
	    color: hsla(0,0%,100%,.4);
	    padding-right: 80px;
	    font-size: 12px;
	}
	
	.testList .item button {
	    position: absolute;
	    top: 180px;
	    right: 10px;
	}
	
	.testList .item .icon {
	    position: absolute;
	    top: 0;
	    left: 0;
	    padding: 3px 10px;
	    min-width: 40px;
	    display: inline-block;
	    white-space: nowrap;
	    text-align: center;
	    font-size: 14px;
	    background: #ffa400;
	    font-weight: 700;
	    color: #fff;
	    border-radius: 10px 0 10px 0;
	}
	
	.testList .item .icon.hot {
	    background: #ff461f;
	}
	
	.testList .item .icon.success {
	    background: #21a675;
	}
	
	.list-load {
	    text-align: center;
	}
	
	.list-load image {
	    opacity: .4;
	    width: 24px;
	    height: 24px;
	}
	
	.share-content {
	    text-align: center;
	}
	
	.share-content .content {
	    display: inline-block;
	    width: 200px;
	    font-size: 12px;
	    border: 2px solid rgba(0,0,0,.5);
	    border-radius: 5px;
	    padding: 10px;
	    margin: 5px 15px;
	    text-align: left;
	    background: hsla(0,0%,100%,.2);
	}
	
	.share-content .content image {
	    width: 100%;
	    margin-top: 5px;
	}
</style>

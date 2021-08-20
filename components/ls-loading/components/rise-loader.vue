<template>
	<view class="">
		<view class="rise-loader" ref="wrapper">
			<text class="_text-bold" :style="{ color: highlightColor, fontSize: fontSize + 'rpx' }">{{ text }}</text>
			<view class="rise-under" :style="{ color: underColor }" ref="riseUnder">
				<text class="_text-bold" :style="{ color: underColor, fontSize: fontSize + 'rpx' }">{{ text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
// ls-loading组件内置动画效果组件: 模拟水位上涨动画效果
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
const dom = weex.requireModule('dom');
// #endif
let sit;
export default {
	name: 'rise-loader',
	props: {
		// 加载中的文字
		text: {
			type: String,
			default: '正在加载'
		},
		// 加载中文字大小
		fontSize: {
			type: [String, Number],
			default: 58
		},
		// 底层颜色
		underColor: {
			type: String,
			default: '#e8e7e8'
		},
		// 高亮部分颜色
		highlightColor: {
			type: String,
			default: '#00bfff'
		}
	},
	mounted() {
		// #ifdef APP-NVUE
		// 加个延时，保证一定可以获取到文字容器的高度
		setTimeout(() => {
			this.createAnimation();
		}, 100)
		// #endif
	},
	destroyed() {
		clearInterval(sit);
	},
	methods: {
		createAnimation() {
			// 获取文字容器高度
			const result = dom.getComponentRect(this.$refs.wrapper, option => {
				const height = option.size.height + 'px';
				this.waterLevelReset(height);
				this.executeAnimation(height);
			});
		},
		executeAnimation(height) {
			let timer = 0;
			clearInterval(sit);
			sit = setInterval(() => {
				if (timer == 3) {
					this.waterLevelReset(height);
					timer = 0;
				} else {
					if (timer == 0) {
						this.waterLevelRise();
					}
					timer++;
				}
			}, 1000);
		},
		// 水位重置
		waterLevelReset(height) {
			animation.transition(this.$refs.riseUnder, {
				styles: {
					height,
				},
				duration: 0, //ms
				timingFunction: 'linear',
				needLayout: false,
				delay: 0 //ms
			});
		},
		// 水位上升动画
		waterLevelRise() {
			animation.transition(this.$refs.riseUnder, {
				styles: {
					height: '0px'
				},
				duration: 3000, //ms
				timingFunction: 'linear',
				needLayout: false,
				delay: 0 //ms
			});
		}
	}
};
</script>

<style scoped>
.rise-loader {
	position: relative;
	flex: 1;
}

.rise-under {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 100%;
	overflow: hidden;
	/* #ifndef APP-NVUE */
	animation-name: riseloader;
	animation-delay: 0.5s;
	animation-timing-function: linear;
	animation-duration: 3s;
	animation-iteration-count: infinite;
	/* #endif */
}

._text-bold {
	font-weight: 700;
}

/* #ifndef APP-NVUE */
@keyframes riseloader {
	0% {
		height: 100%;
	}
	100% {
		height: 0%;
	}
}
/* #endif */
</style>

<template>
	<view class="">
		<view class="progress-loader" ref="wrapper">
			<text class="_text-bold" :style="{ color: underColor, fontSize: fontSize + 'rpx' }">{{ text }}</text>
			<view class="progress-under" :class="{'progress-hidden': initting}" :style="{ color: highlightColor }" ref="progressUnder">
				<text class="_text-bold" :style="{ color: highlightColor, fontSize: fontSize + 'rpx' }">{{ text }}</text>
			</view>
		</view>
	</view>
</template>

<script>
// ls-loading组件内置动画效果组件: 模拟进度条动画效果
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
const dom = weex.requireModule('dom');
// #endif
let sit;
export default {
	name: 'progress-loader',
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
	data() {
		return {
			// 容器初始化
			// nvue初始化时，容器需要有宽度。 为了保证文字最初显示底色，初始化时给高亮色部分先隐藏
			initting: true
		}
	},
	mounted() {
		// #ifdef APP-NVUE
		// 加个延时，保证一定可以获取到文字容器的宽度
		setTimeout(() => {
			this.createAnimation();
		}, 10);
		// #endif
		// #ifndef APP-NVUE
		this.initting = false;
		// #endif
	},
	destroyed() {
		clearInterval(sit);
	},
	methods: {
		createAnimation() {
			// 获取文字容器宽度
			const result = dom.getComponentRect(this.$refs.wrapper, option => {
				const width = option.size.width + 'px';
				this.levelReset();
				// 初始化完毕，显示高亮文字
				setTimeout(() => {
					this.initting = false;
				}, 10);
				this.executeAnimation(width);
			});
		},
		executeAnimation(width) {
			this.progressLeval(width);
			let timer = 0;
			clearInterval(sit);
			sit = setInterval(() => {
				if (timer == 3) {
					this.levelReset();
					timer = 0;
				} else {
					if (timer == 0) {
						this.progressLeval(width);
					}
					timer++;
				}
			}, 1000);
		},
		// 进度重置
		levelReset(width = '0px') {
			animation.transition(this.$refs.progressUnder, {
				styles: {
					width,
				},
				duration: 0, //ms
				timingFunction: 'linear',
				needLayout: false,
				delay: 0 //ms
			});
		},
		// 进度动画
		progressLeval(width) {
			animation.transition(this.$refs.progressUnder, {
				styles: {
					width
				},
				duration: 10, //ms
				timingFunction: 'linear',
				needLayout: false,
				delay: 0 //ms
			});
		}
	}
};
</script>

<style scoped>
.progress-loader {
	position: relative;
	flex: 1;
}

.progress-under {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	overflow: hidden;
	/* #ifdef APP-NVUE */
	lines: 1;
	width: 750rpx;
	/* #endif */
	/* #ifndef APP-NVUE */
	width: 0;
	white-space: nowrap;
	animation-name: progressloader;
	animation-delay: 0.1s;
	animation-timing-function: linear;
	animation-duration: 0.8s;
	animation-iteration-count: infinite;
	/* #endif */
}

._text-bold {
	font-weight: 700;
	lines: 1;
}

.progress-hidden {
	opacity: 0;
}

/* #ifndef APP-NVUE */
@keyframes progressloader {
	0% {
		width: 0%;
	}
	100% {
		width: 100%;
	}
}
/* #endif */
</style>

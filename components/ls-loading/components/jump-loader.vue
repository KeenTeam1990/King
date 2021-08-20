<template>
	<view class="text-container">
		<view class="wave-wrapper">
			<view class="wave-text-box" ref="waveBox">
				<text class="wave-text" :style="{ fontSize: fontSize + 'rpx', color: color }">{{ text }}</text>
			</view>
			<!-- #ifndef APP-NVUE -->
			<view class="wave-pallet" ref="wavePallet"></view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
// ls-loading组件内置动画效果组件: 文字跳动动画组件
// #ifdef APP-NVUE
const animation = weex.requireModule('animation');
// #endif
let sit;
export default {
	name: 'jump-loader',
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
		color: {
			type: String,
			default: '#c7c6c7'
		}
	},
	mounted() {
		setTimeout(() => {
			// #ifdef APP-NVUE
			this.createAnimation();
			// #endif
		}, 100);
	},
	destroyed() {
		clearInterval(sit);
	},
	methods: {
		createAnimation() {
			let textTransform = 'translateY(0)';
			let flag = true;
			this.executeTextAnimation('translateY(-90%)');
			clearInterval(sit);
			sit = setInterval(() => {
				textTransform = flag ? 'translateY(0)' : 'translateY(-90%)';
				this.executeTextAnimation(textTransform);
				flag = !flag;
			}, 1000);
		},
		// 文字动画
		executeTextAnimation(transform) {
			animation.transition(this.$refs.waveBox, {
				styles: {
					transform
				},
				duration: 1000, //ms
				timingFunction: 'ease-in-out',
				needLayout: false,
				delay: 0 //ms
			});
		},
	}
};
</script>

<style>
.text-container {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
}

.wave-wrapper {
	position: relative;
	/* #ifndef APP-NVUE */
	display: flex;
	overflow: visible;
	/* #endif */
	/* #ifdef APP-NVUE */
	height: 50vh;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex: 1;
	width: 750rpx;
	/* #endif */
}

.wave-text-box {
	/* #ifndef APP-NVUE */
	animation: text 1s ease-out infinite alternate;
	/* #endif */
}

.wave-text {
	font-weight: 700;
}

.wave-pallet {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 20rpx;
	background-color: rgba(207, 206, 207, 0.45);
	border-radius: 50%;
	/* #ifndef APP-NVUE */
	filter: blur(2px);
	animation: pallet 1s ease-out infinite alternate;
	/* #endif */
}

/* #ifndef APP-NVUE */
@keyframes text {
	0% {
		transform: translateY(0) scale(1.08, 0.98);
	}
	100% {
		transform: translateY(-90%);
	}
}

@keyframes pallet {
	0% {
		transform: scale(0.4);
	}
	100% {
		transform: scale(1);
	}
}
/* #endif */
</style>

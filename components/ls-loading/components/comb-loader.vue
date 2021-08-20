<template>
	<view class="text-container">
		<!-- #ifdef APP-NVUE -->
		<text ref="text" class="loading-text" :class="animationClass" v-for="(item, index) in texts" :key="index" :style="{'font-size': fontSize + 'rpx'}">{{item}}</text>
		<!-- #endif -->
		<!-- #ifdef APP-VUE || H5 -->
		<text ref="text" class="loading-text" :class="animationClass" v-for="(item, index) in texts" :key="index" :style="{'animation-delay': 102.631578 * (index + 1) + 'ms', 'font-size': fontSize + 'rpx'}" v-html="item"></text>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<block v-for="(item, index) in texts" :key="index">
			<text v-if="item == '&nbsp;'" :style="{width: spaceSize + 'rpx'}"></text>
			<text ref="text" class="loading-text" :class="animationClass" :style="{'animation-delay': 102.631578 * (index + 1) + 'ms', 'font-size': fontSize + 'rpx'}" v-else>{{item}}</text>
		</block>
		<!-- #endif -->
	</view>
</template>

<script>
	// ls-loading组件内置动画效果组件: 组合类型动画组件
	// #ifdef APP-NVUE
	const animation = weex.requireModule('animation');
	// #endif
	let sit;
	export default {
		name: 'comb-loader',
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
			// 动画类型 twinkle文字闪烁 focus文字聚焦
			animationType: {
				type: String,
				default: "twinkle"
			}
		},
		computed: {
			texts() {
				// #ifdef APP-NVUE
				return this.text.split('');
				// #endif
				
				// #ifndef APP-NVUE
				return this.text.split('').map(item => {
					return item.replace(/\s/g, '&nbsp;');
				});
				// #endif
			},
			spaceSize() {
				return this.fontSize / 2;
			},
			animationClass() {
				if (this.animationType == 'twinkle') {
					return 'text-animation-twinkle'
				}
				if (this.animationType == 'focus') {
					return 'text-animation-focus'
				}
			}
		},
		mounted() {
			setTimeout(() => {
				// #ifdef APP-NVUE
				switch (this.animationType) {
					case 'twinkle':
						this.createAnimation1();
						break;
					case 'focus':
						this.createAnimation2();
						break;
					default:
						this.createAnimation1();
				}
				// #endif
			}, 40);
		},
		destroyed() {
			clearInterval(sit);
		},
		methods: {
			// 动画1 twinkle 文字依次闪烁
			createAnimation1() {
				const refs = this.$refs.text;
				const gap = 1200 / this.texts.length;
				const duration = 66 * this.texts.length;
				let flag = true;
				let style;
				// 定时器执行前，先执行一次，让整个过程更流畅
				setTimeout(() => {
					for (let i = 0, length = refs.length; i < length; i++) {
						this.executeAnimation(refs[i], gap * (i + 1), {opacity: 1});
					}
				}, 100);
				clearInterval(sit);
				sit = setInterval(() => {
					style = flag ? {opacity: 1} : {opacity: 0.3};
					for (let i = 0, length = refs.length; i < length; i++) {
						this.executeAnimation(refs[i], gap * (i + 1), style);
					}
					flag = !flag;
				}, duration);
			},
			// 动画2 focus 文字依次放大
			createAnimation2() {
				const refs = this.$refs.text;
				const gap = 2300 / refs.length;
				const duration = 80 * refs.length;
				let flag = true;
				let style;
				// 定时器执行前，先执行一次，让整个过程更流畅
				setTimeout(() => {
					for (let i = 0, length = refs.length; i < length; i++) {
						this.executeAnimation(refs[i], gap * (i + 1), {transform: 'scale(1.3)'});
					}
				}, 100);
				clearInterval(sit);
				sit = setInterval(() => {
					style = flag ? {transform: 'scale(1.3)'} : {transform: 'scale(1)'};
					for (let i = 0, length = refs.length; i < length; i++) {
						this.executeAnimation(refs[i], gap * (i + 1), style);
					}
					flag = !flag;
				}, duration);
			},
			// 执行动画
			executeAnimation(ref, delay, styles) {
				animation.transition(ref, {
					styles,
					duration: 600, //ms  
					timingFunction: 'ease-in-out',
					needLayout: false,
					delay: delay //ms  
				});
			}
		}
	}
</script>

<style>
	.loading-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		z-index: 997;
		background-color: #FFFFFF;
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	
	.loading-wrapper-embed {
		flex: 1;
		position: relative;
		margin-top: 0;
		margin-right: 0;
		margin-bottom: 0;
		margin-left: 0;
		text-align: center;
		background-color: transparent;
		z-index: 1;
	}
	
	.text-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	
	
	.loading-text {
		font-weight: 700;
		/* #ifdef APP-NVUE */
		color: #c2c1c2;
		opacity: 0.3;
		/* #endif */
		/* #ifndef APP-NVUE */
		opacity: 1;
		color: #e8e7e8;
		animation-iteration-count: infinite;
		/* #endif */
	}
	
	.text-animation-twinkle {
		/* #ifndef APP-NVUE */
		animation-timing-function: ease-in-out;
		animation-duration: 2.6s;
		animation-name: twinkle;
		/* #endif */
	}
	
	.text-animation-focus {
		margin-left: 2rpx;
		margin-right: 2rpx;
		/* #ifndef APP-NVUE */
		animation-timing-function: linear;
		animation-duration: 1.6s;
		animation-name: focus;
		/* #endif */
	}
	
	/* #ifndef APP-NVUE */
	@keyframes twinkle {
		0%,100% {
			color: #c3c3c3;
		}
	
		20% {
			color: #e8e7e8;
		}
	}
	
	@keyframes focus {
		0%,100% {
			transform: scale(1);
		}
	
		20% {
			transform: scale(1.3);
		}
	}
	/* #endif */
</style>

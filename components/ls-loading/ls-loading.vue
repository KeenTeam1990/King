<template>
	<view
		class="loading-wrapper"
		:class="{ 'loading-wrapper-embed': embed }"
		:style="{ top: topSize, bottom: bottomSize }"
		hover-stop-propagation
		@tap.stop.prevent="defThouch"
		@touchmove.stop.prevent="defMove"
	> 
		<!-- 文字闪烁动画类型 twinkle-->
		<comb-loader :text="text" :font-size="fontSize" animation-type="twinkle" v-if="animation == 'twinkle'" />
		<!-- 文字聚焦动画类型 focus -->
		<comb-loader :text="text" :font-size="fontSize" animation-type="focus" v-else-if="animation == 'focus'" />
		<!-- 模拟水位上涨画类型 rise-loader -->
		<rise-loader :text="text" :font-size="fontSize" :under-color="underColor" :highlight-color="highlightColor" v-else-if="animation == 'rise'" />
		<!-- 水平进度加载动画类型 progress -->
		<progress-loader :text="text" :font-size="fontSize" :under-color="underColor" :highlight-color="highlightColor" v-else-if="animation == 'progress'" />
		<!-- 文字跳动动画类型 -->
		<jump-loader :text="text" :font-size="fontSize" v-else-if="animation == 'jump'"/>
	</view>
</template>

<script>
/**
 * ls-loading 页面加载等待loading
 * 插件地址：https://ext.dcloud.net.cn/plugin?id=3497
 * @description 通常用于页面数据需要异步加载时，为避免出现数据加载完毕之前页面上出现空数据的尴尬情况，显示loading层作为页面载入过渡
 * @tutorial lsl
 * @property {Boolean} nav 是否预留出标题栏的高度,通常在自定义导航栏页面中需要设置为true （默认：false）
 * @property {Boolean} tab 是否预留出tabBar的高度,通常在自定义tabBar的页面中需要设置为true （默认：false）
 * @property {Boolean} embed 是否为嵌入模式 （默认：false）
 * @property {String} text 加载中的文字 （默认：正在加载）
 * @property {String|Number} fontSize 加载中文字大小 （默认：58, 单位rpx）
 * @property {String} animation 动画类型 twinkle|focus|rise|jump|progress 详见uniapp插件市场说明
 * @property {String} underColor 底层文字颜色 仅在animation为 jump|rise|progress下有效
 * @property {String} highlightColor 高亮文字颜色 仅在animation为rise|progress下有效
 * @example <ls-loading v-if="pageLoading"></ls-loading>
 */

import combLoader from './components/comb-loader.vue';
import riseLoader from './components/rise-loader.vue';
import progressLoader from './components/progress-loader.vue';
import jumpLoader from './components/jump-loader.vue';
export default {
	name: 'ls-loading',
	components: { combLoader, riseLoader, progressLoader, jumpLoader },
	props: {
		// 是否预留出标题栏的高度
		nav: {
			type: Boolean,
			default: false
		},
		// 是否预留出tabBar的高度
		tab: {
			type: Boolean,
			default: false
		},
		// 加载中的文字
		text: {
			type: String,
			default: '正在加载'
		},
		// embed 是否为嵌入模式
		embed: {
			type: Boolean,
			default: false
		},
		// 加载中文字大小
		fontSize: {
			type: [String, Number],
			default: 58
		},
		// 动画类型 twinkle|focus|rise|jump|progress
		animation: {
			type: String,
			default: 'twinkle'
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
			topSize: ''
		};
	},
	computed: {
		bottomSize() {
			return this.tab ? '50px' : '0';
		}
	},
	created() {
		setTimeout(() => {
			const res = uni.getSystemInfoSync();
			this.topSize = this.nav ? `${res.statusBarHeight + 44}px` : `0px`;
		}, 1);
	},
	methods: {
		defThouch(e) {
			// 阻止点击穿透
			// #ifdef APP-NVUE
			e.stopPropagation();
			// #endif
		},
		defMove(e) {
			// 阻止滚动穿透
			// #ifdef APP-NVUE
			e.stopPropagation();
			// #endif
		}
	}
};
</script>

<style scoped>
.loading-wrapper {
	position: fixed;
	left: 0;
	right: 0;
	z-index: 997;
	background-color: #ffffff;
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
</style>

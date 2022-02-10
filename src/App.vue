<template>
	<div id="app" v-cloak>
		<router-view/>
	</div>
</template>

<script>
	//主题切换控制
	let theme = {
		'0': 'classic.css', //蓝白
        '1': 'black.css', //黑白
        '7': 'red.css', //红色 移动云
        '4': 'isentia.css', //慕亚
        '5': 'ydzx.css', //一点资讯
		'8': 'edu.css', //教育版
		'6': 'greencloud.css', //绿盟云
		'UnicomProject':'unicomproject.css',     //數言輿情
        
	};
	export default {
		name: 'App',
		created() {
	    	let _this = this;
			if(_this.$store.state.kuTempLate == 'comold') {
				require('@/styles/theme/'+theme[_this.$store.state.kuTempLateType]);
			}else if(_this.$store.state.kuTempLate == 'UnicomProject'){
				require('@/styles/theme/'+theme[_this.$store.state.kuTempLate]);
			}
		}
	}
</script>

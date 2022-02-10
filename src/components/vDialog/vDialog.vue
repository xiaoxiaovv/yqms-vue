<template>
	<div class="dialog">
		<div class="dialog_container">
			<div class="dialog_title"><span>{{title}}</span><span class="dialog_close" @click="triggerCloseDialog"></span></div>
			<slot/>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'vDiglog',
		props: {
			title: '',
		},
		data() {
			return {

			}
		},
		methods: {
			triggerCloseDialog() {
				//触发关闭自定义头部弹框
				this.$emit('clickCloseDialog');
			}
		},
		mounted() {

		},
		watch: {

		},
	}
</script>
<style scoped>
	@import url("./vDialog.css");
</style>
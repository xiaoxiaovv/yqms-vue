<template>
	<div class="commom_dialog_box" v-show="showDialog" @click.stop="">
		<div class="batch_Infoexport_wary success_wary" id="eventDetect">
			<div class="batch_header" style="border:none;">
				<span class="dialog_message">提示</span>
				<span class="dialog_mask_close" @click="closeMask">×</span>
			</div>
			<!-- <img src="__PUBLIC__/images/comold/dayTips.png"> -->
			<p>正在生成导出任务，可在右侧悬浮栏<i></i>查看任务进度</p>
			<div class="gotoBtn">
				<a href="javascript:void(0);" class="gotoCheck" @click="confirmBtn">去查看</a>
				<a href="javascript:void(0);" class="laterCheck" @click="closeBtn">稍后查看</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'allexportDiglog',
		props: {
			showDialog: {
	            type: Boolean,
	            default: false
	        },
		},
		data() {
			return {

			}
		},
		computed: {
			style() {
				let style = {};
				if (this.width) {
					style.width = this.width;
				}
				return style;
			}
	    },
		methods: {
			closeMask(){
				this.$emit('handleCloseMask');
			},
			confirmBtn(){
				this.$emit('handleConfirm');
			},
			closeBtn(){
				this.$emit('handleCancel');
			}
		},
		mounted() {

		}
	}
</script>
<style scoped>
	@import url("./allexportDialog.css");
</style>
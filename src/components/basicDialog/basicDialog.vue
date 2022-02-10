<template>
	<div class="dialog" v-show="showBasicDialog">
		<div class="dialog_container" :style="style">
			<div class="dialog_title_box">
				<h1 class="dialog_title">{{title}}</h1>
				<span class="dialog_close" @click="triggerCloseDialog">&times;</span>
			</div>
			<slot/>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'basicDiglog',
		props: {
			showBasicDialog: {
	            type: Boolean,
	            default: false
	        },
	        title: {
	            type: String,
	            default: ''
	        },
	        width: {
	            type: String,
	            default: '50%'
	        }
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
			triggerCloseDialog() {
				//触发关闭自定义头部弹框
				this.$emit('clickCloseBasicDialog');
			}
		},
		mounted() {

		}
	}
</script>
<style scoped>
	@import url("./basicDialog.css");
</style>
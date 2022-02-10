<template>
	<div class="judgment_bind_box border_box" v-show="$store.state.kuweixin == 1">
		<div class="bind_box border_box">
			<span class="bind_txt">绑定微信公众号，立享微信推送服务。</span>
			<span class="bind_btn" @click.stop="bind">立即绑定</span>
		</div>
		<common-dialog :showDialog="showDialog" width="310px"
			:showConfirmBtn="false"
			:showCancleBtn="false"
	        @handleCloseMask="handleCloseMask"
	        @click.stop="">
	        <div class="judgment_bind_content">
	            <div class="qr_code_box">
	            	<img :src="imgurl" />
	            </div>
	            <p class="qr_txt">扫描二维码，立享推送服务</p>
	        </div>
	    </common-dialog>
	</div>
</template>
<script>

	import commonDialog from '@/components/commonDialog/commonDialog.vue'

	import { submitApply , getQrcode } from '@/api/judgment'

	export default {
		name: 'judgmentBind',
		data() {
			return {
				showDialog: false,  //是否显示弹窗
				imgurl: '',         //二维码链接地址
			}
		},
		components: {
			commonDialog
		},
		methods: {
			handleCloseMask(){
				this.showDialog = false;
			},
			// 立即绑定
            bind(){
            	let params = {
                    userid  : this.$store.state.ZHXGUSERID
                }
                // 获取二维码
                getQrcode(params).then(res =>{
                    if(res.data.status == 0){
                       this.imgurl = res.data.result.data;
                       this.showDialog = true;
                    }else{
                    	this.$message({
                            message: '获取二维码失败,请重新操作！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'error'
                        });
                        this.showDialog = false;
                    }
                }).catch(err => {
                    console.log(err, '请求失败！');
                });
                this.$emit('handleBodyClick');
            },
		},
		beforeMount() {
			
		},
		mounted() {
		},
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./immediateBinding.css");
</style>
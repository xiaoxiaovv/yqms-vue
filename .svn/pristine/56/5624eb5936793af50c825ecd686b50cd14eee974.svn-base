<template>
	<div class="judgment_tips_box">
		<div v-if="time > 0 && time <= 3">
			<div class="judgment_tips_item  border_box" v-show="isshow">
				<span class="expire_icon"></span>
				<span class="expire_text"> 您的舆情研判服务还有{{time}}天到期，到期后数据将停止更新，请尽快联系客服处理。</span>
				<span class="expire_close" @click.stop="applyclose"></span>
			</div>
		</div>
		<div v-else-if="time <= 0">
			<div class="judgment_tips_item  border_box" v-show="isshow">
				<span class="expire_icon"></span>
				<span class="expire_text">{{judgmentTips}}</span>
				<span class="expire_text2" v-if="judgmentstatus == 0">处理中</span>
				<span class="expire_renew" @click.stop="applyRenew" v-else>申请恢复</span>
				<span class="expire_close" @click.stop="applyclose"></span>
			</div>
		</div>
		<!-- 试用申请弹窗 -->
        <apply-dialog :showDialog="showApplyDialog" title="开通申请" :who="who" :tel="tel"
            @handleConfirm="handleApplyConfirm" @handleCancel="handleCloseMask" 
            @handleCloseMask="handleCloseMask">
        </apply-dialog>
	</div>
</template>
<script>
	
	import applyDialog from '@/views/judgment/components/applyDialog/applyDialog.vue'

	let moment = require("moment");
	import { submitApply } from '@/api/judgment'

	export default {
		name: 'judgmentTips',
		data() {
			return {
				time: 0,           //到期时间
				who: '',           //用户名
				tel: '',           //用户电话
				isshow: true,
		        judgmentTips: '您的舆情研判服务已到期，数据已停止更新。',          //到期提示信息
		        showApplyDialog: false,     //是否显示试用申请弹窗
		        judgmentstatus: '',          //申请状态 0未审核 1通过 2未通过'
			}
		},
		components: {
			applyDialog
		},
		methods: {
			applyRenew(){
                this.who = this.$store.state.judgment.who;
                this.tel = this.$store.state.judgment.tel;
				this.showApplyDialog = true;
				this.$emit('handleBodyClick');
			},
			handleCloseMask(){
                this.showApplyDialog = false;
            },
            handleApplyConfirm(uname,tel){
            	this.showApplyDialog = false;
            	let params = {
                    uid : this.$store.state.ZHXGUSERID,
                    who : uname,
                    tel : tel
                }
                // 申请开通
                submitApply(params).then(res =>{
                    if(res.data.status == 0){
                        /*
                            code值：
                            -1  已开通舆情研判服务
                            -2  申请审批中，请勿重复提交
                            0  申请失败
                            1 申请成功
                        */
                        let code = res.data.result.data.code;
                        if(code == 0){
                            this.$message({
                                message: '申请失败！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
                                type: 'error'
                            });
                        }else if(code == 1){
                            this.$message({
                                message: '申请成功！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
                                type: 'success'
                            });
                            // 处理中
                            this.judgmentstatus = 0;
                            this.$store.state.judgment.examinetype = 0;
                        }else if(code == -1){
                        	
                        }else if(code == -2){
                            this.$message({
                                message: '申请审批中，请勿重复提交!',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
                                type: 'warning'
                            });
                        }
                    }else{
                    	this.$message({
                            message: '申请失败！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'error'
                        });
                    }
                }).catch(err => {
                    console.log(err, '请求失败！');
                });
            },
			applyclose(){
				this.isshow = false;
				this.$emit('handleBodyClick');
			},
			//计算两个日期天数差的函数，通用
			dateDiff(endtime) {
				//valueOf 获取的值毫秒数
			    let nowtime = moment().valueOf();
			    let lastime = moment(endtime,'YYYYMMDD').valueOf();
			    let subtime = (lastime - nowtime);
			    let days = Math.ceil(subtime / (24 * 3600 * 1000));
			    return days;
			}
		},
		beforeMount() {
			this.time = this.dateDiff(this.$store.state.judgment.endtime) + 1;
			this.who = this.$store.state.judgment.who;
			this.tel = this.$store.state.judgment.tel;
			// judgmentstatus  '审核状态 0未审核 1通过 2未通过'
			this.judgmentstatus = this.$store.state.judgment.examinetype;
		},
		mounted() {
		},
        watch:{
            '$store.state.judgment.examinetype': {
                handler(val,oldVal){
                    this.judgmentstatus = val;
                },
                deep: true
            }
        }
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./tips.css");
</style>

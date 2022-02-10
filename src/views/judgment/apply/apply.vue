<template>
	<div class="wrap">
		<!--头部开始-->
        <yqms-header ref="header" funName="舆情研判" :showCompilemask="showCompilemask" :showHomepageCustom="showHomepageCustom"></yqms-header>
        <div class="judgment_center">
        	<div class="judgment_apply_box">
                <div class="apply_top">
                    <div>
                        <h1>舆情研判服务</h1>
                        <p>
                          舆情研判是基于互联网舆情监测平台，结合专家团队对重点信息进行研判服务、预警分级，通过专业的定位分析，提供处置研判参考建议,提升用户舆情应对能力，及时有效的化解舆情危机。</p>
                        <a href="#" @click.stop="showApply">立即开通</a>
                    </div>
                </div>
                <div class="apply_centre clearfix">
                    <p>服务介绍</p>
                    <ul>
                        <li>
                            <i></i>
                            <p class="p1">敏感信息精准推送</p>
                            <p class="p2">舆情信息进行二次人工审核，研判监测，发现重大舆情线索或负面报道，根据区域客户、报送内容、需求进行信息推送第一时间点对点精准推送。</p>
                        </li>
                        <li>
                            <i></i>
                            <p class="p1">及时、高效服务模式</p>
                            <p class="p2">5*8 7*24小时服务时间段，全面检测分析重点舆情信息。</p>
                        </li>
                        <li>
                            <i></i>
                            <p class="p1">多渠道服务模式</p>
                            <p class="p2">采用微信公众号、舆情秘书PC、APP等多形式进行舆情推送服务。</p>
                        </li>
                        <li>
                            <i></i>
                            <p class="p1">专业化服务团队</p>
                            <p class="p2">新闻、传播、新媒体、社会学专业舆情分析审核团队的专业服务。</p>
                        </li>
                    </ul>
                </div>
                <div class="apply_bottom">
                    <div>
                        <a href="#" @click.stop="showApply">立即开通</a>
                    </div>
                </div>
            </div>
        </div>
        <!--底部开始-->
        <yqms-footer></yqms-footer>
        <!--底部结束-->
        <!-- 试用申请弹窗 -->
        <apply-dialog :showDialog="showApplyDialog" title="开通申请" :who="who" :tel="tel"
            @handleConfirm="handleApplyConfirm" @handleCancel="handleCloseMask" 
            @handleCloseMask="handleCloseMask">
        </apply-dialog>
	</div>
</template>
<script>
	import yqmsHeader from '@/components/header/header.vue'
    import yqmsFooter from '@/components/footer/yqmsFooter.vue'
    import applyDialog from '@/views/judgment/components/applyDialog/applyDialog.vue'
    
    import { submitApply } from '@/api/judgment'

    export default {
		name: 'judgmentapply',
		data() {
			return {
				showCompilemask: false,    //是否显示首页自定义,显示时，所有模块的删除按钮显示
				showHomepageCustom: false, //是否显示首页自定义文本
                showApplyDialog: false,     //是否显示试用申请弹窗
                who: '',           //用户名
                tel: '',           //用户电话
			}
		},
		components: {
			yqmsHeader,
			yqmsFooter,
			applyDialog
		},
		methods: {
            showApply(){
                this.showApplyDialog = true;
            },
            handleCloseMask(){
                this.showApplyDialog = false;
            },
            //确定
            handleApplyConfirm(uname,tel){
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
                            this.showApplyDialog = false;
                        }else if(code == 1){
                            this.$message({
                                message: '申请成功！',
                                customClass: 'common_tips_style',
                                center: true,  //文字水平居中
                                type: 'success'
                            });
                            this.showApplyDialog = false;
                            this.$router.replace({path: 'judgmentwait'});
                        }else if(code == -1){
                            this.$router.replace({path: 'judgmentlist'});
                        }else if(code == -2){
                            this.$message({
                                message: '申请审批中，请勿重复提交!',
                                customClass: 'common_tips_style',
                                center: true,  //文字水平居中
                                type: 'warning'
                            });
                            this.showApplyDialog = false;   
                            this.$router.replace({path: 'judgmentwait'});
                        }
                    }else{
                        this.showApplyDialog = false;
                    }
                }).catch(err => {
                    console.log(err, '请求失败！');
                });
            },
		},
		mounted() {
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./apply.css");
</style>

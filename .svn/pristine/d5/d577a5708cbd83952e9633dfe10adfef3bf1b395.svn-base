<template>
	<div class="wrap">
		<!--头部开始-->
        <yqms-header ref="header" funName="舆情研判" :showCompilemask="showCompilemask" :showHomepageCustom="showHomepageCustom"></yqms-header>
        <div class="judgment_center">
            <!-- 使用申请等待页面 -->
            <div class="apply_loading_box border_box">
            	<loading ></loading>
            </div>
        </div>
        <!--底部开始-->
        <yqms-footer></yqms-footer>
        <!--底部结束-->
	</div>
</template>
<script>
	import yqmsHeader from '@/components/header/header.vue'
    import yqmsFooter from '@/components/footer/yqmsFooter.vue'

    import { getJudgedInfo } from '@/api/judgment'

    export default {
		name: 'judgmentloading',
		data() {
			return {
				showCompilemask: false,    //是否显示首页自定义,显示时，所有模块的删除按钮显示
				showHomepageCustom: false, //是否显示首页自定义文本
                endtime: '',       //截止时间
			}
		},
		components: {
			yqmsHeader,
			yqmsFooter,
		},
		methods: {
            //获取研判模块基本信息
            getUserInfo(){
                let params = {
                    userId : this.$store.state.ZHXGUSERID
                }
                getJudgedInfo(params).then(res =>{
                    if(res.data.status == 0){
                        /*  code 值意思
                            0 没有申请过
                            1 开通人工预警
                            2 申请过    examinetype  '审核状态 0未审核 1通过 2未通过'
                        */
                        let code = res.data.result.data.code;
                        if(code == 0){
                            this.$router.replace({path: 'judgmentapply'});
                        }else if(code == 1){
                            this.endtime = res.data.result.data.endtime;
                            let who = res.data.result.data.who;
                            let tel = res.data.result.data.tel;
                            localStorage.setItem('endtime', this.endtime);
                            localStorage.setItem('who', who);
                            localStorage.setItem('tel', tel);
                            // 列表页处理中
                            let examinetype = res.data.result.data.examinetype;
                            localStorage.setItem('judgmentstatus', examinetype);
                            this.$router.replace({path: 'judgmentlist'});
                        }else if(code == 2){
                            this.endtime = res.data.result.data.endtime;
                            let who = res.data.result.data.who;
                            let tel = res.data.result.data.tel;
                            localStorage.setItem('endtime', this.endtime);
                            localStorage.setItem('who', who);
                            localStorage.setItem('tel', tel);
                            let examinetype = res.data.result.data.examinetype || 0;
                            if(examinetype == 0){
                                this.$router.replace({path: 'judgmentwait'});
                            }else if(examinetype == 1){
                                this.$router.replace({path: 'judgmentlist'});
                            }else if(examinetype == 2){
                                this.$router.replace({path: 'judgmentapply'});
                            }
                        }
                    }
                }).catch(err => {
                    console.log(err, '请求失败！');
                });
            },
		},
		mounted() {
            // this.getUserInfo();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./loading.css");
</style>

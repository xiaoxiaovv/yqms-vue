<template>
	<div class="wrap">
		<!--头部开始-->
        <yqms-header ref="header" funName="舆情研判" :showCompilemask="showCompilemask" :showHomepageCustom="showHomepageCustom"></yqms-header>
        <div class="judgment_center border_box">
            <!-- 使用申请等待页面 -->
            <div class="apply_wait_box border_box">
                <div class="img_box border_box">
                    <img src="../../../assets/images/judgment/classic/apply_wait.png" />
                </div>
                <p class="wait_text">您的申请信息已提交，我们将尽快处理。</p>
                <p class="wait_tel">客服电话：400 - 052 - 1288(周一至周五24小时服务)</p>
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

    export default {
		name: 'judgmentapply',
		data() {
			return {
				showCompilemask: false,    //是否显示首页自定义,显示时，所有模块的删除按钮显示
				showHomepageCustom: false, //是否显示首页自定义文本
			}
		},
		components: {
			yqmsHeader,
			yqmsFooter,
		},
		methods: {
            
		},
		mounted() {
            
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./wait.css");
</style>

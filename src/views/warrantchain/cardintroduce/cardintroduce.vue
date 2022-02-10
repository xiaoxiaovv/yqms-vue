<template>
    <div class="wrap">
    <!--头部开始-->
    <yqms-header ref="header" funName="" :showCompilemask="showCompilemask"></yqms-header>
    <!--头部结束-->
    <!--内容开始-->
    <div>
        <div class="card_box_1">
            <div class="flex_column card_page_content card_box_center">
                <p class="text_1">司法取证服务介绍</p>
                <p class="text_2">提供电子证据、司法鉴定服务一站式解决方案，全部服务在线化，一站式存证、取证、出证模式，解决传统手段成本高、效率低的困局。确保存证、取证、出证更便捷。</p>
                <el-button type="primary" class='button_size' @click='openApply'>申请开通</el-button>
            </div>
        </div>
        <div class="card_box_2">
            <p class="card_title">服务介绍</p>
            <div class="flex_between card_page_content">
                <div class="introduce_box">
                    <div class="introduce_img introduce_img_1"></div>
                    <p class="introduce_text-1">司法鉴定+互联网+区块链首次结合</p>
                    <p class="introduce_text-2">采用区块链技术，数据加密、安全云存，确保电子证据完整可信、不被篡改。</p>
                </div>
                <div class="introduce_box">
                    <div class="introduce_img introduce_img_2"></div>
                    <p class="introduce_text-1">提供电子证据一站式解决方案</p>
                    <p class="introduce_text-2">全部服务在线化，一站式存证、取证、出证模式，解决传统手段成本高、效率低的困局。确保存证、取证、出证便捷。</p>
                </div>
                <div class="introduce_box">
                    <div class="introduce_img introduce_img_3"></div>
                    <p class="introduce_text-1">提升电子证据司法采信度</p>
                    <p class="introduce_text-2">平台支持在线、快速、自动化出具电子证书，无缝对接司法区块链各节点，可信第三方存证、取证、出证，确保电子证据证明效力，化解自证证据证明力弱难题，确保数据易被司法采信
                    </p>
                </div>
                <div class="introduce_box">
                    <div class="introduce_img introduce_img_4"></div>
                    <p class="introduce_text-1">整合传统业务，提供增值服务</p>
                    <p class="introduce_text-2">整合具有《司法鉴定许可证》的司法鉴定所和有丰富行业经验的律师事务所的服务，为用户提供司法鉴定+法律维权的增值服务。</p>
                </div>
            </div>
        </div>
        <div class="card_box_3">
            <p class="card_title">服务流程</p>
            <div class="card_box_3_bgimage"></div>
        </div>
        <div class="card_box_4">
            <p class="card_title">合作资质</p>
            <div class="card_box_4_bgimage"></div>
        </div>
        <div class="card_box_5">
            <p class="card_title">证书预览</p>
            <div class="flex_between card_box_5_bgimage">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
    <!--内容结束-->
    <!--底部开始-->
    <yqms-footer></yqms-footer>
    <!--底部结束-->
    <!--推送预警弹窗开始-->
    <yqms-pushwaring></yqms-pushwaring>
    <!--推送预警弹窗结束-->
</div>
</template>
<script>
    import yqmsHeader from '@/components/header/header.vue'
    import yqmsFooter from '@/components/footer/yqmsFooter.vue'
    import yqmsSidebar from '@/components/sidebar/sidebar.vue'
    import yqmsPushwaring from '@/components/pushWaring/pushWaring.vue'
    import { openForApply } from '@/api/warrantchain'
    export default {
    data(){
        return{
            showCompilemask: false,//首页自定义按钮不显示
        }
    },
    components: {
            yqmsHeader,
            yqmsFooter,
            yqmsSidebar,
            yqmsPushwaring,
    },
    created() {
            
    },
    beforeMount() {
       
    },
    mounted() {

    },
    methods:{
        openApply() {
            let _this = this;
            //申请开通
            openForApply().then(function(res) {
                // 请求回调 成功
                _this.$alert('您的申请已提交，客服人员会尽快与您联系。', '提示', {
                  confirmButtonText: '确定',
                });
            }).catch(function(res) {
                // 请求回调 失败
                _this.$alert('服务器没有响应,请稍后再试', '提示', {
                  confirmButtonText: '确定',
                });
            })
        },
        
    },
    
}
</script>
<style scoped>
  @import url("./cardintroduce.css");
</style>
<template>
    <div class="judged_dialog_box" v-show="showDialog">
        <div class="judged_dialog_content">
            <div class="judged_content_box">
                <slot/>
            </div>
            <div class="judged_btns_box">
                <div v-if="showConfirmBtn" class="judged_btn save_btn" @click="confirmBtn">{{confirmText}}</div>
                <div v-if="showCancleBtn" class="judged_btn cancle_btn" @click="closeBtn">{{cancelText}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	name: 'judgedDialog',
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        //是否显示确定按钮
        showConfirmBtn: {
            type: Boolean,
            default: true
        },
        //是否显示取消按钮
        showCancleBtn: {
            type: Boolean,
            default: true
        },
    },
    data(){
        return{
            showMask: false,
        }
    },
    methods:{
        confirmBtn(){
            this.$emit('handleConfirm');
        },
        closeBtn(){
            this.$emit('handleCancel');
        }
    },
    mounted(){
    },
}
</script>
<style scoped>
  @import url("./judgedDialog.css");
</style>
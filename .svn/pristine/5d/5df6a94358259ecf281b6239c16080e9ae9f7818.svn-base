<template>
    <div class="commom_dialog_box" v-show="showDialog" @click.stop="">
        <div class="commom_dialog_content" :style="{width: width}">
    		<div class="commom_dialog_title_box">
                <h1 class="commom_dialog_title" v-if="title.length > 0">{{title}}</h1>
                <span class="commom_dialog_close" @click="closeMask"></span>
            </div>
            <div class="commom_content">
                <slot/>
            </div>
            <div class="commom_btns_box">
                <div v-if="showConfirmBtn" class="commom_btn save_btn" @click="confirmBtn">{{confirmText}}</div>
                <div v-if="showCancleBtn" class="commom_btn cancle_btn" @click="closeBtn">{{cancelText}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	name: 'commonDialog',
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
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
        width: {
            type: String,
            default: '600px'
        },
        /*height: {
            type: String,
            default: '200px'
        }*/
    },
    data(){
        return{
            
        }
    },
    methods:{
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
    mounted(){
    },
}
</script>
<style scoped>
  @import url("./commonDialog.css");
</style>
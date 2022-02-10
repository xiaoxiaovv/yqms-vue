<template>
    <div class="dialog_box" v-show="showDialog">
        <div class="dialog_content">
    		<div class="dialog_title_box">
                <h1 class="dialog_title" v-if="title.length > 0">{{title}}</h1>
                <span class="dialog_close" @click="closeMask">&times</span>
            </div>
            <div class="content">
                <slot/>
            </div>
            <div class="btns_box">
                <div v-if="showConfirmBtn" class="btn save_btn" @click="confirmBtn">{{confirmText}}</div>
                <div v-if="showCancleBtn" class="btn cancle_btn" @click="closeBtn">{{cancelText}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
	name: 'newDialog',
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
            default: false
        },
        //是否显示取消按钮
        showCancleBtn: {
            type: Boolean,
            default: false
        },
    },
    data(){
        return{
            showMask: false,
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
  @import url("./newDialog.css");
</style>
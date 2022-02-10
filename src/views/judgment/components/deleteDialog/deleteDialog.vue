<template>
    <common-dialog :title="title" :showDialog="showDialog" width="360px"
        @handleConfirm="handleConfirm" 
        @handleCancel="handleCancel" 
        @handleCloseMask="handleCloseMask"
        @click.stop="">
        <div class="judgment_delete_content">
            <p class="txt_1">删除信息</p>
            <p class="txt_2">确定删除信息？</p>
        </div>
    </common-dialog>
</template>
<script>

import commonDialog from '@/components/commonDialog/commonDialog.vue'

export default {
	name: 'deleteDialog',
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
    },
    data(){
        return{
        }
    },
    components: {
        commonDialog,
    },
    methods:{
        handleCloseMask(){
            this.$emit('handleCloseMask');
        },
        handleConfirm(){
            this.$emit('handleConfirm');
        },
        handleCancel(){
            this.$emit('handleCancel');
        }
    },
    mounted(){
    },
}
</script>
<style scoped>
  @import url("./deleteDialog.css");
</style>
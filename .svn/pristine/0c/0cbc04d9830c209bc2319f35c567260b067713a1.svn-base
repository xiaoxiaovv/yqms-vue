<template>
    <common-dialog :title="title" :showDialog="showDialog" width="600px"
        @handleConfirm="handleConfirm" 
        @handleCancel="handleCancel" 
        @handleCloseMask="handleCloseMask"
        @click.stop="">
        <div class="judgment_apply_content border_box">
            <div class="item_box border_box item_01">
                <input type="text" name="uname" v-model="uname" placeholder="请输入联系人" class="border_box" />
            </div>
            <div class="err_box" v-show="err.err1.isshow">{{err.err1.text}}</div>
            <div class="item_box border_box">
                <input type="text" name="mobile" v-model="mobile" placeholder="请输入电话" class="border_box" />
            </div>
            <div class="err_box" v-show="err.err2.isshow">{{err.err2.text}}</div>
        </div>
    </common-dialog>
</template>
<script>

import commonDialog from '@/components/commonDialog/commonDialog.vue'

export default {
	name: 'applyDialog',
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        who: {
            type: String,
            default: ''
        },
        tel: {
            type: String,
            default: ''
        },
    },
    data(){
        return{
            uname: '',  //联系人
            mobile: '', //电话
            err: {      //错误提示信息
                err1: {
                    isshow: false,
                    text: '联系人不能为空'
                },
                err2: {
                    isshow: false,
                    text: '电话不能为空'
                },
            }
        }
    },
    components: {
        commonDialog,
    },
    methods:{
        handleCloseMask(){
            this.uname = '';
            this.mobile = '';
            this.err.err1.isshow = false;
            this.err.err2.isshow = false;
            this.$emit('handleCloseMask');
        },
        handleConfirm(){
            // 验证联系人
            this.uname = this.uname.trim();
            if(this.uname.length == 0){
                this.err.err1.isshow = true;
                this.err.err1.text = '联系人不能为空';
                return false;
            }else{
                this.err.err1.isshow = false;
            }

            // 验证手机号
            this.mobile = this.mobile.trim();
            // 固定电话 区号+座机号码+分机号码 （3-4位区号，7-8位直播号码，1－4位分机号）
            let isReg = /((^1(3|4|5|6|7|8|9)\d{9}$)|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;

            if(this.mobile.length == 0){
                this.err.err2.isshow = true;
                this.err.err2.text = '电话不能为空';
                return false;
            }else if(!isReg.test(this.mobile)){
                this.err.err2.isshow = true;
                this.err.err2.text = '请输入正确的电话号码';
                return false;
            }else {
                this.err.err2.isshow = false;
                this.err.err2.text = '';
            }

            if(!this.err.err1.isshow && !this.err.err2.isshow){
                this.$emit('handleConfirm',this.uname,this.mobile);
            }
        },
        handleCancel(){
            this.uname = '';
            this.mobile = '';
            this.err.err1.isshow = false;
            this.err.err2.isshow = false;
            this.$emit('handleCancel');
        }
    },
    beforeMount() {
       /* if(this.who == null){
            this.who = '';
        }
        if(this.tel == null){
            this.tel = '';
        }*/
        // this.uname = (this.who == null) ? '' : this.who;
        // this.mobile = (this.tel == null) ? '' : this.tel;
        this.uname = this.who;
        this.mobile = this.tel;
    },
    mounted(){
    },
}
</script>
<style scoped>
  @import url("./applyDialog.css");
</style>
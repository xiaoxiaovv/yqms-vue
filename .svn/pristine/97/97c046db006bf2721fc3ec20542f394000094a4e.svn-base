<template>
    <common-dialog :title="title" :showDialog="showDialog" width="600px"
        @handleConfirm="handleConfirm" 
        @handleCancel="handleCancel" 
        @handleCloseMask="handleCloseMask"
        @click.stop="">
        <div class="judgment_report_content">
            <div class="judgment_report_reason_box border_box">
                <textarea v-model="reportReason" class="judgment_report_reason border_box" placeholder="请输入上报原因"></textarea>
            </div>
            <div class="err_box" v-show="errTips.err1.isShow">{{errTips.err1.text}}</div>
            <div class="judgment_report_checkbox_box border_box">
                <!-- 添加暂时不做 -->
                <div class="add_email_box item_vertical border_box hide">
                    <span class="receive_title">接收邮箱</span>
                    <span class="add_txt">添加</span>
                </div>
                <div class="border_box">
                    <input type="text" name="search_email" class="search_email border_box" placeholder="搜索邮箱"/>
                </div>
                <div class="report_check border_box">
                    <div class="select_box border_box">
                        <el-checkbox  v-model="checkAllReport" @change="handleCheckAllChange">全选</el-checkbox>
                        <label>
                            <span class="select_txt" @click.stop="handleReverse" v-if="checkedEmials.length > 0">反选</span>
                            <span class="select_txt unclick" v-else>反选</span>
                        </label>
                    </div>
                    <div class="select_list_box">
                        <vue-scroll :ops="ops">
                            <el-checkbox-group v-model="checkedEmials" @change="handleCheckedEmialsChange">
                                <el-checkbox v-for="(email,i) in emails" :label="email" :key="i">
                                    <div class="item_vertical border_box">
                                        <span class="black_txt border_box">{{email.KM_NAME}}&nbsp;&nbsp;{{email.KM_EMAIL}}</span>
                                        <!-- 修改/删除暂时不做 -->
                                        <div class="ops_box hide">
                                            <span class="blue_txt">修改</span>
                                            <span class="red_txt">删除</span>
                                        </div>
                                    </div>
                                </el-checkbox>
                            </el-checkbox-group>
                        </vue-scroll>
                    </div>
                </div>
            </div>
            <div class="judgment_report_manual_box border_box">
                <input v-model="manualEmail" type="text" name="email" class="manual_email border_box" placeholder="请手动输入邮箱"/>
            </div>
            <div class="err_box err2_box" v-show="errTips.err2.isShow">{{errTips.err2.text}}</div>
        </div>
    </common-dialog>
</template>
<script>

import commonDialog from '@/components/commonDialog/commonDialog.vue'

export default {
	name: 'reportDialog',
    props: {
        showDialog: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        ops: '',
        emails: {
            type: Array,
            default: [1]
        },
    },
    data(){
        return{
            checkAllReport: false,  //是否全选
            checkedEmials: [],      //已选中的邮箱
            uncheckedEmails: [],    //未选中的邮箱 
            reportReason: '',       //上报原因
            manualEmail: '',        //手动输入邮箱
            errTips: {
                err1: {
                    isShow: false,
                    text: '最多300个字符',
                },
                err2: {
                    isShow: false,
                    text: '邮箱格式不对',
                }
            }
        }
    },
    components: {
        commonDialog,
    },
    methods:{
        // 统一处理清空值，恢复为默认
        reset(){
            this.checkAllReport = false;
            this.reportReason = '';
            this.manualEmail = '';
            this.checkedEmials = [];
            this.errTips.err1.text = '';
            this.errTips.err1.isShow = false;
            this.errTips.err2.text = '';
            this.errTips.err2.isShow = false;
        },
        handleCloseMask(){
            this.reset();
            this.$emit('handleCloseMask');
        },
        handleConfirm(){
            let _this = this;
            let len = _this.reportReason.length;
            let handemail = _this.manualEmail;
            let isemail = /^([a-zA-Z0-9\._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,15}){1,4})$/;
            // let isemail = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g; 
            //验证上报原因
            if(len > 300){
                _this.errTips.err1.text = '最多300个字符!';
                _this.errTips.err1.isShow = true;
                return false;
            }else{
                _this.errTips.err1.text = '';
                _this.errTips.err1.isShow = false;
            }
            //如果没有选择邮箱，也没有手动输入
            if(handemail.length == 0 && _this.checkedEmials.length == 0){
                _this.errTips.err2.text = '请选择或手动输入邮箱地址!';
                _this.errTips.err2.isShow = true;
                return false;
            }
            //验证邮箱
            if (handemail.length > 200){
                _this.errTips.err2.text = '最多200个字符!';
                _this.errTips.err2.isShow = true;
                return false
            }else if (!isemail.test(handemail) && handemail.length != 0){
                _this.errTips.err2.text = '请输入正确的邮箱格式!';
                _this.errTips.err2.isShow = true;
                return false;
            }else{
                _this.errTips.err2.text = '';
                _this.errTips.err2.isShow = false;
            }
            //所有验证都通过，提交
            if(!_this.errTips.err1.isShow && !_this.errTips.err2.isShow){
                _this.$emit('handleConfirm',_this.checkedEmials,_this.reportReason,handemail);
                // 提交完之后，需要手动清空，避免下次上报有问题
                _this.checkedEmials = [];
                _this.reportReason = '';
                _this.manualEmail = [];
            }
        },
        handleCancel(){
            this.reset();
            this.$emit('handleCancel');
        },
        //全选
        handleCheckAllChange(val) {
            this.checkedEmials = val ? this.emails : [];
        },
        //反选
        handleReverse() {
            let _this = this;
            let result = _this.filterData(_this.emails,_this.checkedEmials);
            _this.checkedEmials = result;
            let checkedCount = result.length;
            this.checkAllReport = checkedCount === this.emails.length;
        },
        handleCheckedEmialsChange(val) {
            let checkedCount = val.length;
            this.checkAllReport = checkedCount === this.emails.length;
        },
        //比较两数组,去掉相同的，取出不同的(a一定是比b数组长)
        filterData(a,b){
            let _this = this;
            let result = [];
            for (let i = 0; i < a.length; i++) {
                let item = a[i];
                let isExist = false;
                for (let j = 0; j < b.length; j++) {
                    let item2 = b[j];
                    if(item2 === item){
                        isExist = true;
                        break;
                    }
                }
                if(!isExist){
                    result.push(item);
                }
            }
            return result;
        }
    },
    mounted(){
    }
}
</script>
<style scoped>
  @import url("./reportDialog.css");
</style>
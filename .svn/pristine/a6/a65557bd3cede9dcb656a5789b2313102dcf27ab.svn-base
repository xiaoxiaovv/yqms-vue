<template>
    <!-- <div v-cloak class="pops_newtask hide animated" id="newtask"> -->
<div class="commom_dialog_box" v-if="showTaskCenterDialog" @click.stop="">
    <div v-cloak class="pops_newtask" id="newtask">
        <div class="main_content">
            <div class="task_header">
                <div class="task_title">任务中心</div>
                <div class="task_icon" @click="closeDialog"></div>
            </div>
            <div class="infinite-list-wrapper listbox">
                <ul class="task_list"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-distance="0"
                    infinite-scroll-immediate="true"
                    infinite-scroll-delay="500"
                    :infinite-scroll-disabled="busy">
                    <li v-for="(item,i) in listData" :key="i" :the-taskid="item.taskId">
                        <!-- <img :src="getImgUrl(item)" class="task_type"></img> -->
                        <img :src="getImgUrl(item)" class="task_type"></img>
                        <div class="task_name" :title="item.fileName" @click="downLoad(item)">{{item.fileName}}</div>
                        <div class="task_description">
                            <span class="task_wait" v-if="item.taskState == 1">排队中 {{item.queueIndex}}个任务后开始执行</span>
                            <el-progress v-if="item.taskState == 2 && item.percent < 100" :percentage="item.percent"></el-progress>
                            <!-- 1排队中 2进行中 3完成 4取消 5失败 6重新开始 7删除任务 -->
                            <span class="task_status" v-if="item.taskState == 3 || item.percent == 100">完成</span>
                            <span class="task_size" v-if="item.taskState == 3 && item.fileSize != '-1'">{{item.fileSize}}</span>
                            <span class="task_status" v-if="item.taskState == 4">已取消</span>
                            <span class="task_status failed" v-if="item.taskState == 5">任务失败</span>
                            <span class="task_time" v-if="item.taskState == 3 || item.taskState == 4">{{item.createTime}}</span>
                            
                        </div>
                        <div class="task_except" v-if="item.checkState == 1">排除<span>{{item.invalidNum}}</span>条失效信息</div>
                        <div class="task_btn">
                            <div class="task_btn_icon task_refresh" v-if="item.taskState == 4 || item.taskState == 5" title="重新开始" @click="modifyTask(item,6)"></div>
                            <a class="task_btn_icon task_download" :href='item.fileUrl+"?attname="+item.fileName' v-if="item.fileUrl != ''" title="下载" download></a>
                            <div class="task_btn_icon task_export" v-if="0" title="导出任务"></div>
                            <div class="task_btn_icon task_del" title="从列表中删除" v-if="item.taskState != 1" @click="showSureDialog(item,1)"></div>
                            <div class="task_btn_icon task_stop" title="取消任务" v-if="item.taskState == 1"  @click="modifyTask(item,4)"></div>
                        </div>
                    </li>
                    <p v-show="loading" class="task_loading">
                        <i></i>
                        <span>加载中...</span>
                    </p>
                </ul>
            </div>
            <div class="task_footer">
                <div class="clear_all_btn" @click="showSureDialog">清空所有</div>
            </div>
        </div>
        <div class="task_mask" v-if="isMark"></div>
        <div class="pops confirm_delEvent" v-if="sureDialog">
            <div class="content">
                <div class="confirm_msg">{{comfirmMsg}}</div>
                <div class="btn">
                    <button @click="deleteTask">确定</button>
                    <button @click="closePopMask">取消</button>
                </div>
                <div class="close" @click="closePopMask">×</div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { getTaskList , modifyTask ,deleteTask,taskNum, taskSchedule,  } from '@/api/taskCenter'
    export default {
        name: 'taskCenterDiglog',
        data: function () {
            return {
                isMark: false,   //任务中心mask
                sureDialog: false,  //删除确认弹框
                listData: [],   //列表信息
                isScroll: false,
                offsetNum: 0,  //偏移量
                limitNum: 10,  //获取的数据量
                loading: true,
                totalNum: '',  //总量
                taskIds: [],   //列表id数组
                timerJC: '',                      //检查定时器对象 
                deleteId: '',   //删除的任务id
                deleteIndex: '', //删除的index
                comfirmMsg: '确定要删除该任务吗？', //弹框提示语
                busy: false,
                hasResponse: true,   //点击标志
            }
        },
        mounted() {
            // this.getListInfos();
            this.intervalTask();
        },
        computed: {
            showTaskCenterDialog(){
				return this.$store.state.isShowCenterTaskMask                       
			} 
        },
        methods: {
            //下载
            downLoad(item) {
                if(item.fileUrl) {
                    location = item.fileUrl+"?attname="+item.fileName;
                }
            },
            //获取任务类型
            getImgUrl:function(item){
                var fileName = item.fileName;
                var imgUrl = '1';
                if(fileName) {
                    if(fileName.indexOf('.xl') != -1) {
                        imgUrl = '1'
                    }else if(fileName.indexOf('.doc') != -1) {
                        imgUrl = '2'
                    }else if(fileName.indexOf('.zip') != -1) {
                        imgUrl = '3'
                    }
                }
                return require('../../assets/images/taskImg/task_0'+imgUrl+'.png');
            },
            //显示确认弹框
            showSureDialog: function(item,i) {
                this.deleteId = item.taskId || '';
                this.deleteIndex = i || '';
                if(this.deleteId) {
                    this.comfirmMsg = '确定要删除该任务吗？';
                }else {
                    this.comfirmMsg = '确定要清空所有信息吗？';
                }
                this.isMark = true;
                this.sureDialog = true;
            },
            //关闭确认弹框
            closePopMask: function() {
                this.isMark = false;
                this.sureDialog = false;
            },
            //关闭任务中心
            closeDialog: function() {
                clearInterval(this.timerJC);
                this.$store.commit('updateVal',{'name': 'isShowCenterTaskMask','value':false});
                this.listData = [];
            },
            //定时器任务
			intervalTask: function() {
                let _this = this;
                _this.timerJC = setInterval(function(){
					_this.updateList();
				},8000);
            },
            //更新列表状态
            updateList: function(){
                var _this = this;
                _this.taskIds = [];
                var newArr = _this.objChangeArr(_this.listData) || [];
                for(var i = 0, len = newArr.length; i < len; i++){
                    _this.taskIds.push(newArr[i].taskId)
                }
                if(_this.taskIds.length) {
                    try {
                        if(!_this.hasResponse){
                        return;
                        }
                        _this.hasResponse = false;
                        let params = {
                            taskIds: _this.taskIds.join(','),
                        }
                        taskSchedule(params).then(res=>{
                            _this.hasResponse = true;
                            if(res && res.data.code == 200) {
                                _this.listData = {..._this.listData, ...res.data.data};
                            }
                        }).catch(err=>{
                            console.log(err);
                        });
                    } catch (err) {
                        _this.hasResponse = true;
                        console.log(err);
                    }
                }else {
                    return
                }
                
            },
            //删除任务
            deleteTask: function() {
                let _this = this;
                let params = {
                    userId: _this.$store.state.ZHXGUSERID,
                    taskIds: _this.deleteId,
                }
                let result = '';
                deleteTask(params).then(res=>{
                    _this.isMark = false;
                    _this.sureDialog = false;
                    var oldArr = _this.listData;
                    if(res.data.code == 200) {
                        if(_this.deleteIndex) {
                            var oldArr = _this.objChangeArr(_this.listData);
                            _this.listData = oldArr.filter(function(item){
                                return item.taskId != _this.deleteId
                            });
                            // _this.listData.splice(_this.deleteIndex,1)
                        }else {
                            _this.listData = [];
                        }
                    }else {
                        this.$message({
                            type: 'error',
                            customClass: 'common_tips_style',
                            center: true,  //文字水平居中
                            message: '删除失败!'
                        });	
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },
            //取消/重新开始任务
            modifyTask: function(item,taskState) {
                var _this = this;
                let params = {
                    taskId: item.taskId,
                    taskType: item.taskType,
                    taskState: taskState,
                }
                modifyTask(params).then(res=>{
                    if(res && res.data.code == 200) {
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },
            //获取任务中心列表
            getListInfos: function() {
                var _this = this;
                let params = {
                    userId: _this.$store.state.ZHXGUSERID,
                    offsetNum: _this.offsetNum,
                    limitNum: _this.limitNum,
                }
                getTaskList(params).then(res=>{
                    _this.loading = false;
                    if (res && res.data.code == 200) {
                        var list = res.data.data.list || [];
                        var totalNum = res.data.data.totalNum;
                        var newArr = _this.objChangeArr(_this.listData) || [];
                        _this.listData = newArr.concat(list);
                        _this.totalNum = totalNum
                        _this.offsetNum = _this.listData.length
                    }else{
                        res.data.msg && alert(res.data.msg);
                        return false;
                    }
                    //console.log(_this.listData.length == res.data.data.totalNum) 
                    if(_this.listData.length == res.data.data.totalNum){ 
                        _this.busy = true;
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },
            //滚动加载
            loadMore() { 
                var _this = this;
                var timeoutflag = null;
                _this.loading = true;
                if(_this.loading){
                    if(timeoutflag != null){
                        clearTimeout(timeoutflag);
                    }
                    timeoutflag = setTimeout(function() {
                        _this.getListInfos();
                    }, 3000);
                    // this.getListInfos();
                } 
            },
            //对象转化为数组
            objChangeArr(obj) {
                var newArr = [];
                for(var i in obj){
                    newArr.push(obj[i])
                }
                return newArr;
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./taskCenterDialog.css");
</style>

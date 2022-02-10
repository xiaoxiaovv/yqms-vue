<template>
    <div class="wrap">
    <!--头部开始-->
    <yqms-header ref="header" funName="" :showCompilemask="showCompilemask"></yqms-header>
    <!--头部结束-->
    <!--内容开始-->
    <div class="card_manage_content">
        <div class="content_center">
            <div class="title">存证管理</div>
            <div class="line"></div>
            <div class="flex progress_box">
                <span class="color-999">流&emsp;&emsp;量:</span>
                <el-progress :percentage="percentage" :color="customColor" :show-text="false" :stroke-width="8"></el-progress>
                <span>{{usedStorage}}M~{{totalStorage}}M</span>
            </div>
            <div class="list_content time_box">
                <span class="color-999 time_text">到期时间:</span>
                <span>{{$store.state.stop_time | dateformat('YYYY-MM-DD')}}</span>
            </div>
            <el-button type="primary" class='button_size' @click="flFormVisible = true">法律维权</el-button>
            <div class="list_content list_content_box">
                <loading v-if="isLoading"></loading>
                <nodata v-if="!isLoading && dataList.length == 0"></nodata>
                <el-row class="bg-purple color-999" v-if="dataList.length>0">
                  <el-col :span="2"><div>序号</div></el-col>
                  <el-col :span="6"><div>标题</div></el-col>
                  <el-col :span="3"><div>文件名</div></el-col>
                  <el-col :span="3"><div>存证类型</div></el-col>
                  <el-col :span="3"><div>存证时间</div></el-col>
                  <el-col :span="3"><div>状态</div></el-col>
                  <el-col :span="4"><div>操作</div></el-col>
                </el-row>
                <el-row class="bg-purple" v-for="(item,i) of dataList" :key="i" :class="i%2 == 0 ? 'bg-purple-dark' : ''">
                  <el-col :span="2"><div>{{i+1}}</div></el-col>
                  <el-col :span="6"><div class="word-bk" v-bind:title='item.title'>{{item.title}}</div></el-col>
                  <el-col :span="3"><div class="word-bk">{{item.name}}</div></el-col>
                  <el-col :span="3"><div>网页存证</div></el-col>
                  <el-col :span="3"><div>{{item.date}}</div></el-col>
                  <el-col :span="3" v-if="item.status == 0">
                      <div>抓取中</div>
                  </el-col>
                  <el-col :span="3" v-if="item.status == 2">
                      <div>抓取失败</div>
                  </el-col>
                  <el-col :span="3" v-if="item.status == 1">
                      <div>抓取成功但未上传成功</div>
                  </el-col>
                  <el-col :span="3" v-if="item.status == 3">
                      <div v-if="item.require_status == 1">未鉴定</div>
                      <div v-if="item.require_status == 2">鉴定中</div>
                      <div v-if="item.require_status == 3">已鉴定</div>
                      <div v-if="item.require_status == 4">鉴定失败</div>
                  </el-col>
                  <el-col :span="4">
                    <div class="flex edit_box" v-show='item.status == 3'>
                        <div class="edit_card" @click='doEvDelete(item.evidence_id,i)' :class="(item.require_status==2)?'visible-hidden':''">
                            <div class="edit_img edit_img_4 edit_img_hover"></div>
                            <div class="edit_text">删除</div>
                        </div>
                        <div class="edit_card" @click="detail(item)">
                            <div class="edit_img edit_img_3 edit_img_hover"></div>
                            <div class="edit_text">查看</div>
                        </div>
                        <div class="edit_card" @click="downLoad(item.down_url)">
                            <div class="edit_img edit_img_2 edit_img_hover"></div>
                            <div class="edit_text">下载</div>
                        </div>
                        <div class="edit_card" @click="jdShow(item.evidence_id)" :class="(item.require_status==2 || item.require_status==3)?'visible-hidden':''">
                            <div class="edit_img edit_img_1 edit_img_hover"></div>
                            <div class="edit_text">鉴定</div>
                        </div>
                    </div>
                    <div class="flex edit_box" v-show='item.status != 3'>
                        <div class="edit_card" @click='doEvDelete(item.evidence_id,i)'>
                            <div class="edit_img edit_img_4 edit_img_hover"></div>
                            <div class="edit_text">删除</div>
                        </div>
                    </div>
                  </el-col>
                </el-row>
            </div>
            <el-pagination
                class="cusm_pagination"
                background
                layout="prev, pager, next"
                @current-change='getData'
                :total="total">
            </el-pagination>
            <el-dialog title="法律维权" :visible.sync="flFormVisible">
              <el-form :model="form">
                <el-input v-model="form.company" autocomplete="off" placeholder='请输入单位名称'></el-input>
                <el-input v-model="form.username" autocomplete="off" placeholder='请输入联系人'></el-input>
                <el-input v-model="form.telephone" autocomplete="off" placeholder='请输入手机号'></el-input>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 5}"
                  placeholder="需求描述"
                  v-model="form.content">
                </el-input>
              </el-form>
              <div class="fl_desp">作为一站式电子证据综合服务平台，除了为您提供基于区块链技术的存证、取证、出证服务，确保电子证据证明效力，同时还可为您提供专业的法律维权服务，让您的维权流程更便捷有效。<br>此服务由权证链的法律业务合作伙伴本同律师事务所提供（包括发律师函、谈判、诉讼等法律服务）<br>请留下个人信息，您的专属律师将在24小时内与您取得联系。</div>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="fetchProtect">确 定</el-button>
                <el-button @click="flFormVisible = false">取 消</el-button>
              </div>
            </el-dialog>
            <el-dialog title="鉴定" :visible.sync="jdFormVisible">
              <el-form :model="jdform">
                <el-input v-model="jdform.username" autocomplete="off" placeholder='请输入联系人'></el-input>
                <el-input v-model="jdform.telephone" autocomplete="off" placeholder='请输入手机号'></el-input>
                <el-input v-model="jdform.address" autocomplete="off" placeholder='请输入地址'></el-input>
              </el-form>
              <div class="fl_desp txt_c">将快速出具电子证据纸质文书及确认函，证据效力公认、可信。</div>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="fetchAppraisal">确 定</el-button>
                <el-button @click="jdFormVisible = false">取 消</el-button>
              </div>
            </el-dialog>
            <el-dialog title="详情" :visible.sync="detailFormVisible">
              <table class="detail_table">
                  <tbody>
                      <tr>
                          <td class="detail_table_key">文件名</td>
                          <td class="detail_table_value">{{detailInfo.name}}</td>
                      </tr>
                      <tr>
                          <td class="detail_table_key">文件大小</td>
                          <td class="detail_table_value">{{detailInfo.size}}MB</td>
                      </tr>
                      <tr>
                          <td class="detail_table_key">存证日期</td>
                          <td class="detail_table_value">{{detailInfo.date}}</td>
                      </tr>
                      <tr>
                          <td class="detail_table_key">网址/地址</td>
                          <td class="detail_table_value">{{detailInfo.url}}</td>
                      </tr>
                      <tr>
                          <td class="detail_table_key">哈希值</td>
                          <td class="detail_table_value">{{detailInfo.hash}}</td>
                      </tr>
                  </tbody>
              </table>
            </el-dialog>
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
    import { dataList, protect, appraisal, evDelete, memory } from '@/api/warrantchain'
    import store from '@/store'
    //手机号正则
    const phoneReg = /^1[3456789]\d{9}$/;
    export default {
    data(){
        return{
            isLoading: false,  //加载状态
            showCompilemask: false,//首页自定义按钮不显示
            percentage: 0,        //进度条百分比
            usedStorage: '',       //使用流量
            totalStorage: '',      //总流量
            customColor: '#409eff',//进度条颜色
            dataList:[],
            total:0,
            evidenceId:'',
            flFormVisible: false,//法律维权弹窗显示控制
            jdFormVisible: false,//鉴定弹窗显示控制
            detailFormVisible: false,//详情弹窗显示控制
            detailInfo:'',
            form: {              //法律维权表单内容
              username: '',
              telephone:'',
              company:'',
              content:''
            },
            jdform: {              //鉴定表单内容
              username: '',
              telephone:'',
              address:'',
            },
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
        //列表数据
        this.getList(1);
        this.getMemory();
    },
    methods:{
        //流量
        getMemory() {
            let _this = this;
            memory().then(function(res) {
                _this.usedStorage = Number(res.data.result.data.total_used_storage).toFixed(2); //保留两位小数
                _this.totalStorage = Number(res.data.result.data.total_storage);
                _this.percentage = _this.usedStorage/_this.totalStorage*100; //百分比
            }).catch(function(res) {
                
            })
        },
        //列表
        getList(pageNo) {
            let _this = this;
            let params = {
                pageNo:pageNo,
                pageSize:10,
            };
            _this.isLoading = true;
            dataList(params).then(function(res) {
                console.log(res);
                _this.isLoading = false;
                if(res.data.result.data.list) {
                    _this.dataList = res.data.result.data.list;
                }
                _this.total = Number(res.data.result.data.count);
            }).catch(function(res) {
                
            })
        },
        //分页请求
        getData(pageNo) {
            this.getList(pageNo);
        },
        //查看详情
        detail(item) {
            this.detailInfo = item;
            this.detailFormVisible = true;
        },
        //法律维权
        fetchProtect() {
            let _this = this;
            if(_this.form.company == '') {
                _this.$message.error('单位名称不能为空');
                return;
            }
            if(_this.form.company.length > 20) {
                _this.$message.error('单位名称不得超过20个字，请重新输入');
                return;
            }
            if(_this.form.username == '') {
                _this.$message.error('联系人不能为空');
                return;
            }
            if(_this.form.username.length > 10) {
                _this.$message.error('联系人不得超过10个字，请重新输入');
                return;
            }
            if(_this.form.telephone == '') {
                _this.$message.error('手机号不能为空');
                return;
            }
            if(!phoneReg.test(_this.form.telephone)) {
                _this.$message.error('请输入正确的手机号');
                return;
            }
            if(_this.form.content.length > 1000) {
                _this.$message.error('备注信息不得超过1000个字，请重新输入');
                return;
            }
            let params = {
                username:_this.form.username,
                telephone:_this.form.telephone, 
                company:_this.form.company,  
                content:_this.form.content,
            }
            protect(params).then(function(res) {
                console.log(res);
                _this.flFormVisible = false;
                _this.$message({
                    message: '提交成功',
                    type: 'success'
                });
            }).catch(function(res) {
                
            })
        },
        //弹出鉴定弹窗
        jdShow(evidenceId) {
            this.evidenceId = evidenceId;
            this.jdFormVisible = true;
        },
        //鉴定
        fetchAppraisal() {
            let _this = this;
            if(_this.jdform.username == '') {
                _this.$message.error('联系人不能为空');
                return;
            }
            if(_this.jdform.username.length > 10) {
                _this.$message.error('联系人不得超过10个字，请重新输入');
                return;
            }
            if(_this.jdform.telephone == '') {
                _this.$message.error('手机号不能为空');
                return;
            }
            if(!phoneReg.test(_this.jdform.telephone)) {
                _this.$message.error('请输入正确的手机号');
                return;
            }
            if(_this.jdform.address == '') {
                _this.$message.error('地址不能为空');
                return;
            }
            if(_this.jdform.address.length > 50) {
                _this.$message.error('地址不得超过50个字，请重新输入');
                return;
            }
            let params = {
                 evidenceId:_this.evidenceId,  
                 username:_this.jdform.username, 
                 telephone:_this.jdform.telephone,  
                 address:_this.jdform.address
            }
            appraisal(params).then(function(res) {
                _this.jdFormVisible = false;
                for(let i in _this.dataList){
                    if(_this.dataList[i].evidence_id == _this.evidenceId) {
                        _this.dataList[i].require_status = 2;
                    }
                }
                _this.$message({
                    message: res.data.result.data.msg,
                    type: 'success',
                    center:true
                });
            }).catch(function(res) {
                
            })
        },
        //下载
        downLoad(url) {
            window.open(url);
        },
        //删除
        doEvDelete(evidenceId,i) {
            let _this = this;
            let params = {
                evidenceId:evidenceId,
            }
            _this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                evDelete(params).then(function(res) {
                    console.log(res);
                    _this.$message({
                    message: '删除成功',
                    type: 'success',
                    center:true
                    });
                    _this.dataList.splice(i,1);
                }).catch(function(res) {
                    
                })
            }).catch(() => {
                        
            });
        }
    },
    
}
</script>
<style>
  @import url("./cardmanage.css");
</style>
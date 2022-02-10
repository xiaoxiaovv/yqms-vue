<template>
    <transition name="fade">
        <div class="banner" v-show="showBanner">
            <a href="javascript:void(0);" @click="addLog">
                <img :src="$store.state.oldyqmsUrl + 'Public/generating/images/banner_wh_new.jpg'" @click.stop="locWc"/>
            </a>
            <i class="banner_close" @click.stop="closeDialog"></i>
            <!-- 正式客户弹窗  :showConfirmBtn="formalConfirmBtn" :showCancleBtn="formalCancleBtn" -->
            <judged-dialog :showDialog="formalCustomer" @handleConfirm="judgedConfirm()" @handleCancel="judgedCancel" :confirmText="'进入'+judgedName">
                <div class="judged_txt_box">
                  <p class="small_txt">您是{{judgedName}}的正式客户</p>
                  <p class="big_txt">欢迎试用{{judgedName}}Web版</p>
                </div>
            </judged-dialog>
            <!-- 试用客户弹窗 -->
            <judged-dialog :showDialog="trialCustomer" @handleConfirm="judgedConfirm()" @handleCancel="judgedCancel" :confirmText="'进入'+judgedName">
                <div class="judged_txt_box">
                  <p class="small_txt">您是{{judgedName}}的试用用户</p>
                  <p class="big_txt">欢迎试用{{judgedName}}Web版</p>
                </div>
            </judged-dialog>
            <!-- 开通试用弹窗 -->
            <judged-dialog :showDialog="openTrial" @handleConfirm="judgedConfirm('userseven')" @handleCancel="judgedCancel" confirmText="开通试用">
                <div class="judged_txt_box">
                  <p class="small_txt">您拥有{{judgedName}}Web版{{diffDate}}天使用权限</p>
                  <p class="big_txt">是否开通试用？</p>
                </div>
            </judged-dialog>
            <!-- 试用剩余时间弹窗 -->
            <judged-dialog :showDialog="remainTrialTime" @handleConfirm="judgedConfirm()" @handleCancel="judgedCancel" :confirmText="'进入'+judgedName">
                <div class="judged_txt_box">
                  <p class="small_txt">您的{{judgedName}}试用期还剩余</p>
                  <p class="big_txt">{{remainTimeTxt}}天</p>
                </div>
            </judged-dialog>
        <!-- 正式剩余时间弹窗 -->
            <judged-dialog :showDialog="remainTime" @handleConfirm="judgedConfirm()" @handleCancel="judgedCancel" :confirmText="'进入'+judgedName">
                <div class="judged_txt_box">
                  <p class="small_txt">您的{{judgedName}}还剩余</p>
                  <p class="big_txt">{{remainTimeTxt}}天</p>
                </div>
            </judged-dialog>
            <!-- 试用到期弹窗 -->
            <judged-dialog :showDialog="expiredTrial" @handleConfirm="judgedCancel" confirmText="确定" :showCancleBtn="expiredCancleBtn">
                <div class="judged_txt_box">
                  <p class="small_txt">您的{{judgedName}}{{diffDate}}天试用期已到</p>
                  <p class="big_txt">请购买正式版本{{judgedName}}</p>
                </div>
            </judged-dialog>
        <!-- 正式到期弹窗 -->
            <judged-dialog :showDialog="expired" @handleConfirm="judgedCancel" confirmText="确定" :showCancleBtn="expiredCancleBtn">
                <div class="judged_txt_box">
                  <p class="small_txt">您的{{judgedName}}已到期，</p>
                  <p class="big_txt">继续使用请联系客服</p>
                </div>
            </judged-dialog>
        <!-- 停用弹窗 -->
            <judged-dialog :showDialog="disableBtn" @handleConfirm="judgedCancel" confirmText="确定" :showCancleBtn="expiredCancleBtn">
                <div class="judged_txt_box">
                  <p class="small_txt">您的{{judgedName}}已停用，</p>
                  <p class="big_txt">继续使用请联系客服</p>
                </div>
            </judged-dialog>
        </div>
    </transition>
</template>
<script>
    import { getBannerFlag , saveBannerFlag } from '@/api/home'
    import judgedDialog from '@/components/judgedDialog/judgedDialog.vue'
    import {checkStatus} from '@/api/judged'
	  import store from '@/store'
    export default {
        name:'banner',
        data(){
            return {
              formalCustomer: false,   //是否显示正式客户弹窗
              trialCustomer: false,    //是否显示试用客户弹窗
              openTrial: false,        //是否显示开通试用客户弹窗
              remainTime: false,       //是否显示正式剩余时间弹窗
              remainTrialTime: false,  //是否显示试用剩余时间弹窗
              expired: false,          //是否显示正式到期弹窗
              expiredTrial: false,          //是否显示试用到期弹窗
              expiredCancleBtn: false,      //是否显示试用到期弹窗
              disableBtn:  false,     //是否显示停用弹窗
              remainTimeTxt: '',  //剩余时间提示
              judgedName: '态势感知',        //产品名称
              diffDate: '',          //到期时间
            }
        },
        props: {
          showBanner : {
            type: Boolean,
            default: false
          },
        },
        components: {
	        judgedDialog,
        },
        methods: {
            //跳转网参
            locWc(){
              this.addLog();
              if(this.$store.state.isNewTemplate == '0'){
                //网参报告0 舆情报告1
                window.location = this.$store.state.oldyqmsUrl+'Briefing/consult'
              }else{
                window.location = this.$store.state.oldyqmsUrl+'ReportTemplate/wcbg'
              }
            },
            //埋点
            addLog(){
                //埋点
                this.$store.commit('maiDian','homepage_banner');
            },
            //关闭弹窗_保存广告栏状态
            closeDialog(){
              let _this = this;
              _this.$parent.showBanner = false;
              let map = {
                userid: _this.$store.state.ZHXGUSERID,
                state: '2' //空 显示广告栏 2 关闭广告栏
              };
              saveBannerFlag(map).then(function(res) {
                res = JSON.parse(JSON.stringify(res));
                //空 显示广告栏 2 关闭广告栏
                if(res.data.status == '0') {
                  //成功
                  if(res.data.result.data == '1'){
                    console.log('保存成功');
                  }else{
                     console.log('保存失败');
                  }
                }
              }).catch(err => {
                console.log(err, '请求失败！');
              });
            },
            isShowBanner(){
              let _this = this;
              let params = {
                userid: _this.$store.state.ZHXGUSERID
              };
              getBannerFlag(params).then(function(res) {
                res = JSON.parse(JSON.stringify(res));
                //空 显示广告栏 2 关闭广告栏
                if(res.data.status == '0') {
                  console.log(res.data.result.data);
                  if(res.data.result.data == '2'){
                    _this.$parent.showBanner = false;
                  }else{
                    _this.$parent.showBanner = true;
                  }
                }
              }).catch(err => {
                console.log(err, '请求失败！');
              });
            },
            //是否开通试用研判 —— 研判跳转
            openJudged(){
              this.addLog();
              let _this = this;
              let data = {loginType:1,relateId:this.$store.state.ZHXGUSERID};
              checkStatus(data).then(function(res) {
                var res = res.data.result.data;
                if(res.header.status == '200'){
                  //试用
                  var data = res.body;
                  if(data.userStatus == 1){
                    _this.judgedCancel();
                    _this.remainTrialTime = true;
                    _this.remainTimeTxt = data.diffDate;
                  }else if(data.userStatus == 0){
                    // 正式
                    if(data.diffDate < 30){
                      _this.judgedCancel();
                      _this.remainTime = true;
                      _this.remainTimeTxt = data.diffDate;
                    }else {
                      _this.judgedCancel();
                      _this.formalCustomer = true;
                    }
                  }
                }else if(res.header.status == 500){
                  //去开通
                  _this.judgedCancel();
                  _this.openTrial = true;
                }else if(res.header.status == 501){
                  //正式到期
                  _this.judgedCancel();
                  _this.expired = true;
                }else if(res.header.status == 502){
                  //试用到期
                  _this.judgedCancel();
                  _this.expiredTrial = true;
                }else if(res.header.status == 503){
                  //停用
                  _this.judgedCancel();
                  _this.disableBtn = true;
                }
              }).catch(err => {
                console.log(err, '请求失败！');
              });
            },
            // 弹窗确定按钮处理 —— 进入态势感知
            judgedConfirm(item) {
              let _this = this;
              let temp = 'https://tsgz.istarshine.com';  //正式
              //let temp = 'https://tsgz-beta.istarshine.com/web';  //beta
              let token = _this.$store.state.ACCESSTOKEN; 
                window.open(temp+'/index.html#/yqmslogin?token='+token+'&relateId='+_this.$store.state.ZHXGUSERID+'&loginName='+_this.$store.state.username);
              _this.judgedCancel();
            },
            // 弹窗取消按钮处理 —— 关闭弹窗
            judgedCancel() {
              this.formalCustomer = false;
              this.trialCustomer = false;
              this.openTrial = false;
              this.remainTime = false;
              this.expired = false;
              this.disableBtn = false;
              this.remainTrialTime = false;
              this.expiredTrial = false;
            },
        },
        mounted() {
          this.isShowBanner();
          if(this.$store.state.ZHXGUSERID == '68741' || this.$store.state.ZHXGUSERID == '36261') {
              this.diffDate = '7';
              this.judgedName = '智慧研判';
          }else {
              this.diffDate = '30';
              this.judgedName = '态势感知';
          }
        }
    }
</script>
<style scoped>
    .banner{width: 100%;position: relative;}
    .banner img{width: 100%;}
    .banner .banner_close{background: url("../../assets/images/banner_close.png") no-repeat left top;display: block;width: 20px;height: 20px;position: absolute;top: 10px;right: 10px;cursor: pointer;}

@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}

@-webkit-keyframes slideOutUp {
    0% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    to {
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0);
        visibility: hidden
    }
}

@keyframes slideOutUp {
    0% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0)
    }

    to {
        -webkit-transform: translate3d(0,-100%,0);
        transform: translate3d(0,-100%,0);
        visibility: hidden
    }
}

.slideOutUp {
    -webkit-animation-name: slideOutUp;
    animation-name: slideOutUp
}

.fade-enter-active {
  animation-name: fadeInUp;
  animation-duration: .5s;
}
.fade-leave-active {
  animation-name: slideOutUp;
  animation-duration: .5s;
}
@keyframes fade-in {
  0% {
    transform: translate3d(0, 100%, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fade-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 50%, 0);
  }
  100% {
    transform: translate3d(0, 100%, 0);
  }
}
</style>

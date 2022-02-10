<template>
	<div class="wrap" :class="wrapContent">
		<!--头部开始-->
		<yqms-header ref="header" funName="首页" :showCompilemask="showCompilemask" :showHomepageCustom="showHomepageCustom" @triggerHomePage="savePageData" @addModelHome="addModel"></yqms-header>
		<!--头部结束-->
		<!--中间开始-->
		<home-center :showCompilemask="showCompilemask" @addModelHomePage="addModelPage" @triggerHomePage="savePageData"></home-center>
		<!--中间结束-->
		<!--底部开始-->
		<yqms-footer v-if="$store.state.kuTempLateType !=5"></yqms-footer>
		<!--底部结束-->
		<!--侧边栏开始-->
		<yqms-sidebar></yqms-sidebar>
		<!--侧边栏结束-->
		<!--推送预警弹窗开始-->
		<yqms-pushwaring v-if="$store.state.kuAlertwin == 1 || $store.state.kuAlertwin == 2 "></yqms-pushwaring>
		<!--推送预警弹窗结束-->
	    <el-dialog
	      :visible.sync="dialogVisibles"
	      custom-class="masktrial">
	      <div class="top_part"><img src="../../assets/images/home/classic/vector.png" alt="">
	        <div>
	          <div><span>试用剩余</span><b>{{leftTime}}</b><span>天</span></div>
	          <p>主人，小秘就要离开了</p>
	          <p><span>开通正式版</span>让小秘留在您身边吧！</p></div>
	        <b class="closeBtn" @click="closetsDialog()"></b></div>
	      <div class="bottom_part"><h4>体验更多产品</h4>
	        <ul>
	          <li><a :href='$store.state.oldyqmsUrl+ "ApplyForTrial/opinionexperts"'  target="_blank"><img
	            src="../../assets/images/home/classic/experts.png" alt=""><span>舆情专家</span></a>
	            <ul>
	              <li><span>◆</span>及时预警</li>
	              <li><span>◆</span>科学研判</li>
	              <li><span>◆</span>妥善处理</li>
	              <li><span>◆</span>有效回应</li>
	            </ul>
	          </li>
	          <li><a :href='$store.state.oldyqmsUrl+ "ApplyForTrial/keyperson"' target="_blank"><img
	            src="../../assets/images/home/classic/monitor.png" alt=""><span>重点人物监控</span></a>
	            <ul>
	              <li><span>◆</span>精准定向监测</li>
	              <li><span>◆</span>定制人物画像</li>
	              <li><span>◆</span>改善舆论生态</li>
	            </ul>
	          </li>
	          <li><a :href='$store.state.oldyqmsUrl+ "ApplyForTrial/onlinereview"' target="_blank"><img
	            src="../../assets/images/home/classic/review.png" alt=""><span>智慧网评</span></a>
	            <ul>
	              <li><span>◆</span>澄清谬误</li>
	              <li><span>◆</span>明辨是非</li>
	              <li><span>◆</span>引领导向</li>
	              <li><span>◆</span>服务大局</li>
	            </ul>
	          </li>
	          <li v-if="$store.state.ZHXGUSERID == '68741' || $store.state.ZHXGUSERID == '36261'"><a href='javascript:void(0)' @click.stop="openJudged"><img
	            src="../../assets/images/home/classic/yanpan.svg" class='tsgz_size' alt=""><span>智慧研判</span></a>
	            <ul>
	              <li><span>◆</span>了解社会民意</li>
	              <li><span>◆</span>洞察社会情绪</li>
	              <li><span>◆</span>网络舆论态势感知</li>
	            </ul>
	          </li>
			 <li v-else><a href='javascript:void(0)' @click.stop="openJudged"><img
				src="../../assets/images/home/classic/tsgz.svg" class='tsgz_size' alt=""><span>态势感知</span></a>
				<ul>
				 <li><span>◆</span>了解社会民意</li>
				 <li><span>◆</span>洞察社会情绪</li>
				 <li><span>◆</span>网络舆论态势感知</li>
				</ul>
	          </li>
	        </ul>
	      </div>
	    </el-dialog>
	</div>
</template>

<script>
	import yqmsHeader from '@/components/header/header.vue'
	import homeCenter from '@/views/home/components/homeCenter/homeCenter.vue'
	import yqmsFooter from '@/components/footer/yqmsFooter.vue'
	import yqmsSidebar from '@/components/sidebar/sidebar.vue'
	import yqmsPushwaring from '@/components/pushWaring/pushWaring.vue'
    import VueCookies from 'vue-cookies'
	import { updateHomePageData } from '@/api/home'
	import { globalBus } from '@/helpers/util'
	export default {
		data() {
			return {
				showCompilemask: false, //是否显示首页自定义,显示时，所有模块的删除按钮显示
				showHomepageCustom: true, //是否显示首页自定义文本:
		        dialogVisibles: false,       //是否显示弹层
		        leftTime: this.$store.state.leftTime,  //到期时间
		        kuUserStatus: this.$store.state.kuUserStatus,  //状态 0 正式 1 试用 2 停用
						wrapContent: '',
			}
		},
		components: {
			yqmsHeader,
			homeCenter,
			yqmsFooter,
			yqmsSidebar,
			yqmsPushwaring
		},
		props: {},
		methods: {
			//获取首页数据
			savePageData(flag,page) {
				/*
				 *flag 值说明 
				 *	 add ：不会自动保存areaArr 
				 *   save ：会自动保存areaArr
				 */
				let _this = this;
				let areaArr = JSON.parse(localStorage.getItem('areaArr'));
				let data = {
					homePageData: JSON.stringify(_this.$children[1].areaArr)
				};
				if(flag != 'add'){ //save
					_this.showCompilemask = false;
					updateHomePageData(data).then(function(res) {
						if(res.data){
							if(res.data.status == '0') {
								//埋点统计——首页自定义——生成首页
								_this.$store.commit('maiDian','homepage_create_homepage');
								_this.$message({
									message: '保存成功',
									type: 'success'
								})
								// localStorage.setItem('areaArr', JSON.stringify(areaArr));
								//切换专题时使用
								_this.$children[1].getPageData();
							}else{
								alert('保存失败！');
							}
						}else{
							alert('保存失败！');
							//切换专题时使用
							_this.$children[1].getPageData();
						}
					}).catch(err => {
						console.log(err, '请求失败！');
					});
				}else{
					//add 时，浮层不关闭
					_this.showCompilemask = true;
					//关闭添加模块的弹窗
					_this.$children[0].showAddDialog = false;
				}
				if(page == 'page') {
					_this.showCompilemask = false;
				}
			},
			//恢复默认首页默认设置
			handleRestoreSetHome() {
				this.$children[1].getPageData();
			},
			//添加模块
			addModel(data){
				let _this = this;
				_this.$children[1].areaArr = data;
				// add时， 不需要自动保存了
				_this.savePageData('add');
			},
			addModelPage(data){
				let _this = this;
				_this.$children[1].areaArr = data;
				// add时， 不需要自动保存了
				_this.savePageData('add','page');
			},
			//关闭使用提示
		    closetsDialog(){
		        this.dialogVisibles = false; 
			},
			//研判跳转
			openJudged(){
				globalBus.$emit('emitOpenJudged');
			}
		},
	    mounted(){ 
	      if(this.kuUserStatus == 1 && !(this.$store.state.agentid > 0) && (this.$store.state.kuTempLate != 'UnicomProject' && (this.$store.state.kuTempLateType == 0 || this.$store.state.kuTempLateType == 1 ))){
	        let firstlogin = VueCookies.get('firstlogin')
	        if(firstlogin == '1'){
	          this.dialogVisibles = true;
	          VueCookies.set("firstlogin","");
	        }
	      }
				if(this.$store.state.kuTempLate == 'UnicomProject'){
					if(this.$store.state.kuTempLateType == 0) {
						this.wrapContent = 'wrap_unicom'
					}
				}
	    }
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("./home.css");
</style>
<style>
  .masktrial{background-color: transparent;width: 840px;}
  .masktrial > .el-dialog__header{display: none;}
  .masktrial >.el-dialog__body{padding: 0px;}
  .masktrial >.el-dialog__body > .top_part{width: 100%;height:460px;overflow:hidden;top: 80px;left: 532px;background:var(--bg-top_bg) no-repeat;}
  .masktrial >.el-dialog__body >.top_part>img{width:203px;height:213px;margin:132px 46px 0 184px;vertical-align: middle}
  .masktrial >.el-dialog__body >.top_part>.closeBtn{display:inline-block;width:15px;height:16px;background: var(--bg-close) no-repeat;top: 12px;right: 18px;position: absolute;cursor: pointer}
  .masktrial >.el-dialog__body >.top_part>div{display: inline-block;vertical-align: middle;margin-top: 110px}
  .masktrial >.el-dialog__body >.top_part>div>div{font-size: 24px;color:#fff;height: 60px;}
  .masktrial >.el-dialog__body >.top_part>div>div>span{vertical-align: middle}
  .masktrial >.el-dialog__body >.top_part>div>div>b{display: inline-block;width:54px;height:76px;box-sizing: border-box;text-align: center;padding-top: 5px;font-size: 36px;color:#fff;background: var(--bg-time_bg) no-repeat;margin: 0 18px 0 18px;vertical-align: middle}
  .masktrial >.el-dialog__body >.top_part>div>p{font-size: 14px;color:#fff;height: 24px;line-height: 24px;margin-top:10px;letter-spacing: 1.5px;}
  .masktrial >.el-dialog__body >.top_part>div>p:last-of-type>span{color:#f6a727;margin-right:10px;    font-weight: bold;}
  .masktrial >.el-dialog__body >.bottom_part{font-size: 14px;background: #fafafa;padding-top: 36px;padding-bottom: 36px;}
  .masktrial >.el-dialog__body >.bottom_part>h4{color: #666;background: #fafafa;text-align: center;margin-bottom:36px}
  .masktrial >.el-dialog__body >.bottom_part>ul{margin:0 60px;overflow: hidden;}
  .masktrial >.el-dialog__body >.bottom_part>ul>li{float: left;margin-right:85px}
  .masktrial >.el-dialog__body >.bottom_part>ul>li>a{cursor: pointer}
  .masktrial >.el-dialog__body >.bottom_part>ul>li>ul{margin-top:20px; margin-left: 8px;}
  .masktrial >.el-dialog__body >.bottom_part>ul>li>ul>li{font-size:12px;color:#9c9c9c;margin-bottom: 10px;}
  .masktrial >.el-dialog__body >.bottom_part>ul>li>ul>li>span{display: inline-block;font-size: 8px;margin-right: 10px;color: #CDCDCD;}
  .masktrial >.el-dialog__body >.bottom_part>ul>li>a>span{margin-left:8px;color:#333;}
  .masktrial >.el-dialog__body >.bottom_part>ul>li:last-of-type{margin-right:0px}
  .masktrial .tsgz_size {width: 24px}
  /* 小屏幕兼容 */
  @media screen and (max-height: 935px) {
    .masktrial { width: 680px; }
	.masktrial >.el-dialog__body > .top_part { height: 236px; }
	.masktrial >.el-dialog__body >.top_part>img { margin: 0px 46px 0 130px; }
	.masktrial >.el-dialog__body >.bottom_part>ul {
		margin: 0 30px;
	}
	.masktrial >.el-dialog__body >.bottom_part>ul>li { margin-right: 65px; }
	.masktrial >.el-dialog__body >.bottom_part { padding-top: 24px; }
	.masktrial >.el-dialog__body >.top_part>div {	margin-top: 20px; }
	.masktrial >.el-dialog__body >.bottom_part>h4 { margin-bottom: 24px; }
	.masktrial >.el-dialog__body >.bottom_part>ul>li { margin-right: 65px; }
	.masktrial >.el-dialog__body >.bottom_part>ul>li>ul>li { margin-bottom: 5px; }
}
</style>

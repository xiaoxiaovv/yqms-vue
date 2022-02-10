<template>
	<div class="home_events_box border_box" :class=" (eventData.length == 0)? 'home_events_nodata' : ''">
		<div class="events_title_box border_box flex_center_verticle" :class="showCompilemask ? 'handle_draggle' : ''" v-if="$store.state.kuTempLate != 'UnicomProject'">
			<div class="bg_left flex_1">
				<span class="bg_circle"></span>
			</div>
			<a v-show="showCompilemask" class="bg_title cursor_move" href="javascript:void(0);" target="_blank">{{params.retitle || params.title}}</a>
			<a v-show="!showCompilemask" class="bg_title" :href="$store.state.oldyqmsUrl +'EventAnalysis/index?hover=2'" target="_blank" @click="$store.commit('maiDian','homepage_events')">{{params.retitle || params.title}}</a>
			<div class="bg_right flex_1">
				<span class="bg_circle"></span>
			</div>
		</div>
		<!-- 数言舆情事件title -->
		<div class="events_title_box border_box flex_center_verticle events_title_box_unicom" :class="showCompilemask ? 'handle_draggle' : ''" v-if="$store.state.kuTempLate == 'UnicomProject'">
			<span class="icon_bg iconbg_01 icon_border_unicom"></span>
			<a v-show="showCompilemask" class="bg_title bg_title_unicom cursor_move" href="javascript:void(0);" target="_blank">{{params.retitle || params.title}}</a>
			<a v-show="!showCompilemask" class="bg_title bg_title_unicom" :href="$store.state.oldyqmsUrl +'EventAnalysis/index?hover=2'" target="_blank" @click="$store.commit('maiDian','homepage_events')">{{params.retitle || params.title}}</a>
		</div>
		<div class="clear"></div>
		<loading v-if="isLoading"></loading>
		<nodata v-if="!isLoading && !eventData.length"></nodata>
		<div class="events_content flex" v-if="eventData.length > 0" :class="eventsContent">
			<div class="eve_list flex_1" v-for="(item,i) of eventData" :key="i" @click.stop="jumpToEvent(item)">
				<img class="eve_img" :src="item.faceImgUrl" />
				<!-- target="_blank" :href="$store.state.oldyqmsUrl +'EventAnalysis/eventList?btime='+ item.beginTime +'&closetime='+ item.closeTime +'&eventid='+ item.uuid +'&isLogic='+ item.isLogic +'&title='+ item.topicName +'&sharerid='+ item.userId +'&hover=2'+ '&infoState='" -->
				<a class="eve_title" href="javascript:void(0);" @click="$store.commit('maiDian','homepage_events_detail')">{{item.topicName}}</a>
			</div>
		</div>
		<!-- 删除按钮 -->
		<div class="ops_btn_box">
			<span class="del_btn" title="删除" v-show="showCompilemask && areaArr.length > 1" @click.stop="delTopic"></span>
		</div>
		<!-- 删除模块提示 -->
		<new-dialog :showDialog="showDelDialog" title="删除模块" confirmText="确定" cancelText="取消" @handleConfirm="handleConfirm" @handleCancel="handleCancel" @handleCloseMask="handleCloseMask" :showConfirmBtn="showConfirmBtn" :showCancleBtn="showCancleBtn">
			<div class="yqms_tips">确定删除模块吗？</div>
		</new-dialog>
	</div>
</template>
<script>
	import newDialog from '@/components/newDialog/newDialog.vue'
	import { getEventData } from '@/api/home'

	let moment = require("moment");
	
	export default {
		data() {
			return {
				isLoading: true,
				showDelDialog: false, //是否显示弹窗
		        showConfirmBtn: true, //是否显示确定按钮
		        showCancleBtn: true,  //是否显示取消按钮
		        eventData: [], //事件数据
		        params: {},  //接收父级传来的参数
		        areaArr: [], //用来控制删除按钮是否显示
				eventsContent:'',
			}
		},
		components: {
			newDialog,
		},
		props: {
			comparams: '',
			//是否显示模块中的删除按钮
			showCompilemask : {
	            type: Boolean,
	            default: false
	        },
		},
		created() {
			this.params = this.comparams == undefined ? {} : this.comparams;
		},
		mounted() {
			this.$nextTick(function() {	
				this.getEventListData();
				// 是否显示模块中的删除按钮
				this.areaArr = JSON.parse(localStorage.getItem('areaArr'));
			});

			//数言舆情添加类
			if(this.$store.state.kuTempLate == 'UnicomProject'){
				if(this.$store.state.kuTempLateType == 0) {
					this.eventsContent = 'events_content_unicom'
				}
			}
		},
		methods: {
			getEventListData(){
				let _this = this;
				_this.params.api = (_this.params.api == '') ? 'customHomePage/selectRecommendEventAnalysisList' : _this.params.api;
				getEventData(_this.params.api,{}).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data != ''){
						if(res.data.status == '0') {
							_this.isLoading = false;
							_this.eventData = res.data.result.data || [];
							//处理时间
							for(let i in _this.eventData){
								let item = _this.eventData[i];
								//时间格式化处理
								item.beginTime = moment(item.beginTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm');
								item.closeTime = moment(item.closeTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm');
							}
						}else{
							_this.isLoading = false;
							_this.eventData = [];
						}
					}else{
						_this.isLoading = false;
						_this.eventData = [];
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//删除专题
			delTopic(){
				this.showDelDialog = true;
			},
			//关闭弹窗
			handleCloseMask(){
				this.showDelDialog = false;
			},
			//确定
			handleConfirm(){
				let _this = this;
				_this.showDelDialog = false;
				//每个模块删除时使用 —— 更新showCompilemask的值,往父级找
				_this.$emit('handleModelDelete',_this.params);
			},
			//取消
			handleCancel(){
				this.showDelDialog = false;
			},
			// 事件跳转
			jumpToEvent(item){
				//埋点
				this.$store.commit('maiDian','homepage_events_detail');
				let url = this.$store.state.oldyqmsUrl +'EventAnalysis/eventList?btime='+ item.beginTime +'&closetime='+ item.closeTime +'&eventid='+ item.uuid +'&isLogic='+ item.isLogic +'&title='+ item.topicName +'&sharerid='+ item.userId +'&hover=2'+ '&infoState=';
				window.open(url);
			},
		}
	}
</script>

<style>
	@import url("./events.css");
</style>
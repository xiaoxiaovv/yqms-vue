`<template>
	<div class="common_width m_right home_topicList_box border_box flex_column">
		<div class="model_title_box item_vertical model_5" :class="showCompilemask ? 'handle_draggle' : ''">
			<!--分类-->
			<div v-if="topicparams.params.ksType == '2'" class="model_title_left">
				<span class="icon_border" :class="iconBrder"></span>
				<!-- 分类时跳转 -->
				<a v-show="showCompilemask" class="model_title cursor_move" href="javascript:void(0);" target="_blank">{{topicparams.retitle || topicparams.title}}</a>
				<a v-show="!showCompilemask" class="model_title" :href="$store.state.oldyqmsUrl +'Browse/index?classid='+ topicparams.params.ksId +'&kkname='+ topicparams.title" target="_blank" @click="$store.commit('maiDian','homepage_focustopics')">{{topicparams.retitle || topicparams.title}}</a>
			</div>
			<!--专题-->
			<div v-else-if="topicparams.params.ksType == '1'" class="model_title_left">
				<span class="icon_border" :class="iconBrder"></span>
				<!-- 专题时跳转 -->
				<a v-show="showCompilemask" class="model_title cursor_move" href="javascript:void(0);" target="_blank">{{topicparams.retitle || topicparams.title}}</a>
				<a v-show="!showCompilemask" class="model_title" :href="$store.state.oldyqmsUrl +'Browse/index?tid=01'+'&sid='+ topicparams.params.ksId +'&kkname='+ topicparams.title" target="_blank" @click="$store.commit('maiDian','homepage_focustopics')">{{topicparams.retitle || topicparams.title}}</a>
			</div>
			<!--地域专题-->
			<div v-else-if="topicparams.params.ksType == '3'" class="model_title_left">
				<span class="icon_border" :class="iconBrder"></span>
				<!-- 专题时跳转 -->
				<a v-show="showCompilemask" class="model_title cursor_move" href="javascript:void(0);" target="_blank">{{topicparams.retitle || topicparams.title}}</a>
				<a v-show="!showCompilemask" class="model_title" :href="$store.state.oldyqmsUrl +'Browse/index?sid='+ topicparams.params.ksId +'&kkname='+ topicparams.title" target="_blank" @click="$store.commit('maiDian','homepage_focustopics')">{{topicparams.retitle || topicparams.title}}</a>
			</div>
			<!--2-->
			<div class="model_title_right">
				<span class="icon_bg switch_btn" :class="iconBrderBtn" title="切换" v-show="!showCompilemask" @click.stop="switchTopic($event)"></span>
				<span class="del_btn" title="删除" v-show="showCompilemask && areaArr.length > 1" @click.stop="delTopic"></span>
			</div>
		</div>
		<div class="model_content_box flex_1" :class="modelContentBox">
			<loading v-if="isLoading"></loading>
			<nodata :isImportant="isImportant" v-if="!isLoading && !topicListData.length"></nodata>
			<vue-scroll :ops="ops" ref="topiclist">
				<div class="model_content border_box" v-if="topicListData.length > 0">
					<div class="topic_item" v-for="(item,i) of topicListData">
						<div class="topic_shadow_wrapper" >   <!-- :class="i == 0 ? 'hover' : ''" -->
							<div class="topic_shadow_card"></div>
							<div class="topic_shadow_content border_box">
								<div class="topic_list flex">
									<!-- 正面：1 负面：2 中性：3 -->
									<span class="tendency zheng" v-if="item.orientation == 1"></span>
									<span class="tendency fu" v-else-if="item.orientation ==2"></span>
									<span class="tendency zhong" v-else></span>
									<div class="topic_img_box" v-show="item.kvImgurl && item.kvImgurl != ''">
										<!-- <img class="topic_img" :src="'http://'+item.kvImgurl" /> -->
										<img class="topic_img" :src="item.kvImgurl" />
									</div>
									<div class="topic_info_box flex_1"> 
										<a class="topic_title" :class="(item.kvImgurl && item.kvImgurl != '') ? 'topic_title_img' : ''"  target="_blank" :href="$store.state.oldyqmsUrl +'Browse/infoDetail?uuid='+ item.kvUuid +'&kruuid='+ item.krUuid +'&tid=01'+'&sid='+'&message='+'&state=xx'+'&type='+'&sourcetype='+ item.kvSourcetype +'&shareid='+ item.krUid +'&kvHot=1&keywordid='+ item.krKeywordid +'&orientation='+ item.orientation +'&KV_SIMHASH='+ item.kvSimhash +'&isLocal='+ item.isLocal" @click="$store.commit('maiDian','homepage_focustopics_detail')">
											<p v-clamp="{number: 2, size: 16}" v-html="item.KvTitleMakeRed"></p>
										</a>
										<div class="topic_info">
											<span class="topic_time">{{item.krCtime}}</span>
											<span>{{item.kvWebname}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</vue-scroll>
		</div>
		<!-- 删除模块提示 -->
		<new-dialog 
			:showDialog="showDelDialog" 
			title="删除模块" 
			confirmText="确定" 
			cancelText="取消" 
			@handleConfirm="handleConfirm" 
			@handleCancel="handleCancel" 
			@handleCloseMask="handleCloseMask" 
			:showConfirmBtn="showConfirmBtn" 
			:showCancleBtn="showCancleBtn">
			<div class="yqms_tips">确定删除模块吗？</div>
		</new-dialog>
		<!--切换专题开始-->
		<div class="switch_topic" :class="showSwitchDialog ? '' : 'hide'">
			<div class="pos_r">
				<div class="switch_title txt_c">选择替换当前专题</div>
				<span class="close_switch" @click="handleColseSwitch($event)">&times;</span>
			</div>
			<input class="filter_input" placeholder="输入专题名称" v-model="filterText" />
			<span class="search"></span>
			<v-tree :filterText="filterText" :treeData="treeData" @handleTree="handleSwitchTopic" class="change_tree"></v-tree>
		</div>
		<!--切换专题结束-->
	</div>
</template>
<script>
	let moment = require("moment");
	import newDialog from '@/components/newDialog/newDialog.vue'
	import vTree from '@/components/vTree/vTree.vue'
	import { getTopicListData ,getTopicByIdData,getSubjectTree } from '@/api/home'
	export default {
		name: 'topicList',
		data() {
			return {
				isImportant: false,
				isLoading: true,
				filterText: '',// 主题树过滤
				ops: { //滚动条配置
					vuescroll: {
						mode: 'native', //选择 vuescroll 一个模式, native(默认) 或者 slide 或者 pure-native
						sizeStrategy: 'percent', //设置 vuescroll的大小类型， 可选的有percent, number. 如果父元素大小为一个固定的px的值， 那么设置为百分比比较合适一些。
						detectResize: true, // 是否开启监听 dom resize . 默认 : true
					},
					scrollPanel: {
						// 是否允许x或y方向上的滚动，true为允许，false为不允许，默认为true
						scrollingX: false,
						scrollingY: true,
						//滚动动画
						easing: 'easeInQuad',
					},
					rail: { //滚动轨道
						background: '#f5f6f7', //设置滚动轨道背景色。默认 : #01a99a
						size: '4px', //设置轨道的尺寸。默认 : 5px
						opacity: 0, //设置轨道的透明度。默认 : 0
						keepShow: false, //设置是否即使在高度不够的情况下也显示 rail, 默认 : false 
						border: 'none', //Rail 的边框. 默认 : none 
						minSize: 0.1,
					},
					bar: { //滚动条
						showDelay: 500, //当不做任何操作时滚动条自动消失的时间 
						onlyShowBarOnScroll: true, //是否只在滚动的时候现实滚动条 
						keepShow: false, //是否保持rail显示,即使内容高度不足的情况下。
						background: '#d8d8d8', //背景色
						opacity: 1, //透明度
						hoverStyle: false, //当你鼠标移动到滚动条的时候滚动条的样式， 返回一个style对象， 和现在的对象融合
						minSize: 0.1, //可以是 false 或一个在(0, 1)之间的一个数组，如 0.25 代表 25%， 0.5 代表 50%。
						size: '3px', //bar's size(Height/Width) , default -> 6px
					}
				},
				showDelDialog: false, //是否显示弹窗
				showConfirmBtn: true, //是否显示确定按钮
				showCancleBtn: true, //是否显示取消按钮
				showSwitchDialog: false, //是否显示主题切换弹窗
				topicIdData: [], //专题的id	
				topicparams: {}, //接口参数
				topicListData: [], //根据专题id查询的数据	
				treeData: [], //专题树
				areaArr: [], //用来控制删除按钮是否显示
				topicIndex: 0, //专题下标
				modelTitleBox:'',
				iconBrder:'',
				iconBrderBtn: '',
				modelContentBox:'',
			}
		},
		components: {
			newDialog,
			vTree
		},
		props: {
			comparams: '',
			//是否显示模块中的删除按钮
			showCompilemask: {
				type: Boolean,
				default: false
			},
			index: '',
		},
		created() {
			this.topicparams = this.comparams == undefined ? {} : this.comparams;
			this.topicIndex = this.index || 0; 
		},
		mounted() {
			let _this = this;
			_this.$nextTick(function() {	
				//根据用户专题id查询对应的数据
				_this.getTopicById();
				// 是否显示模块中的删除按钮
				_this.areaArr = JSON.parse(localStorage.getItem('areaArr'));
			});
			_this.globalClick(_this.handleOtherClose);

			//单个专题，定时刷新，不同时刷
			setTimeout(function (){
				//每隔5分钟更新一下数据
			    window.setInterval(() => {
				  setTimeout(_this.getTopicById(), 0);
				}, 300000);
			}, 30000*(_this.topicIndex + 10));
			//数言舆情添加类
			if(this.$store.state.kuTempLate == 'UnicomProject'){
				if(this.$store.state.kuTempLateType == 0) {
					this.iconBrder = 'icon_border_unicom',
					this.iconBrderBtn = 'icon_border_unicom_right',
					this.modelContentBox = 'model_content_box_unicom'
				}
			}
		},
		methods: {
			//关闭所有添加专题树弹框
			handleOtherClose(e) {
				let eles = document.getElementsByClassName('switch_topic');
				let len = eles.length;
				for(let i = 0; i < len; i++) {
					eles[i].classList.add('hide');
				}
			},
			//关闭专题切换
			handleColseSwitch(event) {
				this.showSwitchDialog = false;
				let curEle = event.currentTarget;
				let lastEle = curEle.parentElement.parentElement;
				lastEle.classList.add('hide');
			},
			//切换专题
			switchTopic(event){
				let curEle = event.currentTarget;
				let tag = curEle.classList.toString().indexOf('hide') == -1;
				let lastEle = curEle.parentElement.parentElement.parentElement.lastElementChild;
				let mark = lastEle.classList.toString().indexOf('hide') == -1;
				this.handleOtherClose();
				if(mark) {
					this.showSwitchDialog = true;
					lastEle.classList.add('hide');
				}else {
					this.showSwitchDialog = false;
					lastEle.classList.remove('hide');
				}
				if(tag == mark) {
					this.showSwitchDialog = false;
					lastEle.classList.add('hide');
				}
				if(this.treeData.length == 0) {
					this.getSubjectTreeData();
				}  				
			},
			//切换专题关闭弹窗
			handleSwitchCloseMask() {
				this.showSwitchDialog = false;
			},
			//切换专题确定
			handleSwitchTopic(params) {
				let _this = this;
				let cur = (_this.topicparams.retitle == '') ? _this.topicparams.title : _this.topicparams.retitle; //当前专题别名
				//获取父组件的整体数据
				let parentAreaArr = this.areaArr; 
				//筛选出只包含专题的数组
				let totalTopicData = [];
				// 筛选出当前点击的对象，在数组中的位置
				let cur_position = 0;
				for(let i in parentAreaArr){
					let item = parentAreaArr[i];
					if(item.component == 'topicList'){
						totalTopicData.push(item);
					}
					//根据当前对象的专题id，查找在数组中的位置
					if(item.params.ksId == _this.topicparams.params.ksId){
						cur_position = i;
					}
				}
				let topicIds = '';  //筛选出已有专题的 id
				let tag = true;
				_this.filterText = '';
				_this.showSwitchDialog = false;
				for(let n in totalTopicData){
					let list = totalTopicData[n];
					topicIds += list.params.ksId +',';
				}
				topicIds = topicIds.slice(0,topicIds.length-1);
				// 切换的专题id和已有的专题的id重复，不让切换
				if(topicIds.indexOf(params.id) !== -1){
					let tips = '';
					for(let i in totalTopicData){
						if(totalTopicData[i].params.ksId == params.id){
							tips = totalTopicData[i].retitle;
						}
					}
					if(tips != ''){
						alert('该切换的专题已存在，（别名：' + tips +'），请更换其他专题！');
					}else{
						alert('该切换的专题已存在，请更换其他专题！');
					}
					tag = false;
				}		
				tag && _this.$emit('switchTopic', params, cur, cur_position);
			},
			//切换专题取消
			handleSwitchCancel() {
				this.showSwitchDialog = false;
			},
			//删除专题
			delTopic() {
				this.showDelDialog = true;
			},
			//关闭弹窗
			handleCloseMask() {
				this.showDelDialog = false;
			},
			//确定
			handleConfirm() {
				let _this = this;
				_this.showDelDialog = false;
				//每个模块删除时使用 —— 更新showCompilemask的值,往父级找
				_this.$emit('handleModelDelete',_this.topicparams);
			},
			//取消
			handleCancel() {
				this.showDelDialog = false;
			},
			//获取专题树
			getSubjectTreeData() {
				let _this = this;
				getSubjectTree({type: 2}).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						_this.treeData = res.data.result.data.subjectTree;
					}else{
						alert('获取数据失败！');
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//根据用户专题id查询对应的数据
			getTopicById(){
				let _this = this;
				let data = {
					classifyId: '', //分类id
					kkIdList: '', //专题id
					isread: -1,  //一直是 -1
					shareUserId: _this.$store.state.ZHXGUSERID, //用户id
					userid: _this.$store.state.ZHXGUSERID, //用户id
					session: _this.$store.state.ACCESSTOKEN, //用户id
					orderName: _this.$store.state.kuOrdertime //0发布时间    1采集时间
					//isRepeat: 1 //根据samehash去重
				}
				// ksType 1：专题，2：分类  3 地域专题	
				if(_this.topicparams.params.ksType == '1' || _this.topicparams.params.ksType == '3'){
					data.kkIdList = _this.topicparams.params.ksId; //专题id
				}else if(_this.topicparams.params.ksType == '2'){
					data.classifyId = _this.topicparams.params.ksId; //分类id
				}
				getTopicByIdData(_this.topicparams.api,data).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data == ''){ //处理分类
						_this.isLoading = false;
						_this.topicListData = [];
					}else if(res.data.status == '0') {
						_this.isLoading = false;
						_this.topicListData = res.data.result.data || [];
						for (let i in _this.topicListData) {
							let item = _this.topicListData[i];
							//时间格式化处理
							let beforeHouer = moment(item.krCtime, "YYYY-MM-DD HH:mm").startOf('minute').fromNow();
							item.krCtime = beforeHouer;
							// if(beforeHouer == '1 小时前'){
							// 	item.krGtime = beforeHouer;
							// }else{
							// 	item.krGtime = moment(item.krGtime, "YYYYMMDDHHmmss").format('YYYY-MM-DD');
							// }
						}
					}else{
						alert('获取数据失败！');
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			}
		},
	}
</script>

<style scoped>
	@import url("./topicList.css");
</style>

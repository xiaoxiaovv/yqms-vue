<template>
	<div class="common_width m_right home_center1_box border_box flex_column" @mouseleave.prevent="handleLeavePush">
		<div class="model_title_box item_vertical model_1" :class="showCompilemask ? 'handle_draggle' : ''">
			<div class="model_title_left">
				<span class="icon_bg iconbg_01" :class="iconBrder"></span>
				<a v-show="showCompilemask" class="model_title cursor_move" href="javascript:void(0);" target="_blank">{{params.retitle || params.title}}</a>
				<a v-show="!showCompilemask" class="model_title" :href="$store.state.oldyqmsUrl +'Pushwarning/index'" target="_blank" @click="$store.commit('maiDian','homepage_pushwarning')">{{params.retitle || params.title}}</a>
			</div>
			<div class="model_title_right">
				<span class="del_btn" title="删除" v-show="showCompilemask && areaArr.length > 1" @click.stop="delTopic"></span>
			</div>
		</div>
		<loading v-if="isLoading"></loading>
		<nodata v-if="!isLoading && !warningListData.length"></nodata> 
		<div class="model_content_box flex_1" :class="modelContentBox">
			<!-- 外层盒子 -->
			<div class="push_box">
				<!-- 这里的标签名称要和main.js文件中定义的组件名称保持一致 -->
				<vue-scroll :ops="ops" ref="vs" @handle-scroll="handleScroll" v-if="warningListData.length > 0">
					<!-- 内层盒子——内容区 -->
					<div class="flex pos_r push_item" v-for="(item, index) of warningListData" :key="index">
						<div class="line"></div>
						<div class="icon_circle_box">
							<div class="icon_center_push icon_circle" :class="curIndex == index ? 'icon_circle_active' : ''"></div>
						</div>
						<div class="push_info" :class="curIndex == index ? 'push_info_active' : ''" @mouseleave.prevent="handleMouseLeavePush(index)" @mouseenter.prevent="handleMouseEnterPush(index)">
							<div class="push_info_title">
								<!-- 长参数
								 <a :href="$store.state.oldyqmsUrl +'Pushwarning/infoDetail?uuid='+ item.infoId +'&tid='+'&sid='+'&message='+'&state='+'&type='+'&sourcetype='+ item.sourceType +'&ksid='+ item.uuid +'&isLocal='" target="_blank" class="push_title">
									<div v-clamp.number="2">{{item.title}}</div>
								</a> -->
								<a :href="$store.state.oldyqmsUrl +'Pushwarning/infoDetail?uuid='+ item.infoId +'&ksid='+ item.uuid +'&isLocal='+ item.overseas" target="_blank" class="push_title" @click="$store.commit('maiDian','homepage_pushwarning_detail')">
									<div v-clamp="{number: 2, size: 16}" v-html="item.title"></div>
								</a>
							</div>
							<div class="push_info_from ellipsis" :class="curIndex == index ? 'push_info_from_active' : ''">
								{{item.warningTime}}&bull;{{item.webname}}
							</div>
							<div class="dashed_bottom" :class="9 == index ? 'hide' : ''"></div>
						</div>
					</div>
				</vue-scroll>
			</div>
		</div>
		<!-- 删除模块提示 -->
		<new-dialog :showDialog="showDelDialog" title="删除模块" confirmText="确定" cancelText="取消" @handleConfirm="handleConfirm" @handleCancel="handleCancel" @handleCloseMask="handleCloseMask" :showConfirmBtn="showConfirmBtn" :showCancleBtn="showCancleBtn">
			<div class="yqms_tips">确定删除模块吗？</div>
		</new-dialog>
	</div>
</template>

<script>
	let moment = require("moment");
	import newDialog from '@/components/newDialog/newDialog.vue'
	import { getWarningListData } from '@/api/home'
	// console.log(moment("20181120105905", "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss'));

	export default {
		name: 'pushWarning',
		data() {
			return {
				isLoading: true,
				ops: { //滚动条配置
					vuescroll: {
						//选择 vuescroll 一个模式, native(默认) 或者 slide 或者 pure-native
						mode: 'native',
						//设置 vuescroll的大小类型， 可选的有percent, number. 如果父元素大小为一个固定的px的值， 那么设置为百分比比较合适一些。
						sizeStrategy: 'percent',
						// 是否开启监听 dom resize . 默认 : true
						detectResize: true,
					},
					scrollPanel: {
						// 是否允许x或y方向上的滚动，true为允许，false为不允许，默认为true
						scrollingX: false,
						scrollingY: true,
						//滚动动画
						easing: 'easeInQuad',
					},
					//滚动轨道
					rail: {
						//设置滚动轨道背景色。默认 : #01a99a
						background: '#f5f6f7',
						//设置轨道的尺寸。默认 : 5px
						size: '4px',
						//设置轨道的透明度。默认 : 0
						opacity: 0,
						//设置是否即使在高度不够的情况下也显示 rail, 默认 : false
						keepShow: false,
						//Rail 的边框. 默认 : none
						border: 'none',
					},
					//滚动条
					bar: {
						//当不做任何操作时滚动条自动消失的时间 
						showDelay: 500,
						//是否只在滚动的时候现实滚动条 
						onlyShowBarOnScroll: true,
						//是否保持rail显示,即使内容高度不足的情况下。
						keepShow: false,
						//背景色
						background: '#d8d8d8',
						//透明度
						opacity: 1,
						//当你鼠标移动到滚动条的时候滚动条的样式， 返回一个style对象， 和现在的对象融合
						//hoverStyle: false,
						//可以是 false 或一个在(0, 1)之间的一个数组，如 0.25 代表 25%， 0.5 代表 50%。
						minSize: 0.25,
						//bar's size(Height/Width) , default -> 6px
						size: '3px',
					},
				},
				//当前选中信息下标
				curIndex: 0,
				showDelDialog: false, //是否显示弹窗
				showConfirmBtn: true, //是否显示确定按钮
				showCancleBtn: true,  //是否显示取消按钮
				warningListData: [],   //推送预警列表数据
				params: {}, //接收父级传来的参数
				areaArr: [], //用来控制删除按钮是否显示
				iconBrder:'',
				modelContentBox:'',
			}
		},
		components: {
			newDialog,
		},
		props: {
			comparams: '',
			//是否显示模块中的删除按钮
			showCompilemask: {
				type: Boolean,
				default: false
			},
		},
		created() {
			this.params = this.comparams == undefined ? {} : this.comparams;
		},
		mounted() {
			let _this = this;
			_this.$nextTick(function() {	
				_this.getWaringData();
				// 是否显示模块中的删除按钮
				_this.areaArr = JSON.parse(localStorage.getItem('areaArr'));
			});
			//每隔5分钟更新一下数据
			window.setInterval(() => {
				setTimeout(_this.getWaringData(), 0);
			},300000);
			
			if(this.$store.state.kuTempLate == 'UnicomProject'){
				if(this.$store.state.kuTempLateType == 0) {
					this.iconBrder = 'icon_border_unicom',
					this.modelContentBox = 'model_content_box_unicom'
				}
			}
		},
		methods: {
			handleScroll(vertical) {
				//let _this = this;
				//_this.curIndex = Math.floor(vertical.scrollTop / 70);
				//console.log('curIndex=========',vertical.scrollTop, Math.floor(vertical.scrollTop / 90));
			},
			//鼠标移出预警模块
			handleLeavePush() {
				this.curIndex = 0;
			},
			handleMouseLeavePush(index){
				
			},
			//鼠标移入
			handleMouseEnterPush(index) {
				this.curIndex = index;
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
				_this.$emit('handleModelDelete',_this.params);
			},
			//取消
			handleCancel() {
				this.showDelDialog = false;
			},
			//获取预警列表数据
			getWaringData() {
				let _this = this;
				_this.params.api = (_this.params.api == '') ? 'customHomePage/waringList' : _this.params.api;
				getWarningListData(_this.params.api).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						_this.isLoading = false;
						_this.warningListData = res.data.result.data || [];
						//_this.warningListData = _this.warningListData.concat(_this.warningListData);
						for (let i in _this.warningListData) {
							let item = _this.warningListData[i];
							//几分钟前
							let beforeMinute = moment(item.warningTime, "YYYYMMDDHHmmss").startOf('minute').fromNow();
							// 几分钟前 几小时前 几天前 几个月前处理  暂时不要删掉！！！
							// let reg = '分钟前';
							// if(beforeMinute.indexOf(reg) == -1){
							// 	item.warningTime = beforeMinute;
							// }else{
							// 	item.warningTime = moment(item.warningTime, "YYYYMMDD").format('YYYY-MM-DD');
							// }
							item.warningTime = beforeMinute;
						}
					}
				}).catch(err => {
					console.log(err, '请求失败！');
					_this.isLoading = false;
				});
			},
		}
	}
</script>

<style scoped>
	@import url("./pushWarning.css");
</style>
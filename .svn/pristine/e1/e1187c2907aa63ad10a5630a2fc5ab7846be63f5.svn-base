<template>
	<div class="common_width m_right home_center3_box border_box flex_column">
		<div class="model_title_box item_vertical model_3" :class="showCompilemask ? 'handle_draggle' : ''">
			<div class="model_title_left">
				<span class="icon_bg iconbg_03" :class="iconBrder"></span>
				<a v-show="showCompilemask" class="model_title cursor_move" href="javascript:void(0);" target="_blank">{{params.retitle || params.title}}</a>
				<router-link v-show="!showCompilemask" tag="a" class="model_title" :to="{path: 'headlinedetail'}" target="_blank" @click.native="$store.commit('maiDian','homepage_siteheadlines')">{{params.retitle || params.title}}</router-link>
			</div>
			<div class="model_title_right">
				<span class="del_btn" title="删除" v-show="showCompilemask && areaArr.length > 1" @click.stop="delTopic"></span>
			</div>
		</div>
		<div class="model_content_box flex_1" :class="modelContentBox">
			<loading v-if="isLoading"></loading>
			<nodata v-if="!isLoading && !headlinesData.length"></nodata>
			<vue-scroll :ops="ops" ref="headlines" v-if="headlinesData.length > 0">
				<div class="model_content border_box">
					<div class="article_item" v-for="(item,i) of headlinesData">
						<div class="shadow_wrapper">
							<div class="shadow_card"></div>
							<div class="shadow_content border_box">
								<div class="item_top flex_verticle">
									<span class="icon_bg item_icon"></span>
									<a :href="item.url" class="item_title ellipsis flex_1" target="_blank" @click="$store.commit('maiDian','homepage_siteheadlines_detail')">{{item.title}}</a>
								</div>
								<div class="item_btom">
									<span class="item_time">{{item.pushTime}}</span>
									<span class="item_source">{{item.siteName}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</vue-scroll>
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

	import { getHeadlinesData } from '@/api/home'

	export default {
		data() {
			return {
				isLoading: true,
				headlinesData: [], //站点头条数据
				params: {}, //接收父级传来的参数
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
						hoverStyle: false,
						//可以是 false 或一个在(0, 1)之间的一个数组，如 0.25 代表 25%， 0.5 代表 50%。
						minSize: 0.1,
						//bar's size(Height/Width) , default -> 6px
						size: '3px',
					}
				},
				showDelDialog: false, //是否显示弹窗
		        showConfirmBtn: true, //是否显示确定按钮
		        showCancleBtn: true,  //是否显示取消按钮
		        areaArr: [], //用来控制删除按钮是否显示
		        queryParams: {
					type: '',      //默认查全部
					pageSize:'10',       //每页条数
	            	pageNum:1,           //当前页数
				},
				iconBrder:'',
				modelContentBox:'',
			}
		},
		components: {
			newDialog,
		},
		props: ['comparams','showCompilemask'],
		created() {
			this.params = this.comparams == undefined ? {} : this.comparams;
		},
		mounted() {
			this.$nextTick(function() {	
				this.getData();
				// 是否显示模块中的删除按钮
				this.areaArr = JSON.parse(localStorage.getItem('areaArr'));
			});
			if(this.$store.state.kuTempLate == 'UnicomProject'){
				if(this.$store.state.kuTempLateType == 0) {
					this.iconBrder = 'icon_border_unicom',
					this.modelContentBox = 'model_content_box_unicom'
				}
			}
		},
		methods: {
			//获取站点头条数据
			getData() {
				let _this = this;
				_this.params.api = (_this.params.api == '') ? 'customHomePage/getHeadLinesList' : _this.params.api;
				getHeadlinesData(_this.params.api,_this.queryParams).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						_this.isLoading = false;
						_this.headlinesData = res.data.result.data || [];
						for (let i in _this.headlinesData) {
							let item = _this.headlinesData[i];
							item.notime = item.pushTime;
							//时间格式化处理
							let beforeHouer = moment(item.pushTime, "YYYYMMDDHHmmss").startOf('minute').fromNow();
							item.pushTime = beforeHouer;
							// if(beforeHouer == '1 小时前'){
							// 	item.pushTime = beforeHouer;
							// }else{
							// 	item.pushTime = moment(item.pushTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD');
							// }
						}
					}
				}).catch(err => {
					console.log(err, '请求失败！');
					_this.isLoading = false;
				});
			},
			//滚动条事件
			// handleScroll(vertical, horizontal, nativeEvent) {
			// 	// console.log(vertical, horizontal, nativeEvent);
			// },
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
		}
	}
</script>

<style scoped>
	@import url("./siteHeadlines.css");
</style>
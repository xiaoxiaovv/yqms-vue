<template>
	<div class="common_width m_right home_center2_box border_box flex_column">
		<div class="model_title_box item_vertical model_2" :class="showCompilemask ? 'handle_draggle' : ''">
			<div class="model_title_left">
				<span class="icon_bg iconbg_02" :class="iconBrder"></span>
				<span class="model_title">{{params.retitle || params.title}}</span>
			</div>
			<div class="model_title_right">
				<span class="del_btn" title="删除" v-show="showCompilemask && areaArr.length > 1" @click.stop="delTopic"></span>
			</div>
		</div>
		<loading v-if="isLoading"></loading>
		<nodata v-if="!isLoading && !sourceData.length"></nodata>
		<div class="model_content_box flex_1" :class="modelContentBox">
			<!--echart start-->
			<div class="echart_box">
				<!-- <div class="echart_center" @click="handleEchartCenterClick"></div> -->
				<a class="echart_center" :href="$store.state.oldyqmsUrl + 'Browse/index?tid=01&sourcetype=&state=xx&repeat=1&isread=&time=day&site=&orientation=&type=&message=&site=&cities=&province=&infoSourceLevel=&wechatInfoType=&mate=&region=&position=&distance=&filter=&ignore_loc=0&ignore_topic=0&ignore_a=0&isocr=&tags=&importance=&isOcr=&ishover=1&customFilter='" target="_blank" @click="$store.commit('maiDian','homepage_statistics_today_total')"></a>
				<div ref="myEchart" class="my_chart"></div>
			</div>
			<!--echart end-->
			<div class="flex h_center" v-show="sourceData.length > 0">
				<div class="echart_title_l">
					<span class="icon_echart_center icon_sector_blue"></span><span>总数</span>
				</div>
				<div>
					<span class="icon_echart_center icon_sector_red"></span><span>负面</span>
				</div>
			</div>
			<!--13-->
			<div class="wfull echart_info_box">
				<div v-if="sourceData.length > 0" class="echart_info" v-for="(item,i) of sourceData" :key="item.name">
					<div><span class="icon_echart_center" :class="'source_'+item.sourceType"></span>{{item.name}}</div>
					<a class="txt_all" :href="$store.state.oldyqmsUrl + 'Browse/index?tid=01&sourcetype='+ item.sourceType + '&state=xx&repeat=1&isread=&time=day&site=&orientation=&type=&message=&site=&cities=&province=&infoSourceLevel=&wechatInfoType=&mate=&region=&position=&distance=&filter=&ignore_loc=0&ignore_topic=0&ignore_a=0&isocr=&tags=&importance=&isOcr=&ishover=1&customFilter='" target="_blank" @click="$store.commit('maiDian','homepage_statistics_num_'+item.sourceType+'_total')">{{item.value}}</a>
					<a class="txt_fu" :href="$store.state.oldyqmsUrl + 'Browse/index?tid=01&sourcetype='+ item.sourceType + '&state=xx&repeat=1&isread=&time=day&site=&orientation=2&type=&message=&site=&cities=&province=&infoSourceLevel=&wechatInfoType=&mate=&region=&position=&distance=&filter=&ignore_loc=0&ignore_topic=0&ignore_a=0&isocr=&tags=&importance=&isOcr=&ishover=1&customFilter='" target="_blank" @click="$store.commit('maiDian','homepage_statistics_num_'+item.sourceType+'_fu')">{{item.negativeCount}}</a>
				</div>
			</div>
			<!--13-->
		</div>
		<!-- 删除模块提示 -->
		<new-dialog :showDialog="showDelDialog" title="删除模块" confirmText="确定" cancelText="取消" @handleConfirm="handleConfirm" @handleCancel="handleCancel" @handleCloseMask="handleCloseMask" :showConfirmBtn="showConfirmBtn" :showCancleBtn="showCancleBtn">
			<div class="yqms_tips">确定删除模块吗？</div>
		</new-dialog>
	</div>
</template>

<script>
	import newDialog from '@/components/newDialog/newDialog.vue'

	import { getSourceTypeData } from '@/api/home'

	// 引入基本模板
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/pie')
	// 引入提示框和title组件
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')
	require('echarts/lib/component/legend')

	export default {
		name: 'monitorEchart',
		data() {
			return {
				isLoading: true,
				sourceData: [], //来源数据
				showDelDialog: false, //是否显示弹窗
				showConfirmBtn: true, //是否显示确定按钮
				showCancleBtn: true, //是否显示取消按钮
				params: {}, //接收父级传来的参数
				isApi: true,
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
		watch: {
			sourceData: function(newValue, oldValue) {
				if(newValue.toString() == oldValue.toString()) {
					_this.isApi = false;
				}
			}
		},
		created() {
			this.params = this.comparams == undefined ? {} : this.comparams;
		},
		mounted() {
			let _this = this;
			let myEchart = echarts.init(_this.$refs.myEchart);
			_this.$nextTick(function(){
				//获取今日媒体类型统计
				_this.isApi && _this.getEchartsData(myEchart);
				_this.handleEchartClick(myEchart,_this.$store);
				/*echart 根据浏览器缩放变化*/
				window.addEventListener('resize', () => {
					myEchart.resize();
				});
				// 是否显示模块中的删除按钮
				_this.areaArr = JSON.parse(localStorage.getItem('areaArr'));
			});

			if(this.$store.state.kuTempLate == 'UnicomProject'){
				if(this.$store.state.kuTempLateType == 0) {
					this.iconBrder = 'icon_border_unicom',
					this.modelContentBox = 'model_content_box_unicom'
				}
			}
		},
		methods: {
			//echart 点击事件
			handleEchartClick(myEchart,store) {
				let _this = this;
				myEchart.on("click", function(params) {
					let url = store.state.oldyqmsUrl + 'Browse/index?tid=01&sourcetype='+ params.data.sourceType + '&state=xx&repeat=1&isread=&time=day&site=&orientation=&type=&message=&site=&cities=&province=&infoSourceLevel=&wechatInfoType=&mate=&region=&position=&distance=&filter=&ignore_loc=0&ignore_topic=0&ignore_a=0&isocr=&tags=&importance=&isOcr=&ishover=1&customFilter=';
					window.open(url);
					//埋点统计——echarts图中的媒体类型
					_this.$store.commit('maiDian','homepage_statistics_echarts_'+params.data.sourceType);
				});
			},
			//echart 中部点击
			// handleEchartCenterClick() {
			// 	alert('您点击了中部 ');
			// },
			//渲染echart
			initEchart(myEchart) {
				let _this = this;
				let scale = 1;
				let echartData = _this.sourceData || [];
				let option = {
					backgroundColor: '#fff',
					title: {
						text: '今日总数',
						left: 'center',
						top: '38%',
						padding: [24, 0],
						textStyle: {
							color: '#7c7c7c',
							fontSize: 12 * scale,
							align: 'center'
						}
					},
					legend: {
						show: true,
						selectedMode: false,
						formatter: function(name) {
							let total = 0; //各科正确率总和
							let averagePercent; //综合正确率
							echartData.forEach(function(value, index, array) {
								total += value.value;
							});
							return total;
						},
						data: [echartData[0].name],
						left: 'center',
						top: '36%',
						icon: 'none',
						align: 'center',
						textStyle: {
							color: '#191919',
							fontWeight: 'bold',
							fontSize: 18 * scale,
						},
					},
					series: [{
						name: '总考生数量',
						type: 'pie',
						radius: ['40%', '50%'],
						center: ['50%', '44%'],
						selectedMode: 'single',
						hoverAnimation: false,
						color: ['#297bc0', '#a6cd53', '#f8b130', '#e87863', '#7d57ff', '#b455c6', '#4886e8', '#4bb5d7', '#de7340', '#7988c2', '#d9d553'],
						label: {
							normal: {
								formatter: function(params, ticket, callback) {
									let total = 0; //总数量
									let percent = 0; //占比
									echartData.forEach(function(value, index, array) {
										total += value.value;
									});
									percent = total ? ((params.value / total) * 100).toFixed(1) : 0;
									return params.name + '(' + percent + '%)';
								},
								//padding: [0, -70],
								textStyle: {
									fontSize: 13 * scale,
								}
							},
						},
						labelLine: {
							normal: {
								length: 13 * scale,
								length2: 13,
								lineStyle: {}
							}
						},
						data: echartData
					}]
				};
				myEchart.setOption(option);
			},
			//获取今日媒体类型统计
			getEchartsData(myEchart) {
				let _this = this;
				_this.params.api = (_this.params.api == '') ? 'customHomePage/getSourceTypeCount' : _this.params.api; 
				let typeTime = (this.$store.state.kuOrdertime =='1') ? '':'ctime';
				getSourceTypeData(_this.params.api,{type:typeTime}).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						_this.isLoading = false;
						let eData = [];
						let result = res.data.result.data || [];
						if(result) {
							for(let i in result) {
								let item = result[i];
								let total = item.positiveCount + item.negativeCount + item.neutralCount;
								if(item.sourceType != '10') {
									eData.push({
										'value': total,
										'name': item.sourceTypeName,
										'sourceType': item.sourceType,
										'positiveCount': item.positiveCount,
										'negativeCount': item.negativeCount,
										'neutralCount': item.neutralCount
									});
									// eData[i].value = total;
									// eData[i].name = item.sourceTypeName;
									// eData[i].sourceType = item.sourceType;
									// console.log(eData)
								}
							}
							if(eData.length > 0){
								_this.sourceData = eData;
								_this.initEchart(myEchart);
							}
						}
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
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
		}
	}
</script>

<style scoped>
	@import url("./monitorEchart.css");
</style>

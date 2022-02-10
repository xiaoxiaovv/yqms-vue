<template>
	<div class="home_center" :class="homeCenterBox">
		<div class="home-center-content border_box clearfix">
			<draggable v-model="areaArr" :options="options" @mousedown="move" @start="drag=true" @end="drag=false" v-if="areaArr.length > 0">
				<component 
					v-for="(item,i) of areaArr" 
					:key="Math.random()" 
					:index="i"
					:is="item.component" 
					:comparams.sync="item" 
					:showCompilemask.sync="showCompilemask"
					@switchTopic="handleSwitchTopic"
					@handleModelDelete="handleModelDelete">
				</component>
				<!-- 提示添加关注专题 -->
				<empty-topic v-show="isShowEmptyTopic || false" @addModelHome="addModel"></empty-topic>
			</draggable>
		</div>
	</div>
</template>

<script>
	import draggable from 'vuedraggable'
	import pushWarning from '@/views/home/components/pushWarning/pushWarning.vue'
	import monitorEchart from '@/views/home/components/monitorEchart/monitorEchart.vue'
	import siteHeadlines from '@/views/home/components/siteHeadlines/siteHeadlines.vue'
	import events from '@/views/home/components/events/events.vue'
	import topicList from '@/views/home/components/topicList/topicList.vue'
	import emptyTopic from '@/views/home/components/emptyTopic/emptyTopic.vue'
	import newDialog from '@/components/newDialog/newDialog.vue'
	 import VueCookies from 'vue-cookies'

	import { getTopicListData, getHomePageData, getTopicByIdData } from '@/api/home'

	export default {
		name: 'homeCenter',
		data() {
			return {
				//拖拽控制
				options: {
					group: 'area', //分组
					animation: 400, //动画事件
					handle: '.handle_draggle', //拖拽手柄
					preventOnFilter: true, // 调用“event.preventDefault()”时触发“filter”
					forceFallback: false, // 忽略HTML5的DnD行为，并强制退出。（h5里有个属性也是拖动，这里是为了去掉H5拖动对这个的影响）
					fallbackOnBody: false, // 将克隆的DOM元素添加到文档的主体中。（默认放在被拖动元素的同级）
					scroll: true,        //当排序的容器是个可滚动的区域，拖放可以引起区域滚动
					//ghostClass: 'ghostClass',
				},
				//初始化模块
				areaArr: [],
				homeCenterBox: '',
			}
		},
		computed: {
			//是否显示添加专题
			isShowEmptyTopic: function() {
				let topicList = this.areaArr.filter(function(item) {
					return(item && (item.component == 'topicList'));
				})
				return(topicList.length >= 3) ? false : true;
			}
		},
		components: {
			draggable,
			pushWarning,
			monitorEchart,
			siteHeadlines,
			events,
			topicList,
			emptyTopic,
			newDialog,
		},
		props: {
			//是否显示模块中的删除按钮
			showCompilemask: {
				type: Boolean,
				default: false
			}
		},
		created() {
			//拖拽时，解决火狐浏览器新打开一个页面搜索
			document.body.ondrop = function(event) {
				event.preventDefault();
				event.stopPropagation();
			}
		},
		beforeMount() {
			//获取首页数据
			this.getPageData();
		},
		mounted() {
			//获取用户专题
			//this.getTopicData();

			//判断用户类型显示背景色
			if(this.$store.state.kuTempLate == 'UnicomProject'){
				if(this.$store.state.kuTempLateType == 0) {
					this.homeCenterBox = 'home_center_unicom'
				}
			}
		},
		methods: {
			move() {
				document.onmouseup = (e) => {
					document.onmousemove = null;
            		document.onmouseup = null
				}
			},
			//首页添加模块
			addModel(data) {
				this.$emit('addModelHomePage',data);
				this.$emit('triggerHomePage');
			},
			//处理专题切换
			handleSwitchTopic(params, cur, pos) {
				let _this = this;
				let len = _this.areaArr.length;
				for(let i = 0; i < len; i++) {
					let item = _this.areaArr[i];
					// 切换的专题id和已有的专题的id重复，不让切换
					if(item.component == 'topicList' && i == pos){
						item.component = 'topicList';
						item.title = params.name;
						item.retitle = params.name;
						item.api = 'YqllIframe!getHomePageSubjectList.do';
						item.params = {
							ksId: params.id,
							ksType: params.kstype
						};
					}
				}
				// localStorage.setItem('areaArr', JSON.stringify(_this.areaArr));
				//保存数据
				_this.$parent.savePageData('save');
				//埋点统计——首页自定义——专题切换
				_this.$store.commit('maiDian','homepage_switch_topic');
			},
			//获取首页数据
			getPageData() {
				let _this = this;
				getHomePageData({}).then(res => {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						let data = res.data.result.data.areaArr;
						if(data.length > 0) {
							_this.areaArr = JSON.parse(data);
							localStorage.setItem('areaArr', JSON.stringify(_this.areaArr));
						} else {
							_this.getTopicData();
						}
					} else {
						alert('获取数据失败！');
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//获取用户专题
			getTopicData() {
				let _this = this;
				let parms = {
					subjectNum: 3
				};
				let default_areaArr = [
					{
						component: 'pushWarning', //组件名称
						title: '推送预警', //标题名  唯一性  可以充当模块删除标识
						retitle: '推送预警', //别名
						api: 'customHomePage/waringList', //接口名
						params: '', //接口参数对象 类型对象
					},
					{
						component: 'monitorEchart',
						title: '监测统计',
						retitle: '监测统计',
						api: 'customHomePage/getSourceTypeCount',
						params: '',
					},
					{
						component: 'siteHeadlines',
						title: '站点头条',
						retitle: '站点头条',
						api: 'customHomePage/getHeadLinesList',
						params: '',
					},
					{
						component: 'events',
						model: 'events',
						title: '事件',
						retitle: '事件',
						api: 'customHomePage/selectRecommendEventAnalysisList',
						params: '',
					}
				];

				getTopicListData(parms).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						let result = res.data.result.data || [];
						if(result) { 
							let topicIdData = []; //专题的id
							// ksType 1：专题，2：分类  3 地域专题	
							for(let i in result) {
								let item = result[i];
								topicIdData.push({
									ksId: item.ksId,
									name: item.kkName,
									ksType: item.ksType
								});
							} 
							for(let m in topicIdData) {
								let list = topicIdData[m]; 
								default_areaArr.push({
									component: 'topicList',
									title: list.name,
									retitle: list.name,
									api: 'YqllIframe!getHomePageSubjectList.do',
									params: {
										ksId: list.ksId,
										ksType: list.ksType
									},
								});
							} 
							//针对 areaArr 的值去重
							let newArr = [];
							let obj = {};
							for(let i = 0; i < default_areaArr.length; i++) {
								if(!obj[default_areaArr[i].title]) {
									newArr.push(default_areaArr[i]);
									obj[default_areaArr[i].title] = true;
								}
							} 
			                _this.areaArr = default_areaArr;
					        localStorage.setItem('areaArr', JSON.stringify(_this.areaArr));
						}
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//每个模块删除时使用 —— 更新showCompilemask的值,往父级找
			handleModelDelete(data){
				let _this = this;
				//获取父组件的整体数据
				let parentArr = _this.areaArr; 
				// 首页处理只有一个模块时，不许删除
				if(parentArr.length > 1){
					//删除对应的模块
					for(let i = 0; i < parentArr.length; i++){
						let item = parentArr[i];
						let title =item.retitle || item.title;
						//针对专题删除，依据专题id删
						if(item.component == 'topicList'){
							if(item.params.ksId == data.params.ksId){
								parentArr.splice(i,1);
								localStorage.setItem('areaArr', JSON.stringify(parentArr));
							}
						}else{ 
							//针对非专题删除，依据模块名或者别名删除，数组中的title是固定不变的
							if(item.title == data.title){
								parentArr.splice(i,1);
								localStorage.setItem('areaArr', JSON.stringify(parentArr));
							}
						}
					}
				}else{
					// alert('首页最少展示一个模块！');
					// return false;
				}
			}
		}
	}
</script>

<style>
	@import url("./homeCenter.css");
</style>
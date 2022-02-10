<template>
	<div class="wrap">
		<!--头部开始-->
		<yqms-header ref="header" funName="首页" :showCompilemask="showCompilemask"></yqms-header>
		<!--头部结束-->
		<!--中间开始-->
		<div class="headline_content_wrap">
			<div class="headline_content_box border_box clearfix">
				<!-- 条件筛选 -->
				<div class="headline_select_box">
					<ul class="headline_select_content">
						<li class="headline_select_item border_box" v-for="(ops,i) of selectData"  :key="ops.id" :class="{hover: queryParams.type == ops.status}" @click="selectOps(ops)">{{ops.name}}</li>
					</ul>
				</div>
				<!-- <loading v-if="isLoading"></loading> -->
				<!-- 信息列表 -->
				<div class="headline_list_box" v-if="listData.length > 0">
					<div class="headline_list flex" v-for="(item,i) of listData" :key="i">
						<div class="headline_time">{{item.pushTime}}</div>
						<div class="headline_info flex_1 ellipsis">
							<a :href="item.url" target="_blank" class="headline_title ellipsis border_box">{{item.title}}</a>
							<p class="headline_source">{{item.siteName}}</p>
							<p class="headline_abstract">{{item.contentAbstract}}</p>
						</div>
					</div>
					<!-- 分页 -->
              		<pagenation :pages="pages" :current.sync="queryParams.pageNum" :totals="total" @navpage="clickPage" v-show="listData != ''"></pagenation>
				</div>
				<!-- 空数据 -->
				<div class="headline_nodata" v-else >
					<nodata></nodata>
				</div>
			</div>
			
		</div>
		<!--中间结束-->
		<!--底部开始-->
		<yqms-footer></yqms-footer>
		<!--底部结束-->
		<!--侧边栏开始-->
		<yqms-sidebar></yqms-sidebar>
		<!--侧边栏结束-->
		<!--推送预警弹窗开始-->
		<yqms-pushwaring></yqms-pushwaring>
		<!--推送预警弹窗结束-->
	</div>
</template>

<script>
	let moment = require("moment");
	import yqmsHeader from '@/components/header/header.vue'
	import yqmsFooter from '@/components/footer/yqmsFooter.vue'
	import yqmsSidebar from '@/components/sidebar/sidebar.vue'
	import yqmsPushwaring from '@/components/pushWaring/pushWaring.vue'
	import pagenation from '@/components/pagenation/pagenation.vue'
	
	import { getHeadLinesListsData } from '@/api/home'

	export default {
		data() {
			return {
				// isLoading: true, //加载效果
				showCompilemask: false, //是否显示首页自定义,显示时，所有模块的删除按钮显示
				selectData: [   //nav
					{
						status: '',
						name:'全部'
					},
					{
						status: '01',
						name:'人民网'
					},
					{
						status: '02',
						name:'新华网'
					},
					{
						status: '03',
						name:'凤凰网'
					},
					{
						status: '04',
						name:'新浪网'
					},
					{
						status: '05',
						name:'腾讯网'
					},
					{
						status: '06',
						name:'搜狐网'
					},
					{
						status: '07',
						name:'网易'
					}
				],
				queryParams: {
					type: '',      //默认查全部
					pageSize:'10',       //每页条数
	            	pageNum:1,           //当前页数
				},
				pages: 1,               //总页数
				total: 0,               //总条数
				listData: [],           //列表数据
			}
		},
		components: {
			yqmsHeader,
			yqmsFooter,
			yqmsSidebar,
			yqmsPushwaring,
			pagenation
		},
		props: {},
		methods: {
			//查询数据
			queryData(){
		        let _this = this;
		        let parms = 'customHomePage/getHeadLinesLists';
				getHeadLinesListsData(parms,_this.queryParams).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						// _this.isLoading = false;
						_this.listData = res.data.result.data || [];
						_this.total = res.data.result.total;  //总条数
		           		_this.pages = Math.ceil(res.data.result.total/res.data.result.pageSize);      //总页数 
						for (let i in _this.listData) {
							let item = _this.listData[i];
							item.notime = item.pushTime;
							//时间格式化处理
							let beforeHouer = moment(item.pushTime, "YYYYMMDDHHmmss").format('MMMDo HH:mm');
							item.pushTime = beforeHouer;
						}
					}else{
						_this.listData = [];
						_this.pages = 0;      
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//分页
			clickPage(curPage) {
				//分页组件跳转
				this.queryParams.pageNum = curPage;
				this.queryData();
			},
			//筛选条件查询
			selectOps(ops){
				let _this = this;
				_this.queryParams.type = ops.status;
				//每次筛选后返回第一页
				_this.queryParams.pageNum = 1;
				_this.queryData();
			},
		},
		mounted (){
			this.queryData();
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("./headlinedetail.css");
</style>
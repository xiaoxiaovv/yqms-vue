<template>
	<div class="wrap border_box">
		<!--头部开始-->
		<yqms-header ref="header" funName="首页" :showCompilemask="showCompilemask"></yqms-header>
		<div class="myorder_box border_box">
			<div class="border_box title">我的订单</div>
			<!-- tab -->
			<div class="border_box tab_box">
				<span class="border_box tab_item hover">全部订单</span>
				<span class="border_box tab_item">待支付</span>
				<span class="border_box tab_item">已完成</span>
				<span class="border_box tab_item">已失效</span>
			</div>
			<!-- 列表 -->
			<div class="border_box order_list_box">
				<div class="border_box order_item flex_verticle">
					<span class="order_type">专家报告</span>
					<span class="order_name ellipsis">网参肺炎舆情专报续10</span>
					<span class="order_num">单份</span>
					<span class="order_price">¥300.00</span>
					<span class="order_coupon">100元通用优惠券</span>
					<span class="order_sellingprice">¥200.00</span>
					<span class="order_time">2019-11-08 16:49</span>
					<span class="order_status">待支付</span>
					<span class="order_gopay">去支付</span>
				</div>	
				<div class="border_box order_item flex_verticle">
					<span class="order_type">专家报告</span>
					<span class="order_name ellipsis">网参肺炎舆情专报续10</span>
					<span class="order_num">单份</span>
					<span class="order_price">¥300.00</span>
					<span class="order_coupon">无</span>
					<span class="order_sellingprice">¥200.00</span>
					<span class="order_time">2019-11-08 16:49</span>
					<!-- 订单状态 -->
					<!-- <span class="order_status topaid">待支付</span>
					<span class="order_gopay">去支付</span> -->
					<span class="order_status invalid">订单失效</span>
					<!-- <span class="order_status complete">订单完成</span> -->
				</div>	
				<div class="border_box order_item flex_verticle">
					<span class="order_type">专家报告</span>
					<span class="order_name ellipsis">网参肺炎舆情专报续10</span>
					<span class="order_num">单份</span>
					<span class="order_price">¥300.00</span>
					<span class="order_coupon">无</span>
					<span class="order_sellingprice">¥200.00</span>
					<span class="order_time">2019-11-08 16:49</span>
					<!-- 订单状态 -->
					<!-- <span class="order_status topaid">待支付</span>
					<span class="order_gopay">去支付</span> -->
					<!-- <span class="order_status invalid">订单失效</span> -->
					<span class="order_status complete">订单完成</span>
				</div>	
			</div>
			<!-- 分页 -->
      		<pagenation :pages="pages" :current.sync="queryParams.pageNum" :totals="total" @navpage="clickPage" v-show="listData != ''"></pagenation>
		</div>
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

export default {

	name: 'myOrder',
	data() {
		return {
			showCompilemask: false, //是否显示首页自定义,显示时，所有模块的删除按钮显示
			queryParams: {
				type: '',      //默认查全部
				pageSize:'10',       //每页条数
	        	pageNum:1,           //当前页数
			},
			pages: 1,               //总页数
			total: 0,               //总条数
			listData: []           //列表数据
		}
	},
	components: {
		yqmsHeader,
		yqmsFooter,
		yqmsSidebar,
		yqmsPushwaring,
		pagenation
	},
	methods: {
		queryData() {

		},
		//分页
		clickPage(curPage) {
			//分页组件跳转
			this.queryParams.pageNum = curPage;
			this.queryData();
		}
	},
	mounted(){
		
	}
}
</script>
<style scoped>
  @import url("./myOrder.css");
</style>



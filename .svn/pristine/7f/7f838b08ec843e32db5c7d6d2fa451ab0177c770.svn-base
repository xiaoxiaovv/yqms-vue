<template>
	<div>
		<div class="footer footer_unicom" v-if="$store.state.kuTempLate == 'UnicomProject'">
			<div class="flex_between hfull">
				<div class="footer_content">
					<p>友情链接：
						<a href="http://www.chinaunicom.com.cn/" target="_blank">中国联通（官网）</a>
						<a href="http://www.wo.com.cn/" target="_blank">中国联通沃门户</a>
						<a href="http://www.miit.gov.cn/" target="_blank">工业和信息化部</a>
						<a href="http://www.gbdex.com/website/" target="_blank">贵阳大数据交易所</a>
						<a href="https://www.chinadep.com/" target="_blank">上海数据交易中心</a>
					</p>
					<div class="img_wrap">
						<span class="img"></span>&nbsp;4006-888-866
        			</div>
					<div class="clear"></div>
					<p style="text-align: center;width: 100%">©2018 chinaunicom <span style="color: rgba(170,173,173,0.7)">京ICP证030173号 隐私政策</span></p>
				</div>
			</div>
		</div>
		<div class="footer footer_green" v-if="$store.state.kuTempLateType == 6">
			<div class="flex_between hfull">
				<div class="footer_l item_vertical hfull">
					<div class="foot_left_con">
						<i class="footer_img_green"></i>
						<p class="footer_copy_green" title="京公网安备 11010802021605号 京ICP备14004349号 京ICP证110355号"><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802021605" target="_blank" style="color:#ffffff">京公网安备 11010802021605号 京ICP备14004349号 京ICP证110355号</a></p>
					</div>
				</div>
				<div class="footer_r item_vertical item_vertical_green">
					<div class="foot_right_con">
						<div class="txt_r foot_right">
							<p class="company_green" title="北京神州绿盟信息安全科技股份有限公司">北京神州绿盟信息安全科技股份有限公司</p>
							<p class="nsfocus" title="www.nsfocus.com.cn"><a href="http://www.nsfocus.com.cn/" target="_blank">www.nsfocus.com.cn</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="footer" v-if="$store.state.kuTempLate != 'UnicomProject' && $store.state.kuTempLateType != 6" :class="$store.state.kuTempLateType == 4 ? 'footer_isentia' : ''">
			<div class="flex_between hfull">
				<div class="footer_l item_vertical hfull">
					<div class="foot_left_con">
						<p title="" v-show="footdata.copyright_cn.ishidden == '0'">{{footdata.copyright_cn.text}}</p>
						<p title="" v-show="footdata.record.ishidden == '0'">{{footdata.record.text}}</p>
						<p title="" v-show="footdata.copyright_en.ishidden == '0'">{{footdata.copyright_en.text}}</p>
					</div>
				</div>
				<div class="footer_r item_vertical">
					<div class="foot_img" :class="$store.state.kuTempLateType == 4 ? 'foot_img_gray' : ''" v-show="footdata.call_pic.ishidden == '0'"></div>
					<div class="foot_right_con">
						<div class="foot_icon_box">
							<div class="defined_foot_icon" @click="handleDefinedFooter" :class="$store.state.kuTempLateType == 4 ? 'defined_foot_icon_isentia' : ''"></div>
						</div>
						<div class="txt_r foot_right">
							<p v-show="footdata.m_call.ishidden == '0'">{{footdata.m_call.number}}</p>
							<p v-show="footdata.email.ishidden == '0'">{{footdata.email.email}}</p>
							<p v-show="footdata.c_call.ishidden == '0'" :title="footdata.c_call.number">{{footdata.c_call.number}}</p>
						</div>
					</div>
				</div>
			</div>
			<!--自定义头部弹框开始--> 
			<v-dialog v-if="isShowMask" title="自定义底部" @clickCloseDialog="clickCloseDialog">
				<defined-footer v-if="footdata" :footerData="footdata" @closeMask="clickCloseDialog" @updateFoot="getFootData" :isShowMask="isShowMask"></defined-footer>
			</v-dialog>
			<!--自定义头部弹框结束-->
		</div>
	</div>
</template>

<script>
	import definedFooter from '@/components/definedFooter/definedFooter.vue'
	import vDialog from '@/components/vDialog/vDialog.vue'
	import { getFooterData } from '@/api/home'
	import store from '@/store'
	export default {
		name: 'yqmsFooter',
		data() {
			return {
				footdata: {    //尾部数据默认值
					call_pic: {    //是否显示图片
						ishidden: '0'
					},  
					c_call: {      //客服电话
						ishidden: '0',
						number: ''
					},    
					email: {       //客服邮箱
						ishidden: '0',
						email: ''
					},     
					m_call: {     //底部右侧第一行
						ishidden: '0',
						number: ''
					},    
					copyright_cn: { //版权中文
						ishidden: '0',
						text: ''
					}, 
					copyright_en: { //版权英文
						ishidden: '0',
						text: ''
					}, 
					record: {       //京ICP备
						ishidden: '0',
						text: ''
					}     
				},
				isShowMask: false, //是否显示自定义底部弹窗
				defaultdata: { //尾部数据默认值，修改时使用
					call_pic: {    //是否显示图片
						ishidden: '0'
					},  
					c_call: {      //客服电话
						ishidden: '0',
						number: '客服电话：400-052-1288'
					},    
					email: {       //客服邮箱
						ishidden: '0',
						email: '客服邮箱：service@istarshine.com'
					},     
					m_call: {     //底部右侧第一行
						ishidden: '0',
						number: ''
					},    
					copyright_cn: { //版权中文
						ishidden: '0',
						text: '版权所有©北京智慧星光信息技术有限公司'
					}, 
					copyright_en: { //版权英文
						ishidden: '0',
						text: 'Copyright © 2012-2019 istarshine.com.All rights reserved.'
					}, 
					record: {       //京ICP备
						ishidden: '0',
						text: '京ICP备12009876号-1  京公网安备11010802008588号'
					}     
				}
			}
		},
		components: {
			vDialog,
			definedFooter,
		},
		methods: {
			//获取尾部数据
			getFootData() {
				let _this = this;
				let olddefault = _this.defaultdata;
				let params = {
					KD_ID: this.$store.state.agentid
				};
				getFooterData(params).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					/* 后端返回的空有两种情况：
						1. res.data.result.data 为空数组 []
						2. res.data.result.data 数组有一个空对象 [{}]
						以上两种情况都需要恢复默认值，
						   footdata ：为传递给子组件使用的数据，具有变动性，
						   defaultdata ：为修改后，恢复默认时使用的数据，会跟着footdata变动
					*/
					if(res.data.status == '0') {
						// 判断获取的数据为空数组 []
						if(res.data.result.data.length == 0){
							// 恢复默认值
							_this.footdata =  _this.defaultdata;
						}else{
							// 判断获取的数据不为 [{}]
							if(JSON.stringify(res.data.result.data[0]) != '{}'){
								_this.footdata = res.data.result.data[0];
							}else{
								_this.footdata =  _this.defaultdata;
							}
						}
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//显示自定义底部弹框
			handleDefinedFooter() {
				this.isShowMask = true;
			},
			//隐藏自定义底部弹框
			clickCloseDialog() {
				this.isShowMask = false;
			}
		},
		mounted() {
			//获取尾部数据
			this.getFootData();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./yqmsFooter.css");
</style>
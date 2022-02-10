<template>
	<!-- ishidden: 0 显示，1 隐藏 -->
	<div class="footer_mask_box">
		<div class="defined_head_foot flex_between" :class="$store.state.kuTempLateType == 4 ? 'defined_head_foot_isentia' : ''">
			<div class="footer_l item_vertical hfull">
				<div class="foot_left_con">
					<div class="p_wrap">
						<p>
							<input type="text" v-model="footData.copyright_cn.text" @mouseenter.prevent="handMouseEnter($event)" @mouseleave.prevent="handMouseLeave($event)" />
						</p>
						<div class="eyeicon" :class="footData.copyright_cn.ishidden == '0' ? 'eyehover_close' : 'eyehover'" @click.stop="clickTxtOne(footData.copyright_cn.ishidden)"></div>
						<div :class="footData.copyright_cn.ishidden == '0' ? 'cover hide' : 'cover' "></div>
					</div>
					<div class="p_wrap">
						<p>
							<input type="text" v-model="footData.record.text"  @mouseenter.prevent="handMouseEnter($event)" @mouseleave.prevent="handMouseLeave($event)" />
						</p>
						<div class="eyeicon" :class="footData.record.ishidden == '0' ? 'eyehover_close' : 'eyehover'" @click.stop="clickTxtTwo(footData.record.ishidden)"></div>
						<div :class="footData.record.ishidden == '0' ? 'cover hide' : 'cover'"></div>
					</div>
					<div class="p_wrap">
						<p>
							<input type="text" v-model="footData.copyright_en.text"  @mouseenter.prevent="handMouseEnter($event)" @mouseleave.prevent="handMouseLeave($event)" />
						</p>
						<div class="eyeicon" :class="footData.copyright_en.ishidden == '0' ? 'eyehover_close' : 'eyehover'" @click.stop="clickTxtThree(footData.copyright_en.ishidden)"></div>
						<div :class="footData.copyright_en.ishidden == '0' ? 'cover hide' : 'cover'"></div>
					</div>
				</div>
			</div>
			<div class="footer_r item_vertical">
				<div class="img_wrap">
					<div class="foot_img" :class="$store.state.kuTempLateType == 4 ? 'foot_img_isentia' : ''"></div>
					<div class="eyeicon" :class="footData.call_pic.ishidden == '0' ? 'eyehover_close' : 'eyehover'"  @click.stop="clickImg(footData.call_pic.ishidden)"></div>
					<div :class="footData.call_pic.ishidden == '0' ? 'cover hide' : 'cover'"></div>
				</div>
				<div class="foot_right_con">
					<div class="p_wrap">
						<p>
							<input type="text" v-model="footData.m_call.number" @mouseenter.prevent="handMouseEnter($event)" @mouseleave.prevent="handMouseLeave($event)" />
						</p>
						<div class="eyeicon" :class="footData.m_call.ishidden == '0' ? 'eyehover_close' : 'eyehover'" @click.stop="clickTxtFour(footData.m_call.ishidden)"></div>
						<div :class="footData.m_call.ishidden == '0' ? 'cover hide' : 'cover'"></div>
					</div>
					<div class="p_wrap">
						<p>
							<input type="text" v-model="footData.email.email" @mouseenter.prevent="handMouseEnter($event)" @mouseleave.prevent="handMouseLeave($event)" />
						</p>
						<div class="eyeicon" :class="footData.email.ishidden == '0' ? 'eyehover_close' : 'eyehover'" @click.stop="clickTxtFive(footData.email.ishidden)"></div>
						<div :class="footData.email.ishidden == '0' ? 'cover hide' : 'cover'"></div>
					</div>
					<div class="p_wrap">
						<p>
							<input type="text" v-model="footData.c_call.number" @mouseenter.prevent="handMouseEnter($event)" @mouseleave.prevent="handMouseLeave($event)" />
						</p>
						<div class="eyeicon" :class="footData.c_call.ishidden == '0' ? 'eyehover_close' : 'eyehover'" @click.stop="clickTxtSix(footData.c_call.ishidden)"></div>
						<div :class="footData.c_call.ishidden == '0' ? 'cover hide' : 'cover'"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="defined_btn_box">
			<button class="btn reset_btn" @click="restoreDefault" v-if="clickRestoreBtn">恢复默认</button>
			<button class="btn reset_btn" v-else>恢复默认</button>
			<button class="btn" @click="saveUpdate" v-if="clickSaveBtn">确定</button>
			<button class="btn" v-else>确定</button>
		</div>
	</div>
</template>

<script>
	import { restoreFooter , saveFooter } from '@/api/home'
	import store from '@/store'
	export default {
		data() {
			return {
				clickRestoreBtn: true, //恢复默认
				clickSaveBtn: true,    //确定
				footData: {}
			}
		},
		props: ['footerData','isShowMask'],
		created() {
			this.footData = JSON.parse(JSON.stringify(this.footerData));
		},
		methods: {
			//鼠标离开移除边框
			handMouseLeave($event){ 
				$event.currentTarget.className = 'no_border';
			},
			//鼠标滑过添加边框
			handMouseEnter($event){
				$event.currentTarget.className = 'has_border';
			},
			//文本左侧第一行
			clickTxtOne(item){
				if(item == '0'){
					this.$parent.$children[0].footData.copyright_cn.ishidden = '1';
				}else{
					this.$parent.$children[0].footData.copyright_cn.ishidden = '0';
				}
			},
			//文本左侧第二行
			clickTxtTwo(item){
				if(item == '0'){
					this.$parent.$children[0].footData.record.ishidden = '1';
				}else{
					this.$parent.$children[0].footData.record.ishidden = '0';
				}
			},
			//文本左侧第三行
			clickTxtThree(item){
				if(item == '0'){
					this.$parent.$children[0].footData.copyright_en.ishidden = '1';
				}else{
					this.$parent.$children[0].footData.copyright_en.ishidden = '0';
				}
			},
			//文本右侧第一行
			clickTxtFour(item){
				if(item == '0'){
					this.$parent.$children[0].footData.m_call.ishidden = '1';
				}else{
					this.$parent.$children[0].footData.m_call.ishidden = '0';
				}
			},
			//文本右侧第二行
			clickTxtFive(item){
				if(item == '0'){
					this.$parent.$children[0].footData.email.ishidden = '1';
				}else{
					this.$parent.$children[0].footData.email.ishidden = '0';
				}
			},
			//文本右侧第三行
			clickTxtSix(item){
				if(item == '0'){
					this.$parent.$children[0].footData.c_call.ishidden = '1';
				}else{
					this.$parent.$children[0].footData.c_call.ishidden = '0';
				}
			},
			clickImg(item){
				if(item == '0'){
					this.$parent.$children[0].footData.call_pic.ishidden = '1';
				}else{
					this.$parent.$children[0].footData.call_pic.ishidden = '0';
				}
			},
			//恢复默认
			restoreDefault(){
				let _this = this;
				//按钮不可点击
				_this.clickRestoreBtn = false;
				restoreFooter({}).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						alert('重置成功');
						//按钮可点击
						_this.clickRestoreBtn = true;
						// 关闭弹窗
						_this.$emit('closeMask');
						//获取尾部数据
						_this.$emit('updateFoot');
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//确定
			saveUpdate(){
				let _this = this;
				//按钮不可点击
				_this.clickSaveBtn = false;
				let params = _this.$parent.$children[0].footData;
				let map = {
					'tailData' : params
				};
				saveFooter(map).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.msg == 'success') {
						alert('保存成功');
						//按钮可点击
						_this.clickSaveBtn = true;
						// 关闭弹窗
						_this.$emit('closeMask');
						//获取尾部数据
						_this.$emit('updateFoot');
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
		},
		mounted() {
			
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./definedFooter.css");
</style>
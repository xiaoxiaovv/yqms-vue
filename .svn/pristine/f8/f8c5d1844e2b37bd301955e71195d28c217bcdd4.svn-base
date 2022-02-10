<template>
	<div class="common_width m_right empty_topic_box border_box flex_column">
		<div class="model_title_box item_vertical model_empty">
			<div class="model_title_left">
				<span class="icon_border" :class="iconBrder"></span>
				<span class="model_title">关注专题</span>
			</div>
			<div class="model_title_right">
				
			</div>
		</div>
		<div class="model_content_box flex_1" :class="modelContentBox">
			<div class="model_content border_box">
				<div class="empty_img_bg"></div>
				<a class="add_topic border_box" href="javascript:;" @click="addTopic">+&nbsp;添加关注专题</a>
			</div>
		</div>
		<el-dialog
		custom-class='topic-dialog'
		title="添加关注专题"
		:close-on-click-modal=false
		:visible.sync="dialogVisible"
		width="600px"
		top='20vh'>
			<div class="yqms_err_tips">专题列表</div>
			<el-input placeholder="搜索专题" v-model="form.topicTitle" @input='topicTitleChange'></el-input>
			<home-tree
				class="filter_tree"
				:filterText="form.topicTitle"
				:treeData="treeData"
				v-bind:currentNode='currentNode'
				@handleTree="clickTree">
			</home-tree>
			<div class="topic-dialog-footer">
				<el-button type="primary" @click="addConfirm">确 定</el-button>
				<el-button @click="dialogVisible = false">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog
		title="添加关注专题"
		:close-on-click-modal=false
		:visible.sync="dialogEmptyVisible"
		width="600px"
		top='20vh'>
			<div class="empty_bg"></div>
			<div class="empty_text">您没有专题可供添加哦～</div>
			<div class="go_set_topic_botton" @click="goSetTopic">马上创建</div>
		</el-dialog>
		<system-password :showSysPwd="showSysPwd"></system-password>
	</div>
</template>
<script>
	import homeTree from '@/components/homeTree/homeTree.vue'
	import systemPassword from '@/components/syspwd/syspwd.vue'
	import VueCookies from 'vue-cookies'
	import { getSubjectTree, getIsSetXtPaw } from '@/api/home'
	let treeDataLength = 0;//专题树长度
	let modelArr;//首页所有模块数组
	export default {
		data() {
			return {
				iconBrder:'',
				modelContentBox:'',
				currentNode:'',
				dialogVisible:false, //添加专题弹窗
				dialogEmptyVisible:false, //创建专题弹窗
				areaArr:[], //首页已有专题数组
				treeData:[],//专题树
				form: {
					topicTitle: '',     //专题列表
					treeTopicTitle: '',//树中筛选
					ksid: '',           //专题列表中的专题id
					ksType: '',         //ksType 1：专题，2：分类  3 地域专题
				},
				nodeData: {},  //点击树的节点对应的数据
				showSysPwd: false,    //是否显示系统设置密码
			}
		},
		components: {
			homeTree,
			systemPassword,
		},
		props: {},
		methods: {
			//专题树的长度计算
			getMenuName(menus){
				for (var value of menus) {
					treeDataLength+=1;
					if (value.children) {
						this.getMenuName(value.children)
					}
				}
			},
			addTopic() {
				this.areaArr = [];
				this.treeData = [];
				this.form = {
					topicTitle: '',     //专题列表
					treeTopicTitle: '',//树中筛选
					ksid: '',           //专题列表中的专题id
					ksType: '',
				};
				this.currentNode = '';
				treeDataLength = 0;
				//首页已有全部模块的数组
				modelArr = JSON.parse(localStorage.getItem('areaArr'));
				//专题列表数组
				for(let n in modelArr){
					if(modelArr[n].component == 'topicList'){
						this.areaArr.push(modelArr[n]);
					}
				}
				console.log(this.areaArr);
				this.getSubjectTreeData();
			},
			//获取专题树
			getSubjectTreeData() {
				let _this = this;
				getSubjectTree({type: 2}).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						_this.treeData = res.data.result.data.subjectTree;
						_this.$options.methods.getMenuName(_this.treeData);
						//比较长度,判断是否有专题可供选择
						if(treeDataLength > _this.areaArr.length){
							_this.dialogVisible = true;
						}else{
							_this.dialogEmptyVisible = true;
						}
					}else{
						alert('获取数据失败！');
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//监听过滤词变化
			topicTitleChange() {
				this.form.ksid = '';
			},
			//点击树
			clickTree(data) {
				// 获取点击的专题树节点的名字
				this.currentNode = data.id;
				this.form.treeTopicTitle = data.name; //专题的名字
				this.form.ksid = data.id; //专题的id
				this.form.ksType = data.kstype; //ksType 1：专题，2：分类  3 地域专题
				//点击树的节点对应的数据
				this.nodeData = data;
			},
			//添加专题
			addConfirm() {
				let _this = this;
				//根据id判断,id不同说明两个专题就是不同的,名字可能相同
				if(_this.form.ksid == '') {
					_this.$message({
						message: '请选择专题',
						type: 'warning'
					})
					return;
				}
				for(let n in _this.areaArr){
					if(_this.areaArr[n].params.ksId == _this.form.ksid){
						_this.$message({
							message: '已有相同专题',
							type: 'warning'
						})
						return;
					}
				}
				_this.dialogVisible = false; //隐藏弹窗
				//添加到首页
				modelArr.push({
					component: 'topicList',
					title: _this.form.treeTopicTitle,
					retitle: '',
					api: 'YqllIframe!getHomePageSubjectList.do',
					params: {
						ksId: _this.form.ksid,
						ksType: _this.form.ksType
					},
				});
				localStorage.setItem('areaArr', JSON.stringify(modelArr));
				this.$emit('addModelHome',modelArr);
			},
			goSetTopic() {
				//需验证系统密码
				var isShowsysPwd = VueCookies.get('ISPWD');
				this.dialogEmptyVisible = false; //隐藏弹窗
				if(isShowsysPwd == '1'){
					//100%跳转系统设置
					this.$store.commit('maiDian','homepage_newtopic')
					window.open(this.$store.state.oldyqmsUrl + 'Set/special');
				}else{
					//验证跳转
					getIsSetXtPaw({userid:this.$store.state.ZHXGUSERID}).then(res=>{
						let datas = res.data.result;
						if(datas.data == '1'){
							this.showSysPwd = true;
						}else{
							this.$store.commit('maiDian','homepage_newtopic')
							window.open(this.$store.state.oldyqmsUrl + 'Set/special','_blank');
						}
					}).catch(err=>{
						console.log(err);
					});
				}

			}
		},
		mounted() { 
			//数言舆情添加类
			if(this.$store.state.kuTempLate == 'UnicomProject'){
				if(this.$store.state.kuTempLateType == 0) {
					this.iconBrder = 'icon_border_unicom',
					this.modelContentBox = 'model_content_box_unicom'
				}
			}
		}
	}
</script>

<style>
	@import url("./emptyTopic.css");
</style>
<template>
	<div class="wrap">
		<!--头部开始-->
        <yqms-header ref="header" funName="舆情研判" :showCompilemask="showCompilemask" :showHomepageCustom="showHomepageCustom"></yqms-header>
        <div class="judgment_center">
        	<div class="judgment_list_box">
        		<!-- 到期提示信息 -->
        		<judgment-tips @handleBodyClick="handleBodyClick"></judgment-tips>
			    <!-- 立即绑定 -->
			    <judgment-bind @handleBodyClick="handleBodyClick"></judgment-bind>
        		<!-- 筛选条件 -->
        		<search @getListInfo="getListInfo"  ref="search" :inquireParameter="inquireParameter"></search>
        		<!-- 列表内容 -->
        		<div class="judgment_list_content_box border_box"  ref="contentWidth">
        			<div class="judgment_list_content border_box" v-if="listData != ''">
        				<!-- 列表信息 -->
        				<div class="judgment_list border_box" v-for="(item,i) of listData" :key="i"> 
        					<!-- 预警级别 -->
        					<div class="warning_txt_box border_box">
        						<div class="warning_txt border_box warning_00" v-if="item.warningLevel == 0">普通</div>
        						<div class="warning_txt border_box warning_01" v-else-if="item.warningLevel == 1">中等</div>
        						<div class="warning_txt border_box warning_02" v-else-if="item.warningLevel == 2">严重</div>
        						<div class="warning_txt border_box warning_03" v-else-if="item.warningLevel == 3">高危</div>
        					</div>
        					<div class="judgment_list_right border_box ">
        						<div class="userinfo_box border_box flex">
	        						<div class="judgment_userpic">
	        							<img src="../../../assets/images/judgment/classic/user_icon.png"/>
	        						</div>
	        						<!-- 研判建议 -->
	        						<div class="judgment_suggestions_box border_box flex suggestions_00"  v-if="item.warningLevel == 0">
	        							<span class="arrow_icon arrow_00"></span>
	        							<span class="judgment_blue">研判建议：</span>
	        							<p class="judgment_suggestions flex_1">{{item.proposal}}</p>
	        						</div>
	        						<div class="judgment_suggestions_box border_box flex suggestions_01"  v-else-if="item.warningLevel == 1">
	        							<span class="arrow_icon arrow_01"></span>
	        							<span class="judgment_blue">研判建议：</span>
	        							<p class="judgment_suggestions flex_1">{{item.proposal}}</p>
	        						</div>
	        						<div class="judgment_suggestions_box border_box flex suggestions_02"  v-else-if="item.warningLevel == 2">
	        							<span class="arrow_icon arrow_02"></span>
	        							<span class="judgment_blue">研判建议：</span>
	        							<p class="judgment_suggestions flex_1">{{item.proposal}}</p>
	        						</div>
	        						<div class="judgment_suggestions_box border_box flex suggestions_03"  v-else-if="item.warningLevel == 3">
	        							<span class="arrow_icon arrow_03"></span>
	        							<span class="judgment_blue">研判建议：</span>
	        							<p class="judgment_suggestions flex_1">{{item.proposal}}</p>
	        						</div>
	        					</div>
	        					<div class="judgment_info_box border_box flex">
	        						<label class="judgment_check_box">
	        							<input type="checkbox" :checked="checkList.indexOf(item.infoId) > -1" :value="item.infoId" @change="itemChange(item)"/>
	        						</label>
	        						<div class="info_box border_box flex_1">
	        							<!-- isread 是否已读样式 -->
	        							<router-link tag="a" :to="{path: 'judgmentdetail', query: { uuid : item.uuid,simhash:item.simhash,infoid:item.infoId}}"
	        								target="_blank" class="info_title ellipsis border_box" :class="(item.isRead == 1) ? 'isread' : ''" @click.native="markedRead(item)">{{i+1}}.{{item.title}}</router-link>
	        							<p class="info_abstract" v-show="isShowAbstract">{{item.abstracts}}</p>
	        							<div class="info_desc_box border_box item_vertical">
	        								<!-- 信息倾向性、时间、来源等 -->
	        								<div class="info_from_box border_box flex_verticle">
	        									<!-- 倾向性 zheng fu zhong -->
	        									<span class="tendency zheng" v-if="item.orientation == 1"></span>
	        									<span class="tendency fu" v-else-if="item.orientation == 2"></span>
	        									<span class="tendency zhong" v-else-if="item.orientation == 3"></span>
	        									<span class="info_time">{{item.warningTime}}</span>
	        									<span class="user_icon">
	        										<img src="../../../assets/images/judgment/classic/default_icon.png" />
	        									</span>
	        									<span class="user_nickname">{{item.author}}</span>
	        									<a class="info_source" :href="item.url" v-if="item.overseas === '0'" target="_blank">{{item.webname}}</a>
	        									<a class="info_source" :href="'https://oversea2.istarshine.com/index.php?url='+item.Base64Url+'&type=1&'+$store.state.ZHXGUSERID+'&curtime=<{$curtime}>&token='+$store.state.ACCESSTOKEN" v-else-if="item.overseas === '1' && $store.state.agentid != ''" target="_blank">{{item.webname}}</a>
	        									<a class="info_source" :href="'https://oversea.istarshine.com/index.php?url='+item.Base64Url+'&type=1'" v-else target="_blank">{{item.webname}}</a>
	        									<!-- 书签 -->
	        									<div v-if="item.tags.length > 0 ">
		        									<span class="bookmarks" v-for="(tag,t) of item.tags" v-html="(tag.length > 7) ? tag.substring(0,7)+'...' : tag"></span>
	        									</div>
	        								</div>
	        								<!-- 信息操作按钮 -->
	        								<div class="info_ops_box border_box">
	        									<!-- "isReport": 0,  是否加入过简报    0 否 1是 -->
	        									<div class="info_btn btn_01" :class="(item.isReport == 1 && $store.state.isNewTemplate == 1 && $store.state.kusex !=4) ? 'hover' : ''" title="加简报" @click.stop="showBriefing($event,item)">
	        										<div class="ops_mask border_box hide">
	        											<vue-scroll :ops="ops" v-if="briefData.length > 5">
		        											<span class="ops_title">加入简报</span>
		        											<!-- <span class="blue_txt">未分类</span> 加入过简报，蓝色 --> 
		        											<span class="ops_sort" v-for="(brief,m) of briefData" :key="m" @click.stop="addBriefing(brief,i)" v-html="(brief.classifyName.length > 7) ? brief.classifyName.substring(0,7)+'...' : brief.classifyName"></span>
	        											</vue-scroll>
	        											<template v-else>
	        												<span class="ops_title">加入简报</span>
		        											<!-- <span class="blue_txt">未分类</span> 加入过简报，蓝色 --> 
		        											<span class="ops_sort" v-for="(brief,m) of briefData" :key="m" @click.stop="addBriefing(brief,i)" v-html="(brief.classifyName.length > 7) ? brief.classifyName.substring(0,7)+'...' : brief.classifyName"></span>
	        											</template>
	        										</div>
	        									</div>
	        									<div class="info_btn btn_02" title="复制信息" @click.stop="copyInfo(item)"></div>
	        									<div class="info_btn btn_03" title="上报信息" @click.stop="reportInfo(item)"></div>
	        									<!-- "isMyAttention": 1  是否加入过关注    0 否 1是 -->
	        									<div class="info_btn btn_04" :class="(item.isMyAttention == 1) ? 'hover' : ''"  title="加关注" @click.stop="showAttention($event,item)">
	        										<div class="ops_mask border_box hide">
	        											<vue-scroll :ops="ops"  v-if="attentionData.length > 5">
	        												<span class="ops_title">加关注</span>
	        												<!-- 加过关注的 atten_hover -->
		        											<span class="ops_sort" v-for="(atten,n) of attentionData" :key="n" @click.stop="addAttention(atten,i)" v-html="(atten.kmname.length > 7) ? atten.kmname.substring(0,7)+'...' : atten.kmname"></span>
	        											</vue-scroll>
	        											<template v-else>
	        												<span class="ops_title">加关注</span>
	        												<!-- 加过关注的 atten_hover -->
		        											<span class="ops_sort" v-for="(atten,n) of attentionData" :key="n" @click.stop="addAttention(atten,i)" v-html="(atten.kmname.length > 7) ? atten.kmname.substring(0,7)+'...' : atten.kmname"></span>
        												</template>
	        										</div>
	        									</div>
	        									<div class="info_btn btn_05" title="删除" @click.stop="deleteInfo(item)"></div>
	        								</div>
	        							</div>
	        						</div>
	        					</div>
        					</div>
        				</div>
        				<!-- 分页 -->
			            <pagenation :pages="pages" :current.sync="judgmentListData.pageNum" :totals="judgmentListData.total"
			            	@navpage="clickPage"
			            ></pagenation>
        			</div>
			        <!-- 暂无数据 -->
			        <div class="judgment_nodata" v-else-if="listData == '' && !isLoading">
                        <nodata></nodata>
                    </div>
        			<!-- 加载中 -->
			        <div class="masker" v-show="isLoading" :style="styleObject">
			            <loading></loading>
			        </div>
                    <!-- 操作条 -->
        			<operationbar :ops="ops" :isShowAbstract="isShowAbstract" :inquireParameter="inquireParameter"
        				 :checked="checked" :width="parentWidth" ref="operationbar"
        				 :listData="listData" :checkList="checkList"
        				 :briefData="briefData" @getReportClassify="getReportClassify"
        				 :attentionData="attentionData" @getMyattentionClassfy="getMyattentionClassfy"
        				@isCheck="checkedAll" @batchExport="batchExport" @allExport="allExport"
        				@addAttentionAllList="addAttentionAllList" @addBriefingAllList="addBriefingAllList" 
        				@markAllRead="markAllRead" @deleteAllList="deleteAllList" @showAbstract="showAbstract"
        				@updatePageSize="updatePageSize"  @getListInfo="getListInfo" 
        				@handleBodyClick="handleBodyClick"></operationbar>
        		</div>
        	</div>
        </div>
        <!--底部开始-->
        <yqms-footer></yqms-footer>
        <!--底部结束-->
        <!--侧边栏开始-->
        <yqms-sidebar v-if="$store.state.kuTempLateType !=5 && $store.state.kuTempLateType != 6"></yqms-sidebar>
        <!--侧边栏结束-->
        <!--推送预警弹窗开始-->
		<yqms-pushwaring v-if="$store.state.kuAlertwin == 1 || $store.state.kuAlertwin == 2 "></yqms-pushwaring>
		<!--推送预警弹窗结束-->
        <!-- 删除弹窗 -->
        <delete-dialog :showDialog="showDeleteDialog" @handleConfirm="handleDelConfirm"  
        	@handleCancel="handleCloseMask" @handleCloseMask="handleCloseMask">
        </delete-dialog>
        <!-- 上报弹窗 -->
        <report-dialog :ops="ops" :showDialog="showReportDialog" :emails="emails"
        	title="上报信息"  @handleConfirm="handleReportConfirm"  
        	@handleCancel="handleCloseMask" @handleCloseMask="handleCloseMask">
        </report-dialog>
		<!-- 全部导出成功弹框 -->
        <allexport-dialog  :showDialog="showAlleportDialog" @handleConfirm="handleAllexportConfirm"  
        	@handleCancel="handleCloseMask" @handleCloseMask="handleCloseMask">
        </allexport-dialog>

	</div>
</template>
<script>
	import yqmsHeader from '@/components/header/header.vue'
    import yqmsFooter from '@/components/footer/yqmsFooter.vue'
    import yqmsPushwaring from '@/components/pushWaring/pushWaring.vue'
    import pagenation from '@/components/pagenation/pagenation.vue'
    import search from '@/views/judgment/components/search/search.vue'
    import operationbar from '@/views/judgment/components/operationbar/operationbar.vue'
    import deleteDialog from '@/views/judgment/components/deleteDialog/deleteDialog.vue'
	import reportDialog from '@/views/judgment/components/reportDialog/reportDialog.vue'
	import allexportDialog from '@/components/allexportDialog/allexportDialog.vue'
    import judgmentTips from '@/views/judgment/components/tips/tips.vue'
    import judgmentBind from '@/views/judgment/components/immediateBinding/immediateBinding.vue'
    import yqmsSidebar from '@/components/sidebar/sidebar.vue'
    import { getJudgedList ,  saveCopyLink ,  deleteBatchWarning ,  getReportEmails , 
    		 sendEmail , listMyattentionClassfy , addMyattention , getReportClassifys ,
    		 saveBrief , getEexportJudgedList , getEexportAllJudgedList ,
    		 markReadList , saveReport } from '@/api/judgment'

    let moment = require("moment");

    let Base64 = require('js-base64').Base64;

    export default {
		name: 'judgmentlist',
		data() {
			return {
				showDeleteDialog: false,   //是否显示删除弹窗
				showReportDialog: false,   //是否显示上报弹窗
				showAlleportDialog: false, //是否显示全部导出查看弹窗
				emails: [],                //可上报的所有邮箱 
				reportInfoId: '',          //上报信息id
				showCompilemask: false,    //是否显示首页自定义,显示时，所有模块的删除按钮显示
				showHomepageCustom: false, //是否显示首页自定义文本
				inquireParameter: {
					pageNum: '1',                 //当前页数
					pageSize: '10',               //每页条数
					time: '',                     //时间类型  7day 7天； 24hour 24小时
					bTime: '',                    //开始时间
					eTime: '',                    //结束时间
					orientation: '',              //倾向性 逗号分隔  1 2 3
					sourceType: '',               //媒体类型 逗号分隔
					warningLevel: '',             //预警级别 全部''   0 一般  1 中等  2 严重 3 高危
					isOcr: '',                    //图片识别 全部''   1 仅看图片识别数据  0 排除图片识别数据
					isRead: '',                   //浏览范围  ''全部 1已读 0 未读
		        },
		        listData: [],              //列表数据
		        isLoading: true,           //是否显示加载的遮罩层
		        pages: 1,                  //总页数
		        judgmentListData: {
					pageNum: 1,           //当前页数
					pageSize: 10,         //每页条数 默认10条，30 , 50 , 100
					total: 0              //总条数     
		        },
		        checkList: [],             //全选或者反选 —— 批量加简报,加关注使用infoId
		        uuidList: [],              //全选或者反选 —— 批量导出,删除使用uuid
		        checked: false,            //全选框
		        isShowAbstract: true,      //是否显示摘要,默认显示
		        parentWidth: '',           //父元素的宽度传递到子元素
		        markReadList: [],          //标记已读
        		ops: {                     //滚动条配置
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
				briefData: [],             //加简报的分类
				attentionData: [], 		   //加关注的分类
				styleObject: {             //加载中和数据空时样式处理
					position: 'relative'
		        },
			}
		},
		components: {
			yqmsHeader,
			yqmsFooter,
			pagenation,
            search,
            operationbar,
            deleteDialog,
			reportDialog,
			allexportDialog,
            judgmentTips,
            judgmentBind,
            yqmsSidebar,
            yqmsPushwaring
		},
		methods: {
			//单条信息选中和取消选中
			itemChange(item) {
				let index = this.checkList.indexOf(item.infoId);
				if (index >= 0) {
                    // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
                    this.checkList.splice(index, 1);
                    this.uuidList.splice(index, 1);
                } else {
                    // 选中该checkbox
                    this.checkList.push(item.infoId);
                    this.uuidList.push(item.uuid);
                }
			},
			//是否显示加载的遮罩层
		    hideLays() {
		        this.isLoading = true;
		    },
			//查询数据
			queryData(){
				let _this = this;
				_this.checkList = [];  //重新刷新时，清空checkbox的选中
				//获取舆情研判列表数据
				getJudgedList(_this.inquireParameter, _this.hideLays).then(res =>{
					if(res.data.status == '0'){
						if (res.data.result.data) {
							_this.listData = res.data.result.data;
							_this.judgmentListData.total = res.data.result.total;
							_this.pages = Math.ceil(res.data.result.total / res.data.result.pageSize);      //总页数
							_this.isLoading = false;
							document.documentElement.scrollTop = 0; //针对分页，每次刷新完数据回到页面顶部
							for (let i in _this.listData) {
								let item = _this.listData[i];
								//时间格式化处理
								item.warningTime = moment(item.warningTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm');
								item.publishTime = moment(item.publishTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss')
                                //Base64 url
                                item.Base64Url = Base64.encode(item.url);
								// 标签处理
								if(item.tags == 'null'){
									item.tags = [];
								}else{
									item.tags = JSON.parse(item.tags);
									// 截取tags的前4项
									if(item.tags.length > 0){
										item.tags = item.tags.slice(0,4);
										/*for(let j in item.tags){
											item.tags[j] = item.tags[j].replace(/\-/ig,'—');
										}*/
									}
								}
								//摘要处理
								item.abstracts = item.abstracts.getAbstract();
							}
							this.styleObject.position = 'absolute';
						} else {
							_this.listData = [];
							_this.pages = 0;   
							_this.isLoading = false;
							this.styleObject.position = 'absolute';
						}
					}else{
						_this.listData = [];
						_this.pages = 0;                                      
						_this.isLoading = false;
						this.styleObject.position = 'absolute';
					}
					if(_this.listData.length > 0){
						_this.$refs.operationbar.setpage();
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//公共查询
	   		getListInfo(para){
			    this.handleBodyClick(); 
	        	//筛选   keys查询的键值   content 内容;
				if (para.bTime && para.eTime) {
					this.inquireParameter.bTime = para.bTime;
					this.inquireParameter.eTime = para.eTime;
					this.inquireParameter.time = 'zdytime';
				} else {
					this.inquireParameter[para.keys] = para.content;
					if(para.content == "" && para.keys == "time"){
                        this.inquireParameter.bTime = "";
                        this.inquireParameter.eTime = "";
                    }
				}
			    this.judgmentListData.pageNum = 1;
		        this.inquireParameter.pageNum = 1;
				this.queryData();
	    	},
			//分页
			clickPage(curPage) {
				this.handleBodyClick();
				//分页组件跳转
				this.judgmentListData.pageNum = curPage;
				this.inquireParameter.pageNum = curPage;
				this.queryData();
			},
			//点击页面其他区域可以隐藏选项卡
		    handleBodyClick(){
		        let eles = document.getElementsByClassName('ops_mask');
				let len = eles.length;
				for(let i = 0; i < len; i++) {
					eles[i].classList.add('hide');
				}
		    },
			// 加简报 —— 查询简报分类
			showBriefing(event,item){
				let _this = this;
				let isNewTemplates = this.$store.state.isNewTemplate;   //网参报告0 舆情报告1
                let kusex = this.$store.state.kusex;                    //4企业
                if (isNewTemplates == 1 && kusex != 4) {
					this.reportInfoId = item.uuid;
				} else {
					this.reportInfoId = item.infoId;
				}
				this.handleBodyClick();
				let parent = event.target;
				let child = parent.children[0];
				let falg = child.className.toString().indexOf('hide');
				//接口之调取一次
				if(_this.briefData.length == 0){
					this.getReportClassify();
				}
				// isReport  是否加入过简报    0 否 1是
				if (isNewTemplates == 1 && kusex != 4) {
					if(item.isReport == 0) {
						// 控制蒙层显示
						if(falg != -1) {
							child.className = 'ops_mask border_box';
						}else{
							child.className = 'ops_mask border_box hide';
						}
					}else{
						this.$message({
	                        message: '该信息已添加，请勿重复操作！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
	                        type: 'warning'
	                    });
					}
				}else{
					// 控制蒙层显示
					if(falg != -1) {
						child.className = 'ops_mask border_box';
					}else{
						child.className = 'ops_mask border_box hide';
					}
				}
			},
			// 查询简报分类
			getReportClassify(){
				getReportClassifys().then(res =>{
					if(res.data.status == 0){
						let list = res.data.result.data || [];
						if(list.length > 0){
	                        for(let i in list){
	                            this.briefData.push(list[i]);
	                        }
	                    }
	                    let isNewTemplates = this.$store.state.isNewTemplate;   //网参报告0 舆情报告1
	                    let kusex = this.$store.state.kusex;                    //4企业
	                    if (isNewTemplates == 1 && kusex != 4) {
	                        //舆情报告  不是企业用户
	                        this.briefData.unshift({
	                            id:'0',
	                            classifyName:"未分类"
	                        })
	                    } else {
	                        //网参报告
	                    }
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			// 加简报
			addBriefing(brief,index){
				let isNewTemplates = this.$store.state.isNewTemplate;   //网参报告0 舆情报告1
                let kusex = this.$store.state.kusex;                    //4企业
                if (isNewTemplates == 1 && kusex != 4) {
                	//舆情报告  不是企业用户
                    let p = {
                        ksUuids: this.reportInfoId,  //uuid
                        classifyId: brief.id,       // 简报id
                    }
                    saveReport(p).then(res=>{
                        let datas = res.data.result.data || '';
                        if(datas != ""){
                            if(datas.faildResult == '1' && datas.successResult == '0'){
                                this.$message({
                                    message: '该信息已添加，请勿重复操作！',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
                                    type: 'warning'
                                });
                            }else if(datas.faildResult >0 && datas.successResult >=0){
                                this.$message({
                                    message: '添加成功 重复文章将自动被过滤！',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
                                    type: 'success'
                                });
                            }else{
                                this.$message({
                                    message: '添加成功！',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
                                    type: 'success'
                                });
                                // 加简报高亮
		                        this.listData[index].isReport = 1;
		                        this.handleBodyClick();
                            }
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                } else {
					let p = {
	                    userid: this.$store.state.ZHXGUSERID,
	                    session: this.$store.state.ACCESSTOKEN,
	                    Uids: this.reportInfoId,  //infoId
	                    KYid:  brief.id,          // 简报id
	                    KR_INFOTYPE: '07'
	                }
	                //网参报告
	                saveBrief(p).then(res=>{ 
	                    let msg = res.data.result;
	                    if(msg == 1){
	                        //添加成功
	                        this.$message({
	                            message: '加入简报成功！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'success'
	                        });
	                        // 加简报高亮 —— 网参报告，没有高亮
	                        this.handleBodyClick();
	                    }else if(msg == 0){
	                        this.$message({
	                            message: '加入主键不能为空！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }else if(msg == 2){
	                        this.$message({
	                            message: '该信息已添加，请勿重复操作！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }else if(msg == 3){
	                        this.$message({
	                            message: '信息不存在!',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }else if(msg == 4 || msg == 5){
	                        this.$message({
	                            message: '加入简报失败!',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }else{
	                        this.$message({
	                            message: '添加失败！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }
	                }).catch(err=>{
	                    console.log(err);
	                });
	            }
			},
			//复制信息
			copyInfo(item){
				this.handleBodyClick();
				let tendency = '';
				if(item.orientation == 1) {
		        	tendency = '正面';
		        }else if(item.orientation == 2) {
		        	tendency = '负面';
		        }else{
		        	tendency = '中性';
		        }
				let content = '';
					content = content + '标题：' + item.title + '\n';
					content = content + '涉及关键词：' + item.keyword + '\n';
					content = content + '链接：' + item.url + '\n';
					content = content + '摘要：' + item.abstracts + '\n';
					content = content + '时间：' + item.publishTime + '\n';
					content = content + '来源：' + item.webname + '\n';
					content = content + '作者：' + item.author + '\n';
					content = content + '倾向性：' + tendency + '\n';
					content = content + '评论数：' + item.replyNum + '\n';
					content = content + '转发数：' + item.forwardNum + '\n';

				let clipboard = document.createElement('textarea');
			        clipboard.value = content;
			        document.body.appendChild(clipboard);
			        clipboard.select(); // 选择对象
			        document.execCommand("Copy"); // 执行浏览器复制命令
			        clipboard.remove();	

			    this.$message({
		        	message: '复制成功',
		        	customClass: 'common_tips_style',
		        	center: true,  //文字水平居中
		        	type: 'success'
		        });
		        //记录操作日志
			    let params = {
			    	action: '舆情研判——复制信息',
			    	url: item.url,
			    	content:content,
                    infoType:'2',  //1 专题 、2预警
			    	uuid: item.uuid,
			    	userid: this.$store.state.ZHXGUSERID,
			    	operationUserIp: this.$store.state.userIp,
			    	operationUserId: this.$store.state.operationUserId,
			    	operationUserName: this.$store.state.operationUserName,
			    	functionType: '2'       //功能类型 1复制链接 2复制信息
			    }
			    saveCopyLink(params).then(res =>{
					
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//上报信息 —— 查询邮箱
			reportInfo(item){
				let _this = this;
				_this.handleBodyClick();
				_this.reportInfoId = item.infoId;
				let params = {
					userid: _this.$store.state.ZHXGUSERID,
                    session: _this.$store.state.ACCESSTOKEN,
			    	pageNo: 1,
			    	pageSize: 10000
			    }
				getReportEmails(params).then(res =>{
					if(res.status == '200'){
						_this.emails = res.data.list.mydata || [];
						_this.showReportDialog = true;
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//上报信息 —— 提交
			handleReportConfirm(checkedList,reason,handemail){
				let _this = this;
				let emailbox = '';
				for(let i in checkedList){
					let item = checkedList[i];
					emailbox +=  item.KM_EMAIL + ',';
				}
				if(handemail.length > 0){
					emailbox += handemail;
				}else{
					emailbox = emailbox.slice(0,emailbox.length-1);
				}
				let params = {
					userid: _this.$store.state.ZHXGUSERID,
                    session: _this.$store.state.ACCESSTOKEN,
			    	mail: emailbox,        //逗号分割
			    	KV_UUID: _this.reportInfoId,
			    	KR_INFOTYPE: '07',
			    	type: 2,               //1 大数据 2 数据库
			    	report_reason: reason  //上报原因
			    }
				sendEmail(params).then(res =>{
					let  result = res.data.result;
                    if(result == 1){
                        _this.$message({
                            message: '邮件发送成功！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'success'
                        });
                        _this.showReportDialog = false;
                    }else{
                        _this.$message({
                            message: '邮件发送失败,请联系管理员！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'error'
                        });
                        _this.showReportDialog = false;
                    }
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			// 加关注 —— 查询分类
			showAttention(event,item){
				let _this = this;
				_this.reportInfoId = item.infoId;
				_this.handleBodyClick();
				let parent = event.target;
				let child = parent.children[0];
				let falg = child.className.toString().indexOf('hide');
				// isMyAttention  是否加入过关注    0 否 1是
				if(item.isMyAttention == 0) {
	                if(_this.attentionData.length == 0){
						this.getMyattentionClassfy();
					}
					// 控制蒙层显示
					if(falg != -1) {
						child.className = 'ops_mask border_box';
					}else{
						child.className = 'ops_mask border_box hide';
					}
				}else{
					this.$message({
                        message: '该信息已添加，请勿重复操作！',
			        	customClass: 'common_tips_style',
			        	center: true,  //文字水平居中
                        type: 'warning'
                    });
				}
			},
			// 查询关注分类
			getMyattentionClassfy(){
				let params = {
                    shareUserId: this.$store.state.ZHXGUSERID,
                    userid: this.$store.state.ZHXGUSERID,
                    session: this.$store.state.ACCESSTOKEN,
                    pageSize: '0'
                }
				listMyattentionClassfy(params).then(res =>{
					if(res.status == '200'){
						let list = res.data.page.list || [];
	                    if(list.length > 0){
	                        for(let i in list){
	                            this.attentionData.push(list[i]);
	                        }
	                    }
	                    this.attentionData.unshift({
		                    kmname:'默认分类',
		                    kmid:'',
		                    kmpid:"0"
	                	});
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			// 加关注
			addAttention(atten,index){
				let p = {
                    shareUserId: this.$store.state.ZHXGUSERID,
                    userid: this.$store.state.ZHXGUSERID,
                    session: this.$store.state.ACCESSTOKEN,
                    Uids: this.reportInfoId,
                    urls: '',
                    shareid: '',
                    classid: atten.kmid,
                    KR_INFOTYPE: '07',
                    KR_KEYWORDID: '',
                    KV_CTIME: ''
                }
                addMyattention(p).then(res=>{ 
                    let msg = res.data.result;
                    if(msg == 1){
                        //添加成功
                        this.$message({
                            message: '添加成功！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'success'
                        });
                        // 加关注高亮
                        this.listData[index].isMyAttention = 1;
                        this.handleBodyClick();
                    }else if(msg == '0'){
                        this.$message({
                            message: '加入主键不能为空！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'warning'
                        });
                    }else if(msg=='3'){
                        this.$message({
                            message: '信息不存在！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'warning'
                        });
                    }else if(msg=='5'){
                        this.$message({
                            message: '数据库出错，加入关注内容失败！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'warning'
                        });
                    }else if(msg=='2'){
                        this.$message({
                            message: '该信息已添加，请勿重复操作！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'warning'
                        });
                    }else{
                        this.$message({
                            message: '添加失败！',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
                            type: 'warning'
                        });
                    }
                }).catch(err=>{
                    console.log(err);
                });
			},
			//删除——显示删除弹窗
			deleteInfo(item){
				this.handleBodyClick();
				this.showDeleteDialog = true;
				this.uuidList = [];
				this.uuidList.push(item.uuid);
			},
			//删除——确定删除
			handleDelConfirm(){
				let _this = this;
				_this.showDeleteDialog = false;
				let params = {
			    	ids: _this.getInfoIds(_this.uuidList)
			    }
				deleteBatchWarning(params).then(res =>{
					if(res.data.status == '0'){
						if(res.data.result.data > 0){
							_this.$message({
					        	message: '删除成功！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
					        	type: 'success'
					        });
					        _this.queryData();
						}else{
					        _this.$message({
								message: '删除失败！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
								type: 'error'
			                });
						}
					}else{
						_this.$message({
							type: 'error',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
							message: '删除失败！'
		                });
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//关闭上报/删除弹窗
			handleCloseMask(){
				this.showReportDialog = false;
				this.showDeleteDialog = false;
				this.showAlleportDialog = false;
			},
			//标记已读
			markedRead(item){
				let _this = this;
				// 是否从后台登录，前台登录为''
				let backlogin = _this.$store.state.backLogin;
		    	let params = {
	    			userid: _this.$store.state.ZHXGUSERID,
                    session: _this.$store.state.ACCESSTOKEN,
      				ksuuids: item.uuid
	    		}
	    		if(backlogin == ''){
		    		markReadList(params).then(res=>{ 
		    			let status = res.data.result;
		    			if(status == 1){
	                        //添加成功
	                        /*this.$message({
	                            message: '标记已读成功！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'success'
	                        });*/
	                        // 标记已读高亮
	                        item.isRead = 1;
	                    }else{
	                    	/*_this.$message({
								type: 'error',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
								message: '标记已读失败!'
							});	*/
		    			}
		    		}).catch(err=>{
	                    console.log(err);
	                });
	    		}
			},
			/***************以下为操作条功能***************/
		    //操作条 —— 获取子级 全选或反选 的返回值
		    checkedAll(data){
		    	let _this = this;
		    	_this.handleBodyClick();
		    	this.checked = !data;
		    	this.uuidList = [];
		        if (!this.checked) { //实现反选
		        	_this.checkList = [];
		        } else {     //实现全选
		        	_this.checkList = []; //批量删除使用
		        	_this.listData.forEach(function(item, index) {
		            	_this.checkList.push(item.infoId);
		            	_this.uuidList.push(item.uuid);
		            });
		        }
		    },
		    //操作条 —— 获取批量信息的信息id，逗号分割
		    getInfoIds(list){
		    	let infoids = '';
	    		for(let i in list){
	    			let item = list[i];
	    			infoids +=  item + ',';
	    		}
	    		infoids = infoids.slice(0,infoids.length-1);
	    		return infoids;
		    },
		    //操作条 —— 批量导出
		    batchExport(){
		    	let _this = this;
		    	_this.handleBodyClick();
		    	if(_this.checkList.length > 0){
		    		let params = {
						zhxgUserId: Base64.encode('U' + _this.$store.state.ZHXGUSERID),
						userId: _this.$store.state.ZHXGUSERID,
						requestUri: '/yqms/v1/judged/exportJudgedList',
						taskType: '2',
						requestParam: JSON.stringify({"ids": _this.getInfoIds(_this.uuidList)}),
						fileName: '舆情研判批量导出'+ moment().format("YYYYMMDDHHmm"),
		    		}
		    		getEexportJudgedList(params).then(res=>{
		    			if(res.data.code == 200){
		    				let path = res.data.data;
		    				window.location = path;
		    				this.$message({
		                        message: '批量导出信息成功！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
		                        type: 'success'
		                    });
		    			}else{
		    				_this.$message({
								type: 'error',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
								message: '批量导出信息失败!'
							});	
		    			}
	                }).catch(err=>{
	                    console.log(err);
	                });
	    		}else{
					_this.$message({
						type: 'error',
			        	customClass: 'common_tips_style',
			        	center: true,  //文字水平居中
						message: '请选择您要导出的信息!'
					});			
		        }
			},
			//全部导出成功——去查看
			handleAllexportConfirm(){
				this.showAlleportDialog = false;
				//  this.$store.commit('updateVal','isShowCenterTaskMask',true);
				this.$store.commit('updateVal',{'name': 'isShowCenterTaskMask','value':true});
				// this.$store.state.isShowCenterTaskMask = true;
				// this.showTaskCenterDialog = true;
			},
		    //操作条 —— 全部导出
		    allExport(){
				let _this = this;
				_this.handleBodyClick();
				let params = {
					userId: _this.$store.state.ZHXGUSERID,
					requestUri: '/yqms/v1/judged/exportAllJudgedList',
					taskType: '1',
					requestParam: JSON.stringify(_this.inquireParameter),
					fileName: '舆情研判全部导出'+ moment().format("YYYYMMDDHHmm"),
				}
	    		getEexportAllJudgedList(params).then(res=>{ 
	    			if(res.data.code == 200){
						_this.showAlleportDialog = true;
	    				// let path = res.data.result.data.path;
	    				// window.location = path;
	    				// this.$message({
	                    //     message: '全部导出信息成功！',
				        // 	customClass: 'common_tips_style',
				        // 	center: true,  //文字水平居中
	                    //     type: 'success'
	                    // });
	    			}else{
	    				_this.$message({
							type: 'error',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
							message: '全部导出信息失败!'
						});	
	    			}
                }).catch(err=>{
                    console.log(err);
                });
		    },
		    //操作条 —— 标已读
		    markAllRead(){
		    	let _this = this;
		    	_this.handleBodyClick();
		    	// 是否从后台登录，前台登录为''
				let backlogin = _this.$store.state.backLogin;
				if(backlogin == ''){
			    	if(_this.checkList.length > 0){
			    		let params = {
			    			userid: _this.$store.state.ZHXGUSERID,
		                    session: _this.$store.state.ACCESSTOKEN,
	          				ksuuids: _this.getInfoIds(_this.uuidList)
			    		}
			    		markReadList(params).then(res=>{ 
			    			let status = res.data.result;
			    			if(status == 1){
		                        //添加成功
		                        this.$message({
		                            message: '标记已读成功！',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
		                            type: 'success'
		                        });
		                        // 标记已读高亮
					    		for(let n in _this.checkList){
		                        	let list = _this.checkList[n];
		                        	for(let i in _this.listData){
						    			let item = _this.listData[i];
						    			if(list == item.uuid){
						    				item.isRead = 1;
						    			}
						    		}
		                        }
		                    }else{
		                    	_this.$message({
									type: 'error',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
									message: '标记已读失败!'
								});	
			    			}
			    		}).catch(err=>{
		                    console.log(err);
		                });
			    	}else{
						_this.$message({
							type: 'error',
				        	customClass: 'common_tips_style',
				        	center: true,  //文字水平居中
							message: '请选择您要标记已读的信息!'
						});			
			        }
			    }
		    },
		    //操作条 —— 删除
		    deleteAllList(){
		        let _this = this;
		        _this.handleBodyClick();
		        if(_this.checkList.length > 0){
		        	_this.showDeleteDialog = true;
		        }else{
		          _this.$message({
		            type: 'error',
		        	customClass: 'common_tips_style',
		        	center: true,  //文字水平居中
		            message: '请选择您要删除的信息!'
		          });
		        }
		    },
		    //操作条 —— 分页
		    updatePageSize(pagesize){
		    	this.handleBodyClick();
		        this.inquireParameter.pageSize = pagesize;
		        this.inquireParameter.pageNum = 1;
		        this.judgmentListData.pageNum = 1; //返回到第一页
		        this.queryData();
		    },
		    //操作条 —— 是否显示摘要
		    showAbstract(flag){
		    	this.handleBodyClick();
		    	this.isShowAbstract = !flag;
		    },
		    //操作条 —— 加关注
		    addAttentionAllList(atten){
		    	let _this = this;
		    	if(_this.checkList.length > 0){
		    		let p = {
	                    shareUserId: _this.$store.state.ZHXGUSERID,
	                    userid: _this.$store.state.ZHXGUSERID,
	                    session: _this.$store.state.ACCESSTOKEN,
	                    Uids: _this.getInfoIds(_this.checkList),
	                    urls: '',
	                    shareid: '',
	                    classid: atten.kmid,
	                    KR_INFOTYPE: '07',
	                    KR_KEYWORDID: '',
	                    KV_CTIME: ''
	                }
		    		addMyattention(p).then(res=>{ 
	                    let msg = res.data.result;
	                    if(msg == 1){
	                        //添加成功
	                        this.$message({
	                            message: '添加成功！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'success'
	                        });
	                        // 加关注高亮
	                        for(let n in _this.checkList){
	                        	let list = _this.checkList[n];
	                        	for(let i in _this.listData){
					    			let item = _this.listData[i];
					    			if(list == item.infoId){
					    				item.isMyAttention = 1;
					    			}
					    		}
	                        }
	                        this.handleBodyClick();
	                    }else if(msg == '0'){
	                        this.$message({
	                            message: '加入主键不能为空！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }else if(msg=='3'){
	                        this.$message({
	                            message: '信息不存在！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }else if(msg=='5'){
	                        this.$message({
	                            message: '数据库出错，加入关注内容失败！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }else if(msg=='2'){
	                        this.$message({
	                            message: '该信息已添加，请勿重复操作！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }else{
	                        this.$message({
	                            message: '添加失败！',
					        	customClass: 'common_tips_style',
					        	center: true,  //文字水平居中
	                            type: 'warning'
	                        });
	                    }
	                }).catch(err=>{
	                    console.log(err);
	                });
		    	}else{
					this.$message({
						type: 'error',
			        	customClass: 'common_tips_style',
			        	center: true,  //文字水平居中
						message: '请选择您要加关注的信息!'
					});			
		        }
		    },
		    //操作条 —— 加简报
		    addBriefingAllList(brief){
		    	let _this = this;
		    	if(_this.checkList.length > 0){
		    		let isNewTemplates = this.$store.state.isNewTemplate;   //网参报告0 舆情报告1
	                let kusex = this.$store.state.kusex;                    //4企业
	                if (isNewTemplates == 1 && kusex != 4) {
	                	//舆情报告  不是企业用户
	                    let p = {
	                        ksUuids: _this.getInfoIds(_this.uuidList),  //信息 id
	                        classifyId: brief.id,       // 简报id
	                    }
	                    saveReport(p).then(res=>{
	                        let datas = res.data.result.data || '';
	                        if(datas != ""){
	                            if(datas.faildResult == '1' && datas.successResult == '0'){
	                                this.$message({
	                                    message: '该信息已添加，请勿重复操作！',
							        	customClass: 'common_tips_style',
							        	center: true,  //文字水平居中
	                                    type: 'warning'
	                                });
	                            }else if(datas.faildResult >0 && datas.successResult >=0){
	                                this.$message({
	                                    message: '添加成功 重复文章将自动被过滤！',
							        	customClass: 'common_tips_style',
							        	center: true,  //文字水平居中
	                                    type: 'success'
	                                });
	                                // 加简报高亮
						    		for(let n in _this.checkList){
			                        	let list = _this.checkList[n];
			                        	for(let i in _this.listData){
							    			let item = _this.listData[i];
							    			if(list == item.infoId){
							    				item.isReport = 1;
							    			}
							    		}
			                        }
			                        this.handleBodyClick();
	                            }else{
	                                this.$message({
	                                    message: '添加成功！',
							        	customClass: 'common_tips_style',
							        	center: true,  //文字水平居中
	                                    type: 'success'
	                                });
	                                // 加简报高亮
						    		for(let n in _this.checkList){
			                        	let list = _this.checkList[n];
			                        	for(let i in _this.listData){
							    			let item = _this.listData[i];
							    			if(list == item.infoId){
							    				item.isReport = 1;
							    			}
							    		}
			                        }
			                        this.handleBodyClick();
	                            }
	                        }
	                    }).catch(err=>{
	                        console.log(err);
	                    });
	                } else {
			    		let p = {
		                    userid: this.$store.state.ZHXGUSERID,
		                    session: this.$store.state.ACCESSTOKEN,
		                    Uids: _this.getInfoIds(_this.checkList),
		                    KYid:  brief.id,          // 简报id
	                    	KR_INFOTYPE: '07'
		                }
		                //网参报告
		                saveBrief(p).then(res=>{ 
		                    let msg = res.data.result;
		                    if(msg == 1){
		                        //添加成功
		                        this.$message({
		                            message: '加入简报成功！',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
		                            type: 'success'
		                        });
		                        this.handleBodyClick();
		                    }else if(msg == 0){
		                        this.$message({
		                            message: '加入主键不能为空！',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
		                            type: 'warning'
		                        });
		                    }else if(msg == 2){
		                        this.$message({
		                            message: '该信息已添加，请勿重复操作！',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
		                            type: 'warning'
		                        });
		                    }else if(msg == 3){
		                        this.$message({
		                            message: '信息不存在!',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
		                            type: 'warning'
		                        });
		                    }else if(msg == 4 || msg == 5){
		                        this.$message({
		                            message: '加入简报失败!',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
		                            type: 'warning'
		                        });
		                    }else{
		                        this.$message({
		                            message: '添加失败！',
						        	customClass: 'common_tips_style',
						        	center: true,  //文字水平居中
		                            type: 'warning'
		                        });
		                    }
		                }).catch(err=>{
		                    console.log(err);
		                });
		            }
		    	}else{
					_this.$message({
						type: 'error',
			        	customClass: 'common_tips_style',
			        	center: true,  //文字水平居中
						message: '请选择您要加简报的信息!'
					});			
		        }
		    },
		    /***************以上为操作条功能***************/
		},
		mounted() {
            let _this = this;
            //查询列表数据
            _this.queryData();
            document.addEventListener('click', this.handleBodyClick);

           	/***************以下为操作条功能***************/
			_this.$nextTick(() => { //使用nextTick为了保证dom元素都已经渲染完毕
				let w = _this.$refs.contentWidth.clientWidth;
				_this.parentWidth = w;
			});
			// 操作条—— 注：window.onresize只能在项目内触发1次
			window.onresize = function windowResize () {
				// 通过捕获系统的onresize事件触发我们需要执行的事件
				_this.parentWidth = _this.$refs.contentWidth.clientWidth;
			}
			/***************以上为操作条功能***************/
		},
	    watch: {
			'parentWidth':{
				handler(val,oldVal){
					this.parentWidth = val;
				},
				deep: true
			}
	    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./list.css");
</style>

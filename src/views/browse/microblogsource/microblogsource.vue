<template>
	<div class="wrap">
		<!--头部开始-->
        <yqms-header ref="header" :funName="queryParams.type == 1 ? '舆情浏览' : '推送预警'" :showCompilemask="showCompilemask" :showHomepageCustom="showHomepageCustom"></yqms-header>
        <!--头部结束 -->
        <!-- 加载中 -->
        <div class="masker" v-show="isLoading">
            <loading ></loading>
        </div>
        <div class="microblog_box" v-show="!isLoading">
        	<!-- 博主信息 -->
        	<div class="microblog_list_box" :class="(JSON.stringify(infoDetail) != '{}' && JSON.stringify(summary) == '{}' && JSON.stringify(keyBlogger) == '{}' && topReprint2nd.length == 0 && JSON.stringify(propagationPathData) == '{}' && tableData.length == 0 && trend.length == 0) ? 'no_border_btom' : '' ">
        		<div class="microblog_title"><span class="line"></span><span class="title">信息概况</span></div>
        		<div class="microblog_userinfo_box">
                    <div class="blog_comment_content border_box flex" v-if="JSON.stringify(infoDetail) != '{}'">
            			<div class="userinfo_left" v-show="infoDetail.userName != ''">
            				<div class="userinfo_box flex_verticle">
            					<div class="userinfo_img_box">
            						<img class="userinfo_img" :src="infoDetail.userPic" v-if="infoDetail.userPic != ''"/>
                                    <img class="userinfo_img" src="../../../assets/images/browse/classic/default_icon.png" v-else/>
            					</div>
            					<div class="userinfo_txt_box">
            						<p class="userinfo_name">{{infoDetail.userName}}</p>
            						<p class="userinfo_num">
            							<span class="light">关注：</span><span class="dark">{{infoDetail.friendsCount}}</span>
                                        <span class="light light_margin">粉丝：</span><span class="dark">{{infoDetail.followersCount}}</span>
                                    </p>
            					</div>
            				</div>
            			</div>
            			<div class="line_dashed" v-show="infoDetail.userName != ''"></div>
            			<div class="userinfo_right border_box flex_1" :class="infoDetail.firstPublish ? 'isfirst' : ''">
                            <p class="userinfo_desc" v-if="infoDetail.content.length > 115">博文：{{infoDetail.content.substring(0,115)+'...'}}<a :href="infoDetail.kvUrl" class="see_original" target="_blank">【查看原文】</a></p>
            				<p class="userinfo_desc" v-else>博文：{{infoDetail.content}}<a :href="infoDetail.kvUrl" class="see_original" target="_blank">【查看原文】</a></p>
            				<span class="first_icon" v-show="infoDetail.firstPublish"></span>
                        </div>
        			</div>
                    <div class="blog_comment_content border_box flex" v-else>
                        <div class="blog_nodata">
                            <nodata></nodata>
                        </div>
                    </div>
        		</div>  
                <!-- 当前作者到首发的串 -->
                <div class="userinfo_paths border_box" v-if="currentDisseminatorList.length > 0">
                    <div class=" flex">
                        <span class="userinfo_path_txt">传播路径：</span>
                        <div class="flex_1 flex_verticle break_line">
                            <div class="userinfo_paths_item flex_verticle" v-for="(item,i) of currentDisseminatorList">
                                <div class="userinfo_img_txt">
                                    <a class="userinfo_img" target="_blank" :href="item.url" :title="item.userName">
                                        <img class="key_users" :src="item.userPic" v-if="item.userPic != ''"/>
                                        <img class="key_users" src="../../../assets/images/browse/classic/default_icon.png" v-else/>
                                    </a>
                                    <p class="userinfo_txt ellipsis">{{item.userName}}</p>
                                </div>
                                <span class="arrow_right" v-if="(i+1) != currentDisseminatorList.length"></span>
                            </div>
                        </div>
                    </div>
                </div>
        		<div class="summary_analysis_box" v-if="JSON.stringify(summary) != '{}'">
        			<p class="summary_analysis">截至分析时间{{currentTime}}，信息曝光量{{summary.exposure}}，共计转发{{summary.reprintCount}}次，其中一转{{summary.reprint1st}}次、二转{{summary.reprint2st}}次、三转{{summary.reprint3st}}次、四转{{summary.reprint4st}}次、四层以上总共{{summary.reprint4thAbove}}次。{{summary.reprintArea}}参与转发人数最多，疑似水军比例
                        <span v-if="summary.pretendFans < 50">{{summary.pretendFans}}%，在正常范围。</span>
                        <span v-else><span class="txt_red">{{summary.pretendFans}}%</span>，不在正常范围。</span>
                    </p>
        		</div>
                <!-- 是首发，未溯到源 -->
                <div class="summary_analysis_box" v-else-if="JSON.stringify(infoDetail) != '{}' && JSON.stringify(summary) == '{}' && JSON.stringify(keyBlogger) == '{}' && topReprint2nd.length == 0 && JSON.stringify(propagationPathData) == '{}'  && tableData.length == 0 && trend.length == 0 && infoDetail.firstPublish">
                    <p class="summary_analysis">截至分析时间{{currentTime}}，该微博舆情暂<span class="txt_red">未被</span>转发传播，即转发数为<span class="txt_red">0</span>，请妥善处理。</p>
                </div>
                <!-- 不是首发，未溯到源 -->
                <div class="summary_analysis_box" v-else-if="JSON.stringify(infoDetail) != '{}' && JSON.stringify(summary) == '{}' && JSON.stringify(keyBlogger) == '{}' && topReprint2nd.length == 0 && JSON.stringify(propagationPathData) == '{}'  && tableData.length == 0 && trend.length == 0 && (!infoDetail.firstPublish)">
                    <p class="summary_analysis">截至分析时间{{currentTime}}，该微博信息<span class="txt_red">在近7天内暂无传播</span>。</p>
                </div>
        	</div>
            <!-- 是首发，未溯到源 -->
            <div class="forward_box" v-if="JSON.stringify(infoDetail) != '{}' && JSON.stringify(summary) == '{}' && JSON.stringify(keyBlogger) == '{}' && topReprint2nd.length == 0 && JSON.stringify(propagationPathData) == '{}' && tableData.length == 0 && trend.length == 0 && infoDetail.firstPublish">
                <div class="noforward_box">
                    <div class="img_noforward"></div>
                    <p>暂<span class="txt_red">未被</span>转发</p>
                </div>
            </div>
            <!-- 不是首发，未溯到源 -->
            <div class="forward_box" v-else-if="JSON.stringify(infoDetail) != '{}' && JSON.stringify(summary) == '{}' && JSON.stringify(keyBlogger) == '{}' && topReprint2nd.length == 0 && JSON.stringify(propagationPathData) == '{}' && tableData.length == 0 && trend.length == 0 && (!infoDetail.firstPublish)">
                <div class="noforward_box">
                    <div class="img_noforward"></div>
                    <p>暂无传播</p>
                </div>
            </div>
            <div v-else>
                <!-- 首发 -->
                <div class="microblog_list_box" v-show="JSON.stringify(bloggerDetail) != '{}'">
                    <div class="microblog_title"><span class="line"></span><span class="title">首发</span></div>
                    <div class="first_info_box flex">
                        <div class="first_info_left flex">
                            <div class="first_user_img_box">
                                <img class="userinfo_img" :src="bloggerDetail.userPic" v-if="bloggerDetail.userPic != ''"/>
                                <img class="userinfo_img" src="../../../assets/images/browse/classic/default_icon.png" v-else/>
                            </div>
                            <div class="first_bloger_info">
                                <p class="dark">{{bloggerDetail.userName}}</p>
                                <p><span class="light">关注：</span><span class="dark">{{bloggerDetail.friendsCount}}</span></p>
                                <p><span class="light">粉丝：</span><span class="dark">{{bloggerDetail.followersCount}}</span></p>
                            </div>
                        </div>
                        <div class="first_info_right border_box flex_1">
                            <p class="userinfo_desc">{{bloggerDetail.content}}<a :href="bloggerDetail.url" target="_blank" class="see_original">【查看原文】</a></p>
                            <p class="first_time">{{bloggerDetail.ctime}}</p>
                        </div>
                    </div>
                </div>
                <!-- 关键传播路径 -->
                <div class="microblog_list_box" v-show="JSON.stringify(propagationPathData) != '{}'">
                    <div class="microblog_title"><span class="line"></span><span class="title">关键传播路径</span></div>
                    <div class="propagation">
                        
                        <div class="propagation_path" ref="spread" v-show="JSON.stringify(propagationPathData) != '{}'"></div>
                        <div class="reset_play" style="display:none;">重播</div>
                        <div class="propagation_tips border_box">
                            左图给出关键传播帐号的传播路径，黄色节点为根节点。传播第一层转发占比<span>{{percent}}%</span>，最大深度为<span>{{depth}}</span>。
                            <p>默认显示博主名称为主要传播人;</p>
                            <p>相同颜色代表同一转发层级;</p>
                            <p>节点直径越大，被转发数越多;</p>
                        </div>
                    </div>
                </div>
            	<!-- 引爆点 -->
            	<div class="microblog_list_box" v-if="topReprint2nd.length > 0">
            		<div class="microblog_title">
                        <span class="line"></span><span class="title">引爆点</span> 
                        <span class="see_more_account" v-show="tableData.length > 0" @click="showBasicDialog = true">更多传播账号&gt;&gt;</span>
                    </div>
                    <div class="desc_point_box border_box flex">
                        <div class="flex_1">
                            <div class="desc_point_info border_box desc_point_info_bg">
                                <div class="point_info_box flex" :class="'point_info_'+(i+1)" v-for="(item,i) of topReprint2nd" v-if="i <= 3">
                                    <div class="point_info_img_box">
                                        <img class="point_info_img" :src="item.userPic" v-if="item.userPic != ''" />
                                        <img class="point_user_img" src="../../../assets/images/browse/classic/default_icon.png" v-else/>
                                    </div>
                                    <div class="point_info_txt mar_left">
                                        <p class="uname" v-clamp="{number: 2, size: 12}" v-html="item.userName"></p>
                                        <p class="fans">粉丝：<span class="fans_num">{{item.followersCount}}</span></p>
                                        <p class="two_forward">二次转发：<span class="forward_num">{{item.childrenSize}}</span></p>
                                        <p class="forward_time">转发时间：{{item.ctime}}</p>
                                    </div>
                                </div>
                                <div class="point_info_box flex" :class="'point_info_'+(i+1)"  v-else-if="i > 3 && i <= 7">
                                    <div class="point_info_txt mar_right">
                                        <p class="uname">{{item.userName}}</p>
                                        <p class="fans">粉丝：<span class="fans_num">{{item.followersCount}}</span></p>
                                        <p class="two_forward">二次转发：<span class="forward_num">{{item.childrenSize}}</span></p>
                                        <p class="forward_time">转发时间：{{item.ctime}}</p>
                                    </div>
                                    <div class="point_info_img_box">
                                        <img class="point_info_img" :src="item.userPic" v-if="item.userPic != ''" />
                                        <img class="point_user_img" src="../../../assets/images/browse/classic/default_icon.png" v-else/>
                                    </div>
                                </div>
                            </div>    
                        </div>
                        <!-- <div class="desc_point_info" v-else>
                            <nodata></nodata>
                        </div> -->
                        <div class="line_dashed2"></div>
                        <div class="detonating_point_box border_box">
                            <div class="detonating_point_top">
                                <p class="point_txt">关键传播用户（引发最大转发的转发者）</p>
                                <div class="detonating_point_top_content flex" v-if="JSON.stringify(keyBlogger) != '{}'">
                                    <div class="point_user_img_box">
                                        <img class="point_user_img" :src="keyBlogger.userPic" v-if="keyBlogger.userPic != ''"/>
                                        <img class="point_user_img" src="../../../assets/images/browse/classic/default_icon.png" v-else/>
                                    </div>
                                    <div class="point_user_info flex_1">
                                        <p class="pointer_user_txt">{{keyBlogger.userName}}</p>
                                        <p>
                                            <p><span class="light">关注：</span><span class="dark">{{keyBlogger.friendsCount}}</span>
                                            <span class="light light_margin">粉丝：</span><span class="dark">{{keyBlogger.followersCount}}</span>
                                            <span class="light light_margin">转发数：</span><span class="dark">{{keyBlogger.childrenSize}}</span>
                                        </p>
                                        <p class="forward_content_desc" v-if="keyBlogger.content.length > 60"><span class="forward_content">转发内容</span>{{keyBlogger.content.substring(0,60)+'...'}}<a :href="keyBlogger.url" class="see_original" target="_blank">【查看原文】</a></p>
                                        <p class="forward_content_desc" v-else><span class="forward_content">转发内容</span>{{keyBlogger.content}}<a :href="keyBlogger.url" class="see_original" target="_blank">【查看原文】</a></p>
                                        <p class="pointer_forward_time">{{keyBlogger.ctime}}</p><!-- 转发时间 -->
                                    </div>
                                </div>
                            </div>
                            <div class="detonating_point_botm"  v-if="keyDisseminatorList.length > 0">
                                <p class="point_txt">关键用户传播路径</p>
                                <div class="blog_keybloger flex_verticle break_line">
                                   <div class="userinfo_paths_item flex_verticle" v-for="(item,i) of keyDisseminatorList">
                                        <div class="userinfo_img_txt">
                                            <a class="key_users_box" target="_blank" :href="item.url" :title="item.userName">
                                                <img class="key_users" :src="item.userPic" v-if="item.userPic != ''"/>
                                                <img class="key_users" src="../../../assets/images/browse/classic/default_icon.png" v-else/>
                                            </a>
                                            <p class="userinfo_txt ellipsis">{{item.userName}}</p>
                                        </div>
                                        <span class="arrow_right" v-if="(i+1) != keyDisseminatorList.length"></span>
                                   </div>
                                </div>
                            </div>
                        </div>  
                    </div>
            	</div>
                <!-- 更多传播账号 -->
                <basic-dialog :showBasicDialog="showBasicDialog" title="关键传播账号" @clickCloseBasicDialog="hanldeCloseDialog" width="70%">
                    <div class="microblog_list_box border_box microblog_table" v-show="tableData.length > 0">
                        <div class="media_loading2" v-show="isLoading2">
                            <loading ></loading>
                        </div>
                        <div class="account" v-show="!isLoading2">
                            <div class="account_tab_box">
                                <div class="account_tab_header flex">
                                    <div class="tab_column_01">传播账号</div>
                                    <div class="tab_column_02">二次转发</div>
                                    <div class="tab_column_03">转发时间</div>
                                    <div class="tab_column_04">微博地址</div>
                                    <div class="tab_column_05">粉丝数</div>
                                </div>
                                <div class="account_tab_list flex" v-for="(list,i) of tableData"  :class="(i% 2 == 0)? 'tab_odd': ''">
                                    <div class="tab_column_01 ellipsis">{{list.userName}}</div>
                                    <div class="tab_column_02">{{list.childrenSize}}</div>
                                    <div class="tab_column_03">{{list.ctime}}</div>
                                    <div class="tab_column_04 ellipsis">{{list.url}}</div>
                                    <div class="tab_column_05">{{list.followersCount}}</div>
                                </div>
                            </div>
                            <!-- 分页 -->
                            <pagenation :pages="pages" :current.sync="queryParams.pageNum" :totals="total" @navpage="clickPage"></pagenation>
                        </div>
                    </div>
                </basic-dialog>
            	<!-- 转发时间趋势 -->
            	<div class="microblog_list_box">
            		<div class="microblog_title"><span class="line"></span><span class="title">转发时间趋势</span></div>
            		<div class="forward_time_tendency" ref="timetrend" v-show="trend.length > 0"></div>
                    <div class="forward_time_tendency" v-if="trend.length == 0">
                        <nodata></nodata>
                    </div>
                </div>
        	</div>
        </div>
        <!--底部开始-->
        <yqms-footer></yqms-footer>
        <!--底部结束-->
	</div>
</template>
<script>
	import yqmsHeader from '@/components/header/header.vue'
    import yqmsFooter from '@/components/footer/yqmsFooter.vue'
    import pagenation from '@/components/pagenation/pagenation.vue'
    import basicDialog from '@/components/basicDialog/basicDialog.vue'
    import { weiboSpreadData } from '@/api/source'
    let moment = require("moment");
    let numeral = require("numeral");
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/tree');
    require('echarts/lib/chart/line');
    // require('echarts/lib/chart/graph');
    require('echarts/lib/component/tooltip');
    require('echarts/extension/dataTool');

	export default {
		name: 'microblogsource',
		data() {
			return {
                showBasicDialog: false, //是否显示弹窗
                isLoading: true,
                isLoading2: false,
                showCompilemask: false, //是否显示首页自定义,显示时，所有模块的删除按钮显示
				showHomepageCustom: false, //是否显示首页自定义文本
				queryParams: {
                    krUuid: "",          //kruuid
                    shareUserId: "",     //shareUserId
                    type: "",            //跳转类型 1 舆情浏览  2 推送预警
                    pageSize:'6',        //每页条数
                    pageNum:1,           //当前页数
                },
                pages: 1,               //总页数
                total: 0,               //总条数
                tableData: [],      //传播账号
                spreadData: [],     //传播账号翻页
                summary: {},        //微博传播概述
                infoDetail: {},     //当前微博博主信息
                bloggerDetail: {},  //微博博主信息
                keyBlogger: {},     //关键传播者
                topReprint2nd: [],  //二次转发top90，最多返回90条数据
                percent: 0,         //传播第一层转发占比
                depth: 0,           //最大深度
                trend: [],          //转发时间分布
                tree: [],           //传播树
                currentTime: '',    //当前时间
                propagationPathData: {}, //传播路径
                currentDisseminatorList: [], //当前作者到首发的串
                keyDisseminatorList: [], //重点传播用户到首发的串
			}
		},
		components: {
			yqmsHeader,
			yqmsFooter,
			pagenation,
            basicDialog
		},
		methods: {
            //查询微博溯源数据
            queryData(){
                let _this = this;
                weiboSpreadData(_this.queryParams).then(res => {
                    _this.isLoading = false;
                    res = JSON.parse(JSON.stringify(res));
                    if(res.data.status == '0') {
                        let result = res.data.result.data;
                        _this.infoDetail = result.infoDetail || {};
                        if(JSON.stringify(_this.infoDetail) != '{}'){
                            _this.infoDetail.friendsCount = numeral(_this.infoDetail.friendsCount).format('0,0');
                            _this.infoDetail.followersCount = numeral(_this.infoDetail.followersCount).format('0,0');
                            _this.infoDetail.userPic = ((_this.infoDetail.userPic == null || _this.infoDetail.userPic == undefined) ? '' : _this.infoDetail.userPic);
                        }
                        //首发
                        _this.bloggerDetail = result.bloggerDetail || {};
                        if(JSON.stringify(_this.bloggerDetail) != '{}'){
                            _this.bloggerDetail.friendsCount = numeral(_this.bloggerDetail.friendsCount).format('0,0');
                            _this.bloggerDetail.followersCount = numeral(_this.bloggerDetail.followersCount).format('0,0');
                            _this.bloggerDetail.userPic = ((_this.bloggerDetail.userPic == null || _this.bloggerDetail.userPic == undefined) ? '' : _this.bloggerDetail.userPic);
                            if(_this.bloggerDetail.ctime){
                                _this.bloggerDetail.ctime = moment(_this.bloggerDetail.ctime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss');
                            }else{
                                _this.bloggerDetail.ctime = '';
                            }
                            if(_this.bloggerDetail.content) {
                                if(_this.bloggerDetail.content.length > 115){
                                    _this.bloggerDetail.content = _this.bloggerDetail.content.substring(0,115)+'...';
                                }
                            }
                        }

                        _this.currentTime = moment().format('LLL');//当前时间
                        _this.summary = result.summary || {};
                        if(JSON.stringify(_this.summary) != '{}'){
                            let newdata = _this.summary.reprintArea.split(":");
                            //分割出来地区
                            _this.summary.reprintArea = newdata[0];
                            _this.summary.exposure = numeral(_this.summary.exposure).format('0,0');
                            _this.summary.reprint1st = numeral(_this.summary.reprint1st).format('0,0');
                            _this.summary.reprint2st = numeral(_this.summary.reprint2st).format('0,0');
                            _this.summary.reprint3st = numeral(_this.summary.reprint3st).format('0,0');
                            _this.summary.reprint4st = numeral(_this.summary.reprint4st).format('0,0');
                            _this.summary.reprint4thAbove = numeral(_this.summary.reprint4thAbove).format('0,0');
                            _this.summary.reprintCount = numeral(_this.summary.reprintCount).format('0,0');
                        }else{
                            _this.summary = {};
                        }
                        _this.keyBlogger = result.keyBlogger || {};
                        if(JSON.stringify(_this.keyBlogger) != '{}'){
                            _this.keyBlogger.friendsCount = numeral(_this.keyBlogger.friendsCount).format('0,0');
                            _this.keyBlogger.followersCount = numeral(_this.keyBlogger.followersCount).format('0,0');
                            _this.keyBlogger.childrenSize = numeral(_this.keyBlogger.childrenSize).format('0,0');
                            if(_this.keyBlogger.ctime){
                                _this.keyBlogger.ctime = moment(_this.keyBlogger.ctime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss');
                            }else{
                                _this.keyBlogger.ctime = '';
                            }

                        }else{
                            _this.keyBlogger = {};
                        }
                        //当前用户传播路径
                        let currentBloggerPathData = result.currentDisseminatorList || [];
                        if(currentBloggerPathData.length > 0){
                            for(let m in currentBloggerPathData){
                                let item = currentBloggerPathData[m];
                                _this.currentDisseminatorList.push({
                                    url: item.url,
                                    userName: item.userName,
                                    userPic:  (item.userPic == undefined ? '' : item.userPic)
                                });
                            }
                        }else{
                            _this.currentDisseminatorList = [];
                        }
                        //关键用户传播路径
                        let keyBloggerPathData = result.keyDisseminatorList || [];
                        if(keyBloggerPathData.length > 0){
                            for(let j in keyBloggerPathData){
                                let item = keyBloggerPathData[j];
                                _this.keyDisseminatorList.push({
                                    url: item.url,
                                    userName: item.userName,
                                    userPic:  (item.userPic == undefined ? '' : item.userPic)
                                });
                            }
                        }else{
                            _this.keyDisseminatorList = [];
                        }
                        _this.percent = result.percent || 0;
                        _this.depth = result.depth || 0;
                        //引爆点
                        let pointdata = result.topReprint2nd || []; 
                        if(pointdata.length > 0){
                            for(let i in pointdata){
                                let item = pointdata[i];
                                item.friendsCount = numeral(item.friendsCount).format('0,0');
                                item.followersCount = numeral(item.followersCount).format('0,0');
                                item.childrenSize = numeral(item.childrenSize).format('0,0');
                                item.ctime = moment(item.ctime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm');
                            }
                            _this.topReprint2nd = pointdata;
                            _this.tableData = JSON.parse(JSON.stringify(pointdata));
                            //为翻页准备数据，不要动
                            _this.spreadData = JSON.parse(JSON.stringify(pointdata));
                        }else{
                            _this.topReprint2nd = [];
                            _this.tableData = [];
                        }
                        //传播账号
                        _this.total = pointdata.length;  //总条数
                        _this.pages = Math.ceil(_this.total/_this.queryParams.pageSize);  //总页数  
                        // 第一次加载页面时，截取前6条
                        _this.tableData = _this.tableData.slice((_this.queryParams.pageNum-1)*6,_this.queryParams.pageNum*6);
                        //转发时间趋势
                        _this.trend = result.trend || [];
                        if(_this.trend.length > 0){
                            _this.$nextTick(() => {
                                _this.forwardTimeTrend(_this.trend);
                            });
                        }
                        //传播路径
                        _this.propagationPathData = result.propagationPath || {};
                        if(JSON.stringify(_this.propagationPathData) != '{}'){
                            _this.$nextTick(() => {
                                var transRouteInterval = setInterval(function () {
                                    _this.transRoute(transRouteInterval);
                                },2000)
                            });
                        }
                    }else{
                        _this.pages = 0;    
                    }
                }).catch(err => {
                    console.log(err, '请求失败！');
                });
            },
            //分页
            clickPage(curPage) {
                let _this = this;
                _this.isLoading2 = true;
                setTimeout(function(){
                    _this.isLoading2 = false;
                    //分页组件跳转
                    _this.queryParams.pageNum = curPage;
                    _this.tableData = _this.spreadData.slice((_this.queryParams.pageNum-1)*6,_this.queryParams.pageNum*6);
                },500);
            },
            //转发时间趋势
            forwardTimeTrend(data){
                let timetrend = echarts.init(this.$refs.timetrend);
                let xAxisArray = [];
                let seriesArray = [];
                if(data.length > 0){
                    for(var i in data){
                        let time = moment(data[i].date).format('YYYY-MM-DD HH:mm');
                        xAxisArray.push(time);    //时间
                        seriesArray.push(data[i].count)    //总数
                    }
                }
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        formatter: function(params) {
                        　　var result = '';
                        　　var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#7eb1ec"></span>';
                        　　params.forEach(function (item) {
                        　　　　result += item.axisValue + "</br>" + dotHtml + '转发量：' +item.data;
                        　　});
                        　　return result;
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: xAxisArray,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                           show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        minInterval: 1,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                           show: false
                        }
                    },
                    series: [{
                        data: seriesArray,
                        type: 'line',
                        /*areaStyle: {
                            color: '#cae1fd'
                        },*/
                        lineStyle: {
                            color: '#7eb1ec'
                        },
                        itemStyle: {
                            borderColor: '#7eb1ec'
                        }
                    }]
                };
                timetrend.resize();
                timetrend.setOption(option);
            },
            transRoute:function(transRouteInterval){
                var _this = this;
                let spread = echarts.init(this.$refs.spread);
                //if(result.status=='0'){
                var res=_this.propagationPathData;
                if(res){
                    clearInterval(transRouteInterval);
                    var nodes = [];
                    res.node && nodes.push(res.node[0]);
                    if(nodes.length!=0){
                        var colorList = [
                            '#FFA741','#759AA0','#E69D87','#6E7074','#7289AB',
                            '#F0805A','#73A373','#2F4554','#D7504B','#26C0C0'
                        ];
                        var edges = res.line;
                        var i = 1;
                        var timerGetData  = setInterval(function() {
                            if(i ==_this.depth+1) {
                                clearInterval(timerGetData);
                                document.getElementsByClassName("reset_play")[0].style.display=null;
                                return;
                            }
                            var tempNodesArr = [];
                            tempNodesArr = res.node.filter(function(item) {
                                return item.deep == i;
                            })
                            nodes = nodes.concat(tempNodesArr);
                            //option
                            let transRouteOption = {
                                background:'#fff',
                                toolbox:{
                                    show:true,
                                    feature:{
                                        restore:{}
                                    }
                                },
                                series : [
                                    {
                                        type: 'graph',
                                        layout: 'force',
                                        animationDuration: 1500,
                                        animationEasingUpdate: 'quinticInOut',
                                        force:{
                                            gravity:0.1,
                                            edgeLength: [30, 50],
                                            repulsion: 50
                                        },
                                        nodes: nodes.map(function (node) {
                                            var num = _this.depth > 3 ? '2' : '1.8';
                                            if(node.deep==0)
                                                num=1;
                                            return {
                                                // x: node.x,
                                                // y: node.y,
                                                id: node.id,
                                                name: node.label,
                                                symbolSize: node.size * num,
                                                label: {
                                                    normal: {
                                                        show: (node.size > 36 || node.isBoom)
                                                    }
                                                },
                                                itemStyle: {
                                                    normal: {
                                                        color: colorList[node.deep],
                                                        brushType: 'both',
                                                        borderColor: node.isBoom ? '#fff' : '',
                                                        borderWidth: node.isBoom ? 2 : '',
                                                        shadowBlur: node.isBoom ? 15 : '',
                                                        shadowColor: node.isBoom ? 'rgba(0, 0, 0, 0.6)' : ''
                                                    }
                                                }
                                            };
                                        }),
                                        edges: edges.map(function (edge) {
                                            return {
                                                source: edge.sourceID,
                                                target: edge.targetID
                                            };
                                        }),
                                        roam: true,
                                        focusNodeAdjacency: true,
                                        itemStyle: {
                                            normal: {
                                                shadowBlur: 10,
                                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                                            }
                                        },
                                        label: {
                                            position: 'right',
                                            color: '#fff'
                                        },
                                        lineStyle: {
                                            width: 0.5,
                                            color:'#FEF806',
                                            curveness: 0.3,
                                            opacity: 0.7
                                        },
                                        emphasis: {
                                            lineStyle: {
                                                width: 1
                                            }
                                        }
                                    }
                                ]
                            };
                            i++;
                            spread.setOption(transRouteOption);
                            spread.resize();
                        },1500)
                    }
                    else{

                    }
                }
                //重播
                document.getElementsByClassName("reset_play")[0].addEventListener('click',function(e){
                    e.preventDefault();
                    document.getElementsByClassName("reset_play")[0].style.display="none";
                    _this.transRoute(transRouteInterval);
                });
            },
            //关闭弹窗
            hanldeCloseDialog(){
                let _this = this;
                _this.showBasicDialog = false;
                //关闭后，数据重置到第一页
                _this.queryParams.pageNum = 1;
                _this.tableData = _this.spreadData.slice((_this.queryParams.pageNum-1)*6,_this.queryParams.pageNum*6);
            }
		},
		mounted() {
            let _this = this;
            let query = _this.$route.query;
            _this.queryParams.krUuid = query.kruuid;
            _this.queryParams.shareUserId = query.shareid;
            _this.queryParams.type = query.type;
            _this.queryData();

            let myEchart = echarts.init(_this.$refs.timetrend);
            let spreadEchart = echarts.init(_this.$refs.spread);
            // echart 根据浏览器缩放变化
            window.addEventListener('resize', () => {
                myEchart.resize();
                spreadEchart.resize();
            });
            
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./microblogsource.css");
</style>

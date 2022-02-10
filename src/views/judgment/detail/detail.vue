<template>
	<div class="wrap" @click="hideLayer()">
		<!--头部开始-->
        <yqms-header ref="header" funName="舆情研判" :showCompilemask="showCompilemask" :showHomepageCustom="showHomepageCustom"></yqms-header>
        <div class="judgment_center">
        	<div class="judgment_detail_box center_detail">
                <div class="info_detail_box clearfix_detail">
                    <div :class="sameWarningListInfo.length == 0 ? 'info_detail_left fl info_detail_left100':'info_detail_left fl'">
                        <h1 class="info_detail_title">{{detailInfo.title}}</h1>
                        <div class="information">
                            <span class="info_time">{{detailInfo.publishTime}}</span>
                            <span class="info_source">来源：{{detailInfo.webname}} </span>
                            <span class="info_author">作者：{{detailInfo.author}}</span>
                        </div>
                        <div class="information">
                            <span class="info_yjjb">预警级别：
                                <span class="yb" v-if="detailInfo.warningLevel == '0'">普通</span>
                                <span class="zd" v-if="detailInfo.warningLevel == '1'">中等</span>
                                <span class="yz" v-if="detailInfo.warningLevel == '2'">严重</span>
                                <span class="gw" v-if="detailInfo.warningLevel == '3'">高危</span>
                            </span>
                            <!--<span class="info_sszt">涉事主体：公民 城管 </span>-->
                            <span class="info_tendency">倾向性：
                                <span class="zheng" v-if="detailInfo.orientation == 1">正面</span>
                                <span class="fu" v-if="detailInfo.orientation == 2">负面</span>
                                <span class="zhong" v-if="detailInfo.orientation == 3">中性</span>
                            </span>
                            <span class="info_sjfl" v-if="detailInfo.tags.length > 0">事件分类： {{detailInfo.tags}}</span>
                        </div>
                        <div class="info_url">
                            <span class="url">原文链接：</span>
                            <a :href="detailInfo.url" v-if="detailInfo.overseas === '0'" target="_blank">{{detailInfo.url}}</a>
                            <a :href="'https://oversea2.istarshine.com/index.php?url='+detailInfo.Base64url+'&type=1&'+$store.state.ZHXGUSERID+'&curtime=<{$curtime}>&token='+$store.state.ACCESSTOKEN" v-else-if="detailInfo.overseas === '1' && $store.state.agentid != ''" target="_blank">{{detailInfo.url}}</a>
                            <a :href="'https://oversea.istarshine.com/index.php?url='+detailInfo.Base64url+'&type=1'" v-else target="_blank">{{detailInfo.url}}</a>
                            <span class="copy_url" @click="clipUrl(detailInfo.url)">复制链接</span>
                        </div>
                        <div class="info_datail_content clearfix_detail">
                            <div class="pic_wrap fl">
                                <ul>
                                    <li class="copy_info">
                                        <a href="javascript:void(0)" @click="clipInfo()" class="copy_infomation" title="复制信息"><i></i>复制信息</a>
                                    </li>
                                    <li class="briefings">
                                        <a href="javascript:void(0)"  v-if="detailInfo.isReport == '1' && $store.state.isNewTemplate != '0'"  class="yj_add_brief" @click.stop="hintInfo('该信息已添加，请勿重复操作！')" title="已加入简报"><i></i>已加简报</a>
                                        <a href="javascript:void(0)" v-else  class="add_brief" @click.stop="showfcWary('addJbWary')" title="加入简报"><i></i>加入简报</a>
                                        <div :class="(briefData.length > 5 ? 'layerWary':'layerWary layerWary_1')" v-show="addJbWary">
                                            <vue-scroll :ops="ops">
                                                <p class="p1">加入简报</p>
                                                <ul class="ul1">
                                                    <li v-for="b in briefData" @click.stop="addBriefing(b.id)">{{b.classifyName}}</li>
                                                </ul>
                                            </vue-scroll>
                                        </div>
                                    </li>
                                    <li class="attention">
                                        <a href="javascript:void(0)" @click.stop="showfcWary('isattentionWary')" class="add_attention" title="加关注" v-if="detailInfo.isMyAttention == '0'">
                                            <i></i>加关注
                                        </a>
                                        <a href="javascript:void(0)" @click.stop="hintInfo('该信息已添加，请勿重复操作！')" class="yj_attention" title="加关注" v-else>
                                            <i></i>已关注
                                        </a>
                                        <div  :class="(mygzClassDate.length > 5 ? 'layerWary':'layerWary layerWary_1')" v-show="isattentionWary">
                                            <vue-scroll :ops="ops">
                                                <p class="p1">加关注</p>
                                                <ul class="ul1">
                                                    <li v-for="list in mygzClassDate" @click.stop="addMyattentions(list.kmid)">{{list.kmname}}</li>
                                                </ul>
                                            </vue-scroll>
                                        </div>
                                    </li>
                                    <li class="topic">
                                        <a href="javascript:void(0)" class="add_topic" title="加入话题"><i></i>加话题</a>
                                    </li>
                                    <li class="report">
                                        <a href="javascript:void(0)" class="report_info" @click.stop="reportInfo()" title="上报信息"><i></i>上报</a>
                                    </li>
                                    <li class="delete">
                                        <a href="javascript:void(0)"  @click.stop="deleteInfo()" class="del_info" title="删除"><i></i>删除</a>
                                    </li>
                                    <li class="share">
                                        <a href="javascript:void(0)" class="share_info"><i></i>分享</a>
                                        <ul>
                                            <li class="kongjian"><a href="javascript:void(0)" @click="shareQQ(detailInfo.url)">腾讯QQ</a></li>
                                            <li class="weixin"><a href="javascript:void(0)">微信</a></li>
                                            <div class="wxkuang">
                                                <div class="wxshare" id="qrcode"></div>
                                                <p>用微信扫描二维码</p>
                                            </div>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                            <div class="content_wrap border_box">
                                <div class="flex suggestWary">
                                    <div class="fl head"><img src="../../../assets/images/judgment/classic/head_ico.png"/></div>
                                    <div :class="suggestClassName">
                                        <i></i>
                                        <div class="tit">研判建议：</div>
                                        <div class="infos">
                                            {{detailInfo.proposal}}
                                        </div>
                                    </div>
                                </div>
                                <p v-html="detailInfo.content"></p>
                                <div v-if="detailInfo.smallVideo" class="gotoVideo item-apeak" :class="detailInfo.coverFlag ? 'coverImg' : ''" @click="staticUrl(detailInfo.url)">
                                    <img :src="detailInfo.smallVideoCover"/>
                                    <div class="transparent_layer"></div>
                                    <span class="font-14 color-white">观看&nbsp;<span class="color-blue">原视频</span>&nbsp;请点击前往</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div class="info_detail_right fr" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">-->
                    <div class="info_detail_right fr" v-if="sameWarningListInfo.length > 0">
                        <div class="same_info">
                            <div class="title clearfix_detail"><b></b>相同信息（<span class="hotname">{{total}}条</span>）
                                <a class="daochu" href="javascript:void(0)" @click="exportSameWarning()">导出</a>
                            </div>
                            <ul>
                                <li class="list" v-for="(swl,i) of sameWarningListInfo">
                                    <a :href="$store.state.oldyqmsUrl+'Browse/infoDetail?uuid='+swl.kvUuid+'&kruuid='+swl.id+'&tid=01&message=&state=1&type=&sourcetype='+swl.sourceType+'&shareid=&kktype=&classid='" class="router-link-active" target="_blank">{{swl.title}}</a>
                                    <span>{{swl.publishTimeGSH}}</span>
                                    <span>{{swl.webname}}</span>
                                </li>
                                <li class="ts" v-show="sameWarningListInfo.length >= 99">此处显示100条信息</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
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
        <!--上报-->
        <report-dialog :ops="ops" :showDialog="showReportDialog" :emails="emails"
                       title="上报信息"  @handleConfirm="handleReportConfirm"
                       @handleCancel="handleCloseMask" @handleCloseMask="handleCloseMask">
        </report-dialog>
	</div>
</template>
<script>
	import yqmsHeader from '@/components/header/header.vue'
    import yqmsFooter from '@/components/footer/yqmsFooter.vue'
    import yqmsPushwaring from '@/components/pushWaring/pushWaring.vue'
    import pagenation from '@/components/pagenation/pagenation.vue'
    import basicDialog from '@/components/basicDialog/basicDialog.vue'
    import deleteDialog from '@/views/judgment/components/deleteDialog/deleteDialog.vue'
    import reportDialog from '@/views/judgment/components/reportDialog/reportDialog.vue'
    import yqmsSidebar from '@/components/sidebar/sidebar.vue'

    import QRCode from 'qrcodejs2'  // 引入qrcode
    import {getDetailsInfo,deleteBatchWarning,getSameWarningList,listMyattentionClassfy,addMyattention,getReportEmails,sendEmail,
        getReportClassifys,saveBrief,saveReport,getExportSameInfo,saveCopyLink,markReadList
    } from '@/api/judgment'
    import store from '@/store'

    let Base64 = require('js-base64').Base64;
    let moment = require("moment");
    export default {
		name: 'judgmentdetail',
		data() {
			return {
                suggestClassName:"fl suggest suggest_00",
				showCompilemask: false, //是否显示首页自定义,显示时，所有模块的删除按钮显示
				showHomepageCustom: false, //是否显示首页自定义文本
                showReportDialog: false,   //是否显示上报弹窗
                emails: [],                //可上报的所有邮箱
                isShowLayer:{
                    atteWary:false
                },
                uuid:'',                      //信息uuid
                simhash:'',                      //信息simhash
                infoid:'',                      //信息infoid
                addJbWary:false,              //加入简报判断
                isattentionWary:false,              //加关注判断
                showDeleteDialog:false,              //删除提示
                detailInfo:{
                    title:'',                   //标题
                    content:'',                 //内容
                    url:'',                    //原文连接
                    Base64url:'',              //base64 url
                    author:'',                 //作者
                    publishTime:'',           //发布时间
                    orientation:'',           //倾向性  1 正 2负  3中
                    isRead:'',                //是否已读
                    proposal:'',              //处置建议
                    webname:'',               //来源
                    abstracts:'',               //摘要
                    keyword:'',               //关键词
                    overseas:'',                 //是否境外
                    simhash:'',                 //信息simhash
                    isReport:'',                 //加入简报
                    infoid:'',                      //infoid
                    tags:[],                      //事件分类
                    isMyAttention:'0',              //是否加入过关注    0 否 1是
                    warningLevel:'',               //0：一般，1：中等，2：严重，3：高危
                    replyNum: '0',             //评论数
                    forwardNum: '0',           //转发数
                    smallVideo: '',            //是否为小视频  0： 不是   1： 是  
                    smallVideoCover: '',       //小视频封面图片
                    smallVideoType: '',        //小视频类型
                    coverFlag: true,          //小视频封面图片标志
                },
                identical:{                     //获得相同信息参数
                    pageSize:100,
                    pageNum:1
                },
                sameWarningListInfo:[],        //相同信息列表
                total:"",                      //相同信息总条数
                ops: { //滚动条配置
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
                busy: false,
                mygzClassDate:[{
                    kmname:'默认分类',
                    kmid:'',
                    kmpid:"0"
                }],
                briefData: [],     //加简报的分类
			}
		},
		components: {
			yqmsHeader,
			yqmsFooter,
			pagenation,
            basicDialog,
            deleteDialog,
            reportDialog,
            yqmsSidebar,
            yqmsPushwaring
		},
		methods: {
		    //导出
            exportSameWarning(){
                let p = {
                    shareUserId: this.$store.state.ZHXGUSERID, //用户id
                    userid: this.$store.state.ZHXGUSERID, //用户id
                    session: this.$store.state.ACCESSTOKEN, //用户id
                    simhash: this.simhash, //simhashid
                    KV_UUID: this.infoid,   //infoidid
                }
                getExportSameInfo(p).then(res=>{
                    let path = res.data.path || '';
                    if(path != ""){
                        window.location = path;
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //上报信息 —— 查询邮箱
            reportInfo(){
                this.hideLayer();
                let _this = this;
                _this.reportInfoId = this.infoid;
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
		    //删除
            deleteInfo(){
                this.hideLayer();
                this.showDeleteDialog = true;
            },
            //删除——确定删除
            handleDelConfirm(){
                this.showDeleteDialog = false;
                let params = {
                    ids: this.uuid
                }
                deleteBatchWarning(params).then(res => {
                    if(res.data.status == '0'){
                        if(res.data.result.data > 0){
                            this.$message({
                                message: '删除成功！',
                                customClass: 'common_tips_style',
                                center: true,  //文字水平居中
                                type: 'success'
                            });
                            setTimeout(function () {
                                window.close();
                            },500)
                        }else{
                            this.$message({
                                type: 'error',
                                customClass: 'common_tips_style',
                                center: true,  //文字水平居中
                                message: '删除失败！'
                            });
                        }
                    }else{
                        this.$message({
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
            //删除————关闭删除弹窗
            handleCloseMask(){
                this.showReportDialog = false;
                this.showDeleteDialog = false;
            },
		    //隐藏
            hideLayer(){
                if(this.addJbWary){
                    this.addJbWary = false;
                }
                if(this.isattentionWary){
                    this.isattentionWary = false;
                }
            },
            //提示添加过关注
            hintInfo(info){
                this.$message({
                    message: info,
                    customClass: 'common_tips_style',
                    center: true,  //文字水平居中
                    type: 'warning'
                });
            },
		    //显示 简报 关注
            showfcWary(s){
                this.hideLayer();
                this[s] = true;
            },
		    //分享QQ
            shareQQ(kvUrl){
                let url = this.qqFriend(kvUrl);
                window.open(url)
            },
		    //复制信息
            clipInfo(){
                let content = "";
                let orientation = "";
                if(this.detailInfo.orientation == '1'){
                    orientation = '正面';
                }
                if(this.detailInfo.orientation == '2'){
                    orientation = '负面';
                }
                if(this.detailInfo.orientation == '3'){
                    orientation = '中性';
                }
                content = content+"标题："+this.detailInfo.title+ "\n";
                content = content+"涉及关键词："+this.detailInfo.keyword+ "\n";
                content = content+"链接："+this.detailInfo.url+ "\n";
                content = content+"摘要："+this.detailInfo.abstracts.getAbstract()+ "\n";
                content = content+"时间："+this.detailInfo.publishTime+ "\n";
                content = content+"来源："+this.detailInfo.webname+ "\n";
                content = content+"作者："+this.detailInfo.author+ "\n";
                content = content+"倾向性："+orientation+ "\n";
                content = content+"评论数："+this.detailInfo.replyNum+ "\n";
                content = content+"转发数： "+this.detailInfo.forwardNum+ "\n";
                let clipboard = document.createElement('textarea');
                clipboard.value = content;
                document.body.appendChild(clipboard);
                clipboard.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                clipboard.remove();
                this.$message({
                    customClass: 'common_tips_style',
                    center: true,  //文字水平居中
                    message: '复制成功',
                    type: 'success'
                });
                //记录操作日志
                let params = {
                    action: '舆情研判——复制信息',
                    url: this.detailInfo.url,
                    content:content,
                    infoType:'2',  //1 专题 、2T预警T
                    uuid: this.uuid,
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
		    //复制url
            clipUrl(url){
                let clipboard = document.createElement('textarea');
                clipboard.value = url;
                document.body.appendChild(clipboard);
                clipboard.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
                clipboard.remove();
                this.$message({
                    customClass: 'common_tips_style',
                    center: true,  //文字水平居中
                    message: '复制成功！',
                    type: 'success'
                });
            },
            //微信分享二维码
            useqrcode(){
                let qrcode = new QRCode('qrcode', {
                    width: 180,
                    height: 180,
                    text: this.detailInfo.url, // 二维码地址
                    colorDark : "#000",
                    colorLight : "#fff",
                })
            },
            //QQ跳转
            qqFriend(id) {
                var p = {
                    url : id, /*获取URL，可加上来自分享到QQ标识，方便统计*/
                    desc:'',
                    //title : '新玩法，再不来你就out了！', /*分享标题(可选)*/
                    title:'',
                    summary : '', /*分享摘要(可选)*/
                    // pics : 'http://www.junlenet.com/uploads/allimg/150510/1-150510104044.jpg', /*分享图片(可选)*/
                    flash : '', /*视频地址(可选)*/
                    site : id, /*分享来源(可选) 如：QQ分享*/
                    style : '201',
                    width : 3,
                    height : 3
                };
                var s = [];
                for ( var i in p) {
                    s.push(i + '=' + encodeURIComponent(p[i] || ''));
                }
                var url = "http://connect.qq.com/widget/shareqq/index.html?"+s.join('&');
                return url;
                //window.location.href = url;
                //document.write(['<a class="qcShareQQDiv" href="http://connect.qq.com/widget/shareqq/index.html?',s.join('&'), '" >分享给QQ好友</a>' ].join(''));
            },
            //详情页面数据
            getDetail(){
                getDetailsInfo({id:this.uuid}).then(rel=>{
                    let info = rel.data.result.data || '';
                    if(info != ""){
                        this.detailInfo.title = info.title;
                        this.detailInfo.content = info.content;
                        this.detailInfo.url = info.url;
                        this.detailInfo.Base64url = Base64.encode(info.url);
                        this.detailInfo.author = info.author;
                        this.detailInfo.publishTime = moment(info.publishTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss');
                        this.detailInfo.orientation = info.orientation;
                        this.detailInfo.isRead = info.isRead;
                        this.detailInfo.webname = info.webname;
                        this.detailInfo.proposal = info.proposal;
                        this.detailInfo.warningLevel = info.warningLevel;
                        this.detailInfo.abstracts = info.abstracts;
                        this.detailInfo.simhash = info.simhash;
                        this.detailInfo.infoid = info.infoId;
                        this.detailInfo.keyword = info.keyword;
                        this.detailInfo.overseas = info.overseas;
                        this.detailInfo.isReport = info.isReport;
                        this.detailInfo.isMyAttention = info.isMyAttention;
                        this.detailInfo.replyNum = info.replyNum;
                        this.detailInfo.forwardNum = info.forwardNum;
                        this.detailInfo.tags = info.tags;
                        this.detailInfo.smallVideo = info.smallVideo;
                        this.detailInfo.smallVideoCover = info.smallVideoCover;
                        this.detailInfo.smallVideoType = info.smallVideoType;
                        this.detailInfo.content = this.detailInfo.content.replace(/visibility: hidden;/g,'visibility: visible;');
                        if(typeof this.detailInfo.tags === "string" && this.detailInfo.tags != ""){
                            try {
                                this.detailInfo.tags = JSON.parse(this.detailInfo.tags).join(" ")
                            }catch (e) {
                                console.log(e);
                            }
                        }
                        if(this.detailInfo.warningLevel == '1'){
                            this.suggestClassName = " fl suggest suggest_01";
                        }
                        if(this.detailInfo.warningLevel == '2'){
                            this.suggestClassName = " fl suggest suggest_02";
                        }
                        if(this.detailInfo.warningLevel == '3'){
                            this.suggestClassName = " fl suggest suggest_03";
                        }
                        
                        let oldyqmsUrl = this.$store.state.oldyqmsUrl;
                        if(!info.smallVideoCover) {
                            this.detailInfo.coverFlag = false;
                            switch(parseInt(info.smallVideoType)){
                                case 1:
                                    this.detailInfo.smallVideoCover = oldyqmsUrl + 'Public/generating/images/smallvideo/volcano_list.png';
                                    break;
                                case 2:
                                    this.detailInfo.smallVideoCover = oldyqmsUrl + 'Public/generating/images/smallvideo/volcano_list.png';
                                    break;
                                case 3:
                                    this.detailInfo.smallVideoCover = oldyqmsUrl + 'Public/generating/images/smallvideo/watermelon_list.png';
                                    break;
                                case 4:
                                    this.detailInfo.smallVideoCover = oldyqmsUrl + 'Public/generating/images/smallvideo/sp_list.png';
                                    break;
                                case 5:
                                    this.detailInfo.smallVideoCover = oldyqmsUrl + 'Public/generating/images/smallvideo/quickhand_list.png';
                                    break;
                                case 6:
                                    this.detailInfo.smallVideoCover = oldyqmsUrl + 'Public/generating/images/smallvideo/shakes_list.png';
                                    break;
                                case 7:
                                    this.detailInfo.smallVideoCover = oldyqmsUrl + 'Public/generating/images/smallvideo/mp_list.png';
                                    break;
                                case 8:
                                    this.detailInfo.smallVideoCover = oldyqmsUrl + 'Public/generating/images/smallvideo/bili_list.png';
                                    break;
                                case 10:
                                    this.detailInfo.smallVideoCover = oldyqmsUrl + 'Public/generating/images/smallvideo/qm_list.png';
                                    break;
                                default :
                                    break;
                            }
                        }

                    }
                    this.useqrcode();//生成二维码
                }).catch(err=>{
                    console.log(err);
                })
            },
            //相同条数数据
            getSameWarningListInfo(){
                this.busy = false;
                this.identical.simhash = this.simhash || '';
                this.identical.uuid = this.infoid || '';
                getSameWarningList(this.identical).then(res=>{
                    if(res.data != "" && res.data.result.data && res.data.result.data.length > 0){
                        let infos = res.data.result.data;
                        // this.sameWarningListInfo = ;
                        this.total = res.data.result.total;
                        for (var i in infos) {
                            infos[i].publishTimeGSH = moment(infos[i].publishTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm');
                            this.sameWarningListInfo.push(infos[i]);
                        }
                    }
                    //this.busy = true;
                }).catch(err=>{
                    console.log(err);
                })
            },
            //获得关注列表
            getgzClassList(){
                let p = {
                    shareUserId: this.$store.state.ZHXGUSERID, //用户id
                    userid: this.$store.state.ZHXGUSERID, //用户id
                    session: this.$store.state.ACCESSTOKEN, //用户id
                    pageSize:'0'
                }
                listMyattentionClassfy(p).then(res =>{
                    let list = res.data.page.list;
                    if(list.length > 0){
                        for(let i in list){
                            this.mygzClassDate.push(list[i]);
                        }
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            //添加关注
            addMyattentions(kmid){
                let p = {
                    shareUserId: this.$store.state.ZHXGUSERID, //用户id
                    userid: this.$store.state.ZHXGUSERID, //用户id
                    session: this.$store.state.ACCESSTOKEN, //用户id
                    Uids:this.infoid,
                    urls:'',
                    shareid:'',
                    classid:kmid,
                    KR_INFOTYPE:'07',
                    KR_KEYWORDID:'',
                    KV_CTIME:''
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
                        this.isattentionWary = false;
                        this.detailInfo.isMyAttention = 1;
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
                })
            },
            //获得简报列表
            getBriefing() {
                getReportClassifys().then(res => {
                    let datas = res.data.result.data;
                    if (datas.length > 0) {
                        this.briefData = datas;
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
                }).catch(err => {
                    console.log(err, '请求失败！');
                });
            },
            //添加简报
            addBriefing(id){
                let isNewTemplates = this.$store.state.isNewTemplate;   //网参报告0 舆情报告1
                let kusex = this.$store.state.kusex;                    //4企业
                if (isNewTemplates == 1 && kusex != 4) {
                    //舆情报告  不是企业用户
                    let p = {
                        ksUuids: this.uuid,  //信息 id
                        classifyId:id,          // 简报id
                    }
                    saveReport(p).then(res=>{
                        let datas = res.data.result.data || '';
                        if(datas != ""){
                            if(datas.faildResult == '1' && datas.successResult == '0'){
                                this.addJbWary = false;
                                this.$message({
                                    message: '该信息已添加，请勿重复操作！',
                                    customClass: 'common_tips_style',
                                    center: true,  //文字水平居中
                                    type: 'warning'
                                });
                            }else if(datas.faildResult >0 && datas.successResult >=0){
                                this.addJbWary = false;
                                this.$message({
                                    message: '添加成功 重复文章将自动被过滤！',
                                    customClass: 'common_tips_style',
                                    center: true,  //文字水平居中
                                    type: 'success'
                                });
                            }else{
                                this.addJbWary = false;
                                this.$message({
                                    message: '添加成功！',
                                    customClass: 'common_tips_style',
                                    center: true,  //文字水平居中
                                    type: 'success'
                                });
                                this.detailInfo.isReport = '1';
                            }
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                } else {
                    //网参报告
                    let p = {
                        userid: this.$store.state.ZHXGUSERID,
                        session: this.$store.state.ACCESSTOKEN,
                        Uids: this.infoid,  //信息 id
                        KYid:  id,          // 简报id
                        KR_INFOTYPE: '07'
                    };
                    saveBrief(p).then(res=>{
                        let msg = res.data.result;
                        if(msg == 1){
                            this.addJbWary = false;
                            //添加成功
                            this.$message({
                                message: '加入简报成功！',
                                customClass: 'common_tips_style',
                                center: true,  //文字水平居中
                                type: 'success'
                            });
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
            //标记已读
            markedRead(){
                // 是否从后台登录，前台登录为''
                let backlogin = this.$store.state.backLogin;
                let params = {
                    userid: this.$store.state.ZHXGUSERID,
                    session: this.$store.state.ACCESSTOKEN,
                    ksuuids: this.uuid
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
                        }else{
                            /*this.$message({
                                type: 'error',
                                customClass: 'common_tips_style',
                                center: true,  //文字水平居中
                                message: '标记已读失败!'
                            }); */
                        }
                    }).catch(err=>{
                        console.log(err);
                    });
                }
            },
            //小视频跳转原链接
            staticUrl(url){
                window.open(url);
            },
		},
		mounted() {
            let query = this.$route.query;
            this.uuid = query.uuid;
            this.simhash = query.simhash;
            this.infoid = query.infoid;
            this.isMyAttention = query.isMyAttention;
            this.getDetail();              //详情信息
            this.getSameWarningListInfo(); //查询相同信息
            this.markedRead();
            setTimeout(() => {
                this.getgzClassList();      //查询我的关注分类
                this.getBriefing();      //获得简报列表
            }, 2000)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./detail.css");
</style>

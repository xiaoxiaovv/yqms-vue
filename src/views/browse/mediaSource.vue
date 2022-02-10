<template>
    <div class="wrap">
        <!--头部开始-->
        <yqms-header ref="header" :funName="type == 1 ? '舆情浏览' : '推送预警'" :showCompilemask="showCompilemask" :showHomepageCustom="showHomepageCustom"></yqms-header>
        <!--头部结束-->
        <div class="ms_content">
            <!--信息概况-->
            <div class="source_wary">
                <div class="source_pub_title"><span></span> 信息概况</div>
                <!-- 加载中 -->
                <div class="media_loading2" v-show="isLoading3">
                    <loading ></loading>
                </div>
                <div v-show="!isLoading3">
                    <div class="source_title">文章标题：{{infoDate.title}} <div class="first_icons" v-show="firstPublish == 1"></div></div>
                    <div class="source_sx"><span>【来源】：{{infoDate.webName}}　　</span> <span>【发布时间】：{{infoDate.publishTime}}</span></div>
                    <div class="source_info">
                        【文章摘要】：{{infoDate.summary}}
                    </div>
                </div>
            </div>
            <!--首发媒体-->
            <!--<div class="source_wary" v-show="isShowFirstMedia">-->
                <!--<div class="source_pub_title"><span></span> 首发媒体</div>-->
                <!--&lt;!&ndash; 加载中 &ndash;&gt;-->
                <!--<div class="media_loading2" v-show="isLoading4">-->
                    <!--<loading ></loading>-->
                <!--</div>-->
                <!--<div class="noDate media_loading3" v-if="!isLoading4 && firstMedia.source == '' && firstMedia.title == '' && firstMedia.publishTime == ''">暂无数据</div>-->
                <!--<div class="source_sx flex" v-show="!isLoading4 && firstMedia.source != '' && firstMedia.title != '' && firstMedia.publishTime != ''">-->
                    <!--<span class="ly">{{firstMedia.source}}</span>-->
                    <!--<a class="tit flex_1 ellipsis" :href="firstMedia.url" target="_blank">{{firstMedia.title}}</a>-->
                    <!--<span>【发布时间】：{{firstMedia.publishTime}}</span>-->
                <!--</div>-->
            <!--</div>-->
            <!--传播路径-->
            <div class="source_wary">
                <div class="source_pub_title"><span></span> 关键传播路径</div>
                <!-- 加载中 -->
                <div class="media_loading" v-show="isLoading">
                    <loading ></loading>
                </div>
                <div class="noDate" v-if="!isLoading && !showData.trees">暂无数据</div>
                <div class="echart_box tree_box" ref="newTree" v-show="!isLoading"></div>
            </div>
            <!--转载媒体-->
            <div class="source_wary">
                <div class="source_pub_title"><span></span> 转载媒体</div>
                <el-radio-group v-model="queryParams.type" style="margin-top: 30px;" @change="selectRadio">
                    <el-radio-button label="A">A级网站</el-radio-button>
                    <el-radio-button label="">全部</el-radio-button>
                </el-radio-group>
                <!-- 加载中 -->
                <div class="media_loading2" v-show="isLoading5">
                    <loading ></loading>
                </div>
                <div v-show="!isLoading5">
                    <el-table
                        :data="tableData"
                        header-align="center"
                        style="width: 100%"
                        :row-style="setRowStyle"
                        :header-cell-style="setHeaderStyle">
                        <el-table-column
                            min-width="18%"
                            align="center"
                            prop="reprintSource"
                            label="站点">
                            <!-- 首发标红
                            <template slot-scope="scope">
                                <span v-if="scope.row.id == firstMedia.id" v-html="scope.row.reprintSource + firstTag"></span>
                                <span v-else>{{ scope.row.reprintSource }}</span>
                            </template> -->
                        </el-table-column>
                        <el-table-column
                            class-name="titleClass"
                            min-width="60%"
                            show-overflow-tooltip
                            align="center"
                            prop="title"
                            label="标题">
                            <template slot-scope="scope">
                                <a :href="scope.row.url" target="_blank">{{scope.row.title}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="22%"
                            align="center"
                            prop="publishTime"
                            label="发布时间">
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <pagenation v-if="pages > 0" :pages="pages" :current.sync="queryParams.pageNum" :totals="total"
                            @navpage="clickPage"></pagenation>
                </div>
            </div>
            <!--报道量趋势-->
            <div class="source_wary">
                <div class="source_pub_title"><span></span> 报道量趋势</div>
                <!-- 加载中 -->
                <div class="media_loading" v-show="isLoading2">
                    <loading ></loading>
                </div>
                <div class="noDate" v-if="!isLoading2 && !showData.trend">暂无数据</div>
                <div class="echart_box" ref="newline" v-show="!isLoading2"></div>
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
    import {sourceList, sourceTree, sourceTrend,infoBasicFacts} from '@/api/source'
    let moment = require("moment");
    // 引入基本模板
    let echarts = require('echarts/lib/echarts');
    // 引入柱状图组件
    require('echarts/lib/chart/tree');
    require('echarts/lib/chart/line');
    require('echarts/lib/component/tooltip');
    export default {
        data() {
            return {
                flag:0,
                isShowFirstMedia:true,              //是否显示首发媒体模块
                isLoading: true,   //传播路径
                isLoading2: true,  //报道量趋势
                isLoading3: true,  //信息概况
                isLoading4: true,  //首发媒体
                isLoading5: true,  //转载媒体
                showData:{
                    trees:false,   //传播路径
                    trend:false,   //报道量趋势
                },
                kruuid: "",             //kruuid
                shareid: "",            //shareid
                type: "",               //跳转类型 1 舆情浏览  2 推送预警
                showCompilemask: false, //是否显示首页自定义,显示时，所有模块的删除按钮显示
                showHomepageCustom: false, //是否显示首页自定义文本:
                tableData: [],
                queryParams: {
                    type: '',             //转载媒体 默认值 默认查全部
                    pageSize: '10',       //每页条数
                    pageNum: 1,           //当前页数
                },
                pages: 1,               //总页数
                total: 0,               //总条数
                infoDate:{
                    title:'',           //标题
                    publishTime:'',     //发布时间
                    summary:'',         //摘要
                    webName:'',         //来源
                },
                firstMedia:{            //首发媒体
                    title:'',           //标题
                    source:"",           //来源
                    publishTime:'',     //时间
                    id: ''
                },
                firstPublish: '0',  // 0 不是首发  1 首发
                firstTag: '<span style="color:red">【首发】</span>' //首发tag标识
            }
        },
        components: {
            yqmsHeader,
            yqmsFooter,
            pagenation
        },
        methods: {
            //设置表格头部样式
            setHeaderStyle({row, rowIndex}){
                return 'font-weight: bold;color: #333;';
            },
            // 表格行样式设置
            setRowStyle({row, rowIndex}) {
                if (rowIndex % 2 == 0) {
                    return 'background: #F6FAFD';
                } else {
                    return ''
                }
            },
            //分页
            clickPage(curPage) {
                //分页组件跳转
                this.queryParams.pageNum = curPage;
                this.isLoading5 = true;
                this.newList();
            },
            setLabelStyles(ch){
                for(let i in ch){
                    ch[i].lineStyle = {
                        type:'dotted'
                    };
                }
                return ch;
            },
            addKeyName(data){
                for(let i in data){
                    data[i].name = data[i].topSiteName;
                    /*if(data[i].topSiteName.length > 10){
                        data[i].name = data[i].topSiteName.substring(0,10) + '...';
                    }else{
                        data[i].name = data[i].topSiteName;
                    }*/
                    if(data[i].url == ''){
                        data[i].lineStyle = {
                            type:'dotted'
                        };
                        data[i].itemStyle = {
                            "borderColor": "#ccc"
                        }
                    }
                    if(data[i].children && data[i].children.length > 0){
                        data[i].children = this.addKeyName(data[i].children);
                    }
                }
                return data;
            },
            //传播路径图
            showEchartTree(data) {
                let myEchart = echarts.init(this.$refs.newTree);
                if(data[0].url != ''){
                    data[0].topSiteName = '【首发】'+ data[0].topSiteName;
                    data[0].label = {
                        color:'red'
                    }
                }else{
                    data[0].itemStyle = {
                        "borderColor": "#ccc"
                    };
                    data[0].children = this.setLabelStyles(data[0].children);
                }
                data = this.addKeyName(data);
                let option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'mousemove',
                        formatter: '{b0}'
                    },
                    series: [
                        {
                            type: 'tree',
                            data: data,
                            top: '1%',
                            left: '10%',
                            bottom: '1%',
                            right: '10%',
                            symbolSize: 12,
                            itemStyle: {
                                color: '#d06a6c',
                                borderWidth: 2,
                            },
                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    fontSize: 14,
                                    rotate: 14,
                                    formatter: function (value) {
                                        let result = value.name;
                                        if(result.length > 7){
                                           result = result.substring(0,7) + '...';
                                        } 
                                        return result
                                    }
                                }
                            },
                            leaves: {
                                label: {
                                    normal: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },
                            expandAndCollapse: false,
                            initialTreeDepth: -1,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                };
                myEchart.setOption(option);
                myEchart.resize();
            },
            //传播路径
            travelPath() {
                let _this = this;
                if (_this.kruuid != '') {
                    sourceTree({uuid:_this.kruuid,count:60,type:_this.type}).then(res => {
                        _this.isLoading = false;
                        if(res.data.result && res.data.result.data.tree && res.data.result.data.tree.length > 0){
                            //展示数据
                            _this.showData.trees = true;
                            let treeData = res.data.result.data.tree;
                            if(treeData[0].newsId != ''){
                                if(_this.queryParams.type == '' && _this.queryParams.pageNum == 1){
                                    this.firstMedia.title = treeData[0].title;
                                    this.firstMedia.source = treeData[0].topSiteName;
                                    this.firstMedia.id = treeData[0].newsId;
                                    this.firstMedia.url = treeData[0].url;
                                    this.firstMedia.publishTime = moment(treeData[0].publishTime).format('YYYY-MM-DD HH:mm:ss');
                                }
                            }else{
                                this.isShowFirstMedia = false;
                            }
                            this.flag++;
                            _this.$nextTick(() => {
                                _this.showEchartTree(treeData);
                            });
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            //报道量趋势图
            sourceTrendsEcharts(data){
                let newlines = echarts.init(this.$refs.newline);
                let xAxisArray = [];
                let seriesArray = [];
                if(data.length > 0){
                    for(var i in data){
                        let time = moment(data[i].date).format('YYYY-MM-DD');
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
                        　　　　result += item.axisValue + "</br>" + dotHtml + '报道量：' +item.data;
                        　　});
                        　　return result;
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisArray,
                        boundaryGap: false,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                           show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        minInterval: 1,
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
                newlines.resize();
                newlines.setOption(option);
            },
            //报道量趋势
            sourceTrends(){
                let _this = this;
                if (_this.kruuid != '') {
                    sourceTrend({uuid:_this.kruuid,count:this.total,type:_this.type}).then(res => {
                        _this.isLoading2 = false;
                        if(res.data.result && res.data.result.data && res.data.result.data.list && res.data.result.data.list.length > 0){
                            //展示数据
                            _this.showData.trend = true;
                            _this.$nextTick(() => {
                                _this.sourceTrendsEcharts(res.data.result.data.list);
                            });
                        }
                    }).catch(err => {

                    });
                }
            },
            //转载媒体——tab切换
            selectRadio(){
                this.isLoading5 = true;
                this.queryParams.pageNum = 1;
                this.newList();
            },
            //转载媒体
            newList(){
                let _this = this;
                if (_this.kruuid != '') {
                    let params = {
                        uuid:_this.kruuid,
                        pageSize:_this.queryParams.pageSize,
                        pageNo:_this.queryParams.pageNum,
                        siteLevel: _this.queryParams.type,
                        type: _this.type
                    };
                    sourceList(params).then(res => {
                        _this.isLoading4 = false;
                        _this.isLoading5 = false;
                        if(res.data.result && res.data.result.data && res.data.result.data.list && res.data.result.data.list.length > 0){
                            let data = res.data.result.data;
                            let list = data.list;
                            let page = data.page;
                            this.pages = page.totalPage;
                            this.total = page.totalElement;
                            let dateArray = [];
                            list.forEach(function (v) {
                                let publishTime = moment(v.publishTime).format('YYYY-MM-DD HH:mm:ss'); //发布时间
                                dateArray.push({
                                    publishTime:publishTime,
                                    title:v.title,
                                    reprintSource:v.siteName,
                                    id:v.id,
                                    url:v.url
                                })
                            });
                            this.tableData = dateArray;
                            if(_this.queryParams.type == ''){
                                this.sourceTrends();                    //报道量趋势，只在全部的时候调用
                            }
                        }else{
                            //暂无数据
                            this.tableData = [];
                            this.pages = 0;
                            this.total = 0;
                            //处理全部时为空的数据
                            if(_this.queryParams.type == ''){
                                this.sourceTrends();                    //报道量趋势，只在全部的时候调用
                            }
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            },
            //信息概况
            infos(){
                let _this = this;
                let datasd = {
                    uuid: this.kruuid,
                    type: this.type
                };
                if(this.type =='1'){
                    datasd.shareUserId= this.shareid;
                }
                infoBasicFacts(datasd).then(res=>{
                    _this.isLoading3 = false;
                    let data = res.data.result.data;
                    // _this.firstPublish = data.isFirst;
                    this.infoDate.title = data.infoDetail.title;
                    this.infoDate.kvUuid = data.infoDetail.kvUuid;
                    this.infoDate.summary = data.infoDetail.summary;
                    this.infoDate.webName = data.infoDetail.webName;
                    this.infoDate.publishTime = moment(data.infoDetail.publishTime).format('YYYY-MM-DD HH:mm:ss'); //发布时间;
                    this.flag++;
                }).catch(err=>{
                    console.log(err);
                })
            },
            //传播路径——echart 点击事件
            handleEchartClick(myEchart) {
                let _this = this;
                myEchart.on("click", function(params) {
                    let url = params.data.url;
                    if(url !=''){
                        window.open(url);
                    }
                });
            }
        },
        watch:{
            flag:function(val,oldVal){
                if(val == 2){
                    if(this.firstMedia.id == this.infoDate.kvUuid){
                        this.firstPublish = 1;
                    }
                }
            }
        },
        mounted() {
            let _this = this;
            let query = this.$route.query;
            this.kruuid = query.kruuid;
            this.shareid = query.shareid;
            this.type = query.type;
            this.newList();                         //转载媒体
            this.travelPath();                      //传播路径
            this.infos();                           //信息概况
            let myEchart = echarts.init(_this.$refs.newTree);
            let newlines = echarts.init(_this.$refs.newline);
            // echart 根据浏览器缩放变化
            window.addEventListener('resize', () => {
                myEchart.resize();
                newlines.resize();
            });
            //传播路径——echart 点击事件
            _this.$nextTick(function(){
                _this.handleEchartClick(myEchart);
            });
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import url("./mediaSource.css");
</style>

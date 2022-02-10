<template>
  <div class="operation_bar" v-bind:style="styleObject">
    <div class="operation_con">
      <label><input type="checkbox" name="checkall" :checked="listData.length !=0 && listData.length === checkList.length" @change="selectAll(checked)">全选</label>
      <button @click.stop="batchExport">批量导出</button>
      <button @click.stop="allExport">全部导出</button>
      <!-- <button @click.stop="alertInfo">加简报</button> -->
      <!-- <button @click.stop="alertInfo">加关注</button> -->
      <div class="ops_attention">
        <a href="javascript:void(0);" @click.stop="showBrief($event)">加简报</a>
        <div class="ops_mask border_box hide">
          <vue-scroll :ops="ops" v-if="briefData.length > 5">
            <span class="ops_title">加入简报</span>
            <!-- <span class="blue_txt">未分类</span> --> <!-- 加入过简报，蓝色 -->
            <span class="ops_sort" v-for="(brief,m) of briefData" :key="m" @click.stop="addBriefing(brief)" v-html="(brief.classifyName.length > 7) ? brief.classifyName.substring(0,7)+'...' : brief.classifyName"></span>
          </vue-scroll>
          <template v-else>
            <span class="ops_title">加入简报</span>
            <!-- <span class="blue_txt">未分类</span> --> <!-- 加入过简报，蓝色 -->
            <span class="ops_sort" v-for="(brief,m) of briefData" :key="m" @click.stop="addBriefing(brief)" v-html="(brief.classifyName.length > 7) ? brief.classifyName.substring(0,7)+'...' : brief.classifyName"></span>
          </template>
        </div>
      </div>
      <div class="ops_attention">
        <a href="javascript:void(0);" @click.stop="showAttention($event)">加关注</a>
        <div class="ops_mask border_box hide">
          <vue-scroll :ops="ops" v-if="attentionData.length > 5">
            <span class="ops_title">加关注</span>
            <!-- <span class="blue_txt">未分类</span> --> <!-- 加入过简报，蓝色 -->
            <span class="ops_sort" v-for="(atten,n) of attentionData" :key="n" @click.stop="addAttention(atten)" v-html="(atten.kmname.length > 7) ? atten.kmname.substring(0,7)+'...' : atten.kmname"></span>
          </vue-scroll>
          <template v-else>
            <span class="ops_title">加关注</span>
            <!-- <span class="blue_txt">未分类</span> --> <!-- 加入过简报，蓝色 -->
            <span class="ops_sort" v-for="(atten,n) of attentionData" :key="n" @click.stop="addAttention(atten)" v-html="(atten.kmname.length > 7) ? atten.kmname.substring(0,7)+'...' : atten.kmname"></span>
          </template>
        </div>
      </div>
      <button @click.stop="markReadAll" >标已读</button>
      <button class="delete" @click.stop="deleteAll"><span class="bot_text">删除</span></button>
      <!-- 每页条数设置 -->
      <div class="sort">
        <span @click.stop="modifyPage">每页{{pageDate.selectPage}}<i class="pagesj"></i></span>
        <div class="li_seccon li_seccon2" v-show="pageDate.showPage">
          <dl>
            <dd v-for="item,i in pageDate.vals"><a href="javascript:void(0)" v-bind:class="{hover: item.isActive}" @click="choosePage(item)">{{item.pagesize}}条</a></dd>
          </dl>
        </div>
      </div>
      <p>
        <label @click.stop="showOrHideAstract">
          <input type="checkbox" value="hide"/>
          <span>隐藏摘要</span>
        </label>
      </p>
    </div>
  </div>
</template>
<script>
  import { getReportClassifys , listMyattentionClassfy } from '@/api/judgment'

  export default {
    data() {
      return {
        //选择每页显示的条数
        pageDate: {
          showPage: false,
          selectPage: '10条',
          vals: [
            {
              pagesize: '10',
              isActive: true,
            }, {
              pagesize: '30',
              isActive: false,
            }, {
              pagesize: '50',
              isActive: false,
            }, {
              pagesize: '100',
              isActive: false,
            }
          ]
        },
        styleObject: { //操作条定位
          position: 'relative',
          width: '100%',
          left:'0px'
        },
      }
    },
    components: {},
    props: {
      checked: {
        type: Boolean,
        default: false
      },
      width: '', 
      inquireParameter:{
        type: Object, 
        default: {}
      },
      ops: '',
      isShowAbstract: {
        type: Boolean,
        default: true
      },
      listData: {
        type: Array,
        default: [1]
      },
      checkList: {
        type: Array,
        default: [1]
      },
      briefData:{
        type: Array,
        default: [1]
      },
      briefData:{
        type: Array,
        default: [1]
      },
      attentionData:{
        type: Array,
        default: [1]
      },
    },
    methods: {
      //选择每页显示条数
      modifyPage(){
        this.pageDate.showPage = true;
        this.$emit('handleBodyClick');
      },
      choosePage(item){
        //设置条数
        this.pageDate.selectPage = item.pagesize+'条';;
        for (let i in this.pageDate.vals) {
          this.pageDate.vals[i].isActive = false;
        }
        item.isActive = true;
        this.pageDate.showPage = false;
        this.$emit('updatePageSize', item.pagesize);
      },
      //监听操作条定位
      handleScroll(){
        //滚动条滚动时，距离顶部的距离
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动条到底部的条件
        if (scrollTop + windowHeight + 145 <= scrollHeight) {
          let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
          this.styleObject.position = 'fixed';
          this.styleObject.width = this.width + 'px';
          this.styleObject.left = 'auto';
          if(scrollLeft > 0){
            let left = 220 - scrollLeft;
            this.styleObject.left = left +'px';
          }
        } else {
          this.styleObject.position = 'relative';
          this.styleObject.width = '100%';
          this.styleObject.left = '0px';
        }
      },
      //全选
      selectAll(checked){
        this.$emit('isCheck',checked);
      },
      alertInfo(){
        this.$message({
          message: '此功能正在开发中,请耐心等待...',
          type: 'warning'
        });
      },
      //批量导出
      batchExport(){
        this.$emit('batchExport');
      },
      //全部导出
      allExport(){
        this.$emit('allExport');
      },
      //标记已读
      markReadAll(){
        this.$emit('markAllRead');
      },
      //删除
      deleteAll(){
        this.$emit('deleteAllList');
      },
      //点击页面其他区域可以隐藏 选项卡 标记已读和分页
      handleBodyClick(){
        this.pageDate.showPage = false;
        let eles = document.getElementsByClassName('ops_mask');
        let len = eles.length;
        for(let i = 0; i < len; i++) {
          eles[i].classList.add('hide');
        }
      },
      setpage(){
        let _this = this;
        this.pageDate.vals.forEach(function (v,i,a) {
          if(v.pagesize === _this.inquireParameter.pageSize){
            v.isActive = true;
          }else{
            v.isActive = false;
          }
        })
      },
      //是否显示摘要
      showOrHideAstract(){
        this.$emit('showAbstract',this.isShowAbstract);
      },
      //加简报——查询简报分类
      showBrief(event){
        let _this = this;
        this.handleBodyClick();
        let child = event.target.nextElementSibling;
        let falg = child.className.toString().indexOf('hide');
        // isReport  是否加入过简报    0 否 1是
        if(this.briefData.length == 0){
          this.$emit('getReportClassify');
        }
        // 控制蒙层显示
        if(falg != -1) {
          child.className = 'ops_mask border_box';
        }else{
          child.className = 'ops_mask border_box hide';
        }
      },
      // 加简报
      addBriefing(brief){
        this.$emit('addBriefingAllList',brief);
      },
      // 加关注 —— 查询分类
      showAttention(event){
        let _this = this;
        this.handleBodyClick();
        let child = event.target.nextElementSibling;
        let falg = child.className.toString().indexOf('hide');
        // isMyAttention  是否加入过关注    0 否 1是
        if(this.attentionData.length == 0){
          this.$emit('getMyattentionClassfy');
        }
        // 控制蒙层显示
        if(falg != -1) {
          child.className = 'ops_mask border_box';
        }else{
          child.className = 'ops_mask border_box hide';
        }
      },
      // 加关注
      addAttention(atten){
        this.$emit('addAttentionAllList',atten);
      }
    },
    mounted (){
      let _this = this;
      //监听操作条定位
      this.handleScroll();
      window.addEventListener('scroll', this.handleScroll);
      document.addEventListener('click', this.handleBodyClick);
      this.setpage();
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
      document.removeEventListener('click', this.handleBodyClick);
    },
    watch: { //深度 watcher
      'width': {
        handler(val, oldVal) {
          this.width = val;
          this.styleObject.width = this.width + 'px';
        },
        deep: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("./operationbar.css");
</style>
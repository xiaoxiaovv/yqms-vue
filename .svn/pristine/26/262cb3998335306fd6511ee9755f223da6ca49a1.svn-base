<template>
  <nav aria-label="Page navigation">
    <div class="separate_page">
      <div class="link_url">
        <a href="javascript:;" @click="prePage()" aria-label="Previous">
          <span aria-hidden="true">&lt;</span>
        </a>
        <a v-for="page in showPageBtn" :class="{hover:page==current}" href="javascript:;" v-if="page" @click="goPage(page)">{{page}}</a><a href="javascript:;" class="more" v-else>···</a><a href="javascript:;" @click="nextPage()" aria-label="Next" class="next">
        <span aria-hidden="true">&gt;</span></a> <span class="total_num">共&nbsp;{{totals}}&nbsp;条记录&nbsp;{{pages}}页</span>
      </div>
      <div class="jump_page"><input type="text" name="page" v-model="jumpPage"/><span class="sure_btn" @click="skipPage()">确定</span></div>
    </div>
  </nav>
</template>
<script>
  export default {
    data(){
        return {
          jumpPage: '' 
        }
    },
    props:{pages: {type: Number, default: 1}, current: {type: Number, default: 1}, totals: {type: Number, default: 0}},
    computed: {
      showPageBtn(){
        var pageNum = this.pages;
        var index = this.current;
        var arr = [];
        if (pageNum <= 5) {
          for (var i = 1; i <= pageNum; i++) {
            arr.push(i)
          }
          return arr
        }
        if (index <= 2)return [1, 2, 3, 0, pageNum];
        if (index >= pageNum - 1)return [1, 0, pageNum - 2, pageNum - 1, pageNum];
        if (index === 3)return [1, 2, 3, 4, 0, pageNum];
        if (index === pageNum - 2)return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
        return [1, 0, index - 1, index, index + 1, 0, pageNum]
      }
    },
    methods: {
      prePage(){
        let index = this.current
        if (this.current != 1) {
          index--;
          this.$emit('navpage',index)
        } else {
          alert("已经是第一页了")
        }
      }, nextPage(){
        let index = this.current
        if (this.current != this.pages) {
          index++;
          this.$emit('navpage', index)
        } else {
          alert("已经是最后一页了")
        }
      }, goPage(index){
        if (index !== this.current) {
          //this.current = index;
          this.$emit('navpage', index)
        }
      },skipPage(){
        var index = parseInt(this.jumpPage);
        if (index == this.current) {
          return false;
        }
        var intReg = /^[1-9]\d*$/;   //正整数
        if(!intReg.test(index)){     //判断整数输入框 非整数
          alert('请输入正确的页数！');
          return false;
        };
        if(index > this.pages){
          index = this.pages
          this.jumpPage = index;
        }
        if(index){
          this.$emit('navpage', index);
          this.jumpPage = ''; //跳转之后清空
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("./pagenation.css");
</style>

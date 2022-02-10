// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuescroll from 'vuescroll';
import 'vuescroll/dist/vuescroll.css';
import moment from 'moment'
import 'moment/locale/zh-cn'
import numeral from 'numeral'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/styles/base.css'

import clamp from '@/directives/vClamp.js'
import '@/directives/vFocus.js'
import loading from '@/components/loading/loading.vue'
import nodata from '@/components/nodata/nodata.vue'


Vue.config.productionTip = false;
Vue.use(ElementUI);

/*
	vuescroll api 地址
	https://vuescrolljs.yvescoding.org/zh/guide/event.html#handle-scroll
*/
Vue.use(vuescroll);
Vue.component('loading', loading); //加载中组件
Vue.component('nodata', nodata); //暂无数据组件
// 日期格式化
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if(pattern == 'day' || pattern == 'hour'){
    return moment(dataStr).startOf(pattern).fromNow();
  }else{
    return moment(dataStr).format(pattern);
  }
});
/*是否点击dom元素的内部*/
function getTargetNode(ele, target) {
	//ele是内部元素，target是你想找到的包裹元素
	if(!ele || ele === document) return false;
	return ele === target ? true : getTargetNode(ele.parentNode, target);
}
//定义全局点击函数
Vue.prototype.globalClick = function(callback) {
	document.getElementById('app').onclick = function (e) {
		e.stopPropagation();
		let eles = document.getElementsByClassName('switch_topic');
		let len = eles.length;
		let con = "";
		for(let i = 0; i < len; i++) {
			if(eles[i].classList.toString().indexOf('hide') != -1) {
				con = eles[i];
			}
		}
		if(getTargetNode(con, e.target)) {
			//dom元素之外的点击事件
			callback();
		}
   };
};
String.prototype.regexIndexOf = function(regex, startpos) {

  let indexOf = this.substring(startpos || 0).search(regex);

  return (indexOf >= 0) ? (indexOf + (startpos || 0)) : indexOf;

}

String.prototype.regexLastIndexOf = function(regex, startpos) {

  regex = (regex.global) ? regex : new RegExp(regex.source, "g" + (regex.ignoreCase ? "i" : "") + (regex.multiLine ? "m" : ""));

  if(typeof (startpos) == "undefined") {

      startpos = this.length;

  } else if(startpos < 0) {

      startpos = 0;

  }

  let stringToWorkWith = this.substring(0, startpos + 1);

  let lastIndexOf = -1;

  let nextStop = 0;

  while((result = regex.exec(stringToWorkWith)) != null) {

      lastIndexOf = result.index;

      regex.lastIndex = ++nextStop;

  }

  return lastIndexOf;

}
String.prototype.getAbstract = function(s) {
if(s){
    let t;
    t = s.replace(/<font (.*?)>/gi,"");

    t = t.replace(/<\/font>/gi,"");
  }
  let minLength = 100;
  let charLength = 200;
  let subKvAbstract = '';                   //前200字符
  let subHvAbstract = '';                   //200后面的字符
  let subMvAbstract = '';                   //100-200的字符
  let suffx = /[\u3002|\uff1f|\uff01|\uff1b]/;//"。","？", "！", "；"
  let noSuffx = /[\uff0c|\u3001|\uff5e|\u2026|\u2026\u2026]/;//"，","、","～","……","…"
  if(s && t.length > charLength){
      subKvAbstract = s.substr(0,charLength);//前200字符
      subHvAbstract = s.substr(charLength,s.length-1);//后面的字符
      if(suffx.exec(subHvAbstract)){
        subHvAbstract = subHvAbstract.substr(0,subHvAbstract.regexIndexOf(suffx));
      }else if(noSuffx.exec(subHvAbstract)){
        subHvAbstract = subHvAbstract.substr(0,subHvAbstract.regexIndexOf(noSuffx));
      }else{
        subHvAbstract = '';
      }
      s = subKvAbstract + subHvAbstract;
    }
  if(s && t.length <= charLength && t.length > minLength){
    subMvAbstract = s.substr(minLength,s.length-1);
    if(suffx.exec(subMvAbstract)){
      s = s.substr(0,s.regexLastIndexOf(suffx))
    }else if(noSuffx.exec(subMvAbstract)){
      s = s.substr(0,s.regexLastIndexOf(noSuffx))
    }
  }

  return s;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

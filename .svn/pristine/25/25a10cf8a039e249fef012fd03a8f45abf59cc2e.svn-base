/**
 * 配置编译环境和线上环境之间的切换
 * api: 域名地址
 * 
 */
let oldyqmsUrl = 'http://yqms-beta.istarshine.com/';            //跳转地址beta
let newyqmsUrl = 'http://yqms-beta.istarshine.com/fv1/#/';            //跳转地址beta
let apioldUrl = '/api/';    //旧Java
let apiUrl = '/api/yqms/v1/';    //请求地址  beta
let imgUrlBase = "https://yqms-beta.istarshine.com"; //上传图片路径
let trial = 'http://192.168.140.10:8080';    //研判试用 beta
let formal = 'https://zhyp-beta.istarshine.com/';  //研判试用 正式
let trialTsgz = 'http://192.168.185.111:8088';    //态势感知试用 beta
let formalTsgz = 'https://tsgz-beta.istarshine.com';  //态势感知试用 正式
let searchUrl = 'http://search-beta.istarshine.com/'; //全网搜跳转链接
let taskCenterHost = 'https://taskcenter-beta.istarshine.com/api/'; //任务中心网址

let urlsStr = window.location.href;
let ursArray = urlsStr.split("//"),
  urs = ursArray[1].split(".");
console.log(urs[0]); 
if(urs[0].indexOf('yqms-beta-g1') > -1){
  oldyqmsUrl = 'https://yqms-beta-g1.istarshine.com/';
  searchUrl = 'http://search-beta-g1.istarshine.com/'; //全网搜跳转链接
  newyqmsUrl = 'https://yqms-beta-g1.istarshine.com/fv1/#/';            //跳转地址beta
  imgUrlBase = "https://yqms-beta-g1.istarshine.com"; //上传图片路径
}else if(urs[0].indexOf('yqms-beta-g3') > -1){
  //beta
  oldyqmsUrl = 'https://yqms-beta-g3.istarshine.com/';
  searchUrl = 'http://search-beta-g3.istarshine.com/'; //全网搜跳转链接
  newyqmsUrl = 'https://yqms-beta-g3.istarshine.com/fv1/#/';            //跳转地址beta
  imgUrlBase = "https://yqms-beta-g3.istarshine.com"; //上传图片路径
}else if(urs[0].indexOf('yqms-beta-g4') > -1){
  //beta
  oldyqmsUrl = 'https://yqms-beta-g4.istarshine.com/';
  searchUrl = 'http://search-beta-g4.istarshine.com/'; //全网搜跳转链接
  newyqmsUrl = 'https://yqms-beta-g4.istarshine.com/fv1/#/';            //跳转地址beta
  imgUrlBase = "https://yqms-beta-g4.istarshine.com"; //上传图片路径
}else if(urs[0].indexOf('beta') > -1){
  //beta
  oldyqmsUrl = 'https://yqms-beta.istarshine.com/';
  searchUrl = 'http://search-beta.istarshine.com/'; //全网搜跳转链接
  newyqmsUrl = 'https://yqms-beta.istarshine.com/fv1/#/';            //跳转地址beta
  imgUrlBase = "https://yqms-beta.istarshine.com"; //上传图片路径
}
export default {
	'newyqmsUrl': newyqmsUrl,
	'apioldUrl': apioldUrl,
	'oldyqmsUrl': oldyqmsUrl,
	'imgUrlBase': imgUrlBase,
	'apiUrl': apiUrl,
	'trial': trial,
	'formal': formal,
	'trialTsgz': trialTsgz,
	'formalTsgz': formalTsgz,
	'searchUrl': searchUrl,
  'taskCenterHost': taskCenterHost,
}

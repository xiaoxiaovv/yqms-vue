/**
 * 配置编译环境和线上环境之间的切换
 * api: 域名地址
 * 
 */
let oldyqmsUrl = 'https://yqms.istarshine.com/';            //跳转地址beta
let newyqmsUrl = 'http://yqms.istarshine.com/fv1/#/';            //跳转地址beta
let imgUrlBase = "https://yqms.istarshine.com"; //上传图片路径
let apioldUrl = '/api/';    //旧Java
let apiUrl = '/api/yqms/v1/';    //请求地址  beta
let trial = 'http://192.168.140.10:8080';    //研判试用 beta
let formal = '/api/zhyp/v1/';  //研判试用 正式
let formalTsgz = 'https://tsgz.istarshine.com';  //态势感知试用 正式
let searchUrl = 'http://search.istarshine.com/'; //全网搜跳转链接
let taskCenterHost = 'https://yqms3-taskcenter.istarshine.com/'; //任务中心网址

let urlsStr = window.location.href;
let ursArray = urlsStr.split("//"),
  urs = ursArray[1].split(".");
if(urs[0].indexOf('staging') > -1){
  //staging
  oldyqmsUrl = 'https://yqms-staging.istarshine.com/';            //跳转地址beta
  imgUrlBase = "https://yqms-staging.istarshine.com"; //上传图片路径
  searchUrl = 'http://search-staging.istarshine.com/'; //全网搜跳转链接
  newyqmsUrl = 'http://yqms-staging.istarshine.com/fv1/#/'; //全网搜跳转链接
}
export default {
	'newyqmsUrl': newyqmsUrl,
	'apioldUrl': apioldUrl,
	'oldyqmsUrl': oldyqmsUrl,
	'imgUrlBase': imgUrlBase,
	'apiUrl': apiUrl,
	'trial': trial,
	'formal': formal,
	'formalTsgz': formalTsgz,
	'searchUrl': searchUrl,
	'taskCenterHost': taskCenterHost,
}

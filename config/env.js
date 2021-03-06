/**
 * 配置编译环境和线上环境之间的切换
 * api: 域名地址
 * 
 */
let oldyqmsUrl = 'http://localhost/yqms-new/index.php/'; //跳转地址
let apiUrl = '/api/yqms/v1/';    //请求地址  beta
let apioldUrl = '/api/';    //旧Java
let imgUrlBase = "https://yqms-beta.istarshine.com"; //上传图片路径
let q_Url = '172.16.5.108:8080/yqms/v1/'; //请求地址  秦
let g_Url = '172.16.5.254:8080/yqms/v1/'; //请求地址  高宇
let trial = 'http://192.168.140.10:8080';    //研判试用 beta
let formal = 'https://zhyp.istarshine.com';  //研判试用 正式
let searchUrl = 'http://localhost/yqms-new/'; //全网搜跳转链接

export default {
	'oldyqmsUrl': oldyqmsUrl,
	'imgUrlBase': imgUrlBase,
	'apiUrl': apiUrl,
	'apioldUrl': apioldUrl,
	'q_Url': q_Url,
	'g_Url': g_Url,
	'trial': trial,
	'formal': formal,
	'searchUrl': searchUrl,
}
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import home from './modules/home'
import judgment from './modules/judgment'
import api from '../../config/env'; //引用url.js 
import { saveMaiDian } from '@/api/home'

Vue.use(Vuex);
let logininfo = VueCookies.get('LOGININFO') || [];
if(typeof logininfo === 'string') {
	logininfo = JSON.parse(VueCookies.get('LOGININFO'));
}
console.log(logininfo)
//代理商需要做域名重定向
let urlsStr = window.location.host;
if(urlsStr.indexOf('localhost') < 0 && urlsStr.indexOf('staging.istarshine') < 0 && urlsStr.indexOf('yqms.istarshine') < 0) {
	api.oldyqmsUrl = '//' + urlsStr + (urlsStr.charAt(urlsStr.length-1) == '/' ? '' : '/'); //跳转地址
	api.searchUrl = '//' + urlsStr + (urlsStr.charAt(urlsStr.length-1) == '/' ? '' : '/'); //全网搜跳转
}
const stores = new Vuex.Store({
	modules: {
		home,
        judgment
	},
	state: {
		'ACCESSTOKEN': logininfo.session || '', //token
		'ZHXGUSERID': logininfo.userid || '', //用户ID
		'agentid':logininfo.agentid || '',   //代理商ID
		'usergenre': logininfo.usergenre || '',        //用户类型
		'oldyqmsUrl': api.oldyqmsUrl, //跳转路径
		'newyqmsUrl': api.newyqmsUrl, //跳转路径
		'searchUrl': api.searchUrl, //全网搜跳转链接
		'provinceId': logininfo.provinceId, //省id
		'provinceName': logininfo.provinceName, //省Name
		'cityId': logininfo.cityId, //市id 
		'cityName': logininfo.cityName, //市Name
		'countryId': logininfo.countryId, //县id
		'countryName': logininfo.countryName, //县Name
		'fisrtIndustry': logininfo.fisrtIndustry, //1 表示政府 
		'username': logininfo.username || '', //用户名字
		'leftTime': logininfo.leftTime,               //到期时间
		'kuVersion': logininfo.kuVersion, //移动云版本 B4试用版 B0没有预期课堂     B5 基础    B1  标准    B2 高级    B3  专业
		'kuUserStatus': logininfo.kuUserStatus || '', //账号状态
		'kuTempLateType': logininfo.kuTempLateType || 0, //主题颜色模板类型 0 蓝白 1黑
		'kuAlertwin': logininfo.kuAlertwin,               //是否显示声音 1 2：添加定时
		'kuOrdertime': logininfo.kuOrdertime,               //舆情浏览信息按时间排序： 0发布时间    1采集时间
		'kusex': logininfo.kusex,                          //4企业
		'manualWarningOpen': logininfo.manualWarningOpen,  //是否开通人工预警 1是 0否
		'isNewTemplate': (logininfo.isNewTemplate == '0') ? '0': '1',   //网参报告0 舆情报告1
		'kuSound': VueCookies.get('soundhidden'),         //是否声音 0 否 1是
		'redis_useid': VueCookies.get('redis_useid') || '',      //用于判断是否显示广告的 1显示 2不显示
		'imgUrlBase': api.imgUrlBase, //上传图片路径
		'kuTempLate': logininfo.kuTempLate || 'comold',    //模板类型    comold--部分代理商    UnicomProject-- 数言舆情
		'userIp': logininfo.userIp ,  						// 用户IP
		'operationUserName':  logininfo.operationUserName,  //操作人名称
		'operationUserId':  logininfo.operationUserId,      //操作人ID
		'backLogin': logininfo.backLogin,                   //是否从后台登录，前台登录为''
		'kuweixin': logininfo.kuweixin,                     //是否允许开通微信绑定，1 允许 0 不允许
		'ms_ypmodular': logininfo.ms_ypmodular,             //是否开通舆情研判 1 开 其它不开
		'service_type': logininfo.service_type,             //权证连服务状态   0未审批 1正常 2停用
		'apply_type': logininfo.apply_type,                 //权证连申请状态  0未审批 1申请通过 2 申请拒绝
		'stop_time': logininfo.stop_time,                    //权证链到期时间
		'isShowCenterTaskMask': false,                       //是否显示任务中心弹框
	},
	/*同步函数commit*/
	mutations: {
　　	//埋点统计
		maiDian(state, params){
			let map = {
				'operationDescribe': params //操作描述
			};
			//埋点统计
			saveMaiDian(map).then(function(res) {
				//不做任何处理
			}).catch(err => {
				console.log(err, '请求失败！');
			});
		},
		updateVal(state, params){
			state[params.name] = params.value;

			
		}
	},
	/*异步函数dispatch*/
	actions: {

	}
});

export default stores

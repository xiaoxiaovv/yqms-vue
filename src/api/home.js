import { fetch } from "@/helpers/fetch"; //引用fetch.js
import API from '../../config/env';

/**
 * 本地 路径转换
 */
export function windowLoc(url) {
    window.location = API.apiUrl+url;
}

/**
 * 上传图片接口
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function uploadImg(data) {
	return fetch({
	'timeout':180 * 1000,
    'Content-Type':'multipart/form-data',
		url: API.apiUrl + 'customHomePage/uploadHeaderImage',
		method: 'post',
		data: data
	})
}
/**
 * 保存首页数据
 * post
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function updateHomePageData(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/updateHomePageData',
		method: 'post',
		data: data
	})
}
/**
 * 首页导航
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getNavData(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/getCustomHomePage',
		method: 'get',
		params: data
	})
}
/**
 * 首页数据
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getHomePageData(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/getCustomHomePageData',
		method: 'get',
		params: data
	})
}
/**
 * 恢复默认头部数据
 * post 
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function restoreHeader(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/restoreDefaultHeaderData',
		method: 'post',
		data: data
	})
}
/**
 * 恢复默认首页数据
 * post 
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function restoreHomePage(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/restoreHomePageData',
		method: 'post',
		data: data
	})
}
/**
 * 更新头部数据
 * post 
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function updateHeaderData(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/updateHeaderData?random=' + Math.random(),
		method: 'post',
		data: data
	})
}
/**
 * 首页尾部数据
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getFooterData(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/getCustomTailData',
		method: 'get',
		params: data
	})
}
/**
 * 恢复默认尾部数据
 * post 
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function restoreFooter(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/restoreDefaultTailData',
		method: 'post',
		data: data
	})
}
/**
 * 修改自定义尾部数据
 * post 
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function saveFooter(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/updateTailData',
		method: 'post',
		data: data
	})
}
/**
 * 今日媒体类型统计
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getSourceTypeData(interfaceName,data) {
	return fetch({
		url: API.apiUrl + interfaceName,
		method: 'get',
		params: data
	})
}
/**
 * 站点头条——首页
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getHeadlinesData(interfaceName,data) {
	return fetch({
		url: API.apiUrl + interfaceName,
		method: 'get',
		params: data
	})
}
/**
 * 站点头条——列表
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getHeadLinesListsData(interfaceName,data) {
	return fetch({
		url: API.apiUrl + interfaceName,
		method: 'get',
		params: data
	})
}
/**
 * 获取预警列表数据
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getWarningListData(interfaceName,data) {
	return fetch({
		url: API.apiUrl + interfaceName,
		method: 'get',
		params: data
	})
}
/**
 * 获取用户专题
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getTopicListData(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/getSubjectByUserId',
		method: 'get',
		params: data
	})
}
/**
 * 获取根据用户专题id,查询专题对应的数据
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getTopicByIdData(interfaceName,data) {
	return fetch({
		url: API.apioldUrl + interfaceName,
		method: 'get',
		params: data
	})
}
/**
 * 获取事件数据
 * get 获取导航信息
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getEventData(interfaceName,data) {
	return fetch({
		url: API.apiUrl + interfaceName,
		method: 'get',
		params: data
	})
}
/**
 * 获取专题树
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 * type				      必填1 简单树 2复杂树
 */
export function getSubjectTree(data) {
	return fetch({
		url: API.apiUrl + 'customHomePage/getSubjectTree',
		method: 'get',
		params: data
	})
}
/**
 *
 * get
 * -------------------------------------获取是否开启系统密码---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 * userid             用户id
 *
 */
export function getIsSetXtPaw(data) {
  return fetch({
    url: API.apiUrl + 'users/getIsSetXtPaw',
    method: 'get',
    params: data
  })
}
/**
 *
 * get
 * -------------------------------------校验密码---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 * userid             用户id
 * oldPaw             老密码
 * type               1用户密码 2 系统密码
 *
 */
export function checkPaw(data) {
  return fetch({
    url:API.apiUrl +'users/checkPaw',
    method: 'get',
    params: data
  })
}
/**
 * 修改预警声音
 * post
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function updateWaringSound(data) {
  return fetch({
    url: API.apiUrl + 'customHomePage/updateWaringSound',
    method: 'post',
    data: data
  })
}
/**
 * 首页——埋点(保存用户操作行为) 
 * post
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 * map                map
 * operationDescribe  操作描述
 */
export function saveMaiDian(data) {
	return fetch({
		url: API.apiUrl + 'log/saveUserOperationBehavior',
		method: 'post',
		data: data
	})
}
/**
 * 获取是否显示广告栏
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 * userid             用户id
 *
 */
export function getBannerFlag(data) {
  return fetch({
    url:API.apiUrl +'users/getBannerFlag',
    method: 'get',
    params: data
  })
}
/**
 * 保存广告栏状态
 * post
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 * map                map
 * userid             用户id
 * state              状态：空 显示广告栏 2 关闭广告栏
 */
export function saveBannerFlag(data) {
	return fetch({
		url: API.apiUrl + 'users/saveBannerFlag',
		method: 'post',
		data: data
	})
}

/**
 * 获取微信二维码
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * userid             用户id
 */
export function getWXImgUrl(data) {
	return fetch({
		url: API.apiUrl + 'wechat/getQrcode',
		method: 'get',
		params: data
	})
}
/**
 * 状态
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * userid             用户id
 */
export function verifySubscirbeSubjectRate(data){
	return fetch({
		url:API.apioldUrl+'KeyWordSet!verifySubscirbeSubjectRate.do',
		method: 'get',
		params: data
	})
}
/**
 * 获取专题订阅，专题
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * userid             用户id
 */
export function getSubscribeSubject(data){
	return fetch({
		url:API.apiUrl+'subject/getSubscribeSubject?type=whyq',
		method: 'get',
		params: data
	})
}
/**
 * 获取专题订阅，专题
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *              用户id
 */
export function saveAddKeyWordSet(data){
	// var url = API.apioldUrl+'KeyWordSet!saveAddKeyWordSet11.do'
	// url = encodeURI(url);
	return fetch({
		url:API.apioldUrl+'KeyWordSet!addKeywordForSubscribeSubject.do',
		method: 'get',
		params: { 
			subscribeId:data.subscribeId,   //订阅的专题
			areaLabelId:data.areaLabelId,   //地域的id
			shareUserId:data.shareUserId,
			userid:data.userid,
			session:data.session, 
			parentisshared:0,
			KS_TYPE:2,
			onlymatchsub:0,
			isSubscribe:1,
			areaContain:1,
			level:1,
			KK_PID:'',
			KS_STATUS:'1',
			infos:3,
			submitclasstype:1,
			spaecialtype:0,
			KK_NAME:"",
			KC_UUID:0,
			KK_DATASOURCETYPE:'1,4,15,20',
			KK_NOYJ:0,
			manualWarning:0,
			KK_TYPE:'01',
			KK_MUST:'',
			KS_IS_OPEN_PRECISE_REGION:1,
			KK_SHOULD:'',
			KK_EVENT:'',
			eventKeyWordsSelect:[],
			KK_NOT:'',
			KK_TUISONG:[],
			KK_TUISONG_SOURCETYPE:'',
			KK_TUISONG_ORIENTATION:'2',
			KK_TUISONG_STATE:'xx',
			KK_TUISONG_HAVEREPEAT:0,
			KK_TUISONG_BTIME:'',
			KK_TUISONG_ETIME:'',
			KK_TUISONG_SEARCH:'',
			KK_TUISONG_NOT:'',
			KK_SENDTIME:0,
			KU_WEIBOTIME:0,
			KU_WORDMUST:1,
			KU_WORDDISTANCE:1,
			KU_WORDMUST_LENGTH:200,
			KU_WORDDISTANCE_LENGTH:50,
			KU_MATCHTITLE:0,
			KU_ONLGMUST:0,
			KK_DINGXIANG_SOURCETYPE:'01,02,04,06,03,05,07,09,99,10',
			KK_DINGXIANG_DOMAIN:'',
			KK_DINGXIANG_CHANNEL:'',
			KK_DINGXIANG_ACCOUNT:'',
			KK_LABEL:'',
			KK_ISHIGH:0,
			KK_COMPANYNAME:'',
			subjectWordLength:[],
			isDefinedWordLength:'',
			definedWordLength:'',
			filterDomain:[],
			filterRegion:[],
		}
	})
}
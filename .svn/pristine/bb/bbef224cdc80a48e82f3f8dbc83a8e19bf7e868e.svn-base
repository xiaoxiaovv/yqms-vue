import { fetch } from "@/helpers/fetch"; //引用fetch.js
import API from '../../config/env';
import store from '../store/index'

let Base64 = require('js-base64').Base64;

/**
 * 本地 路径转换
 */
export function windowLoc(url) {
    window.location = API.apiUrl+url;
}

/**
 * 点击试用智慧研判 —— 弹出不同的弹窗
 * post 
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken store.state.ACCESSTOKEN,
 * ZHXGUSERID         必选参数用户id，使用base64加密 Base64.encode('U' + store.state.ZHXGUSERID),
 */
export function checkMsLoginUserId(data) {
	return fetch({
		url: API.formal + 'login/msLoginuserId',
		method: 'post',
        fetchType:'yp',
        data: data
	})
}
/**
 * 进入研判
 * post 
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function enterJudged(data) {
	return fetch({
		url: API.formal + 'login/regUserInfo',
		method: 'post',
        fetchType:'yp',
		data: data
	})
}

/**
 * 定时检测任务列表
 * post 
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 * checkStatus: '1', //任务状态 1-正在进行 2-取消任务 3-任务完成
 */
export function getJobNum(data) {
	return fetch({
		url: API.apiUrl + 'checkUrl/getJobNum',
        method: 'get',
        params: data
	})
}

/**
 * 点击试用态势感知 —— 弹出不同的弹窗
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * ZHXGUSERID         必选参数用户id，使用base64加密 Base64.encode('U' + store.state.ZHXGUSERID),
 * username          必选参数用户名，store.state.username,
 * loginType         必选参数 标识   1
 */
export function checkStatus(data) {
	return fetch({
		url: API.apiUrl + 'subject/login/check',
		method: 'get',
        params: data
	})
}
import { fetch } from "@/helpers/fetch"; //引用fetch.js
import API from '../../config/env';


/**
 * 申请开通司法取证
 * post 
 * -------------------------------------传入的参数---------------------------------------------
 *                                          无
 */
export function openForApply () {
	return fetch({
		url: API.apiUrl + 'evidence/registration',
		method: 'post',
	})
}
/**
 * 存证列表接口
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  pageNo      页数
 *  pageSize    每页条数
 *
 */
export function dataList (data) {
	return fetch({
		url: API.apiUrl + 'evidence/list',
		method: 'get',
		params: data
	})
}
/**
 * 法律维权接口
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *  username    联系人
 *  telephone   手机号
 *  company     单位名称
 *  content		需求描述
 */
export function protect (data) {
	return fetch({
		url: API.apiUrl + 'evidence/law/protect',
		method: 'post',
		data: data
	})
}
/**
 * 鉴定接口
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *  evidenceId  信息id
 *  username   联系人
 *  telephone  手机号
 *  address    地址
 */
export function appraisal (data) {
	return fetch({
		url: API.apiUrl + 'evidence/appraisal',
		method: 'post',
		params: data
	})
}
/**
 * 删除接口
 * delete
 * -------------------------------------传入的参数---------------------------------------------
 *  evidenceId  信息id
 */
export function evDelete (data) {
	return fetch({
		url: API.apiUrl + 'evidence/delete',
		method: 'delete',
		params: data
	})
}
/**
 * 流量接口
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *                                       无
 */
export function memory () {
	return fetch({
		url: API.apiUrl + 'evidence/storage',
		method: 'get'
	})
}

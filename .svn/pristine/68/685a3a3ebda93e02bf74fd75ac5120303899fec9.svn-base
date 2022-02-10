import { fetch } from "@/helpers/fetch"; //引用fetch.js
import API from '../../config/env';
/**
 * 新闻传播转载列表接口
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  title  新闻标题
 *  siteLevel  信源等级
 *  pageNo    第几页
 *  pageSize    每页条数
 *
 */
export function sourceList(data) {
    return fetch({
        url: API.apiUrl + 'Traceability/list',
        method: 'get',
        params: data
    })
}
/**
 * 新闻传播路径接口
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  title  新闻标题
 *  count  信源等级
 *
 */
export function sourceTree(data) {
    return fetch({
        url: API.apiUrl + 'Traceability/tree',
        method: 'get',
        params: data
    })
}
/**
 * 新闻转载趋势接口
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  title  新闻标题
 *  count  信源等级
 *
 */
export function sourceTrend(data) {
    return fetch({
        url: API.apiUrl + 'Traceability/trend',
        method: 'get',
        params: data
    })
}
/**
 * 信息概况
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  uuid   新闻id  kvuuid
 *
 */
export function infoBasicFacts(data) {
    return fetch({
        url: API.apiUrl + 'Traceability/infoBasicFacts',
        method: 'get',
        params: data
    })
}
/**
 * 微博溯源
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  url             原文url
 *  type            1：舆情浏览 2：推送预警
 *  shareUserId     该信息所属用户id
 *
 */
export function weiboSpreadData(data) {
    return fetch({
        url: API.apiUrl + 'Traceability/weiboSpread',
        method: 'get',
        params: data
    })
}

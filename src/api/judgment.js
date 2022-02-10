import { fetch } from "@/helpers/fetch"; //引用fetch.js
import API from '../../config/env';
/**
 * 舆情研判——列表接口
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  time          时间类型  7day 7天； 24hour 24小时
 *  bTime         开始时间
 *  eTime         结束时间
 *  pageNo        第几页
 *  pageSize      每页条数
 *  orientation   倾向性 逗号分隔  1 2 3
 *  sourceType    媒体类型 逗号分隔
 *  warningLevel  预警级别 全部'' 0 一般  1 中等  2 严重 3 高危
 *  isOcr         图片识别 全部''   1 仅看图片识别数据  0 排除图片识别数据
 *  isRead        浏览范围  ''全部 1已读 0 未读
 */
export function getJudgedList(data,fun) {
    return fetch({
        transformRequest:function(data){
            fun();
            return data;
        },
        url: API.apiUrl + 'judged/getJudgedList',
        method: 'get',
        params: data
    })
}
/**
 * 舆情研判——列表接口——复制信息记录日志
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  uuid                uuid 
 *  userid              userid 
 *  eventId             事件分析id
 *  infoType            1 专题 、2预警
 *  operationUserIp     操作人IP
 *  operationUserId     操作人id
 *  operationUserName   操作人名称
 *  functionType        功能类型 1复制链接 2复制信息
 */
export function saveCopyLink(data) {
    return fetch({
        url: API.apiUrl + 'log/saveCopyLink',
        method: 'post',
        data: data
    })
}
/**
 * 舆情研判——列表接口——删除
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *  id                 信息uuid
 */
export function deleteBatchWarning(data) {
    return fetch({
        url: API.apiUrl + 'judged/deleteBatchWarning',
        method: 'post',
        data: data
    })
}
/**
 *
 * get
 * -------------------------------------详情页面信息---------------------------------------------
 *  title  新闻标题
 *  count  信源等级
 *
 */
export function getDetailsInfo(data) {
    return fetch({
        url:API.apiUrl+'judged/getDetailsInfo',
        method: 'get',
        params: data
    })
}
/**
 *
 * get
 * -------------------------------------详情页面相同信息------------------------------------------
 *  pageSize  每页条数
 *  pageNum  页码
 *  simhash  信息simhash
 *
 */
export function getSameWarningList(data) {
    return fetch({
        url:API.apiUrl+'judged/getSameWarningList',
        method: 'get',
        params: data
    })
}

/**
 *  关注列表
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function listMyattentionClassfy(data) {
    return fetch({
        url: API.apioldUrl + 'Myattention!listMyattentionClassfy.do',
        method: 'get',
        params: data
    })
}
/**
 *  添加关注
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function addMyattention(data) {
    return fetch({
        url: API.apioldUrl + 'Myattention!addMyattention.do',
        method: 'get',
        params: data
    })
}
/**
 * 舆情研判——列表接口——上报查询邮箱
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  pageNo        第几页
 *  pageSize      每页条数
 */
export function getReportEmails(data) {
    return fetch({
        url: API.apioldUrl + 'UserMail!listUserMail.do',
        method: 'get',
        params: data
    })
}   
/**
 * 舆情研判——列表接口——上报提交
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *  id                 信息ID 逗号分隔
 */
export function sendEmail(data) {
    return fetch({
        url: API.apioldUrl + 'AddSendMail!addSendMail.do',
        method: 'get',
        params: data
    })
}

/**
 * 舆情研判——列表接口——查询简报分类
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getReportClassifys(data) {
    return fetch({
        url: API.apiUrl + 'judged/getReportClassifys',
        method: 'get',
        params: data
    })
} 
/**
 * 舆情研判——列表接口——简报提交
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *  userid
 *  Uids：信息 id
 *  KYid：简报id
 *  KR_INFOTYPE：07
 */
export function saveBrief(data) {
    return fetch({
        url: API.apioldUrl + 'Yqjb2!saveAddYqjb.do',
        method: 'get',
        params: data
    })
}
/**
 * 添加数据源
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *  userid
 *  ksUuids：信息 id
 *  classifyId：分类id
 *
 */
export function saveReport(data) {
    return fetch({
        url: API.apiUrl + 'warningReport/saveWarningToReport',
        method: 'get',
        params: data
    })
}
/**
 * 舆情研判——列表——操作条——舆情研判信息批量导出
 * get
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 * ids                信息uuid
 */
export function getEexportJudgedList(data) {
    return fetch({
        url: API.taskCenterHost + 'taskcenter/task',
        method: 'post',
        data: data
    })
}
/**
 * 舆情研判——列表——操作条——舆情研判列表全部导出
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  ACCESSTOKEN        用户认证的accessToken
 *  ZHXGUSERID         必选参数用户id，使用base64加密
 *  time          时间类型  7day 7天； 24hour 24小时
 *  bTime         开始时间
 *  eTime         结束时间
 *  pageNo        第几页
 *  pageSize      每页条数
 *  orientation   倾向性 逗号分隔  1 2 3
 *  sourceType    媒体类型 逗号分隔
 *  warningLevel  预警级别 全部'' 0 一般  1 中等  2 严重 3 高危
 *  isOcr         图片识别 全部''   1 仅看图片识别数据  0 排除图片识别数据
 *  isRead        浏览范围  ''全部 1已读 0 未读
 */
export function getEexportAllJudgedList(data) {
    return fetch({
        url: API.taskCenterHost + 'taskcenter/task',
        method: 'post',
        data: data
    })
}
/**
 * 舆情研判——详情页——相同信息列表导出
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  userid  用户id
 *  simhash 信息simhash
 */
export function getExportSameInfo(data) {
    return fetch({
        url: API.apioldUrl + 'InfoDetail!exportSameInfo.do',
        method: 'get',
        params: data
    })
}
/**
 * 舆情研判——列表——操作条——标已读
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  userid  用户id
 *  ksuuids 信息uuid
 */
export function markReadList(data) {
    return fetch({
        url: API.apioldUrl + 'Warning!updateIsRead.do',
        method: 'get',
        params: data
    })
}
/**
 * 舆情研判——申请试用——获取研判模块基本信息
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  userId   用户id
 */
export function getJudgedInfo(data) {
    return fetch({
        url: API.apiUrl + 'judged/getJudgedInfo',
        method: 'get',
        params: data
    })
}
/**
 * 舆情研判——申请试用——申请开通
 * post
 * -------------------------------------传入的参数---------------------------------------------
 *  uid   用户id
 *  who   用户名称
 *  tel  联系电话
 */
export function submitApply(data) {
    return fetch({
        url: API.apiUrl + 'judged/applyForJudged',
        method: 'post',
        data: data
    })
}
/**
 * 舆情研判——立即绑定——获取二维码
 * get
 * -------------------------------------传入的参数---------------------------------------------
 *  userid   用户id
 */
export function getQrcode(data) {
    return fetch({
        url: API.apiUrl + 'wechat/getQrcode',
        method: 'get',
        params: data
    })
}
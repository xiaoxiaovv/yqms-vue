import { fetch } from "@/helpers/fetch"; //引用fetch.js
import API from '../../config/env';

/**
 *  获得媒体类型
 * -------------------------------------传入的参数---------------------------------------------
 * ACCESSTOKEN        用户认证的accessToken
 * ZHXGUSERID         必选参数用户id，使用base64加密
 */
export function getSourceList(data) {
    return fetch({
        url: API.apioldUrl + 'HomePage!getSourceList.do',
        method: 'get',
        params: data
    })
}

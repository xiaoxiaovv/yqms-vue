import axios from 'axios'; //引入axios
import store from '../store/index'
let Base64 = require('js-base64').Base64;
export function fetch(options) {
	return new Promise((resolve, reject) => {
	    //研判 和 秘书 userid 加密不一样
	    let zhxgUserId = (options.fetchType ==='yp') ? Base64.encode(store.state.ZHXGUSERID): Base64.encode('U' + store.state.ZHXGUSERID);
		const instance = axios.create({ //instance创建一个axios实例，可以自定义配置，可在 axios文档中查看详情
			//所有的请求都会带上这些配置，比如全局都要用的身份信息等。
			headers: {
				'ACCESSTOKEN': store.state.ACCESSTOKEN,
				'ZHXGUSERID': zhxgUserId,
				'Content-Type': 'application/json;charset=UTF-8'
			},
			timeout: 120 * 1000 // 120秒超时
		});
		instance(options)
			.then(response => { //then 请求成功之后进行什么操作
				resolve(response); //把请求到的数据发到引用请求的地方
			})
			.catch(error => {
				if(error.message.indexOf('401') > -1) {
					localStorage.clear();
					//window.location = store.state.oldyqmsUrl + 'Login/login'
				}
                reject(error);
			});
	});
}

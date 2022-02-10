import { getJudgedInfo } from '@/api/judgment'

/*  code 值意思
    0 没有申请过
    1 开通人工预警  examinetype  '审核状态 0未审核 1通过 2未通过'
    2 申请过    examinetype  '审核状态 0未审核 1通过 2未通过'
*/
const judgment = {
    state: {
        path:'',                 //跳转地址
        endtime:'',              //结束日期
        who:'',                  //名称
        tel:'',                  //手机号
        examinetype:'',          //处理中值   0未审核 1通过 2未通过'
    },
    mutations: {
        getUserInfo:(state,datas) =>{
            state.endtime = datas.endtime || "";
            state.who = datas.who || "";
            state.tel = datas.tel || "";
            state.examinetype = (datas.examinetype != 'null') ?  datas.examinetype : "status";
            let code = datas.code || "0";
            if(code == 0){
                state.path = "judgmentapply";
            }else if(code == 1){
                state.path = "judgmentlist";
            }else if(code == 2){
                if(datas.examinetype == 0){
                    state.path = "judgmentwait";
                }else if(datas.examinetype == 1){
                    state.path = "judgmentlist";
                }else if(datas.examinetype == 2){
                    state.path = "judgmentapply";
                }
            }
            let j = {
                path:state.path,                 //跳转地址
                endtime:state.endtime,              //结束日期
                who:state.who,                  //名称
                tel:state.tel,                  //手机号
                examinetype:state.examinetype,          //处理中值   0未审核 1通过 2未通过'
            };
            localStorage.setItem('judgmentJson',JSON.stringify(j));
        },
        setInfo(state,datas){
            datas = JSON.parse(datas);
            state.endtime = datas.endtime || "";
            state.who = datas.who || "";
            state.tel = datas.tel || "";
            state.examinetype = datas.examinetype;
            state.path = datas.path;
        }
    },
    actions: {
        getUserInfo({commit},ZHXGUSERID){
            return new Promise((resolve,reject) =>{
                let params = {
                    userId : ZHXGUSERID
                }
                getJudgedInfo(params).then(res =>{
                    if(res.data.status == 0){
                        let datas = res.data.result.data;
                        commit('getUserInfo',datas);
                    }else{
                        console.log("访问错误");
                    }
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            })
        },
        setInfo({commit},info){
            commit('setInfo',info);
        }
    }
};
export default judgment

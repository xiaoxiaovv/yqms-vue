import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: resolve => require(['@/views/home/home.vue'], resolve)
        },
        {
            path: '/headlinedetail',
            name: 'headlinedetail',
            component: resolve => require(['@/views/home/headlinedetail/headlinedetail.vue'], resolve)
        },
        {
            path: '/source',
            name: 'source',
            component: resolve => require(['@/views/browse/mediaSource.vue'], resolve)
        },
        {
            path: '/microblogsource',
            name: 'microblogsource',
            component: resolve => require(['@/views/browse/microblogsource/microblogsource.vue'], resolve)
        },
        {
            path: '/judgmentloading',
            name: 'judgmentloading',
            component: resolve => require(['@/views/judgment/loading/loading.vue'], resolve),
            beforeEnter: (to, from, next) => {
                store.dispatch("getUserInfo", store.state.ZHXGUSERID).then(() => {
                    if (store.state.judgment.path != "") {
                        next({path: store.state.judgment.path});
                    } else {
                        next();
                    }
                }).catch(() => {
                });
            }
        },
        {
            path: '/judgmentapply',
            name: 'judgmentapply',
            component: resolve => require(['@/views/judgment/apply/apply.vue'], resolve)
        },
        {
            path: '/judgmentwait',
            name: 'judgmentwait',
            component: resolve => require(['@/views/judgment/wait/wait.vue'], resolve)
        },
        {
            path: '/judgmentlist',
            name: 'judgmentlist',
            component: resolve => require(['@/views/judgment/list/list.vue'], resolve),
            beforeEnter:(to,from,next)=>{
                if(store.state.judgment.path == ''){
                    // let judgmentJson = localStorage.getItem('judgmentJson');
                    // store.dispatch("setInfo",judgmentJson);
                    store.dispatch("getUserInfo", store.state.ZHXGUSERID).then(() => {
                        next();
                    }).catch(() => {
                        next();
                    });
                }else{
                    next();
                }

            }
        },
        {
            path: '/judgmentdetail',
            name: 'judgmentdetail',
            component: resolve => require(['@/views/judgment/detail/detail.vue'], resolve)
        },
        {
            path: '/cardintroduce',
            name: 'cardintroduce',
            component: resolve => require(['@/views/warrantchain/cardintroduce/cardintroduce.vue'], resolve)
        },
        {
            path: '/cardmanage',
            name: 'cardmanage',
            component: resolve => require(['@/views/warrantchain/cardmanage/cardmanage.vue'], resolve)
        },
        {
            path: '/myOrder',
            name: 'myOrder',
            component: resolve => require(['@/views/set/myOrder/myOrder.vue'], resolve)
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.length > 0) {
        if (store.state.ACCESSTOKEN != '') {
            next();
        } else {
            if(store.state.kuTempLateType == 6){
                window.location = 'https://cloud.nsfocus.com/#/krosa/views/initcdr/login';
            }else{
                window.location = store.state.oldyqmsUrl + 'Login/login'
            } 
        }
    } else {
        if(store.state.kuTempLateType == 6){
            window.location = 'https://cloud.nsfocus.com/#/krosa/views/initcdr/login';
        }else{
            window.location = store.state.oldyqmsUrl + 'Login/login'
        } 
    }

});

export default router

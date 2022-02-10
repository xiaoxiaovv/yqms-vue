# yqms-vue
项目名

### `yarn add packgage`
添加包名

### `npm install`/yarn
下载项目所依赖的包

### `npm start`/yarn start
运行项目

### `npm run build`/yarn run build
项目打包

### `npm test`/yarn test
项目测试，当然你得写测试代码

### `npm run eject`/yarn run eject
导出配置，此过程不可逆转

	-build  webpack 编译配置目录
		- build.js 
		- check-versions.js
		- logo.png
		- utils.js
		- vue-loader.conf.js
		- webpack.base.conf.js
		- webpack.dev.conf.js
		- webpack.prod.conf.js

    - config 
    	- dev.env.js
        - env.js 环境配置
        - index.js
        - prod.env.js
        - test.env.js
    - deploy 多环境部署目录
    	- beta beta环境
    	- prod 生成环境
    	
    - node_modules yarn安装包目录
        
    - src 代码
    	- api 接口
    		- home.js 首页接口
    
        - assets 静态文件
            - image 图片
            	- home 首页图片文件夹
            		- black 黑版首页图片
            		- classic 蓝白首页图片
            		
            	- iooc.ico 网站logo
            	- nodata.png 赞无数据图片
        - components 公用组件文件夹
        	- definedFooter 自定义底部
        	- definedHeader 自定义头部
        	- definedHeaderBlack 自定义黑色头部
        	- footer 底部
        	- header 头部
        	- loading 加载
        	- nav 导航
        	- newDialog 弹框——带按钮
        	- nodata 暂无数据
        	- pagenation 分页
        	- pushWarning 底部弹框推送预警
        	- sidebar 侧边栏
        	- syspwd 系统密码
        	- timetips 时间提示
        	- vDialog 弹框——不带按钮
        	- vTree tree树
        - directives  自定义vue指令
        	- vClamp.js 文字超出两行...  使用方式v-clamp.number="2"
        	- vFoucs.js 自动聚焦
        - helpers  工具类
        	- fetch.js fetch封装
        	- util.js 公共js
        
        - router 路由文件夹
        	- index.js 根路由文件
  
        - store 储存
        	- modules 模块文件夹
        		- home.js 首页 store
        	- index.js 全局store
		
		- styles
			- theme 主题文件夹
				classic.css  金典版css （--root{--c-fff: #fff;} 声明变量    引用通过 var(--c-fff) 图片路径使用@别名 代表src目录   require引入）
			
			- base.css  基础样式
		- views 视图文件夹
			- home 首页
				- components 首页组件文件夹
					- emptyTopic 空白专题
					- events 事件
					- homeCenter 首页中间组件的动态渲染
					- monitorEchart 预警监测
					- pushWarning 推送预警
					- siteHeadlines 站点头条
					- toplicList 专题
                - headlinedetails 站点头条详情文件夹
    				- headlinedetails.css 站点头条详情css
    				- headlinedetails.vue 站点头条详情页面
				- home.ccs 首页css
				- home.vue 首页
            - browse 舆情浏览
                - components 舆情浏览组件文件夹
                - microblogsource 微博溯源分析文件夹
                    - microblogsource.css 微博溯源分析css
                    - microblogsource.vue 微博溯源分析页面
                - mediaSource.ccs 网媒溯源分析css
                - mediaSource.vue 网媒溯源分析页面
		- App 页面入口
		
		- main.js 入口js
		
	- static 静态资源
	
	- test 测试文件夹
	
    - package.json 一些配置
    
    - package-lock.json 锁
    
    - yarn.lock 版本锁

    /****************************埋点统计字段说明*******************************/
    
    1.首页埋点总计字段说明：
        - 首页自定义： homepage_custom 
            - 恢复默认： homepage_restore_default
            - 生成首页： homepage_create_homepage
        - 推送预警： homepage_pushwarning 
        - 站点头条： homepage_siteheadlines 
        - 事件： homepage_events 
        - 关注专题： homepage_focustopics
        - 新建专题： homepage_newtopic 
        - 专题切换： homepage_switch_topic 

        - 推送预警详情： homepage_pushwarning_detail
        - 站点头条详情： homepage_siteheadlines_detail
        - 关注专题详情： homepage_focustopics_detail
        - 事件详情：     homepage_events_detail

        - 监测统计：
            1.点击媒体类型数字：（_total结尾的是总数，_fu结尾的是负面数）
                总数:    'homepage_statistics_num_'+item.sourceType+'_total'
                负面数:  'homepage_statistics_num_'+item.sourceType+'_fu'
            2.点击echarts图：（_total结尾的是总数，_fu结尾的是负面数）
                'homepage_statistics_echarts_'+params.data.sourceType
            3.点击今日总数：   homepage_statistics_today_total

    /****************************埋点统计字段说明*******************************/
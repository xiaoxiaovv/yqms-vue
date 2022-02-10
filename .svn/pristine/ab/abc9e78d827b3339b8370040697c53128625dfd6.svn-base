<template>
	<!-- ishidden： 0 显示  1 隐藏-->
	<div class="yqms_head_box" :class="yqmsHeadBox">
        <banner :showBanner="showBanner" v-if="!($store.state.agentid > 0) && $store.state.kuTempLateType != 4  && $store.state.kuTempLateType != 5  && $store.state.kuTempLateType != 6  && $store.state.kuTempLateType != 7  && $store.state.kuTempLateType != 8"></banner>
		<!-- 自定义选择层 -->
		<!--蓝白-->
		<div v-if="$store.state.kuTempLateType == 0" class="compile_tit_box" v-show="showCompilemask" ref="compile">
			<ul>
				<li>
					<a href="javascript:void(0)" @click.stop="addModel">添加模块</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handleRestoreSet">恢复默认设置</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handSaveHome">生成首页</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="cancleSet">取消设置</a>
				</li>
			</ul>
		</div>
		<!--黑-->
		<div v-if="$store.state.kuTempLateType == 1" class="compile_tit_box compile_tit_box_black" v-show="showCompilemask" ref="compile">
			<ul>
				<li>
					<a href="javascript:void(0)" @click.stop="addModel">添加模块</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handleRestoreSet">恢复默认设置</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handSaveHome">生成首页</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="cancleSet">取消设置</a>
				</li>
			</ul>
		</div>
		<!--绿盟云-->
		<div v-if="$store.state.kuTempLateType == 6" class="compile_tit_box compile_tit_box_green" v-show="showCompilemask" ref="compile">
			<ul>
				<li>
					<a href="javascript:void(0)" @click.stop="addModel">添加模块</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handleRestoreSet">恢复默认设置</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handSaveHome">生成首页</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="cancleSet">取消设置</a>
				</li>
			</ul>
		</div>
		<!--移动云-->
		<div v-if="$store.state.kuTempLateType == 7" class="compile_tit_box compile_tit_box_red" v-show="showCompilemask" ref="compile">
			<ul>
				<li>
					<a href="javascript:void(0)" @click.stop="addModel">添加模块</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handleRestoreSet">恢复默认设置</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handSaveHome">生成首页</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="cancleSet">取消设置</a>
				</li>
			</ul>
		</div>
		<!--慕亚-->
		<div v-if="$store.state.kuTempLateType == 4" class="compile_tit_box compile_tit_box_isentia" v-show="showCompilemask" ref="compile">
			<ul>
				<li>
					<a href="javascript:void(0)" @click.stop="addModel">添加模块</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handleRestoreSet">恢复默认设置</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handSaveHome">生成首页</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="cancleSet">取消设置</a>
				</li>
			</ul>
		</div>
		<!--一点资讯-->
		<div v-if="$store.state.kuTempLateType == 5" class="compile_tit_box" v-show="showCompilemask" ref="compile">
			<ul>
				<li>
					<a href="javascript:void(0)" @click.stop="addModel">添加模块</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handleRestoreSet">恢复默认设置</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handSaveHome">生成首页</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="cancleSet">取消设置</a>
				</li>
			</ul>
		</div>
		<!--教育版-->
		<div v-if="$store.state.kuTempLateType == 8" class="compile_tit_box compile_tit_box_edu" v-show="showCompilemask" ref="compile">
			<ul>
				<li>
					<a href="javascript:void(0)" @click.stop="addModel">添加模块</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handleRestoreSet">恢复默认设置</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="handSaveHome">生成首页</a>
				</li>
				<li>
					<a href="javascript:void(0)" @click.stop="cancleSet">取消设置</a>
				</li>
			</ul>
		</div>
		<!--蓝白版 header第一行内容 -->
		<div v-if="$store.state.kuTempLate =='comold' && $store.state.kuTempLateType == 0" class="yqms_header_box clearfix">
			<div class="head_box" :title="$store.state.username + '，' + welcome.text">
				<i v-show="name.ishidden == '0'">{{$store.state.username}}，</i>
				<span v-show="welcome.ishidden == '0'">{{welcome.text}}</span>
			</div>
			<!--剩余日期提示-->
			<div class="rest" v-if="kuUserStatus == '1' ">
				<span>试用剩余时间 </span>
		        <span>
		            <b class="firstB">{{firstB}}</b>
					<b class="lastB">{{lastB}}</b>
		        </span>
				<span> 天</span>
			</div>
			<!--自定义头部-->
			<div class="defined_head_icon defined_icon" @click="handleDefinedHeader"></div>
			<div class="user_set_box" @click.stop="userSet">
				<p>{{$store.state.username}}</p>
				<span class="triangle"></span>
				<ul class="user_set_nav border_box" v-show="showUserInfo">
					<li class="list06">
						<router-link tag="a" :to="{path: 'myOrder', query: {}}" target="_blank"><span class="icon"></span>我的订单</router-link>
					</li>
					<li class="list01" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/userinfo'"><span class="icon"></span>用户信息</a>
					</li>
					<li class="list02" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/todaydetaile'"><span class="icon"></span>用量统计</a>
					</li>
					<li class="list03 hide" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet(2)">
						<a href=""><span class="icon"></span>关联账号</a>
					</li>
					<li class="list04" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<!--<a :href="$store.state.oldyqmsUrl + 'Set/special'"><span class="icon"></span>系统设置</a>-->
            			<a href="javascript:void(0)" @click="skipSetPag()"><span class="icon"></span>系统设置</a>
					</li>
					<li class="list05" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Login/logout'"><span class="icon"></span>退出</a>
					</li>
				</ul>
				<!-- 关联账号 -->
				<div class="account_lists" v-show="showLinkAccount" @mouseleave.prevent="hideLink" @mouseover.prevent="showLink">
					<img class="triangle_icon" src="../../assets/images/home/classic/triangle_icon.png">
					<ul class="account_list">
						<li class="item_center" v-for="(item,i) in linkAccount" :key="i">
							<a href="" title="">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- icon自定义 -->
			<div class="head_icon" v-show="picData.length > 0">
				<ul>
					<li v-for="(icon,i) of picData" :key="i" v-show="icon.ishidden == '0'">
						<a :href="icon.url" v-if="icon.title=='联系客服'" target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
						<a :href="$store.state.oldyqmsUrl +icon.url" v-else target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
					</li>
					<li class="selfdefined" @click.stop="showCompile(showCompilemask)" :class="{hover: showCompilemask}" v-show="showHomepageCustom">
						<a href="javascript:void(0)">首页自定义</a>
					</li>
				</ul>
			</div>
		</div>
		<!--黑版  header第一行内容 -->
		<div v-if="$store.state.kuTempLate =='comold' && $store.state.kuTempLateType == 1" class="yqms_header_box clearfix">
			<div class="head_box head_box_black flex" :title="$store.state.username + '，' + welcome.text">
				<div class="yqms_logo_box item_vertical"  v-if="$store.state.kuUserStatus != '1'">
					<img class="yqms_logo_img" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
				</div>
		        <div class="yqms_logo_box item_vertical" v-else>
		        	<!-- <img v-if="logo.name" src="../../assets/images/home/classic/trialLogo.png" /> -->
		        	<img class="yqms_logo_img" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
		        	<!-- 试用标识 -->
	        		<img v-if="!($store.state.agentid > 0)" class="trial_version_icon" src="../../assets/images/home/classic/trial_version_icon.png" />
		        </div>
				<!--<i v-show="name.ishidden == '0'">{{$store.state.username}}，</i>
				<span v-show="welcome.ishidden == '0'">{{welcome.text}}</span>-->
			</div>
			<!--剩余日期提示-->
			<div class="rest rest_black" v-if="kuUserStatus == '1' ">
				<span>试用剩余时间 </span>
		        <span>
		            <b class="firstB">{{firstB}}</b>
					<b class="lastB">{{lastB}}</b>
		        </span>
				<span> 天</span>
			</div>
			<!--自定义头部-->
			<div class="defined_head_icon defined_head_icon_balck defined_icon" @click="handleDefinedHeader"></div>
			<div class="user_set_box user_set_box_black" @click.stop="userSet">
				<span class="avater"></span>
				<p>{{$store.state.username}}</p>
				<span class="triangle"></span>
				<ul class="user_set_nav_black border_box" v-show="showUserInfo">
					<li class="list06">
						<router-link tag="a" :to="{path: 'myOrder', query: {}}" target="_blank"><span class="icon"></span>我的订单</router-link>
					</li>
					<li class="list01" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/userinfo'"><span class="icon"></span>用户信息</a>
					</li>
					<li class="list02" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/todaydetaile'"><span class="icon"></span>用量统计</a>
					</li>
					<!--<li class="list03" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet(2)">
						<a href=""><span class="icon"></span>关联账号</a>
					</li>-->
					<li class="list04" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<!--<a :href="$store.state.oldyqmsUrl + 'Set/special'"><span class="icon"></span>系统设置</a>-->
						<a href="javascript:void(0)" @click="skipSetPag()"><span class="icon"></span>系统设置</a>
					</li>
					<li class="list05" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Login/logout'"><span class="icon"></span>退出</a>
					</li>
				</ul>
				<!-- 关联账号 -->
				<div class="account_lists account_lists_black" v-show="showLinkAccount" @mouseleave.prevent="hideLink" @mouseover.prevent="showLink">
					<img class="triangle_icon" src="../../assets/images/home/classic/triangle_icon.png">
					<ul class="account_list">
						<li class="item_center" v-for="(item,i) in linkAccount" :key="i">
							<a href="" title="">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- icon自定义 -->
			<div class="head_icon_black" v-show="picData.length > 0">
				<ul>
					<li v-for="(icon,i) of picData" :key="i" v-show="icon.ishidden == '0'">
                        <a :href="icon.url" v-if="icon.title=='联系客服'" target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
                        <a :href="$store.state.oldyqmsUrl +icon.url" v-else target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
					</li>
					<li class="selfdefined" @click.stop="showCompile(showCompilemask)" :class="{hover: showCompilemask}" v-show="showHomepageCustom">
						<span class="icon_edit"></span>
						<a href="javascript:void(0)">首页自定义</a>
					</li>
				</ul>
			</div>
		</div>
		<!--移动云 header第一行内容 -->
		<div v-if="$store.state.kuTempLate =='comold' && $store.state.kuTempLateType == 7" class="yqms_header_box clearfix">
            <div class="yqms_logo_box flex_verticle inline-b fl">
				<img class="yqms_logo_img yqms_logo_img_red" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
			</div>
			<!-- <div class="head_box" :title="$store.state.username + '，' + welcome.text">
				<i v-show="name.ishidden == '0'">{{$store.state.username}}，</i>
				<span v-show="welcome.ishidden == '0'">{{welcome.text}}</span>
			</div> -->
	      	<!--剩余日期提示-->
	      	<div class="rest" v-if="kuUserStatus == '1' " style="position: relative;top: 19px;left: 60px;">
		        <span>试用剩余时间 </span>
		        <span>
		            <b class="firstB">{{firstB}}</b>
					<b class="lastB">{{lastB}}</b>
		        </span>
		        <span> 天</span>
	      	</div>
			<!--自定义头部-->
			<!-- <div class="defined_head_icon defined_icon mar_t_18" @click="handleDefinedHeader"></div> -->
			<div class="user_set_box mar_t_18" @click.stop="userSet">
				<p>{{$store.state.username}}</p>
				<span class="triangle"></span>
				<ul class="user_set_nav border_box" v-show="showUserInfo">
					<li class="list01" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/userinfo'"><span class="icon"></span>用户信息</a>
					</li>
					<li class="list02" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/todaydetaile'"><span class="icon"></span>用量统计</a>
					</li>
					<li class="list03 hide" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet(2)">
						<a href=""><span class="icon"></span>关联账号</a>
					</li>
					<li class="list04" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<!--<a :href="$store.state.oldyqmsUrl + 'Set/special'"><span class="icon"></span>系统设置</a>-->
            			<a href="javascript:void(0)" @click="skipSetPag()"><span class="icon"></span>系统设置</a>
					</li>
					<li class="list05" v-if="$store.state.kuTempLate =='comold' && $store.state.kuTempLateType != 7" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Login/logout'"><span class="icon"></span>退出</a>
					</li>
				</ul>
				<!-- 关联账号 -->
				<div class="account_lists" v-show="showLinkAccount" @mouseleave.prevent="hideLink" @mouseover.prevent="showLink">
					<img class="triangle_icon" src="../../assets/images/home/classic/triangle_icon.png">
					<ul class="account_list">
						<li class="item_center" v-for="(item,i) in linkAccount" :key="i">
							<a href="" title="">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- icon自定义 -->
			<div class="head_icon mar_t_18" v-show="picData.length > 0">
				<ul>
					<!-- <li v-for="(icon,i) of picData" :key="i" v-show="icon.ishidden == '0'">
						<a :href="icon.url" v-if="icon.title=='联系客服'" target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
						<a :href="$store.state.oldyqmsUrl +icon.url" v-else target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
					</li> -->
					<li class="selfdefined" @click.stop="showCompile(showCompilemask)" :class="{hover: showCompilemask}" v-show="showHomepageCustom">
						<a href="javascript:void(0)">首页自定义</a>
					</li>
				</ul>
			</div>
		</div>
		<!--绿盟云 header第一行内容 -->
		<div v-if="$store.state.kuTempLate =='comold' && $store.state.kuTempLateType == 6" class="yqms_header_box yqms_header_bg_green clearfix">
            <div class="yqms_logo_box yqms_logo_box_green flex_verticle inline-b fl">
				<img class="yqms_logo_img yqms_logo_img_green" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
			</div>
			<span class="yqjc">·绿盟舆情监测服务</span>
			<!--剩余日期提示-->
			<div class="rest" v-if="kuUserStatus == '1' " style="position: relative;top: -4px;">
				<span style="color: #FFFFFF">试用剩余时间 </span>
				<span>
				    <b class="firstB">{{firstB}}</b>
					<b class="lastB">{{lastB}}</b>
				</span>
				<span style="color: #FFFFFF"> 天</span>
			</div>
			<div class="user_set_box user_set_box_green" @click.stop="userSet">
				<p>{{$store.state.username}},您好</p>
				<ul class="user_set_nav user_set_nav_green border_box" v-show="showUserInfo">
					<div class="admin_child_menu_arrow"></div>
					<!-- <li class="list01" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/userinfo'"><span class="icon"></span>用户信息</a>
					</li> -->
					<li class="list02" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/todaydetaile'">用量统计</a>
					</li>
					<li class="list03 hide" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet(2)">
						<a href=""><span class="icon"></span>关联账号</a>
					</li>
					<li class="list04" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<!--<a :href="$store.state.oldyqmsUrl + 'Set/special'"><span class="icon"></span>系统设置</a>-->
            			<a href="javascript:void(0)" @click="skipSetPag()">系统设置</a>
					</li>
					<li class="list05" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Login/logout'">退出</a>
					</li>
				</ul>
				<!-- 关联账号 -->
				<div class="account_lists" v-show="showLinkAccount" @mouseleave.prevent="hideLink" @mouseover.prevent="showLink">
					<img class="triangle_icon" src="../../assets/images/home/classic/triangle_icon.png">
					<ul class="account_list">
						<li class="item_center" v-for="(item,i) in linkAccount" :key="i">
							<a href="" title="">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- icon自定义 -->
			<!-- <div class="head_icon head_icon_green" v-show="picData.length > 0">
				<ul>
					<li v-for="(icon,i) of picData" :key="i" v-show="icon.ishidden == '0'">
						<a :href="icon.url" v-if="icon.title=='联系客服'" target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
						<a :href="$store.state.oldyqmsUrl +icon.url" v-else target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
					</li>
					<li class="selfdefined" @click.stop="showCompile(showCompilemask)" :class="{hover: showCompilemask}" v-show="showHomepageCustom">
						<a href="javascript:void(0)">首页自定义</a>
					</li>
				</ul>
			</div> -->
		</div>
		<!--教育版 header第一行内容 -->
		<div v-if="$store.state.kuTempLate =='comold' && $store.state.kuTempLateType == 8" class="yqms_header_box yqms_header_bg_edu clearfix">
            <div class="yqms_logo_box yqms_logo_box_edu flex_verticle inline-b fl">
				<img class="yqms_logo_img yqms_logo_img_edu" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
			</div>
      		<!--剩余日期提示-->
			<div class="rest" v-if="kuUserStatus == '1' " style="position: relative;top: 15px;">
				<span>试用剩余时间 </span>
				<span>
				    <b class="firstB">{{firstB}}</b>
					<b class="lastB">{{lastB}}</b>
				</span>
				<span> 天</span>
			</div>
			<div class="user_set_box user_set_box_edu mar_t_18" @click.stop="userSet">
				<p>{{$store.state.username}}</p>
				<span class="triangle"></span>
				<ul class="user_set_nav user_set_nav_edu border_box" v-show="showUserInfo">
					<li class="list01" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/userinfo'"><span class="icon"></span>用户信息</a>
					</li>
					<li class="list02" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/todaydetaile'"><span class="icon"></span>用量统计</a>
					</li>
					<li class="list03 hide" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet(2)">
						<a href=""><span class="icon"></span>关联账号</a>
					</li>
					<li class="list04" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<!--<a :href="$store.state.oldyqmsUrl + 'Set/special'"><span class="icon"></span>系统设置</a>-->
            			<a href="javascript:void(0)" @click="skipSetPag()"><span class="icon"></span>系统设置</a>
					</li>
					<li class="list05" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Login/logout'"><span class="icon"></span>退出</a>
					</li>
				</ul>
				<!-- 关联账号 -->
				<div class="account_lists" v-show="showLinkAccount" @mouseleave.prevent="hideLink" @mouseover.prevent="showLink">
					<img class="triangle_icon" src="../../assets/images/home/classic/triangle_icon.png">
					<ul class="account_list">
						<li class="item_center" v-for="(item,i) in linkAccount" :key="i">
							<a href="" title="">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- icon自定义 -->
			<div class="head_icon head_icon_edu" v-show="picData.length > 0">
				<ul>
					<li v-for="(icon,i) of picData" :key="i" v-show="icon.ishidden == '0'">
						<a :href="icon.url" v-if="icon.title=='联系客服'" target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
						<a :href="$store.state.oldyqmsUrl +icon.url" v-else target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
					</li>
					<li class="selfdefined" @click.stop="showCompile(showCompilemask)" :class="{hover: showCompilemask}" v-show="showHomepageCustom">
						<a href="javascript:void(0)">首页自定义</a>
					</li>
				</ul>
			</div>
		</div>
		<!--数言舆情 header第一行内容 -->
		<div v-if="$store.state.kuTempLate == 'UnicomProject'" class="yqms_header_box yqms_header_bg_unicom clearfix">
			<div class="head_icon head_icon_unicom" v-show="picData.length > 0">
				<ul>
					<li v-for="(icon,i) of picData" :key="i" v-show="icon.ishidden == '0'">
						<a :href="icon.url" v-if="icon.title=='联系客服'" target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
						<a :href="$store.state.oldyqmsUrl +icon.url" v-else target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
					</li>
				</ul>
			</div>
			<div class="user_set_box user_set_box_unicom" @click.stop="userSet">
				<p><span>> </span>{{$store.state.username}}</p>
				<span class="triangle"></span>
				<ul class="user_set_nav user_set_nav_unicom border_box" v-show="showUserInfo">
					<li class="list01" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/userinfo'"><span class="icon icon1"></span>用户信息</a>
					</li>
					<li class="list05" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Login/logout'"><span class="icon icon2"></span>退出</a>
					</li>
				</ul>
				<!-- 关联账号 -->
				<div class="account_lists" v-show="showLinkAccount" @mouseleave.prevent="hideLink" @mouseover.prevent="showLink">
					<img class="triangle_icon" src="../../assets/images/home/classic/triangle_icon.png">
					<ul class="account_list">
						<li class="item_center" v-for="(item,i) in linkAccount" :key="i">
							<a href="" title="">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="user_set_box user_set_box_unicom">
				<a href="javascript:void(0)" @click="skipSetPag()"><span class="icon"></span>> 系统设置</a>
			</div>
			<div class="user_set_box user_set_box_unicom">
				<a :href="$store.state.oldyqmsUrl + 'Set/todaydetaile'"><span class="icon"></span>> 用量统计</a>
			</div>
			<!--剩余日期提示-->
			<div class="rest" v-if="kuUserStatus == '1' " style="position: relative;top: -8px;margin-left: 17%;">
				<span>试用剩余时间 </span>
				<span>
				    <b class="firstB">{{firstB}}</b>
					<b class="lastB">{{lastB}}</b>
				</span>
				<span> 天</span>
			</div>
		</div>
		<!--慕亚 header第一行内容 -->
		<div v-if="$store.state.kuTempLate =='comold' && $store.state.kuTempLateType == 4" class="yqms_header_box yqms_header_box_isentia clearfix">
            <div class="yqms_logo_box flex_verticle inline-b fl">
				<img class="yqms_logo_img" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
			</div>
			<!--剩余日期提示-->
			<div class="rest" v-if="kuUserStatus == '1' " style="position: relative;top: 12px;">
				<span>试用剩余时间 </span>
				<span>
				    <b class="firstB">{{firstB}}</b>
					<b class="lastB">{{lastB}}</b>
				</span>
				<span> 天</span>
			</div>
			<!--剩余日期提示-->
			<!--自定义头部-->
			<div class="defined_head_icon defined_icon" @click="handleDefinedHeader"></div>
			<div class="user_set_box mar_t_18" @click.stop="userSet">
				<p>{{$store.state.username}}</p>
				<span class="triangle"></span>
				<ul class="user_set_nav border_box" v-show="showUserInfo">
					<li class="list01" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/userinfo'"><span class="icon"></span>用户信息</a>
					</li>
					<li class="list02" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/todaydetaile'"><span class="icon"></span>用量统计</a>
					</li>
					<li class="list03 hide" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet(2)">
						<a href=""><span class="icon"></span>关联账号</a>
					</li>
					<li class="list04" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<!--<a :href="$store.state.oldyqmsUrl + 'Set/special'"><span class="icon"></span>系统设置</a>-->
            			<a href="javascript:void(0)" @click="skipSetPag()"><span class="icon"></span>系统设置</a>
					</li>
					<li class="list05" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Login/logout'"><span class="icon"></span>退出</a>
					</li>
				</ul>
				<!-- 关联账号 -->
				<div class="account_lists" v-show="showLinkAccount" @mouseleave.prevent="hideLink" @mouseover.prevent="showLink">
					<img class="triangle_icon" src="../../assets/images/home/classic/triangle_icon.png">
					<ul class="account_list">
						<li class="item_center" v-for="(item,i) in linkAccount" :key="i">
							<a href="" title="">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- icon自定义 -->
			<div class="head_icon_isentia mar_t_18" v-show="picData.length > 0">
				<ul>
					<li class="flex_center_verticle" v-for="(icon,i) of picData" :key="i" v-show="icon.ishidden == '0' && icon.title=='联系客服'" @click="openKefu(icon.url)">
						<a :class="'icon0'+icon.id" :title="icon.title"></a>
						<span>{{icon.title}}</span>
					</li>
					<li class="selfdefined_isentia" @click.stop="showCompile(showCompilemask)" :class="{hover: showCompilemask}" v-show="showHomepageCustom">
						<a href="javascript:void(0)">首页自定义</a>
					</li>
				</ul>
			</div>
		</div>
		<!--一点资讯 header第一行内容 -->
		<div v-if="$store.state.kuTempLate =='comold' && $store.state.kuTempLateType == 5" class="yqms_header_box yqms_header_box_ydzx clearfix">
			<div class="head_box" :title="$store.state.username + '，' + welcome.text">
				<i v-show="name.ishidden == '0'">{{$store.state.username}}，</i>
				<span v-show="welcome.ishidden == '0'">{{welcome.text}}</span>
			</div>
			<!--剩余日期提示-->
			<div class="rest" v-if="kuUserStatus == '1' " style="position: relative;top: 2px;">
				<span>试用剩余时间 </span>
		        <span>
		            <b class="firstB">{{firstB}}</b>
					<b class="lastB">{{lastB}}</b>
		        </span>
				<span> 天</span>
			</div>
			<!--自定义头部-->
			<div class="defined_head_icon defined_icon" @click="handleDefinedHeader"></div>
			<div class="user_set_box" @click.stop="userSet">
				<p>{{$store.state.username}}</p>
				<span class="triangle"></span>
				<ul class="user_set_nav border_box" v-show="showUserInfo">
					<li class="list01" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/userinfo'"><span class="icon"></span>用户信息</a>
					</li>
					<li class="list02" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Set/todaydetaile'"><span class="icon"></span>用量统计</a>
					</li>
					<li class="list03 hide" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet(2)">
						<a href=""><span class="icon"></span>关联账号</a>
					</li>
					<li class="list04" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<!--<a :href="$store.state.oldyqmsUrl + 'Set/special'"><span class="icon"></span>系统设置</a>-->
            			<a href="javascript:void(0)" @click="skipSetPag()"><span class="icon"></span>系统设置</a>
					</li>
					<li class="list05" @mouseleave.prevent="hideUserSet" @mouseover.prevent="showuserSet()">
						<a :href="$store.state.oldyqmsUrl + 'Login/logout'"><span class="icon"></span>退出</a>
					</li>
				</ul>
				<!-- 关联账号 -->
				<div class="account_lists" v-show="showLinkAccount" @mouseleave.prevent="hideLink" @mouseover.prevent="showLink">
					<img class="triangle_icon" src="../../assets/images/home/classic/triangle_icon.png">
					<ul class="account_list">
						<li class="item_center" v-for="(item,i) in linkAccount" :key="i">
							<a href="" title="">{{item.name}}</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- icon自定义 -->
			<div class="head_icon" v-show="picData.length > 0">
				<ul>
					<li v-for="(icon,i) of picData" :key="i" v-show="icon.ishidden == '0'">
						<a :href="icon.url" v-if="icon.title=='联系客服'" target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
						<a :href="$store.state.oldyqmsUrl +icon.url" v-else target="_blank" :class="'icon0'+icon.id" :title="icon.title"></a>
					</li>
					<li class="selfdefined" @click.stop="showCompile(showCompilemask)" :class="{hover: showCompilemask}" v-show="showHomepageCustom">
						<a href="javascript:void(0)">首页自定义</a>
					</li>
				</ul>
			</div>
		</div>
		<!-- 导航nav数据 -->
		<yqms-nav :funName="funName" :navData="navData" :moreData="moreData" :logo="logo"></yqms-nav>
		<time-tip v-if="funName != '舆情研判'"></time-tip>
		<!-- 账号状态提醒 -->
		<div v-if="timeoutFlag && ($store.state.kuUserStatus == 1)" class="yqms_publice_con" :class="yqmsPubliceCon">
			<div class="text_wrap">
				<p class="text_con">您是试用用户，试用期将在{{firstB}}{{lastB}}天后到期，请您及时购买正式版。</p>
			</div>
		</div>
		<!--自定义头部弹框开始-->
		<v-dialog v-if="isShowDefined" title="自定义头部" @clickCloseDialog="hanldeCloseDialog">
			<defined-header v-if="$store.state.kuTempLateType == 0 || $store.state.kuTempLateType == 5" :headerData="headerData" @clickCloseDialog="hanldeCloseDialog" @emitOk="getNavsData"></defined-header>
			<defined-header-black v-if="$store.state.kuTempLateType == 1" :headerData="headerData" @clickCloseDialog="hanldeCloseDialog" @emitOk="getNavsData"></defined-header-black>
            <defined-header-red v-if="$store.state.kuTempLateType == 7" :headerData="headerData" @clickCloseDialog="hanldeCloseDialog" @emitOk="getNavsData"></defined-header-red>
            <defined-header-isentia v-if="$store.state.kuTempLateType == 4" :headerData="headerData" @clickCloseDialog="hanldeCloseDialog" @emitOk="getNavsData"></defined-header-isentia>
			<!-- <defined-header-edu v-if="$store.state.kuTempLateType == 8" :headerData="headerData" @clickCloseDialog="hanldeCloseDialog" @emitOk="getNavsData"></defined-header-edu> -->
		</v-dialog>
		<!--自定义头部弹框结束-->

		<!-- 取消设置弹窗 -->
		<new-dialog :showDialog="showSetDialog" title="取消设置" @handleConfirm="setConfirm" @handleCancel="setCancel" @handleCloseMask="handleCloseMask" :showConfirmBtn="setConfirmBtn" :showCancleBtn="setCancleBtn">
			<div class="yqms_tips">确定放弃首页设置？</div>
		</new-dialog>
		<!-- 取消设置成功弹窗 -->
		<new-dialog :showDialog="showSetSuccessDialog" @handleCloseMask="handleCloseMask" class="cancle_success_box">
			<div class="success_tips_box">
				<div class="suc_img"></div>
				<div class="suc_txt">取消设置成功</div>
			</div>
		</new-dialog>
		<!-- 添加模块弹窗 -->
		<new-dialog
			:showDialog="showAddDialog"
			title="添加模块"
			confirmText="保存"
			@handleConfirm="addConfirm"
			@handleCancel="addCancel"
			@handleCloseMask="handleCloseMask"
			:showConfirmBtn="addConfirmBtn"
			:showCancleBtn="addCancleBtn">
			<div class="add_model_box border_box">
				<el-form ref="addform" :model="form" label-width="90px" size="small">
				  <el-form-item label="模块名称：" class="model_select">
				    <el-select v-model="form.modeltitle"
				    	@change="changeSelect"
				    	placeholder="请选择">
				      <el-option v-for="(item,i) of options" :key="item.id" :label="item.label" :value="item.label"></el-option>
				    </el-select>
				    <div class="yqms_err_tips" v-show="err.isshow3">{{err.txt3}}</div>
				  </el-form-item>
				  <el-form-item label="模块别名：">
				    <el-input v-model="form.modelretitle"></el-input>
				    <div class="yqms_err_tips" v-show="err.isshow">{{err.txt}}</div>
				  </el-form-item>
				  <el-form-item label="专题列表：" v-show="form.modeltitle == '关注专题'">
				    <el-input placeholder="输入关键字进行过滤" v-model="form.topicTitle"> </el-input>
				    <div class="yqms_err_tips" v-show="err.isshow2">{{err.txt2}}</div>
						<v-tree
							class="filter_tree"
							:filterText="form.topicTitle"
							:treeData="treeData"
							@handleTree="clickTree">
						</v-tree>
				  </el-form-item>
				</el-form>
			</div>
		</new-dialog>
		<system-password :showSysPwd="showSysPwd"></system-password>
	</div>
</template>
<script>
	import definedHeader from '@/components/definedHeader/definedHeader.vue'
	import banner from '@/components/banner/banner.vue'
    import definedHeaderBlack from '@/components/definedHeaderBlack/definedHeaderBlack.vue'
    import definedHeaderRed from '@/components/definedHeaderRed/definedHeaderRed.vue'
    import definedHeaderIsentia from '@/components/definedHeaderIsentia/definedHeaderIsentia.vue'
	import yqmsNav from '@/components/nav/nav.vue'
	import timeTip from '@/components/timetips/timetips.vue'
	import vDialog from '@/components/vDialog/vDialog.vue'
	import newDialog from '@/components/newDialog/newDialog.vue'
	import vTree from '@/components/vTree/vTree.vue'
	import systemPassword from '@/components/syspwd/syspwd.vue'
    import VueCookies from 'vue-cookies'
	import { LOGOIMG , ICOIMG } from '@/helpers/util.js'
	import { getNavData, getSubjectTree, restoreHomePage, getIsSetXtPaw} from '@/api/home'
	import store from '@/store'
	export default {
		data() {
			return {
				showBanner: false,    //是否显示banner
				showSysPwd: false,    //是否显示系统设置密码
				showAddDialog: false, //是否显示添加模块弹窗
				addConfirmBtn: true,  //是否显示添加模块确定按钮
				addCancleBtn: true,   //是否显示添加模块取消按钮
				showSetDialog: false, //是否显示取消设置弹窗
				setConfirmBtn: true,  //是否显示取消设置确定按钮
				setCancleBtn: true,   //是否显示取消设置取消按钮
				showSetSuccessDialog: false, //是否显示取消设置成功弹窗
				isShowDefined: false, //是否显示自定义弹层
				showUserInfo: false, //是否显示用户信息
				yqmsHeadBox:'',     //不同模板的类名
				timeoutFlag:false,  //不同模板到期提示语
				yqmsPubliceCon:'',
        		kuUserStatus: this.$store.state.kuUserStatus,     //账号状态
        		firstB: (this.$store.state.leftTime >= 10) ? String(this.$store.state.leftTime).slice(0,1):'0',             //剩余时间
        		lastB: (this.$store.state.leftTime >= 10) ? String(this.$store.state.leftTime).slice(1):this.$store.state.leftTime,  //剩余时间
				showLinkAccount: false, //是否显示用户信息
				sysStatus: 2, // 2代表是关联账号
				linkAccount: [
					{
						name: 'test',
					},
					{
						name: 'test2test2test2test2test2',
					},
					{
						name: 'test3test3test3',
					},
					{
						name: 'test4test4',
					},
					{
						name: 'test5test5',
					},
				],
				windowWidth: 0, //widdow宽度
				headerData: { //获取导航
					"label": {
						"name": "舆情秘书"
					},
					"name": {
						"ishidden": "0"
					},
					"welcome": {
						"text": "欢迎来到舆情秘书",
						"ishidden": "0"
					},
					"pic": [
						{
							"id": "1",
							"ishidden": "0"
						},
						{
							"id": "2",
							"ishidden": "0"
						},
						{
							"id": "3",
							"ishidden": "0"
						},
						{
							"id": "4",
							"ishidden": "0"
						}
					],
					"qq": {
						"num": "2289318986"
					},
					logo: { //自定义logo
						"name": require("@/assets/images/home/classic/mslogo.png")
					},
					ico: { //自定义ico
						"name": require("@/assets/images/iooc.ico")
					},
				},
				navTotalData: [], //nav导航总数据
				navData: [], //nav导航数据
				moreData: [], //nav更多数据
				welcome: {},
				headIcon: [
					{
						"id": "1",
						"ishidden": "0"
					},
					{
						"id": "2",
						"ishidden": "0"
					},
					{
						"id": "3",
						"ishidden": "0"
					},
					{
						"id": "4",
						"ishidden": "0"
					}
				], //自定义icon
				QQ: { //自定义QQ
					"num": "2289318986"
				},
				logo: { //自定义logo
					"name": ''
				},
				ico: { //自定义ico
					"name": ICOIMG[store.state.kuTempLateType] ? ICOIMG[store.state.kuTempLateType] : require("@/assets/images/iooc.ico")
				},
				label: { //自定义title
					"name": "舆情秘书"
				},
				name: { //用户名字是否显示
					"ishidden": "0"
				},
				picData: [], //处理pic数据
				isTop: false, //自定义浮层是否需要吸顶
				options: [
					{
			          id: '5',
			          label: '关注专题'
			        },
					{
			          id: '1',
			          label: '推送预警'
			        }, {
			          id: '2',
			          label: '监测统计'
			        }, {
			          id: '3',
			          label: '站点头条'
			        }, {
			          id: '4',
			          label: '事件'
			        }
			    ],
				form: {
			        modeltitle: '关注专题',     //模块名称
			        modelretitle: '',   //模块别名
					topicTitle: '',     //专题列表
					ksid: '',           //专题列表中的专题id
					ksType: '',         //ksType 1：专题，2：分类  3 地域专题
				},
				err: {  //错误信息提示
					txt: '',
					isshow: false,
					txt2: '',
					isshow2: false,
					txt3: '',
					isshow3: false,
				},
				treeData: [],  //专题树的数据
				nodeData: {},  //点击树的节点对应的数据
			}
		},
		props: {
			funName : {
	            type: String,
	            default: ''
	        },
			showCompilemask : {
	            type: Boolean,
	            default: false
	        },
	        showHomepageCustom: {
	            type: Boolean,
	            default: false
	        },
		},
		components: {
			definedHeader,
            definedHeaderBlack,
            definedHeaderRed,
            definedHeaderIsentia,
			yqmsNav,
			timeTip,
			vDialog,
			newDialog,
			vTree,
			systemPassword,
            banner
		},
		methods: {
		    //系统设置跳转
			skipSetPag(){
				var isShowsysPwd = VueCookies.get('ISPWD');
				if(isShowsysPwd == '1'){
					//100%跳转系统设置
					window.location = this.$store.state.oldyqmsUrl + 'Set/special';
				}else{
					//验证跳转
					getIsSetXtPaw({userid:this.$store.state.ZHXGUSERID}).then(res=>{
						let datas = res.data.result;
						if(datas.data == '1'){
							this.showSysPwd = true;
						}else{
							window.location = this.$store.state.oldyqmsUrl + 'Set/special';
						}
					}).catch(err=>{
						console.log(err);
					});
				}
			},
			openKefu(url){
				window.open(url)
			},
			//恢复默认设置
			handleRestoreSet() {
				let _this = this;
				restoreHomePage({}).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						//埋点统计——首页自定义——恢复默认
						_this.$store.commit('maiDian','homepage_restore_default');
						alert('恢复默认设置成功！');
						_this.$parent.showCompilemask = false;
						_this.$parent.handleRestoreSetHome();
					}else{
						alert('恢复默认设置失败！');
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//触发生成首页
			handSaveHome() {
				this.$emit('triggerHomePage');
			},
			//更换网站favico
			handleFavico(ico) {
			    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
			    link.type = 'image/x-icon';
			    link.rel = 'shortcut icon';
			    if(ico && ico.name && ico.name.indexOf('base64') != -1) {
			    	link.href = ico.name;
			    }else{
			    	link.href = ico.name ? this.$store.state.imgUrlBase + ico.name : '/static/iooc.ico';
				}
			    document.getElementsByTagName('head')[0].appendChild(link);
			},
			//显示自定义头部弹框
			handleDefinedHeader() {
				this.isShowDefined = true;
			},
			//隐藏自定义头部弹框
			hanldeCloseDialog() {
				this.isShowDefined = false;
				//this.getNavsData();
			},
			//获取window的宽度
			getWindowSize() {
				if(this.$el) {
					this.windowWidth = this.$el.clientWidth;
					this.setNav();
				}
			},
			//导航显示
			setNav() {
				let _this = this;
				let navWidth = _this.windowWidth * 0.9;
				let logoWidth = 200;
				if(_this.$store.state.kuTempLateType == 1) {
					logoWidth = 0;
				}
				let liw = parseInt(114);
				let cWidth = parseInt(navWidth - logoWidth); //-liw-32
				let len = parseInt(cWidth / liw);
				_this.navData = [], _this.moreData = [];
				//总的导航数据条数
				let totalCount = _this.navTotalData.length;
				//真实显示的nav数据
				let realData = [];
				for(let j = 0; j < totalCount; j++) {
					if(_this.navTotalData[j].navstatus == '0' || typeof _this.navTotalData[j].navstatus == 'undefined' || _this.navTotalData[j].navstatus == null) {
						realData.push(_this.navTotalData[j]);
					}
				}
				//真实导航数据条数
				let realCount = realData.length;
				for(let i = 0; i < realCount; i++) {
					if(i < len) {
						_this.navData.push(realData[i]);
					} else {
						_this.moreData.push(realData[i]);
					}
				}
			},
			//获取导航数据
			getNavsData() {
				let _this = this;
				let params = {
					KD_ID: _this.$store.state.agentid
				};
				getNavData(params).then(function(res) {
					if(res.data.status == '0') {
						if(res.data.result.data[0] != '') {
							_this.headerData = Object.assign({}, res.data.result.data[0]);
							_this.welcome = _this.headerData.welcome || { "ishidden": '0',"text": '欢迎来到舆情秘书'};
							_this.headIcon = _this.headerData.pic || _this.headIcon;
							_this.QQ = _this.headerData.qq || _this.QQ;
							if(_this.headerData.logo && (_this.headerData.logo.name && _this.headerData.logo.name.toString().indexOf('upload') != -1)) {
								_this.logo = _this.headerData.logo;
							}else{
								if(_this.$store.state.kuTempLate == 'UnicomProject'){
									_this.logo.name = LOGOIMG[store.state.kuTempLate];
								}else if(_this.$store.state.kuTempLate == 'comold'){
									_this.logo.name = store.state.kuTempLateType ? LOGOIMG[store.state.kuTempLateType] : require("@/assets/images/home/classic/mslogo.png");
								}
							}
							if(_this.headerData.ico && (_this.headerData.ico.name && _this.headerData.ico.name.toString().indexOf('upload') != -1)) {
								_this.ico = _this.headerData.ico;
							}
							// _this.headerData.ico ? _this.handleFavico(_this.ico) : _this.handleFavico();
							_this.handleFavico(_this.ico);
							//_this.logo = _this.headerData.logo || _this.logo;
							//_this.ico = _this.headerData.ico || _this.ico;
							_this.label = _this.headerData.label || _this.label;
							_this.name = _this.headerData.name || _this.name;
							let eventIndex = '';
							let delIndex = '';
							//教育版导航排序开始
							let arr_nav_edu = ["首页","舆情监测","舆情浏览","推送预警","舆情预警","事件分析","统计分析","全网搜索","网参报告","网络情报","舆情报告","地域舆情","我的关注","社交监控","境外网站","电视监控","小视频"];
							if(_this.$store.state.kuTempLateType == 8){
								let aTemp = [];
								let aTopic = [];
								arr_nav_edu.map((item) => {
									let aFilterNav = _this.headerData.nav.filter((n) => {
										return n.name == item;
									})
									aFilterNav[0] && aTemp.push(aFilterNav[0]);
								})
								aTopic = _this.headerData.nav.filter((topic) => {
									return topic.type != 0;
								})
								//置顶专题排序
								let aTempTopic = [];
								aTopic.sort((a,b) => {
									return (a.navsort - b.navsort);
								})
								aTemp = aTemp.concat(aTopic);
								_this.headerData.nav = aTemp
								_this.headerData.nav.map((item) => {
									if(item.name == '舆情浏览') {
										item.name = '舆情监测';
									}
									if(item.name == '推送预警') {
										item.name = '舆情预警';
									}
									if(item.name == '网参报告') {
										item.name = '舆情报告';
										item['KU_RENAME'] = '舆情报告';
									}
								})
								//教育版导航排序结束
							}else{
								if(_this.$store.state.kuTempLateType == 7) {
									_this.headerData.nav.map(function(item, index) {
										if(item.name == "舆情浏览"){
											item.name = '舆情监测';
										}
										if(item.name == "推送预警"){
											item.name = '舆情预警';
										}
									})
								}
								_this.headerData.nav.map(function(item, index) {
									if(item.name == "事件分析" && item.moduleStatus){
										eventIndex = index;
									}
									if((item.name == "事件分析" || item.name == "话题挖掘" ) && !item.moduleStatus) {
									localStorage.setItem('noNavData',JSON.stringify(item));
									delIndex = index;
									}
								});
								if(eventIndex != ''){
									_this.headerData.nav[delIndex] = _this.headerData.nav[eventIndex];
									_this.headerData.nav.splice(eventIndex,1);
								}else{
									_this.headerData.nav.splice(delIndex,1);
								}
							}
							
							_this.navTotalData = _this.headerData.nav;

							_this.headerData.welcome = _this.welcome;
							_this.headerData.pic = _this.headIcon;
							_this.headerData.qq = _this.QQ;
							_this.headerData.logo = _this.logo;
							_this.headerData.ico = _this.ico;
							if(_this.$store.state.kuTempLateType == 6) {
								_this.label.name = '绿盟舆情监测服务';
							}
							_this.headerData.label = _this.label;
							_this.headerData.name = _this.name;
              				document.title = (_this.label.name=='') ? '舆情秘书':_this.label.name;
							//处理pic数据
							_this.picData = _this.headIcon;
							if(_this.$store.state.kuTempLateType == 8) {
								_this.picData = _this.picData.filter((item) => {
									return item.id != '1';
								})
							}else if(_this.$store.state.kuTempLate == 'UnicomProject'){
								_this.picData = _this.picData.filter((item) => {
									return item.id == 3;
								})
							}
							if((_this.$store.state.kuTempLateType == 0 || _this.$store.state.kuTempLateType == 1) && _this.$store.state.agentid > 0){
								_this.picData = _this.picData.filter((item) => {
									return item.id == 2 || item.id == 3;
								})
							}
							for(let j in _this.picData) {
								if(_this.picData[j].id == 1) {
									_this.picData[j].url = 'ProductLog/index';
									_this.picData[j].title = '产品日志';
								} else if(_this.picData[j].id == 2) {
									_this.picData[j].url = 'tencent://message/?uin=' + _this.QQ.num + '&Site=q-zone.qq.com&Menu=yes';
									_this.picData[j].title = '联系客服';
								} else if(_this.picData[j].id == 3) {
									_this.picData[j].url = 'Systemmess/index';
									_this.picData[j].title = '系统信息';
								} else if(_this.picData[j].id == 4) {
									_this.picData[j].url = 'HelpCentrol/index';
									_this.picData[j].title = '帮助';
								}
                            }
                            localStorage.setItem('picData', JSON.stringify(_this.picData));
							_this.getWindowSize();
						}
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//触发自定义头部弹框
			triggerDefinedHeader() {
				this.$emit('clickDefinedHeader');
			},
			//点击用户信息
			userSet() {
				this.showUserInfo = !this.showUserInfo;
			},
			//隐藏用户信息
			hideUserSet() {
				this.showUserInfo = false;
				this.showLinkAccount = false;
			},
			//显示用户信息
			showuserSet(num) {
				this.showUserInfo = true;
				if(num == 2) {
					this.showUserInfo = true;
					this.showLinkAccount = true;
				} else {
					this.showLinkAccount = false;
				}
			},
			//显示关联账号
			showLink() {
				this.showUserInfo = true;
				this.showLinkAccount = true;
			},
			//隐藏关联账号
			hideLink() {
				this.showUserInfo = false;
				this.showLinkAccount = false;
			},
			//显示用户自定义浮层
			showCompile(falg) {
				this.$parent.showCompilemask = true;
				let compile = this.$refs.compile;
				let templateType=  this.$store.state.kuTempLateType; // 0 经典 1 黑白
				if(this.showBanner){
					if(templateType == 0 || templateType == 7 || templateType == 5){
						compile.className = 'compile_tit_box scroll_totop_banner';
					}else if(templateType == 1){
						compile.className = 'compile_tit_box compile_tit_box_black scroll_totop_banner_black';
					}else if(templateType == 4){
  						compile.className = 'compile_tit_box compile_tit_box_isentia scroll_totop_banner_isentia';
  					}else if(templateType == 8){
						compile.className = 'compile_tit_box compile_tit_box_edu scroll_totop_banner_edu';
					}
				}else{
					if(templateType == 0 || templateType == 7 || templateType == 5){
						compile.className = 'compile_tit_box';
					}else if(templateType == 1){
						compile.className = 'compile_tit_box compile_tit_box_black';
					}else if(templateType == 8){
						compile.className = 'compile_tit_box compile_tit_box_edu';
					}
				}
				//埋点统计——首页自定义
				this.$store.commit('maiDian','homepage_custom');
			},
			//点击自定义时，监听滚动
			handleScroll(){
				let _this = this;
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  				let compile = _this.$refs.compile;
  				let compileBlack = _this.$refs.compileBlack;
  				let flag = _this.$parent.showCompilemask;
  				let flagBlack = _this.$parent.showCompilemask;
  				let templateType=  _this.$store.state.kuTempLateType; // 0 经典 1 黑白
  				if(flag || flagBlack){
  					if(scrollTop > 0){
  						_this.isTop = true;
  						if(_this.showBanner){
  							if(templateType == 0  || templateType == 7 || templateType == 5){
  								compile.className = 'compile_tit_box scroll_totop_banner scroll_totop';
  							}else if(templateType == 1){
  								compile.className = 'compile_tit_box compile_tit_box_black scroll_totop_banner_black scroll_totop';
  							}else if(templateType == 4){
  								compile.className = 'compile_tit_box compile_tit_box_isentia scroll_totop_banner_isentia scroll_totop';
  							}else if(templateType == 8){
								compile.className = 'compile_tit_box compile_tit_box_edu scroll_totop_banner_edu scroll_totop';
							}
  						}else{
  							if(templateType == 0  || templateType == 7 || templateType == 5){
  								compile.className = 'compile_tit_box scroll_totop';
  							}else if(templateType == 1){
  								compile.className = 'compile_tit_box compile_tit_box_black scroll_totop';
  							}else if(templateType == 4){
  								compile.className = 'compile_tit_box compile_tit_box_isentia scroll_totop';
  							}else if(templateType == 8){
								compile.className = 'compile_tit_box compile_tit_box_edu scroll_totop';
							}
  						}
	  				}else{
	  					_this.isTop = false;
	  					if(_this.showBanner){
  							if(templateType == 0 || templateType == 7 || templateType == 5){
  								compile.className = 'compile_tit_box scroll_totop_banner';
  							}else if(templateType == 1){
  								compile.className = 'compile_tit_box compile_tit_box_black scroll_totop_banner_black';
  							}else if(templateType == 4){
  								compile.className = 'compile_tit_box compile_tit_box_isentia scroll_totop_banner_isentia';
  							}else if(templateType == 8){
								compile.className = 'compile_tit_box compile_tit_box_edu scroll_totop_banner_edu';
							}
  						}else{
  							if(templateType == 0  || templateType == 7 || templateType == 5){
  								compile.className = 'compile_tit_box';
  							}else if(templateType == 1){
  								compile.className = 'compile_tit_box compile_tit_box_black';
  							}else if(templateType == 4){
  								compile.className = 'compile_tit_box compile_tit_box_isentia';
  							}else if(templateType == 8){
								compile.className = 'compile_tit_box compile_tit_box_edu';
							}
  						}
	  				}
  				}
			},
			//关闭弹窗
			handleCloseMask() {
				// 关闭取消设置弹窗
				this.showSetDialog = false;
				// 关闭取消设置成功弹窗
				this.showSetSuccessDialog = false;
				// 关闭添加模块弹窗
				this.showAddDialog = false;
			},
			//取消设置
			cancleSet(){
				this.showSetDialog = true;
			},
			//设置 —— 确定
			setConfirm() {
				this.showSetDialog = false;
				this.showSetSuccessDialog = true;
				// 关闭自定义浮层
				this.$parent.showCompilemask = false;
				// 刷新页面
				window.location.reload();
			},
			//设置 —— 取消
			setCancel() {
				this.showSetDialog = false;
			},
			//添加模块
			addModel(){
				let _this = this;
				this.showAddDialog = true;
				//错误提示信息不显示
				this.err.isshow = false;
				this.err.isshow2 = false;
				this.err.isshow3 = false;
				_this.form.modeltitle = '关注专题';
				//清空之前的值
				this.form.modelretitle = '';
				this.form.topicTitle = '';
				//首次进入默认是关注专题，需要显示专题树
				_this.changeSelect();
			},
			//添加模块 —— 保存
			addConfirm(){
				let _this = this;
				//已有模块的名字
				let areaArr = JSON.parse(localStorage.getItem('areaArr'));
				//添加关注专题，最多6个，整个首页最多6个专题
				let topicArr = []; //筛选出已有专题的个数
				for(let n in areaArr){
					if(areaArr[n].component == 'topicList'){
						topicArr.push(areaArr[n]);
					}
				}

				let totalTitle = [];       //摘出来已有模块的名字(除了专题)
				let totalRetitle = [];     //摘出来已有模块的别名(除了专题)
				let totalIds = '';         //摘出来已有专题的id
				let totalTopicTitle = [];  //摘出来已有专题模块的名字
				let totalTopicRetitle = [];//摘出来已有专题模块的别名
				for(let i in areaArr){
					// let tit = areaArr[i].retitle == '' ? areaArr[i].title : areaArr[i].retitle;
					if(areaArr[i].api == 'YqllIframe!getHomePageSubjectList.do'){
						totalIds += areaArr[i].params.ksId +',';
						totalTopicTitle.push(areaArr[i].title);
						if(areaArr[i].retitle != ''){
							totalTopicRetitle.push(areaArr[i].retitle);
						}
					}else{
						totalTitle.push(areaArr[i].title);
						// 过滤空的别名，为了后面的验证可以为空
						if(areaArr[i].retitle != ''){
							totalRetitle.push(areaArr[i].retitle);	
						}
					}
				}
				//去掉最后的 ,
				totalIds = totalIds.slice(0,totalIds.length-1);
				//模块名  1 ： 推送预警 ， 2 ： 监测统计 ， 3 ： 站点头条 ， 4 ： 事件 ， 5 ： 关注专题
				let modeltitle = _this.form.modeltitle;      //模块名称
				let modelretitle = _this.form.modelretitle;  //模块别名
				let topicTitle = _this.form.topicTitle;      //专题列表
				let reg = /\s/g; //验证是否含有空格
				//可选择的固定模块的名字
			    let selectName = ['关注专题','推送预警','监测统计','站点头条','事件'];
				//针对除了专题的模块，验证别名不能和 其他模块名、其他模块名的别名、固定模块 重名
				totalRetitle = totalTitle.concat(totalRetitle).concat(selectName);
				//针对专题的模块， 验证别名不能和 已有专题的名字、已有专题的别名、 选择的专题的名字 重名
				totalTopicRetitle = totalTopicTitle.concat(totalTopicRetitle);
				let tag = true; //标识

				if(modeltitle != '关注专题'){
					if(totalTitle.indexOf(modeltitle) !== -1){
						_this.err.txt3 = '该模块已存在！';
						_this.err.isshow3 = true;
						return false;
					}else {
						if(reg.test(modelretitle)){
							_this.err.txt = '不能有空格';
							_this.err.isshow = true;
							return false;
						}else if(modelretitle.length > 6){
							_this.err.txt = '名称不得超过6个字';
							_this.err.isshow = true;
							return false;
						}else if(modelretitle != ''){
							for(let i in totalRetitle){
								let name = totalRetitle[i];
								if(name == modelretitle){
									//验证别名不能和 其他模块名、其他模块名的别名、固定模块 重名
									_this.err.txt = '别名与其他模块名字或者模块别名重复，请重新输入！';
									_this.err.isshow = true;
									tag = false;
									return false;
								}
							}
							if(tag){
								_this.err.isshow = false;
								_this.err.isshow3 = false;
								let componentName = '';
								let apiName = '';
								if(modeltitle == '推送预警'){
									componentName = 'pushWarning';
									apiName = 'customHomePage/waringList';
								}else if(modeltitle == '监测统计'){
									componentName = 'monitorEchart';
									apiName = 'customHomePage/getSourceTypeCount';
								}else if(modeltitle == '站点头条'){
									componentName = 'siteHeadlines';
									apiName = 'customHomePage/getHeadLinesList';
								}else if(modeltitle == '事件'){
									componentName = 'events';
									apiName = 'customHomePage/selectRecommendEventAnalysisList';
								}

								//首页模块新增模块
								areaArr.push({
									component: componentName,
									title: modeltitle,
									retitle: modelretitle,
									api: apiName,
									params: '',
								});

								//针对 areaArr 的值去重
								let newArr = [];
								let obj = {};
								for(let i = 0; i < areaArr.length; i++) {
									if(!obj[areaArr[i].title]) {
										newArr.push(areaArr[i]);
										obj[areaArr[i].title] = true;
									}
								}
								areaArr = newArr;
								localStorage.setItem('areaArr', JSON.stringify(areaArr));
								this.$emit('addModelHome',areaArr);
							}
						}else{
							_this.err.isshow = false;
							_this.err.isshow3 = false;
							let componentName = '';
							let apiName = '';
							if(modeltitle == '推送预警'){
								componentName = 'pushWarning';
								apiName = 'customHomePage/waringList';
							}else if(modeltitle == '监测统计'){
								componentName = 'monitorEchart';
								apiName = 'customHomePage/getSourceTypeCount';
							}else if(modeltitle == '站点头条'){
								componentName = 'siteHeadlines';
								apiName = 'customHomePage/getHeadLinesList';
							}else if(modeltitle == '事件'){
								componentName = 'events';
								apiName = 'customHomePage/selectRecommendEventAnalysisList';
							}

							//首页模块新增模块
							areaArr.push({
								component: componentName,
								title: modeltitle,
								retitle: modelretitle,
								api: apiName,
								params: '',
							});

							//针对 areaArr 的值去重
							let newArr = [];
							let obj = {};
							for(let i = 0; i < areaArr.length; i++) {
								if(!obj[areaArr[i].title]) {
									newArr.push(areaArr[i]);
									obj[areaArr[i].title] = true;
								}
							}
							areaArr = newArr;
							localStorage.setItem('areaArr', JSON.stringify(areaArr));
							this.$emit('addModelHome',areaArr);
						}
					}
				}else{
					if(topicTitle == ''){
						_this.err.txt2 = '请选择关注的专题！';
						_this.err.isshow2 = true;
						return false;
					}else{
						if(totalIds.indexOf(_this.form.ksid) !== -1){
							let tips = '';
							for(let i in areaArr){
								if(areaArr[i].params.ksId ==  _this.nodeData.id){
									tips = areaArr[i].retitle;
								}
							}

							if(tips != ''){
								_this.err.txt2 = '该专题已经存在（别名：'+ tips +'），请更换其他专题！';
							}else{
								_this.err.txt2 = '该专题已经存在，请更换其他专题！';
							}
							_this.err.isshow2 = true;
							return false;
						}else{
							if(reg.test(modelretitle)){
								_this.err.txt = '不能有空格';
								_this.err.isshow = true;
								return false;
							}else if(modelretitle.length > 6){
								_this.err.txt = '名称不得超过6个字';
								_this.err.isshow = true;
								return false;
							}else if(modelretitle != ''){
								if(modeltitle == modelretitle){
									_this.err.txt = '该专题别名与模块名重复，请重新输入！';
									_this.err.isshow = true;
									return false;
								}else if(topicTitle == modelretitle){
									_this.err.txt = '该专题别名与专题列表名重复，请更换其他别名！';
									_this.err.isshow = true;
									return false;
								}else{
									for(let i in totalTopicRetitle){
										let name = totalTopicRetitle[i];
										if(name == modelretitle){
											_this.err.txt = '该专题别名与其他专题名字或者别名重复，请更换其他别名！';
											_this.err.isshow = true;
											tag = false;
											return false;
										}
									}
									if(tag){
										_this.err.isshow = false;
										_this.err.isshow2 = false;
										_this.err.isshow3 = false;
										//保存时的title
										let newtitle = modeltitle == '关注专题' ? _this.nodeData.name : modeltitle;
										//添加关注专题，最多6个，整个首页最多6个专题
										if(topicArr.length <= 5){
											//首页模块新增专题
											areaArr.push({
												component: 'topicList',
												title: newtitle,
												retitle: modelretitle,
												api: 'YqllIframe!getHomePageSubjectList.do',
												params: {
													ksId: _this.nodeData.id,
													ksType: _this.nodeData.kstype
												},
											});
											localStorage.setItem('areaArr', JSON.stringify(areaArr));
											this.$emit('addModelHome',areaArr);
										}else{
											alert('首页最多展示6个专题');
											return false;
										}
									}
								}
							}else{
								_this.err.isshow = false;
								_this.err.isshow2 = false;
								_this.err.isshow3 = false;
								//保存时的title
								let newtitle = modeltitle == '关注专题' ? _this.nodeData.name : modeltitle;
								//添加关注专题，最多6个，整个首页最多6个专题
								if(topicArr.length <= 5){
									//首页模块新增专题
									areaArr.push({
										component: 'topicList',
										title: newtitle,
										retitle: modelretitle,
										api: 'YqllIframe!getHomePageSubjectList.do',
										params: {
											ksId: _this.nodeData.id,
											ksType: _this.nodeData.kstype
										},
									});
									localStorage.setItem('areaArr', JSON.stringify(areaArr));
									this.$emit('addModelHome',areaArr);
								}else{
									alert('首页最多展示6个专题');
									return false;
								}
							}
						}
					}
				}
			},
			//添加模块 —— 取消
			addCancel(){
				this.showAddDialog = false;
			},
			//获取专题树
			getSubjectTreeData() {
				let _this = this;
				getSubjectTree({type: 2}).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						_this.treeData = res.data.result.data.subjectTree;
					}else{
						alert('获取数据失败！');
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//模块名称改变时
			changeSelect(){
				let _this = this;
				let title = _this.form.modeltitle;
				_this.err.isshow3 = false;
				_this.err.isshow = false;
				//清空之前的值
				this.form.modelretitle = '';
				this.form.topicTitle = '';
				if(title == '关注专题'){
					//查询专题树
					if(_this.treeData.length > 0) {
						// 什么都不做
						// _this.treeData = JSON.parse(_this.treeData);
						// localStorage.setItem('treeData', JSON.stringify(_this.treeData));
					}else{
						_this.getSubjectTreeData();
					}
				}
			},
			//点击树
			clickTree(data){
				// 获取点击的专题树节点的名字
				this.form.topicTitle = data.name; //专题的名字
				this.form.ksid = data.id; //专题的id
				this.form.ksType = data.kstype; //ksType 1：专题，2：分类  3 地域专题
				//点击树的节点对应的数据
				this.nodeData = data;
				// 把对应的错误提示信息关掉
				this.err.isshow = false;
				this.err.isshow2 = false;
				this.err.isshow3 = false;
			}
		},
		created() {
			window.addEventListener('resize', this.getWindowSize);
			this.getWindowSize();
		},
		mounted() {
			let _this = this;
      		//获取导航数据
			this.getNavsData();
			//点击自定义时，监听滚动
			window.addEventListener('scroll', this.handleScroll);

			if(this.$store.state.kuTempLate == 'UnicomProject'){
				if(this.firstB == '0') {
					this.firstB = '';
				}		
				if(this.$store.state.kuTempLateType == 0) {
					this.yqmsHeadBox = 'yqms_head_box_unicom',
					this.timeoutFlag = true;
					this.yqmsPubliceCon = 'yqms_publice_con_unicom'
				}
			}else if(this.$store.state.kuTempLate == 'comold'){
				if(this.$store.state.kuTempLateType == 6) {
					this.timeoutFlag = true;
				}
			}
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.getWindowSize);
		},
		destroyed() {
			window.addEventListener('resize', this.setNav());
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./header.css");
</style>

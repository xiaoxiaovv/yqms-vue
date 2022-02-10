<template>
	<div class="yqms_navbar_box border_box" :class="yqmsNavBarBox">
		<!--蓝白-->
		<div class="flex" v-if="$store.state.kuTempLateType == 0 && $store.state.kuTempLate == 'comold'">
			<div class="yqms_logo_box flex_verticle" v-if="$store.state.kuUserStatus != '1'">
				<img class="yqms_logo_img" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
			</div>
	        <div class="yqms_logo_box flex_verticle" v-else>
	        	<!-- <img v-if="logo.name" src="../../assets/images/home/classic/trialLogo.png" /> -->
	        	<img class="yqms_logo_img" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
	        	<!-- 试用标识 -->
	        	<img v-if="!($store.state.agentid > 0)" class="trial_version_icon" src="../../assets/images/home/classic/trial_version_icon.png" />
	      	</div>
			<div class="yqms_nav_box flex_1">
				<ul class="nav" ref="nav">
					<!-- subClass: 1 :正常链接 2：专题链接 3：分类链接 -->
					<li v-for="(nav,i) in navData" v-if="navData.length > 0">
						<a class="border_box" href="/" :class="{hover: nav.name == funName}" v-if="nav.KB_CLASS == 'Index'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.newyqmsUrl + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.isVue == '1'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}} <i></i></a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS != 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<!-- 如果是全网搜，域名变了 -->
						<a class="border_box" :href="$store.state.searchUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS == 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '3'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '2'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
					</li>
				</ul>
				<div class="addnav_wrap" @mouseleave.prevent="hideMore" @mouseenter.prevent="showMore" v-show="moreData.length > 0">
					<span class="beacon">更多</span>
					<div class="navmore_wrap" v-show="showMoreList">
						<ul>
							<li v-for="(m,n) in moreData">
								<a class="border_box" href="/" :class="{hover: m.name == funName}" v-if="m.KB_CLASS == 'Index'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
                                <a class="border_box" :href="$store.state.newyqmsUrl + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.isVue == '1'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}} <i></i></a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS != 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<!-- 如果是全网搜，域名变了 -->
								<a class="border_box" :href="$store.state.searchUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS == 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '3'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '2'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!--黑色-->
		<div class="flex" v-if="$store.state.kuTempLateType == 1 && $store.state.kuTempLate == 'comold'">
			<!--<div class="yqms_logo_box item_vertical">
				<img v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
			</div>-->
			<div class="yqms_nav_box flex_1">
				<ul class="nav nav_black" ref="nav">
					<!-- subClass: 1 :正常链接 2：专题链接 3：分类链接  -->
					<li v-for="(nav,i) in navData" v-if="navData.length > 0">
						<a class="border_box" href="/" :class="{hover: nav.name == funName}" v-if="nav.KB_CLASS == 'Index'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.newyqmsUrl + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.isVue == '1'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}} <i></i></a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS != 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<!-- 如果是全网搜，域名变了 -->
						<a class="border_box" :href="$store.state.searchUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS == 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '3'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '2'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
					</li>
				</ul>
				<div class="addnav_wrap addnavblack_wrap" @mouseleave.prevent="hideMore" @mouseenter.prevent="showMore" v-show="moreData.length > 0">
					<span class="beacon">更多</span>
					<div class="navmore_wrap navmoreblack_wrap" v-show="showMoreList">
						<ul>
							<li v-for="(m,n) in moreData">
								<a class="border_box" href="/" :class="{hover: m.name == funName}" v-if="m.KB_CLASS == 'Index'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
                                <a class="border_box" :href="$store.state.newyqmsUrl + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.isVue == '1'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}} <i></i></a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS != 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<!-- 如果是全网搜，域名变了 -->
								<a class="border_box" :href="$store.state.searchUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS == 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '3'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '2'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
        <!--红色移动云-->
		<div class="flex" v-if="$store.state.kuTempLateType == 7 && $store.state.kuTempLate == 'comold'">
			<div class="yqms_nav_box yqms_nav_box_red flex_1 mar-l-95">
				<ul class="nav" ref="nav"  v-if="navData.length > 0">
					<!-- subClass: 1 :正常链接 2：专题链接 3：分类链接 -->
					<li class="nav_li_red flex" v-for="(nav,i) in navData" :key="i">
						<a class="border_box nav_red" href="/" :class="{hover: nav.name == funName}" v-if="nav.KB_CLASS == 'Index'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box nav_red" :href="$store.state.newyqmsUrl + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.isVue == '1'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}} <i></i></a>
						<a class="border_box nav_red" :href="$store.state.oldyqmsUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS != 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<!-- 如果是全网搜，域名变了 -->
						<a class="border_box nav_red" :href="$store.state.searchUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS == 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box nav_red" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '3'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box nav_red" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '2'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
                        <span :class="i == navData.length - 1 ? 'hide' : ''">/</span>
					</li>
				</ul>
				<div class="addnav_wrap" @mouseleave.prevent="hideMore" @mouseenter.prevent="showMore" v-show="moreData.length > 0">
					<span class="beacon">更多</span>
					<div class="navmore_wrap" v-show="showMoreList">
						<ul>
							<li v-for="(m,n) in moreData" :key="n">
								<a class="border_box" href="/" :class="{hover: m.name == funName}" v-if="m.KB_CLASS == 'Index'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
                                <a class="border_box" :href="$store.state.newyqmsUrl + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.isVue == '1'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}} <i></i></a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS != 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<!-- 如果是全网搜，域名变了 -->
								<a class="border_box" :href="$store.state.searchUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS == 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '3'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '2'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!--教育版-->
		<div class="flex yqms_nav_edu" v-if="$store.state.kuTempLateType == 8 && $store.state.kuTempLate == 'comold'">
			<div class="yqms_nav_box yqms_nav_box_edu flex_1">
				<ul class="nav" ref="nav"  v-if="navData.length > 0">
					<!-- subClass: 1 :正常链接 2：专题链接 3：分类链接 -->
					<li class="nav_li_edu flex" v-for="(nav,i) in navData" :key="i">
						<a class="border_box nav_edu" href="/" :class="{hover: nav.name == funName}" v-if="nav.KB_CLASS == 'Index'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box nav_edu" :href="$store.state.oldyqmsUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS != 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<!-- 如果是全网搜，域名变了 -->
						<a class="border_box nav_edu" :href="$store.state.searchUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS == 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box nav_edu" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '3'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box nav_edu" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '2'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
                        <!-- <span :class="i == navData.length - 1 ? 'hide' : ''">/</span> -->
					</li>
				</ul>
				<div class="addnav_wrap" @mouseleave.prevent="hideMore" @mouseenter.prevent="showMore" v-show="moreData.length > 0">
					<span class="beacon">更多</span>
					<div class="navmore_wrap navmore_wrap_edu" v-show="showMoreList">
						<ul>
							<li v-for="(m,n) in moreData" :key="n">
								<a class="border_box" href="/" :class="{hover: m.name == funName}" v-if="m.KB_CLASS == 'Index'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
                                <a class="border_box" :href="$store.state.newyqmsUrl + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.isVue == '1'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}} <i></i></a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS != 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<!-- 如果是全网搜，域名变了 -->
								<a class="border_box" :href="$store.state.searchUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS == 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '3'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '2'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!--慕亚-->
		<div class="flex" v-if="$store.state.kuTempLateType == 4 && $store.state.kuTempLate == 'comold'">
			<div class="yqms_nav_box yqms_nav_box_isentia flex_1">
				<ul class="nav" ref="nav"  v-if="navData.length > 0">
					<!-- subClass: 1 :正常链接 2：专题链接 3：分类链接 -->
					<li class="flex" v-for="(nav,i) in navData" :key="i">
						<a class="border_box" href="/" :class="{hover: nav.name == funName}" v-if="nav.KB_CLASS == 'Index'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS != 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<!-- 如果是全网搜，域名变了 -->
						<a class="border_box" :href="$store.state.searchUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS == 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '3'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '2'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
					</li>
				</ul>
				<div class="addnav_wrap" @mouseleave.prevent="hideMore" @mouseenter.prevent="showMore" v-show="moreData.length > 0">
					<span class="beacon">更多</span>
					<div class="navmore_wrap_isentia" v-show="showMoreList">
						<ul>
							<li v-for="(m,n) in moreData" :key="n">
								<a class="border_box" href="/" :class="{hover: m.name == funName}" v-if="m.KB_CLASS == 'Index'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
                                <a class="border_box" :href="$store.state.newyqmsUrl + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.isVue == '1'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}} <i></i></a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS != 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<!-- 如果是全网搜，域名变了 -->
								<a class="border_box" :href="$store.state.searchUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS == 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '3'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '2'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!--绿盟云-->
		<div class="flex yqms_nav_green" v-if="$store.state.kuTempLateType == 6 && $store.state.kuTempLate == 'comold'">
			<div class="yqms_nav_box yqms_nav_box_green flex_1">
				<ul class="nav" ref="nav"  v-if="navData.length > 0">
					<!-- subClass: 1 :正常链接 2：专题链接 3：分类链接 -->
					<li class="nav_li_edu flex" v-for="(nav,i) in navData" :key="i">
						<a class="border_box nav_green" href="/" :class="{hover: nav.name == funName}" v-if="nav.KB_CLASS == 'Index'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box nav_green" :href="$store.state.oldyqmsUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS != 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<!-- 如果是全网搜，域名变了 -->
						<a class="border_box nav_green" :href="$store.state.searchUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS == 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box nav_green" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '3'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box nav_green" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '2'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
                        <!-- <span :class="i == navData.length - 1 ? 'hide' : ''">/</span> -->
					</li>
				</ul>
				<div class="addnav_wrap addnav_wrap_green" @mouseleave.prevent="hideMore" @mouseenter.prevent="showMore" v-show="moreData.length > 0">
					<span class="beacon">更多</span>
					<div class="navmore_wrap navmore_wrap_green" v-show="showMoreList">
						<ul>
							<li v-for="(m,n) in moreData" :key="n">
								<a class="border_box" href="/" :class="{hover: m.name == funName}" v-if="m.KB_CLASS == 'Index'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS != 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<!-- 如果是全网搜，域名变了 -->
								<a class="border_box" :href="$store.state.searchUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS == 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '3'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '2'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!--数言舆情-->
		<div class="flex yqms_nav_unicom" v-if="$store.state.kuTempLate == 'UnicomProject'">
			<div class="yqms_logo_box yqms_logo_box_unicom flex_verticle inline-b fl">
				<img class="yqms_logo_img yqms_logo_img_unicom" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
			</div>
			<div class="yqms_nav_box yqms_nav_box_unicom flex_1">
				<ul class="nav" ref="nav">
					<li>
						<a :href="$store.state.oldyqmsUrl + '/Index/index'" class="hover">首页</a>
					</li>
					<li>
						<a :href="$store.state.oldyqmsUrl + '/Browse/index'">舆情监测</a>
						<ul>
							<li>
								<a :href="$store.state.oldyqmsUrl + '/Browse/index'">我的专题</a>
							</li>
							<li>
								<a :href="$store.state.oldyqmsUrl + '/Publicsub/index'">公共专题</a>
							</li>
							<li>
								<a :href="$store.state.oldyqmsUrl + '/EventAnalysis/index'">话题挖掘</a>
							</li>
							<li>
								<a :href="$store.state.oldyqmsUrl + '/Territory/Territory'">地域监测</a>
							</li>
						</ul>
					</li>
					<li>
						<a :href="$store.state.oldyqmsUrl + '/Census/census'">统计分析</a>
					</li>
					<li>
						<a :href="$store.state.oldyqmsUrl + '/Pushwarning/index'">推送预警</a>
					</li>
					<li>
						<a :href="$store.state.oldyqmsUrl + '/Briefing/briefing'">舆情报告</a>
						<ul>
							<li>
								<a :href="$store.state.oldyqmsUrl + '/Briefing/briefing'">舆情简报</a>
							</li>
							<li>
								<a :href="$store.state.oldyqmsUrl + '/Briefing/getMoreReport'">舆情日报</a>
							</li>
							<!--<li>-->
								<!--<a :href="$store.state.oldyqmsUrl + '/Briefing/consult'">系统月报</a>-->
							<!--</li>-->
							<li>
								<a :href="$store.state.oldyqmsUrl + '/Briefing/UploadReport'">上传报告</a>
							</li>
						</ul>
					</li>
					<li>
						<a :href="$store.state.oldyqmsUrl + '/Attention/attention'">我的关注</a>
					</li>
				</ul>
			</div>
		</div>
		<!--一点资讯-->
		<div class="flex" v-if="$store.state.kuTempLateType == 5 && $store.state.kuTempLate == 'comold'">
			<div class="yqms_logo_box flex_verticle">
				<img class="yqms_logo_img" v-if="logo.name" :src="logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + logo.name : logo.name" />
			</div>
			<div class="yqms_nav_box flex_1">
				<ul class="nav" ref="nav">
					<!-- subClass: 1 :正常链接 2：专题链接 3：分类链接 -->
					<li v-for="(nav,i) in navData" v-if="navData.length > 0">
						<a class="border_box" href="/" :class="{hover: nav.name == funName}" v-if="nav.KB_CLASS == 'Index'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.newyqmsUrl + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.isVue == '1'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}} <i></i></a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS != 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<!-- 如果是全网搜，域名变了 -->
						<a class="border_box" :href="$store.state.searchUrl + nav.KB_CLASS+'/' + nav.KB_METHOD" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '1' && nav.KB_CLASS == 'Netsearch'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '3'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
						<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + nav.id +'/subClass/'+ nav.subClass +'/kktype/' +nav.kk_type" :class="{hover: nav.name == funName}" v-else-if="nav.subClass == '2'">{{nav.KU_RENAME ? nav.KU_RENAME.substring(0,4) : nav.name.substring(0,4)}}</a>
					</li>
				</ul>
				<div class="addnav_wrap" @mouseleave.prevent="hideMore" @mouseenter.prevent="showMore" v-show="moreData.length > 0">
					<span class="beacon">更多</span>
					<div class="navmore_wrap" v-show="showMoreList">
						<ul>
							<li v-for="(m,n) in moreData">
								<a class="border_box" href="/" :class="{hover: m.name == funName}" v-if="m.KB_CLASS == 'Index'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS != 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<!-- 如果是全网搜，域名变了 -->
								<a class="border_box" :href="$store.state.searchUrl + m.KB_CLASS+'/' + m.KB_METHOD" :class="{hover: m.name == funName}" v-else-if="m.subClass == '1' && m.KB_CLASS == 'Netsearch'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/classid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '3'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
								<a class="border_box" :href="$store.state.oldyqmsUrl + 'Browse/browseClass/sid/' + m.id +'/subClass/'+ m.subClass +'/kktype/' +m.kk_type" :class="{hover: m.name == funName}" v-else-if="m.subClass == '2'">{{m.KU_RENAME ? m.KU_RENAME.substring(0,4) : m.name.substring(0,4)}}</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import store from '@/store'
	let self = this;
	export default {
		name: '',
		data() {
			return {
				showMoreList: false, //是否显示更多下拉菜单
				yqmsNavBarBox: ''
			}
		},
		props: {
			funName: '',
			navData: {
				type: Array,
				default: () => []
			},
			moreData: {
				type: Array,
				default: () => []
			},
			logo: {}
		},
		mounted(){
			if(this.$store.state.kuTempLate == 'comold'){
				if(this.$store.state.kuTempLateType == 7) {
					this.yqmsNavBarBox = 'yqms_navbar_box_red'
				}else if (this.$store.state.kuTempLateType == 4) {
					this.yqmsNavBarBox = 'yqms_navbar_box_isentia'
				}else if(this.$store.state.kuTempLateType == 8){
					this.yqmsNavBarBox = 'yqms_navbar_box_edu'
				}else if(this.$store.state.kuTempLateType == 6){
					this.yqmsNavBarBox = 'yqms_navbar_box_green'
				}
			}else if(this.$store.state.kuTempLate == 'UnicomProject'){
				if(this.$store.state.kuTempLateType == 0) {
					this.yqmsNavBarBox = 'yqms_navbar_box_unicom'
				}
			}

			
		},
		methods: {
			showMore() {
				this.showMoreList = true;
			},
			hideMore() {
				this.showMoreList = false;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./nav.css");
</style>

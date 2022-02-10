<template>
	<div>
		<div class="dialog_center">
			<!--导航开始-->
			<div class="top_bar flex">
				<div class="ico">
					<img v-if="headerDataTemp.ico.name" :src="headerDataTemp.ico.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + headerDataTemp.ico.name : headerDataTemp.ico.name" />
					<span class="edit_primary"></span>
					<input @change="handleIcoUpload" class="upload_icon" ref="inpFileIco" type="file" accept="image/x-icon" value="" />
				</div>
				<input ref="labelName" class="ellipsis" type="text" v-model="headerDataTemp.label.name" @blur="handleBlurLabelName" />
			</div>
			<!--导航结束-->
			<!--12-->
			<div class="flex top_info">
				<div class="logo_box">
					<img v-if="headerDataTemp.logo.name" :src="headerDataTemp.logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + headerDataTemp.logo.name : headerDataTemp.logo.name"/>
					<span class="edit_logo"></span>
					<input @change="handleLogoUpload" class="upload_logo" ref="inpFileLogo" type="file" accept="image/jpeg,image/png,image/jpg,image/gif" value="" />
				</div>
				<div class="flex flex_1">
					<!--<div v-show="headerDataTemp.name" class="username_box" @mouseleave.prevent="handleMouseLeavePic($event)" @mouseenter.prevent="handleMouseEnterPic($event)">
						<div class="icon_cover" :class="headerDataTemp.name.ishidden == '0' ? 'hide': ''"></div>
						<div class="icon_eye hide" @click="hanldePicShowHide($event, 'username')" :class="headerDataTemp.name.ishidden == '0' ? 'icon_eye_close': 'icon_eye_open'"></div>
						<div>
							</span>{{$store.state.username}}<span>，</span>
						</div>
					</div>
					<div class="welcome_box" v-show="headerDataTemp.welcome" @mouseleave.prevent="handleMouseLeavePic($event)" @mouseenter.prevent="handleMouseEnterPic($event)">
						<div class="icon_cover" :class="headerDataTemp.welcome.ishidden == '0' ? 'hide': ''"></div>
						<div class="icon_eye hide" @click="hanldePicShowHide($event, 'welcome')" :class="headerDataTemp.welcome.ishidden == '0' ? 'icon_eye_close': 'icon_eye_open'"></div>
						<input v-model="headerDataTemp.welcome.text" @blur="handleBlurWelcomText"></input>
					</div>-->
				</div>
				<div class="flex">
					<draggable class="flex draggable_pic" v-model="headerDataTemp.pic" :options="{group:'pic'}" @start="drag=true" @end="drag=false">
						<div class="pic_item" v-for="(item, index) of headerDataTemp.pic" :key="Math.random()" :title="picTitle[item.id]" @mouseleave.prevent="handleMouseLeavePic($event)" @mouseenter.prevent="handleMouseEnterPic($event)">
							<div class="icon_cover icon_cover_data" :class="item.ishidden == '0' ? 'hide': ''"></div>
							<div class="icon_eye hide" :class="item.ishidden == '0' ? 'icon_eye_close': 'icon_eye_open'" @click="hanldePicShowHide($event)"></div>
							<div class="icon_bg" :class="'icon'+item.id"></div>
							<div class="icon_title">{{picTitle[item.id]}}</div>
						</div>
					</draggable>
					<div class="user_box">
						<span class="avater"></span>
						<p>{{$store.state.username}}</p>
						<span class="triangle"></span>
					</div>
				</div>
			</div>
			<!--12-->
			<!--拖拽部分开始-->
			<div class="defined_nav_box">
				<div class="defined_top_box">
					<!--<div class="logo_box">
						<img v-if="headerDataTemp.logo.name" :src="headerDataTemp.logo.name.indexOf('upload') != -1 ? $store.state.imgUrlBase + headerDataTemp.logo.name : headerDataTemp.logo.name"/>
						<span class="edit_logo"></span>
						<input @change="handleLogoUpload" class="upload_logo" ref="inpFileLogo" type="file" accept="image/jpeg,image/png,image/jpg,image/gif" value="" />
					</div>
-->					<div class="nav_box" ref="nav">
						<draggable 
							class="nav_content" 
							v-model="headerDataTemp.nav" 
							:options="options" 
							@start="drag=true" 
							@end="drag=false"
							>
							<!--<transition-group name="nav">-->
								<div class="nav_item" v-for="(item, index) of headerDataTemp.nav" :key="item.name" @mouseleave.prevent="handleMouseLeaveNav($event)" @mouseenter.prevent="handleMouseEnterNav($event)">
									<div class="cover_nav cover_nav_data" :class="item.navstatus != '1' ? 'hide' : ''">
									</div>
									<div class="eye_nav hide" :class="item.navstatus != '1' ? 'eye_nav_close' : 'eye_nav_open'" @click="hanldeNavShowHide"></div>
									<div class="flex">
										<input type="text" v-model="item.KU_RENAME" maxlength="4" @click="handleClickBlur($event)" @blur="handleBlur($event, item, index)">
										<div class="edit_nav hide" @click="hanldleClickEdit($event)"></div>
									</div>
								</div>
							<!--</transition-group>-->
						</draggable>
					</div>
				</div>
			</div>
			<!--拖拽部分结束-->
			<!--设置客服qq开始-->
			<div class="set_qq">
				<span>设置客服QQ：</span>
				<input ref="qq" v-model="headerDataTemp.qq.num" type="text" name="" id="" value="" />
				<!--  @blur="handleValidateQ" -->
				<span class="red"><b>{{qqErr.txt}}</b></span>
			</div>
			<!--设置客服qq结束-->
		</div>
		<!--底部开始-->
		<div class="dialog_footer flex">
			<div class="dialog_footer_l flex_1">
				<div><b>*</b>favicon建议尺寸32*32</div>
				<div><b>*</b>logo建议尺寸193*52</div>
				<div><b>*</b>文件大小不超过100k</div>
			</div>
			<div class="dialog_footer_r item_vertical">
				<div class="flex">
					<div class="btn reset_btn" v-if="isRestore && !($store.state.kuTempLateType == 1 && $store.state.agentid > 0)" @click="restoreDefaultHeader">恢复默认</div>
					<div v-if="!isRestore && !($store.state.kuTempLateType == 0 && $store.state.agentid > 0)" class="btn reset_btn">恢复默认</div>
					<div class="btn ok_btn" v-if="isOk" @click="handleOk">确定</div>
					<div v-else class="btn ok_btn">确定</div>
				</div>
			</div>
		</div>
		<!--底部结束-->
	</div>
</template>
<script>
	import draggable from 'vuedraggable'
	import { uploadImg, restoreHeader, updateHeaderData } from '@/api/home'
	export default {
		name: 'definedHeaderBlack',
		data() {
			return {
				inpFileIco: '',
				inpFileLogo: '',
				//isShowSetQ: false, //是否显示qq设置错误提示
				qqErr: {
					txt: '*' // 错误提示信息
				},
				isRestore: true, //是否可点击恢复默认
				isOk: true, //是否可点击确定
				picTitle: {
					"1": "产品日志",
					"2": "联系客服",
					"3": "系统信息",
					"4": "帮助中心"
				},
				headerDataTemp: {}, //头部数据
				//自定义logo
				name: require("@/assets/images/home/classic/mslogo.png"),
				//拖拽控制
				options: {
					group: 'nav', //分组
					animation: 600, //动画事件
					forceFallback: true, // 忽略HTML5的DnD行为，并强制退出。（h5里有个属性也是拖动，这里是为了去掉H5拖动对这个的影响）
					fallbackOnBody: false, // 将克隆的DOM元素添加到文档的主体中。（默认放在被拖动元素的同级）
					ghostClass: 'ghostClass'
				},
				isOverflow: false, //logo图片超出100K
			}
		},
		components: {
			draggable,
		},
		props: ['headerData'],
		created() {
			let _this = this;
			_this.headerDataTemp = JSON.parse(JSON.stringify(_this.headerData));
			//_this.handleRename(_this.headerDataTemp.nav);
			_this.handleRename();
			document.body.ondrop = function (event) {
	            event.preventDefault();
	            event.stopPropagation();
	        }
		},
		methods: {
			//网站标题失去焦点
			handleBlurLabelName() {
				this.headerDataTemp.label.name == '' ? '舆情秘书' : this.headerDataTemp.label.name;
			},
			//欢迎语失去焦点
			handleBlurWelcomText() {
				this.headerDataTemp.welcome.text == '' ? '欢迎来到舆情秘书' : this.headerDataTemp.welcome.text;
			},
			//别名为空时显示name
			handleRename() {
				let _this = this;
				_this.headerDataTemp.nav.map(function(item) {
					if(item.KU_RENAME == '' || item.KU_RENAME == null) {
						item.KU_RENAME = item.name.substring(0,4);
					}else{
						item.KU_RENAME = item.KU_RENAME.substring(0,4);
					}
				})
			},
			//鼠标离开pic目标
			handleMouseLeavePic(event) {
				let curEle = event.currentTarget;
				let eyeEle = curEle.firstElementChild.nextElementSibling;
				eyeEle.classList.add('hide');
			},
			//鼠标进入pic目标
			handleMouseEnterPic(event) {
				let curEle = event.currentTarget;
				let eyeEle = curEle.firstElementChild.nextElementSibling;
				eyeEle.classList.remove('hide');
			},
			//处理导航 姓名 欢迎语 显示和隐藏
			hanldePicShowHide(event, tag) {
				let curEle = event.currentTarget;
				let _this = this;
				if(curEle.classList.contains('icon_eye_close')) {
					curEle.classList.remove('icon_eye_close');
					curEle.classList.add('icon_eye_open');
					curEle.previousElementSibling.classList.remove('hide');
					tag == "welcome" && (_this.headerDataTemp.welcome.ishidden = '1');
					tag == "username" && (_this.headerDataTemp.name.ishidden = '1');
				} else {
					curEle.classList.add('icon_eye_close');
					curEle.classList.remove('icon_eye_open');
					curEle.previousElementSibling.classList.add('hide');
					tag == "welcome" && (_this.headerDataTemp.welcome.ishidden = '0');
					tag == "username" && (_this.headerDataTemp.name.ishidden = '0');
				}
			},
			//上传网站图标
			handleIcoUpload() {
				let _this = this;
				let formData = new FormData();
				let inpFileIco = this.$refs.inpFileIco;
				//_this.inpFileIco = inpFileIco.files[0];
				if(inpFileIco.files[0] && inpFileIco.files[0].name) {
					let index = inpFileIco.files[0].name.lastIndexOf('.');
					let suffix = inpFileIco.files[0].name.substr(index + 1);
					if(suffix != 'ico'){
						alert('选择文件错误,图片类型必须是ico格式');
					}else{
						_this.headerDataTemp.ico.name = window.URL.createObjectURL(inpFileIco.files[0]);
						formData.append('files', inpFileIco.files[0]);
						uploadImg(formData).then(function(res) {
							res = JSON.parse(JSON.stringify(res));
							if(res.data.status == '0') {
								_this.inpFileIco = res.data.result.data;
							}
						}).catch(err => {
							console.log(err, '请求失败！');
						});
						inpFileIco.value = "";
					}
				}
			},
			//上传网站logo
			handleLogoUpload() {
				let _this = this;
				let formData = new FormData();
				let inpFileLogo = this.$refs.inpFileLogo;
				//logo大小是否超出
				if ((inpFileLogo.files[0].size / 1024 ) > 100) {
	            	_this.isOverflow = true;
	            }else{
	            	_this.isOverflow = false;
	            }
				if(inpFileLogo.files[0] && inpFileLogo.files[0].name) {
					let index = inpFileLogo.files[0].name.lastIndexOf('.');
					let suffix = inpFileLogo.files[0].name.substr(index + 1);
					if(suffix != 'jpeg' && suffix != 'jpg' && suffix != 'png' && suffix != 'gif'){
						alert('选择文件错误,图片类型必须是(jpeg,jpg,png,gif)中的一种');
					}else{
						_this.headerDataTemp.logo.name = window.URL.createObjectURL(inpFileLogo.files[0]);
						formData.append('files', inpFileLogo.files[0]);
						uploadImg(formData).then(function(res) {
							res = JSON.parse(JSON.stringify(res));
							if(res.data.status == '0') {
								_this.inpFileLogo = res.data.result.data;
							}
						}).catch(err => {
							console.log(err, '请求失败！');
						});
						inpFileLogo.value = "";
					}
				}
			},
			//验证设置qq
			/*handleValidateQ() {
				let _this = this;
				(/^[0-9]+$/.test(_this.headerDataTemp.qq.num)) ? (_this.isShowSetQ = false) : (_this.isShowSetQ = true);
			},*/
			//鼠标离开自定义导航目标
			handleMouseLeaveNav(event) {
				let curEle = event.currentTarget;
				let eyeEle = curEle.firstElementChild.nextElementSibling;
				let editEle = curEle.lastElementChild.lastElementChild;
				eyeEle.classList.add('hide');
				editEle.classList.add('hide');
			},
			//鼠标进入自定义导航目标
			handleMouseEnterNav(event) {
				let curEle = event.currentTarget;
				let eyeEle = curEle.firstElementChild.nextElementSibling;
				let editEle = curEle.lastElementChild.lastElementChild;
				eyeEle.classList.remove('hide');
				editEle.classList.remove('hide');
			},
			//处理导航的显示和隐藏
			hanldeNavShowHide(event) {
				let curEle = event.currentTarget;
				if(curEle.classList.contains('eye_nav_close')) {
					curEle.classList.remove('eye_nav_close');
					curEle.classList.add('eye_nav_open');
					curEle.previousElementSibling.classList.remove('hide');
				} else {
					curEle.classList.add('eye_nav_close');
					curEle.classList.remove('eye_nav_open');
					curEle.previousElementSibling.classList.add('hide');
				}
			},
			//点击input不聚焦
			handleClickBlur(event) {
				let curEle = event.currentTarget;
				curEle.blur();
			},
			//处理失去焦点
			handleBlur(event, item, index) {
				let curEle = event.currentTarget;
				curEle.parentElement.parentElement.classList.remove('nav_item_border');
				item.KU_RENAME == '' && (this.headerDataTemp.nav[index].KU_RENAME = item.name);
			},
			//点击编辑nav图标、
			hanldleClickEdit(event) {
				let curEle = event.currentTarget;
				curEle.previousElementSibling.focus();
				curEle.classList.add('hide');
				curEle.parentElement.parentElement.classList.add('nav_item_border');
			},
			//恢复默认
			restoreDefaultHeader() {
				let _this = this;
				_this.isRestore = false;
				restoreHeader({}).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						alert('重置成功');
						_this.$router.go(0);
						/*_this.$emit('emitOk');
						_this.$emit('clickCloseDialog');*/
						_this.isRestore = true;
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//获取pic排序
			handlePicSort() {
				let iconCoverEles = document.getElementsByClassName('icon_cover_data');
				this.headerDataTemp.pic.map(function(item, index) {
					item.ishidden = iconCoverEles[index].classList.contains('hide') ? '0' : '1';
				})
			},
			//获取导航排序后的数据
			handleNavSort() {
				let navCoverEles = document.getElementsByClassName('cover_nav_data');
				this.headerDataTemp.nav.map(function(item, index) {
					item.KB_ORDER = index + 1;
					item.navsort = index + 1;
					item.navstatus = navCoverEles[index].classList.contains('hide') ? '0' : '1';
				})
				return this.headerDataTemp.nav;
			},
			//自定义头部确定按钮
			handleOk() {
				let _this = this;
				_this.handleNavSort();
				_this.handlePicSort();

				let data = {};
				let label = {};
				let qq = {};
				let name = _this.headerDataTemp.name;
				let welcome = _this.headerDataTemp.welcome;
		        let nav = _this.handleNavSort();
		        var noNavData = localStorage.getItem('noNavData');
		        var navnew = [];
		        var i = 0;
		        nav.map(function(item, index) {
		        	navnew.push(item);
		        	if((item.name == "事件分析" || item.name == "话题挖掘" ) && item.moduleStatus) {
			            navnew[i] = item;
			            i++;
			            navnew[i] = JSON.parse(noNavData);
		            }else{
		        		navnew[i] = item;
		            }
		            i++
		        });
		        //logo大小是否超出
				if (_this.isOverflow) {
					alert('logo图片超出100K');
	            	return false;
	            }
				label.name = _this.$refs.labelName.value;
				if(!label.name.trim()) {
					alert('网站标题不能为空！');
					return;
				}
				if(!_this.$refs.qq.value) {
					_this.qqErr.txt = '客服QQ不能为空！';
					return;
				}else if(!_this.$refs.qq.value.match(/^\d+$/)){
					_this.qqErr.txt = '客服QQ只能输入数字！';
					return;
				}
				qq.num = _this.$refs.qq.value;

				data.label = label;
				data.name = name;
				data.pic = _this.headerDataTemp.pic;
				data.qq = qq;
				data.welcome = welcome;
				data.nav = navnew;
				if(_this.inpFileIco) {
					data.ico = {
						name: _this.inpFileIco
					};
				}else{
					if(_this.headerDataTemp.ico.name.toString().indexOf('upload') == -1) {
						data.ico = null;
					}else{						
						data.ico = {
							name: _this.headerDataTemp.ico.name
						};
					}
				}

				if(_this.inpFileLogo) {
					data.logo = {
						name: _this.inpFileLogo
					};
				}else{
					if(_this.headerDataTemp.logo.name.toString().indexOf('upload') == -1) {
						data.logo = null;
					}else{
						data.logo = {
							name: _this.headerDataTemp.logo.name
						};
					}
				}
				_this.isOk = false;
				updateHeaderData(data).then(function(res) {
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						alert('保存成功');
						_this.isOk = true;
						_this.$emit('emitOk');
						_this.$emit('clickCloseDialog');
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			}
		}
	}
</script>

<style scoped>
	@import url("./definedHeaderBlack.css");
</style>

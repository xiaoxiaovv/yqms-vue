<template>
	<transition name="fade" v-if="pushWaringData.length > 0">
		<div class="yqms_pushwaring_box border_box" v-show="showPushWaring" ref="yqmsPushwaring">
			<div class="pushwaring_top clearfix">
				<div class="push_left">
					<div class="pushwaring_img"></div>
					<h1>预警通知</h1>
					<div class="pushwaring_voice" :class="{voice_close: !isVoiceOpen}" @click.stop="clickVoice(isVoiceOpen)"></div>
				</div>
				<div class="push_right" @click.stop="closeDialog"></div>
				<!-- <a class="pushwaring_unread" :href="$store.state.oldyqmsUrl +'Pushwarning/index?isread=1&time=day'" v-show="kuAlertwin == 2">今日未读({{todaynoread}})</a> -->
				<a class="pushwaring_unread" href="javascript:void(0);" v-show="kuAlertwin == 2">今日未读({{todaynoread}})</a>
			</div>
			<div class="pushwaring_btom">
				<ul>
					<li v-for="(item,i) of pushWaringData">
						<div class="list_title flex_verticle">
							<span class="list_icon"></span>
							<!-- 推送预警详情页 -->
							<a class="ellipsis flex_1" target="_blank" :href="$store.state.oldyqmsUrl +'Pushwarning/infoDetail?uuid='+ item.infoId +'&ksid='+ item.uuid" v-html="item.title" v-if="item.warningType != 5 || $store.state.ms_ypmodular !='1'"></a>
							<!-- 研判详情页 -->
							<router-link tag="a" :to="{path: 'judgmentdetail', query: { uuid : item.uuid,simhash:item.simhash,infoid:item.infoId}}" 
								target="_blank" class="ellipsis flex_1"  v-html="item.title" v-else></router-link>
						</div>
						<div class="list_info">
							<span class="list_time">{{item.warningTime}}</span>
							<span class="list_source">来源:[{{item.webname}}]</span>
						</div>
					</li>
				</ul>
			</div>
            <div v-html="audio"></div>
		</div>
	</transition>
</template>
<script>
	let moment = require("moment");
    import VueCookies from 'vue-cookies'
	import { getWarningListData,updateWaringSound} from '@/api/home'
	export default {
		data() {
			return {
				showPushWaring: false, //是否显示预警弹窗
				isVoiceOpen: true, //默认声音打开
				pushWaringData: [], //预警数据
		        intervalTime:'',
		        kuAlertwin:this.$store.state.kuAlertwin,
		        kuSound:this.$store.state.kuSound,
		        audio:'',
		        todaynoread: 0, //今日未读
			}
		},
		components: {
			
		},
		methods: {
			//获取预警列表数据
			getWaringData(s) {
				let _this = this;
				let data = {
					warningType: '1,2,3,4,5',  //1公共预警 2关键词预警 3手动预警 4推送 5人工预警 ，多个英文逗号分隔
					pageSize:'3',
					time:'',  //开始时间，初始为 ''
					pageNum:'1',
					type: this.$store.state.kuAlertwin  //2有新消息弹出（包含今日未读数） 1页面刷新时弹出
		        };
				let api = 'judged/getWarningList';
				if(s === '2'){
					//定时查询
					data.time = '';
				}
		        if(this.kuAlertwin == '2'){
					let toalarmData = VueCookies.get('toalarmData') || '';
					let time =  this.intervalTime || toalarmData;
					data.time = time;
		        }
                this.audio = '';
				getWarningListData(api,data).then(res =>{
					res = JSON.parse(JSON.stringify(res));
					if(res.data.status == '0') {
						if(res.data.result.data){
							_this.todaynoread = res.data.result.data.todayNoReadNum || 0;
							_this.pushWaringData = res.data.result.data.warningList.list || [];
							for (let i in _this.pushWaringData) {
								let item = _this.pushWaringData[i];
								let beforeMinute = moment(item.warningTime, "YYYYMMDDHHmmss").format('YYYY-MM-DD HH:mm:ss');
								item.warningTime = beforeMinute;
							};
							_this.intervalTime = res.data.result.data.time;
              				_this.showPushWaring = true;
              				if(_this.kuSound == '1'){
								//需要声音
								let voice = false;
								if (s === '2') {
									voice = true;
								}
								if(voice){
									let oldyqmsUrls =_this.$store.state.oldyqmsUrl;
									_this.audio = '<audio autoplay="autoplay"><source src="' + oldyqmsUrls + 'Public/sound/tishi.wav"' + 'type="audio/wav"/><source src="' + oldyqmsUrls + 'Public/sound/tishi.mp3" type="audio/mpeg"/></audio>';
								}
             				}

						}else{
							_this.pushWaringData = [];
						}
            			VueCookies.set('toalarmData',res.data.result.data.time);
					}
				}).catch(err => {
					console.log(err, '请求失败！');
				});
			},
			//声音打开关闭
			clickVoice(falg){
				let waringSound = '';
				if(falg){
          			waringSound = '0';
				}else{
          			waringSound = '1';
				}
		        updateWaringSound({waringSound:waringSound}).then(rel =>{
		        	let data = rel.data.result.data;
		        	if(data == '1'){
			            VueCookies.set('soundhidden',waringSound);
			            this.isVoiceOpen = (waringSound == '1') ? true : false;
			            this.$store.state.kuSound = waringSound;
		            }
		        }).catch(err=>{
		          console.log(err);
		        });
			},
			//关闭弹窗
			closeDialog(){
				this.showPushWaring = false;
			},
			//显示弹窗
			showDialog(s){
				this.getWaringData(s);
			}
		},
		mounted() {
			let _this = this;
			this.isVoiceOpen = (this.kuSound == '1') ? true : false;
			_this.showDialog('1');
			//每隔2秒更新一下数据
			window.setInterval(() => {
				setTimeout(_this.showDialog('2'), 0);
			},120000);
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./pushWaring.css");
</style>

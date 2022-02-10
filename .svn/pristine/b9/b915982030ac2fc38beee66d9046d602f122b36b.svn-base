<template>
	<div :class="pwdlaysClass" v-show="showSysPwd">
		<div class="syspwd_dialog_content">
			<div class="syspwd_dialog_title"><span>{{title}}</span><span class="syspwd_dialog_close" @click="syspwdClose"></span></div>
			<div class="syspwd_content_box">
				<div class="syspwd_submit_box">
					<p class="syspwd_txt">输入系统设置密码：</p>
					<div class="syspwd_input_box clearfix">
						<input type="password" name="syspwd" v-model="syspwdvalue" @blur="hadleBlur"/>
						<span class="syspwd_err" v-show="err.isshow">{{err.txt}}</span>
					</div>
					<button class="syspwd_submit" @click="submitSyspwd">提交</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
  import {checkPaw} from '@/api/home';
  import VueCookies from 'vue-cookies';

	export default {
		name: 'syspwd',
		props: {
			showSysPwd: {
	            type: Boolean,
	            default: false
	        },
		},
		data() {
			return {
				title: '系统设置密码',
				syspwdvalue: '',  //系统密码
				err: {            //错误信息
					txt: '不能为空',
					isshow: false
				},
        pwdlaysClass:(this.$store.state.kuTempLateType == '0') ? 'syspwd_dialog' : 'black_syspwd_dialog'
			}
		},
		methods: {
			//关闭
			syspwdClose(){
				this.$parent.showSysPwd = false;
				this.err.isshow = false;
			},
			//鼠标移开时触发
			hadleBlur() {
				let _this = this;
				if(_this.syspwdvalue == ''){
					_this.err.txt = '不能为空';
					_this.err.isshow = true;
				}
			},
			//提交
			submitSyspwd(){
				//this.$parent.showSysPwd = false;
        if(this.syspwdvalue == ''){
          this.err.txt = '不能为空';
          this.err.isshow = true;
          return false
        }
        this.err.isshow = false;
        this.err.txt = '';
        let data = {
          userid:this.$store.state.ZHXGUSERID,
          oldPaw:this.syspwdvalue,
          type:'2'
        };
        checkPaw(data).then(rel=>{
          let result = rel.data.result;
          if(result.data == '1'){
            VueCookies.set('ISPWD','1');
            window.location = this.$store.state.oldyqmsUrl + 'Set/special';
          }else{
            alert('密码错误！');
          }
        }).catch(err=>{
          console.log(err);
        });
			}
		},
		mounted() {

		}
	}
</script>
<style scoped>
	@import url("./syspwd.css");
</style>

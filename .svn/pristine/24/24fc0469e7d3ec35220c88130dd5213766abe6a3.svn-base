<template>
	<div class="publice_con" v-if="status !='1'">
		<div v-if="$store.state.kuTempLateType != 1" class="redtext_wrap">
			<p class="redtext_con" v-if="status == 2">您的帐号已停用，请尽快续费。</p>
			<p class="redtext_con" v-else-if="status != 2 && lasttime == 1">您的帐户将在{{leftTime}}天后到期，请尽快续费。</p>
			<p class="redtext_con" v-else-if="status != 2 && lasttime == 2">您的系统已到期，为享有更好服务，请您及时进行续费。</p>
		</div>
		<div class="redtext_wrap"  v-else>
			<p class="redtext_con redtext_con_black" v-if="status == 2">您的帐号已停用，请尽快续费。</p>
			<p class="redtext_con redtext_con_black" v-else-if="status != 2 && lasttime == 1">您的帐户将在{{leftTime}}天后到期，请尽快续费。</p>
			<p class="redtext_con redtext_con_black" v-else-if="status != 2 && lasttime == 2">您的系统已到期，为享有更好服务，请您及时进行续费。</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				status: this.$store.state.kuUserStatus,
		        leftTime: this.$store.state.leftTime,
		        lasttime:''
			}
		},
		components: {},
		methods: {},
		mounted() {
		  if(this.leftTime <=30 && this.leftTime >= '0' ){
        this.lasttime = 1;
      }
      if(this.leftTime < '0'){
        this.lasttime = 2;
      }
    }
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import url("./timetips.css");
</style>

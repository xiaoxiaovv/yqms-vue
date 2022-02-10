<template>
  <div class="sx_wrap">
    <!--筛选条件-->
    <div class="sx_content">
      <ul>
        <!--时间--> <!-- 当前选中hover -->
        <li ref="timetype">
          <a href="javascript:void(0)" v-bind:class="{hover: timetypeData.isActive}"
             @click.stop="showScreenCondition({'id':'timetype',showKey:'timetypeData'})">
            <p>时间</p>
            <p>
              <em>{{timetypeData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--倾向性-->
        <li ref="orientationt">
          <a href="javascript:void(0)" v-bind:class="{hover: orientationtypeData.isActive}"
             @click.stop="showScreenCondition({'id':'orientationt',showKey:'orientationtypeData'})">
            <p>倾向性</p>
            <p>
              <em>{{orientationtypeData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--媒体类型-->
        <li ref="mediatype">
          <a href="javascript:void(0)" v-bind:class="{hover: mediatypeData.isActive}"
             @click.stop="showScreenCondition({'id':'mediatype',showKey:'mediatypeData'})">
            <p>媒体类型</p>
            <p>
              <em>{{mediatypeData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--预警级别-->
        <li ref="warninglevel">
          <a href="javascript:void(0)" v-bind:class="{hover: warninglevelData.isActive}"
             @click.stop="showScreenCondition({'id':'warninglevel',showKey:'warninglevelData'})">
            <p>预警级别</p>
            <p>
              <em>{{warninglevelData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--图片识别-->
        <li ref="isOcr">
          <a href="javascript:void(0)" v-bind:class="{hover: isOcrData.isActive}"
             @click.stop="showScreenCondition({'id':'isOcr',showKey:'isOcrData'})">
            <p>图片识别</p>
            <p>
              <em>{{isOcrData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
        <!--浏览范围-->
        <li ref="browseRange" v-if="inquireParameter.msUserId == inquireParameter.shareMsUserId">
          <a href="javascript:void(0)" v-bind:class="{hover: browseRangeData.isActive}"
             @click.stop="showScreenCondition({'id':'browseRange',showKey:'browseRangeData'})">
            <p>浏览范围</p>
            <p>
              <em>{{browseRangeData.screenInfo}}</em>
              <i></i>
            </p>
            <span>|</span>
          </a>
        </li>
      </ul>
      <!--<div class="sx_true">-->
        <!--<a href="javascript:void(0)" @click="saveSearch()">保存筛选条件</a>-->
      <!--</div>-->
      <!--时间-->
      <div class="sx_pub" v-bind:style="{top:timetypeData.top+'px'}" v-show="timetypeData.isActive"
           @click.stop="noHide">
        <ul>
          <li>
            <span @click.stop="getListInfo({cxKey:'time',cxInfo:'',showKey:'timetypeData',showInfo:'全部'})"
                  :class="{hover:inquireParameter.time === ''}">全部</span>
          </li>
          <li>
            <span @click.stop="getListInfo({cxKey:'time',cxInfo:'1day',showKey:'timetypeData',showInfo:'当天'})"
                  :class="{hover:inquireParameter.time === '1day'}">当天</span>
          </li>
            <li>
            <span @click.stop="getListInfo({cxKey:'time',cxInfo:'24hour',showKey:'timetypeData',showInfo:'24小时'})"
                  :class="{hover:inquireParameter.time === '24hour'}">24小时</span>
            </li>
          <li>
            <span @click.stop="getListInfo({cxKey:'time',cxInfo:'7day',showKey:'timetypeData',showInfo:'近7天'})"
                  :class="{hover:inquireParameter.time === '7day'}">近7天</span>
          </li>
          <li class="js_time" @click.stop="showCustomDay">
            <span :class="{hover:inquireParameter.time === 'zdytime'}">自定义时间</span>
          </li>
          <div class="clearfix_judgment"></div>
          <li class="timejs_input" v-if="timetypeData.customDay">
            <div class="block">
              <el-date-picker
                v-model="formData.start_end_Time"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期" disabledDate="" value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="formData.startDatePicker">
              </el-date-picker>
              <button @click="updateTimeTj()">确定</button>
            </div>
          </li>
        </ul>
      </div>
      <!--倾向性 mult_pub控制input显示-->
      <div class="sx_pub " v-bind:style="{top:orientationtypeData.top+'px'}"
           :class="{mult_pub:orientationtypeData.multipleClass}"
           v-show="orientationtypeData.isActive" @click.stop="noHide">
        <ul>
          <li>
            <label>
              <input type="checkbox" info="全部" v-model.lazy="formData.orientationtypeone" value="-1"
                     @change.stop="checkboxInfo({formDataKey:'orientationtypeone',value:'-1',showKey:'orientationtypeData',allValue:'-1,1,2,3'})">
              <span :class="{hover:(formData.orientationtypeone.indexOf('-1') > -1)}"
                    @click.stop="getListInfo({cxKey:'orientation',cxInfo:'',showKey:'orientationtypeData',showInfo:'全部',formDataKey:'orientationtypeone'})">全部</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" info="正面" v-model.lazy="formData.orientationtypeone" value="1"
                     @change.stop="checkboxInfo({formDataKey:'orientationtypeone',value:'1',showKey:'orientationtypeData',gs:'3'})">
              <span :class="{hover:(formData.orientationtypeone.indexOf('1') > -1)}"
                    @click.stop="getListInfo({cxKey:'orientation',cxInfo:'1',showKey:'orientationtypeData',showInfo:'正面',formDataKey:'orientationtypeone'})">正面</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" info="负面" v-model.lazy="formData.orientationtypeone" value="2"
                     @change.stop="checkboxInfo({formDataKey:'orientationtypeone',value:'2',showKey:'orientationtypeData',gs:'3'})">
              <span :class="{hover:(formData.orientationtypeone.indexOf('2') > -1)}"
                    @click.stop="getListInfo({cxKey:'orientation',cxInfo:'2',showKey:'orientationtypeData',showInfo:'负面',formDataKey:'orientationtypeone'})">负面</span>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" info="中性" v-model.lazy="formData.orientationtypeone" value="3"
                     @change.stop="checkboxInfo({formDataKey:'orientationtypeone',value:'3',showKey:'orientationtypeData',gs:'3'})">
              <span :class="{hover:(formData.orientationtypeone.indexOf('3') > -1)}"
                    @click.stop="getListInfo({cxKey:'orientation',cxInfo:'3',showKey:'orientationtypeData',showInfo:'中性',formDataKey:'orientationtypeone'})">中性</span>
            </label>
          </li>
        </ul>
        <div class="all_btn" @click="multipleOption('orientationtypeData')">+ 多选</div>
        <div class="btn_wrap">
          <div class="btn"
               @click="setMoreProps({cxKey:'orientation',showKey:'orientationtypeData',formDataKey:'orientationtypeone'})">
            确定
          </div>
          <div class="btn no" @click.stop="cancelShow('orientationtypeData')">取消</div>
        </div>
      </div>
      <!--媒体类型 mult_pub控制input显示-->
      <div class="sx_pub" v-bind:style="{top:mediatypeData.top+'px'}" :class="{mult_pub:mediatypeData.multipleClass}"
           v-show="mediatypeData.isActive" @click.stop="noHide">
        <ul v-if="sourceTypeList.length > 0">
          <li>
            <label>
              <input type="checkbox" value="-1" v-model.lazy="formData.sourcetypeInfo"
                     @change.stop="checkboxInfo({formDataKey:'sourcetypeInfo',value:'-1',showKey:'mediatypeData',allValue:mediatypeData.allId})">
              <span :class="{hover:(formData.sourcetypeInfo.indexOf('-1') > -1)}"
                    @click.stop="getListInfo({cxKey:'sourceType',cxInfo:'',showKey:'mediatypeData',showInfo:'全部',formDataKey:'sourcetypeInfo'})">全部</span>
            </label>
          </li>
          <li v-for="type in sourceTypeList">
            <label>
              <input type="checkbox" :value="type.sourceCode" v-model.lazy="formData.sourcetypeInfo"
                     @change.stop="checkboxInfo({formDataKey:'sourcetypeInfo',value:type.sourceCode,showKey:'mediatypeData',gs:mediatypeData.allId.split(',').length-1})">
              <span :class="{hover:(formData.sourcetypeInfo.toString().indexOf(type.sourceCode) > -1)}"
                    @click="getListInfo({cxKey:'sourceType',cxInfo:type.sourceCode,showKey:'mediatypeData',showInfo:type.sourceName,formDataKey:'sourcetypeInfo'})">{{type.sourceName}}</span>
            </label>
          </li>
        </ul>
        <div class="all_btn" @click="multipleOption('mediatypeData')">+ 多选</div>
        <div class="btn_wrap">
          <div class="btn"
               @click="setMoreProps({cxKey:'sourceType',showKey:'mediatypeData',formDataKey:'sourcetypeInfo'})">确定
          </div>
          <div class="btn no" @click.stop="cancelShow('mediatypeData')">取消</div>
        </div>
      </div>
      <!--预警级别-->
      <div class="sx_pub" v-bind:style="{top:warninglevelData.top+'px'}" v-show="warninglevelData.isActive"
           @click.stop="noHide">
        <ul>
          <li>
            <span state="" :class="{hover:inquireParameter.warningLevel === ''}"
                  @click.stop="getListInfo({cxKey:'warningLevel',cxInfo:'',showKey:'warninglevelData',showInfo:'全部'})">全部</span>
          </li>
          <li>
            <span :class="{hover:inquireParameter.warningLevel === '0'}"
                  @click.stop="getListInfo({cxKey:'warningLevel',cxInfo:'0',showKey:'warninglevelData',showInfo:'普通'})">普通</span>
          </li>
          <li>
            <span :class="{hover:inquireParameter.warningLevel === '1'}"
                  @click.stop="getListInfo({cxKey:'warningLevel',cxInfo:'1',showKey:'warninglevelData',showInfo:'中等'})">中等</span>
          </li>
          <li>
            <span :class="{hover:inquireParameter.warningLevel === '2'}"
                  @click.stop="getListInfo({cxKey:'warningLevel',cxInfo:'2',showKey:'warninglevelData',showInfo:'严重'})">严重</span>
          </li>
          <li>
            <span :class="{hover:inquireParameter.warningLevel === '3'}"
                  @click.stop="getListInfo({cxKey:'warningLevel',cxInfo:'3',showKey:'warninglevelData',showInfo:'高危'})">高危</span>
          </li>
        </ul>
      </div>
      <!--图片识别-->
      <div class="sx_pub" v-bind:style="{top:isOcrData.top+'px'}" v-show="isOcrData.isActive"
           @click.stop="noHide">
        <ul>
          <li>
            <span :class="{hover:inquireParameter.isOcr === ''}"
                  @click.stop="getListInfo({cxKey:'isOcr',cxInfo:'',showKey:'isOcrData',showInfo:'全部'})">全部</span>
          </li>
          <li>
            <span :class="{hover:inquireParameter.isOcr === '1'}"
                  @click.stop="getListInfo({cxKey:'isOcr',cxInfo:'1',showKey:'isOcrData',showInfo:'仅看图片识别数据'})">仅看图片识别数据</span>
          </li>
          <li>
            <span :class="{hover:inquireParameter.isOcr === '0'}"
                  @click.stop="getListInfo({cxKey:'isOcr',cxInfo:'0',showKey:'isOcrData',showInfo:'排除图片识别数据'})">排除图片识别数据</span>
          </li>
        </ul>
      </div>
      <!--浏览范围-->
      <div class="sx_pub" v-bind:style="{top:browseRangeData.top+'px'}" v-show="browseRangeData.isActive"
           @click.stop="noHide">
        <ul>
          <li>
            <span isRead="" :class="{hover:inquireParameter.isRead === ''}"
                  @click.stop="getListInfo({cxKey:'isRead',cxInfo:'',showKey:'browseRangeData',showInfo:'全部'})">全部</span>
          </li>
          <li>
            <span isRead="0" :class="{hover:inquireParameter.isRead === '0'}"
                  @click.stop="getListInfo({cxKey:'isRead',cxInfo:'0',showKey:'browseRangeData',showInfo:'未读'})">未读</span>
          </li>
          <li>
            <span isRead="1" :class="{hover:inquireParameter.isRead === '1'}"
                  @click.stop="getListInfo({cxKey:'isRead',cxInfo:'1',showKey:'browseRangeData',showInfo:'已读'})">已读</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  
  
  import {getSourceList} from "../../../../api/public"
  export default {
    data() {
      return {
        timetypeData: {
          isActive: false,
          top: 43,
          customDay: false,
          screenInfo: '全部',
          screenInfoArry: {'day': '当天', 'sevenDays': '近7天', '24hour': '近7天'}
        },
        orientationtypeData: {
          isActive: false,
          top: 43,
          multipleClass: false,                     //倾向性更多样式
          screenInfo: '全部',                     //倾向性显示文字
          screenInfoArry: {'1': '正面', '2': '负面', '3': "中性"},                     //倾向性显示文字
        },
        mediatypeData: {
          isActive: false,
          top: 43,
          multipleClass: false,                  //媒体类型多选
          screenInfo: '全部',                      //媒体类型显示文字
          allId: '-1,',
          screenInfoArry: []
        },
        warninglevelData: {    //预警级别
          isActive: false,    //  0 普通 、1 中等、 2 严重、3 高危
          top: 43,
          screenInfoArry: {'0': '普通', '1': '中等', '2': '严重', '3': '高危'},
          screenInfo: '全部'
        },
        isOcrData:{  //图片识别
          isActive: false,        //   1 仅看图片识别数据 、0 排除图片识别数据
          top: 43,
          screenInfoArry: {'1': '仅看图片识别数据', '0': '排除图片识别数据'},
          screenInfo: '全部'
        },
        browseRangeData: {
          isActive: false,         //浏览范围
          top: 43,
          screenInfoArry: {'0': '未读', '1': '已读'},
          screenInfo: '全部'
        },
        sourceTypeList: [],    //媒体列表
        formData: {
          region: [],            //信源地域  省数据
          region_selected: '',            //信源地域  省选中信息
          city: [],            //信源地域  市数据
          city_selected: '',            //信源地域  市选中信息
          orientationtypeone: ['-1'],            //倾向性值
          start_end_Time: '',
          startDatePicker: this.beginDate(),
          infoSourceLeveltypeone: ["-1"],    //信源分级
          sourcetypeInfo: ['-1'],              //媒体数据
          weiboType: ['-1'],                 //微博类型
        }
      }
    },
    props: ['inquireParameter'],
    components: {
      
    },
    methods: {
      //其他选项false，当前true
      hideOthers(){
        this.timetypeData.isActive = false;
        this.orientationtypeData.isActive = false;
        this.mediatypeData.isActive = false;
        this.warninglevelData.isActive = false;
        this.isOcrData.isActive = false;
        this.browseRangeData.isActive = false;
      },
      showScreenCondition(porpsInfo){
        //初始化
        this.hideOthers();
        //显示筛选条件
        let top = parseInt(this.$refs[porpsInfo.id].offsetTop) + 33;
        this[porpsInfo.showKey].top = top;
        this[porpsInfo.showKey].isActive = true;
        this[porpsInfo.showKey].multipleClass = false;
        if (porpsInfo.showKey === 'timetypeData') {
          //时间
          this.timetypeData.customDay = false;
        }
        if (porpsInfo.showKey === 'mediatypeData') {
          //媒体类型
          if (this.inquireParameter.sourceType == '') {
            this.formData.sourcetypeInfo = ['-1']
          } else if (this.inquireParameter.sourceType.indexOf('04,08') > -1) {
            let typeArray = this.inquireParameter.sourceType.split(',');
            let newSourcetypeInfoArray = [];
            for (let i in typeArray) {
              if (typeArray[i] == '04') {
                newSourcetypeInfoArray.push('04,08');
              }
              if (typeArray[i] != '08' && typeArray[i] != '04') {
                newSourcetypeInfoArray.push(typeArray[i]);
              }
            }
            this.formData.sourcetypeInfo = newSourcetypeInfoArray;
          } else {
            this.formData.sourcetypeInfo = this.inquireParameter.sourceType.split(',');
          }
        }
        if (porpsInfo.showKey === 'orientationtypeData') {
          //倾向性
          this.formData.orientationtypeone = (this.inquireParameter.orientation == '') ? ['-1'] : this.inquireParameter.orientation.split(',');
        }
        //预警级别
        if (porpsInfo.showKey === 'warninglevelData') {

        }
      },
      //点击页面其他区域可以隐藏选项卡
      handleBodyClick(){
        this.hideOthers();
      },
      //解决点击选项卡区域 不隐藏选项卡
      noHide(){
        //console.log('组织时间冒泡');
      },
      getCondition(){
        //查询筛选条件  媒体类型  信源 分级、地域
        let p = {
            userid: this.$store.state.ZHXGUSERID,
            session: this.$store.state.ACCESSTOKEN,
        }
        getSourceList(p).then(res=>{
            if(res.data && res.data.length > 0){
                this.sourceTypeList = res.data;                            //媒体类型
                if (this.sourceTypeList.length > 0) {
                    for (let i in this.sourceTypeList) {
                        this.mediatypeData.screenInfoArry[this.sourceTypeList[i].sourceCode] = this.sourceTypeList[i].sourceName;
                        this.mediatypeData.allId += this.sourceTypeList[i].sourceCode + ',';
                    }
                    this.mediatypeData.allId = this.mediatypeData.allId.substr(0, this.mediatypeData.allId.length - 1);
                }
            }
        }).catch(err=>{

        })
      },
      setSearchWz(){
        //设置显示文字
        let _this = this;
        //设置时间
        if (_this.inquireParameter.time !== '') {
          _this.timetypeData.screenInfo = _this.timetypeData.screenInfoArry[_this.inquireParameter.time] || '全部';
          if(this.inquireParameter.timetypeInfo){
            _this.timetypeData.screenInfo = this.inquireParameter.timetypeInfo;
          }
        }else{
          _this.timetypeData.screenInfo = '全部';
        }
        //设置倾向性
        if (_this.inquireParameter.orientation !== '') {
          this.setScreenInfo({
            'inquireP': 'orientation',
            'showKey': 'orientationtypeData'
          });
        }else{
          _this.orientationtypeData.screenInfo = '全部'
        }
        //设置媒体类型
        if (_this.inquireParameter.sourceType !== '') {
          let typeList = _this.inquireParameter.sourceType,
            typeInfo = '';
          if (typeList.length > 0) {
            for (let i in _this.sourceTypeList) {
              if (typeList.indexOf(_this.sourceTypeList[i].id) > -1) {
                typeInfo += _this.sourceTypeList[i].name + ',';
              }
            }
            _this.mediatypeData.screenInfo = typeInfo.substr(0, typeInfo.length - 1);
          }
        }else{
          _this.mediatypeData.screenInfo = '全部'
        }
        //预警级别
        if (_this.inquireParameter.krState !== '') {
          this.setScreenInfo({
            'inquireP': 'warningLevel',
            'showKey': 'warninglevelData'
          });
        }else{
          _this.warninglevelData.screenInfo = '全部';
        }
        //浏览范围
        if (_this.inquireParameter.isRead != '-1') {
          this.setScreenInfo({
            'inquireP': 'isRead',
            'showKey': 'browseRangeData'
          });
        }else{
          _this.browseRangeData.screenInfo = '全部';
        }
      },
      setScreenInfo(porpsInfo){
        /*
         * porpsInfo.
         *   inquireP      inquireParameter 值
         *   showKey       显示key值
         * */
        let _this = this,
          searchArray = (typeof this.inquireParameter[porpsInfo.inquireP] === 'String') ? this.inquireParameter[porpsInfo.inquireP].split(',') : this.inquireParameter[porpsInfo.inquireP].toString().split(','),//查询数据
          searchInfo = '';                                                            //显示文字

        if (searchArray.length > 0) {
          searchArray.forEach((item, index) => {
            let info = _this[porpsInfo.showKey].screenInfoArry[item] || '全部';
            searchInfo += info + ',';
          });
          _this[porpsInfo.showKey].screenInfo = searchInfo.substr(0, searchInfo.length - 1);
        }
      },
      /*changeType(){
        //信源地域 省市联动
        if (this.formData.region_selected !== '') {
          let reg = this.formData.region[this.formData.region_selected] || '';
          if (reg !== '') {
            this.formData.city = this.formData.region[this.formData.region_selected].cities;
            this.formData.city_selected = '';
          }
        } else {
          this.formData.city = [];
          this.formData.city_selected = '';
        }
      },*/
      multipleOption(opn){
        this[opn].multipleClass = true;
      },
      showCustomDay: function () {
        //显示自定义时间
        this.timetypeData.customDay = true;
      },
      getListInfo(porpsInfo){
        /*
         * 单个数据查询
         * 参数值
         *   cxInfo     查询值
         *   cxKey      查询key
         *   showInfo   显示内容
         *   showKey    显示key值
         *   formDataKey  多选有form表单数据key值
         * */
        //查询数据
        if (typeof this.formData[porpsInfo.formDataKey] === 'undefined' || !this[porpsInfo.showKey].multipleClass) {
          let fkey = porpsInfo.formDataKey || '';
          this.$emit('getListInfo', {
            keys: porpsInfo.cxKey,
            content: porpsInfo.cxInfo
          });
          if (fkey !== '') {
            this.formData[porpsInfo.formDataKey] = [porpsInfo.cxInfo];
          }
          this[porpsInfo.showKey].screenInfo = porpsInfo.showInfo;
          this[porpsInfo.showKey].isActive = false;
        }
      },
      setMoreProps(porpsInfo){
        /*
         * 多选
         * 参数值
         *   cxKey      查询key
         *   showKey    显示key值
         *   formDataKey  多选有form表单数据key值
         * */
        if (typeof this.formData[porpsInfo.formDataKey] !== 'undefined' && this.formData[porpsInfo.formDataKey].length == 0) {
          this.$message({
            message: '请选择需要查询内容！',
            customClass: 'common_tips_style',
            center: true,  //文字水平居中
            type: 'warning'
          });
          return false;
        }
        let xyformData = this.formData[porpsInfo.formDataKey];
        let cxInfo = xyformData.join();
        if (cxInfo.indexOf('-1') == -1) {
          //no 全选
          this.$emit('getListInfo', {
            keys: porpsInfo.cxKey,
            content: cxInfo
          });
          let showInfos = '';
          for (let i in xyformData) {
            showInfos += this[porpsInfo.showKey].screenInfoArry[xyformData[i]] + '、';
          }
          this[porpsInfo.showKey].screenInfo = showInfos.substr(0, showInfos.length - 1);
        } else {
          //全选
          this.$emit('getListInfo', {
            keys: porpsInfo.cxKey,
            content: ''
          });
          this[porpsInfo.showKey].screenInfo = '全部';
        }
        this[porpsInfo.showKey].isActive = false;
      },
      /*infoSourceRegionBtn(){
        //信源地域
        if (this.formData.region_selected === '' && this.formData.city_selected === '') {
          //alert('请选择信源所属地域!');
          //return false;
          this.$emit('getListInfo', {
            keys: 'region',
            content: ''
          });
          this.infoSourceRegionData.screenInfo = '全部';
          this.infoSourceRegionData.isActive = false;
        }else{
          this.formData.provinceOrCity = {
            city: this.formData.city_selected,
            region: this.formData.region_selected
          };
          let region = '';
          let info = '';
          if (this.formData.region_selected != '') {
            //省
            region = this.formData.region_selected;
            info = this.formData.region[region].name;
          }
          if (this.formData.city_selected != '') {
            //市
            region = this.formData.city_selected;
            info = info + '-' + this.formData.region[this.formData.region_selected].cities[region].name
          }
          this.inquireParameter.provinceOrCity = {
            city: this.formData.city_selected,
            region: this.formData.region_selected
          };
          this.$emit('getListInfo', {
            keys: 'region',
            content: region
          });
          this.infoSourceRegionData.screenInfo = info;
          this.infoSourceRegionData.isActive = false;
        }
      },*/
      cancelShow(cancelKey){
        //取消
        this[cancelKey].isActive = false;
      },
      checkboxInfo(porpsInfo){
        /*
         *  多选
         *   formDataKey  多选有form表单数据key值
         *   gs           单个用到 该多选个数
         *   showKey      显示key值
         *   value        值
         *   allValue   全部用到 所有值
         *
         * */
        if (typeof this.formData[porpsInfo.formDataKey] !== 'undefined' && this[porpsInfo.showKey].multipleClass) {
          //  this.formData.orientationtypeone                    v-model 绑定参数
          if (porpsInfo.value == '-1') {
            //全选
            if (this.formData[porpsInfo.formDataKey].indexOf(porpsInfo.value) > -1) {
              //选中
              let allValue = porpsInfo.allValue || '';
              if (allValue != '') {
                allValue = allValue.split(',');
              }
              this.formData[porpsInfo.formDataKey] = allValue;
            } else {
              //没选中
              this.formData[porpsInfo.formDataKey] = [];
            }
          } else {
            //单个
            var allWz = this.formData[porpsInfo.formDataKey].indexOf('-1');
            if (allWz > -1) {
              this.formData[porpsInfo.formDataKey].splice(allWz, 1);
            }
            if (this.formData[porpsInfo.formDataKey].indexOf('-1') == -1 && this.formData[porpsInfo.formDataKey].length == porpsInfo.gs) {
              this.formData[porpsInfo.formDataKey].push('-1');
            }
          }
        }
      },
      updateTimeTj(){
        //时间筛选
        if (this.formData.start_end_Time == '') {
          this.$message({
            message: '请选择开始时间和结束时间！',
            customClass: 'common_tips_style',
            center: true,  //文字水平居中
            type: 'warning'
          });
          return false;
        }
        this.$emit('getListInfo', {
          bTime: this.formData.start_end_Time[0].replace(/-|:|\s/g, ""),
          eTime: this.formData.start_end_Time[1].replace(/-|:|\s/g, "")
        });
        this.timetypeData.screenInfo = this.formData.start_end_Time[0] + ' 至 ' + this.formData.start_end_Time[1];
        this.inquireParameter.timetypeInfo = this.timetypeData.screenInfo;
        this.timetypeData.isActive = false;
      },
      setAccurateInfo(porpsInfo){
        //设置精准相关信息
        this.accurate[porpsInfo.cxKey] = porpsInfo.cxInfo;
      },
      inquireAccurate(){
        this.$emit('setAccurateInfo', this.accurate);
        this.accurateFilterData.isActive = false;
      },
      //处理不能选择今天之后的时间
      beginDate(){
        let _this = this;
        return {
          disabledDate(time){
            let date = new Date();
            let timestamp = date.getTime();
            let limitData = new Date(timestamp - _this.$store.state.savedays * 24 * 3600 * 1000);
            return time.getTime() > Date.now() || time.getTime() < limitData//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      },
      saveSearch(){
        //保存筛选条件
        let _this = this;
        this.$confirm('确认保存筛选条件吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false,
          closeOnClickModal: false
        }).then(() => {
          if(_this.inquireParameter.time != 'customDay'){
            _this.inquireParameter.bTime = '';
            _this.inquireParameter.eTime = ''
          }
          if(_this.inquireParameter.bTime == '' && _this.inquireParameter.eTime == ''){
            _this.inquireParameter.timetypeInfo = ''
          }
          if(_this.inquireParameter.region == ''){
            _this.inquireParameter.provinceOrCity = ''
          }
          // let kkId = _this.inquireParameter.kkIdList;
          // if(_this.classId != ''){
          //   kkId = _this.classId;
          // }
          /*saveSearchCondition({
            msUserId: _this.inquireParameter.msUserId,
            kkId: kkId,
            condition: JSON.stringify(_this.inquireParameter)
          }).then(rel => {
            if (rel.data.status == '0') {
              _this.$message({
                type: 'success',
                customClass: 'common_tips_style',
                center: true,  //文字水平居中
                message: '设置成功！'
              });
            }else if(rel.data.status == '2000000'){
              _this.$message({
                type: 'success',
                customClass: 'common_tips_style',
                center: true,  //文字水平居中
                message: '保存失败！'
              });
            }
          }).catch(err => {
              console.log(err);
          });*/
        }).catch(err => {
         /*_this.$message({
           type: 'error',
           customClass: 'common_tips_style',
           center: true,  //文字水平居中
           message: '请求失败！'
         });*/
        });
      }
    },
    mounted (){
      document.addEventListener('click', this.handleBodyClick);
      this.getCondition();
    },
    destroyed () {
      document.removeEventListener('click', this.handleBodyClick);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("./search.css");
</style>

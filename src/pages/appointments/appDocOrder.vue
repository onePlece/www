<template>
    <div>
      <nav-header></nav-header>
      <div id="aBoxOrder">
        <div class="container">
          <h4 class="joinHos">首页&gt;预约就诊</h4>
          <h2 class="hospitDetal">预约就诊</h2>
          <div class="appContent">
            <!--第一行-->
            <div class="over_flow">
              <!--left-->
              <div class="appDoc">
                <div class="appDoc_img">
                  <p>
                    <img src="../../../static/img/picpicpic.png" class="adLeft_img" alt="123">
                  </p>
                  <div class="appDoc_star">
                    <img src="../../../static/img/star1212Y.png" />
                    <img src="../../../static/img/star1212Y.png" />
                    <img src="../../../static/img/star1212Y.png" />
                    <img src="../../../static/img/star1212Y.png" />
                    <img src="../../../static/img/star1212Y.png" />
                  </div>
                </div>
                <div class="appDoc_intro">
                  <h4 class="appDoc_name">{{docDetails.dname}}<span>{{docDetails.sname}}</span></h4>
                  <p class="appDoc_pro">{{docDetails.zc}}</p>
                  <p class="appDoc_addre">{{docDetails.hid}}</p>
                  <p class="appDoc_good">
                    <span>擅长：{{docDetails.special}}</span>
                  </p>
                </div>
              </div>
              <!--right-->
              <div class="appVideo">
                <div class="appVideo_now over_flow">
                  <div class="appVideo_tu">
                    <img src="../../../static/img/tupian.png" />
                    <p>预约就诊</p>
                  </div>
                  <p class="appVideo_price">¥{{docDetails.mpri}}</p>
                </div>
                <p class="appVideo_num">服务次数：
                  <span>{{docDetails.m_times}}</span>
                </p>
              </div>
            </div>
            <!--第二行-->
            <div class="appBrief">
              <p>
                <span>简介：</span>{{docDetails.dintrod}}
              </p>
            </div>
            <!--第三行-->
            <div class="over_flow">
              <div class="appForm">
                <form>
                  <div class="appForm_dan appForm_dan_two">
                    <span class="appForm_text">
                                <i>*</i>&nbsp;姓名：
                    </span>
                    <input type="text" v-model="myName" :minlength="2" :maxlength="6" class="appForm_input" required>
                  </div>
                  <div class="appForm_dan appForm_danDate appForm_dan_four">
                    <span class="appForm_text appForm_textA">
                                <i>*</i>&nbsp;预约时间：</span>
                    <!--<input type="text" class="appForm_input appForm_date">-->
                    <datepicker :language="zh" v-model="myDate" :format="format" class="appForm_input appForm_date" value="2018-1-1"></datepicker>
                  </div>
                  <div class="appForm_dan appForm_dan_two">
                            <span>
                                <i class="eNum_star">*</i>&nbsp;&nbsp;性别：</span>
                    <select v-model="mySex">
                      <option value="0">男</option>
                      <option value="1">女</option>
                    </select>
                  </div>
                  <div class="appForm_dan appForm_dan_four">
                    <span class="mpForm_text">
                        <i>*</i>&nbsp;出生日期：
                    </span>
                    <datepicker v-model="myAge" :language="zh" :format="format" class="appForm_input appForm_age"></datepicker>
                  </div>
                  <div class="appForm_dan appForm_dan_four">
                    <span class="appForm_text">
                                <i>*</i>&nbsp;手机号码：
                            </span>
                    <input type="tel" v-model="myPhone" class="appForm_input">
                  </div>
                  <div class="appForm_dan appForm_address appForm_dan_four">
                    <span class="total-area">
                                <i class="eNum_star">*</i>&nbsp;&nbsp;所在地区：
                            </span>
                    <div class="eNum_region">
                      <span class="spanOne">
                        请选择省：
                        <select @change="getCity(provincePid)" v-model="provincePid" class="personal-area">
                          <option v-for="province in provinces" :key="province.id" :value="province.pid+'/'+province.val">{{province.val}}</option>
                        </select>
                      </span>
                      <span class="spanTwo">
                        请选择市：
                        <select @change="getArea(cityPid)" v-model="cityPid" class="personal-area">
                          <option v-for="city in citys" :key="city.id" :value="city.pid+'/'+city.val">{{city.val}}</option>
                        </select>
                      </span>
                      <span class="spanThree">
                          请选择区（县）：
                          <select @change="generateArea(area)" v-model="area" class="personal-area">
                            <option v-for="area in areas" :key="area.id" :value="area">{{area}}</option>
                          </select>
                      </span>
                    </div>
                    <input v-model="codeMyAddress" class="appForm_input appForm_address_detail" readonly="readonly"/>
                  </div>
                  <div class="appForm_dan appForm_dan_four">
                            <span class="appForm_text">
                                <span class="appForm_word">
                                    <i>*</i>&nbsp;病情描述：</span>
                            </span>
                    <textarea v-model="myDetails" placeholder="请详细描述您的病情，症状，治疗以及过程想要获得的帮助" class="appForm_area"></textarea>
                  </div>
                  <div class="appForm_dan">
                    <span class="appForm_text appForm_text_upload">
                      上传辅助资料：
                    </span>
                    <div class="picBoxs">
                      <div class="picBox">
                        <input type="file" @change="changePic(fileOne)" class="buttonOne">
                        <!--预览-->
                        <img class="addPicBox"/>
                        <span  class="textImg">(最多可上传8张图片，刷新页面可重新上传图片，已上传3张)</span>
                      </div>
                    </div>
                  </div>
                  <div class="appForm_dan appForm_dan_money">
                            <span class="appForm_text">
                                诊费：
                            </span>
                    <span class="appForm_price">¥500</span>
                  </div>
                </form>
                <div class="appForm_dan">
                  <input class="appForm_btn" @click="uploadOrder" type="button" value="立即预约" />
                </div>
              </div>
              <div class="appPrompt">
                <ul>
                  <p>温馨提示</p>
                  <li>•您可通过文字、图片、语音进行问诊， 医生利用业余时间为您解答。</li>
                  <li>•想得到专业医生的详细指导，需有符合要求的病情资料！请按提示提交疾病信息！</li>
                  <li>•医生的回复仅为建议，具体诊疗需前往医院进行。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <foot-er></foot-er>
      <foot-bo></foot-bo>
    </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import FootEr from '../../components/FootEr'
import FootBo from '../../components/FootBo'
import Datepicker from 'vuejs-datepicker'
import {zh} from 'vuejs-datepicker/dist/locale'
import qs from 'qs'
export default {
  components: {
    NavHeader,
    FootEr,
    FootBo,
    Datepicker
  },
  data () {
    return {
      format: 'yyyy-MM-dd',
      zh: zh,
      myName: '',
      mySex: '',
      myId: '',
      myUid: '',
      myPhone: '',
      codeMyAddress: '',
      myAge: '',
      myDate: '',
      myDetails: '',
      provinces: [],
      citys: [],
      areas: [],
      provincePid: '',
      cityPid: '',
      sheng: '',
      city: '',
      area: '',
      docDetails: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      // 设置默认姓名
      if (!document.cookie || document.cookie.match(/username=(\S*);/)[1] === 'null') {
        this.myName = ''
      } else {
        this.myName = decodeURI(document.cookie.match(/username=(\S*);/)[1])
      }
      // 设置默认身份证号
      if (!document.cookie || document.cookie.match(/idnum=(\S*);/)[1] === 'null') {
        this.myId = ''
      } else {
        this.myId = decodeURI(document.cookie.match(/idnum=(\S*);/)[1])
      }
      // 设置默认性别
      if (!document.cookie) {
        this.mySex = ''
      } else {
        this.mySex = decodeURI(document.cookie.match(/sex=(\S*);/)[1])
      }
      // 设置默认电话
      if (!document.cookie) {
        this.myPhone = ''
      } else {
        this.myPhone = decodeURI(document.cookie.match(/username=(\S*);/)[1])
      }
      // 设置默认地区
      if (!document.cookie || document.cookie.match(/address=(\S*);/)[1] === 'null') {
        this.codeMyAddress = ''
      } else {
        this.codeMyAddress = decodeURI(document.cookie.match(/address=(\S*);/)[1])
      }
      if (!document.cookie) {
        this.myUid = ''
      } else {
        this.myUid = document.cookie.match(/uid=(\S*);/)[1]
        decodeURI(this.myUid)
      }
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/sheng')
        .then(res => {
          console.log(res)
          this.provinces = res.data.dataList.sheng.shengs
        })
      let params = {
        'did': this.$route.params.id
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getDocByDid', params)
        .then(res => {
          this.docDetails = res.data.dataList.docs.obj[0]
        })
    },
    getCity: function (a) {
      var vID = a.substr(0, a.indexOf('/'))
      this.sheng = a.substr(a.indexOf('/')).substr(1)
      let params = {
        'sid': vID
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/city', params)
        .then(res => {
          this.citys = res.data.dataList.city.citys
        })
    },
    getArea: function (a) {
      var vID = a.substr(0, a.indexOf('/'))
      this.city = a.substr(a.indexOf('/')).substr(1)
      let params = {
        'cid': vID
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/area', params)
        .then(res => {
          this.areas = res.data.dataList.area.areas
        })
    },
    generateArea: function (a) {
      this.codeMyAddress = this.sheng + this.city + a
    },
    uploadOrder: function () {
      console.log(this.$route.params.id)
      if (this.myName === '' ||
        this.myName === undefined ||
        this.myDate === '' ||
        this.myDate === undefined ||
        this.mySex === '' ||
        this.mySex === undefined ||
        this.myAge === '' ||
        this.myAge === undefined ||
        this.myPhone === '' ||
        this.myPhone === undefined ||
        this.codeMyAddress === '' ||
        this.codeMyAddress === undefined ||
        this.myDetails === '' ||
        this.myDetails === undefined) {
        alert('您有未输入的信息，预约失败！')
        return false
      } else {
        let date = this.myDate
        let time1 = new Date(date).getTime()
        let time2 = new Date().getTime()
        let time3 = new Date(this.myAge).getTime()
        let params = {
          'date': time1,
          'price': this.docDetails.mpri,
          'uname': this.myName,
          'sex': this.mySex,
          'birthday': time3,
          'uphone': this.myPhone,
          'address': this.codeMyAddress,
          'cases': this.myDetails,
          'uid': this.myUid,
          'did': this.$route.params.id,
          'udate': time2
        }
        params = qs.stringify(params)
        this.$axios
          .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/insYyjzdd', params)
          .then(res => {
            console.log(res)
            if (res.data.code === '200') {
              alert('下单成功')
              this.$router.push('/mine/minOrder/minorderone')
            }
          })
      }
    },
    changePic: function (fileOne) {
      console.log(fileOne)
    }
  }
}
</script>

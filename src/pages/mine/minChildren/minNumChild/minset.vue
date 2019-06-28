<template>
    <div class="eNum_person">
      <p class="eNum_notes">注：个人信息一经填写无法删除，请填写本人信息</p>
      <table class="eNum_form">
        <tr>
          <td><span><i class="eNum_star">*&nbsp;</i>真实姓名:</span></td>
          <td><input class="mpForm_input" v-model="uname" type="text"/></td>
        </tr>
        <tr>
          <td><span><i class="eNum_star">*&nbsp;</i>昵称:</span></td>
          <td><input class="mpForm_input" v-model="myNich" type="text"/></td>
        </tr>
        <tr>
          <td><span><i class="eNum_star">*&nbsp;</i>手机号码:</span></td>
          <td><input class="mpForm_input" v-model="myPhone" type="text"/></td>
        </tr>
        <tr>
          <td><span><i class="eNum_star">*&nbsp;</i>性别:</span></td>
          <td class="esex">
            <select v-model="mySex">
              <option value="0">男</option>
              <option value="1">女</option>
            </select>
          </td>
        </tr>
        <tr>
          <td><span><i class="eNum_star">*&nbsp;</i>出生日期:</span></td>
          <td>
            <!--<input class="mpForm_input" type="text"/>-->
            <datepicker :language="zh" v-model="myAges" :format="format" class="mpForm_input"></datepicker>
          </td>
        </tr>
        <tr>
          <td><span><i class="eNum_star">*&nbsp;</i>所在地区:</span></td>
          <td>
              <span class="espanOne">
                请选择省:
                <select class="personal-area" @change="getCity(provincePid)" v-model="provincePid">
                  <option v-for="province in provinces" :key="province.id" :value="province.pid+'/'+province.val">{{province.val}}</option>
                </select>
              </span>
              <span class="espanTwo">
                请选择市:
                <select class="personal-area" @change="getArea(cityPid)" v-model="cityPid">
                  <option v-for="city in citys" :key="city.id" :value="city.pid+'/'+city.val">{{city.val}}</option>
                </select>
              </span>
              <span class="espanThree">
                请选择县:
                <select class="personal-area" @change="generateArea(area)" v-model="area">
                  <option v-for="area in areas" :key="area.id" :value="area">{{area}}</option>
                </select>
              </span>
            <input v-model="myAddress" class="appForm_input" readonly="readonly"/>
          </td>
        </tr>
        <tr>
          <td><span><i class="eNum_star">*&nbsp;</i>身份证号:</span></td>
          <td><input class="mpForm_input" v-model="myId" type="text"/></td>
        </tr>
      </table>
      <input type="button" @click="sub" class="eNum_fSave" value="保存">
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import {zh} from 'vuejs-datepicker/dist/locale'
import qs from 'qs'
export default {
  name: 'mine-num',
  components: {
    Datepicker
  },
  data () {
    return {
      zh: zh,
      format: 'yyyy-MM-dd',
      uid: '',
      uname: '',
      myNich: '',
      myAges: '',
      myPhone: '',
      myAddress: '',
      mySex: '',
      myId: '',
      provinces: [],
      citys: [],
      areas: [],
      provincePid: '',
      cityPid: '',
      sheng: '',
      city: '',
      area: '',
      use: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      // 个人信息
      let uid
      if (!document.cookie) {
        uid = ''
      } else {
        uid = document.cookie.match(/uid=(\S*);/)[1]
        decodeURI(uid)
      }
      this.uid = uid
      // 设置默认姓名
      let uname
      if (!document.cookie || document.cookie.match(/uname=(\S*);/)[1] === 'null') {
        uname = ''
      } else {
        uname = document.cookie.match(/uname=(\S*);/)[1]
        uname = decodeURI(uname)
        this.uname = uname
      }
      // 设置默认昵称
      let nc
      if (!document.cookie) {
        nc = ''
      } else {
        nc = document.cookie.match(/nc=(\S*);/)[1]
        nc = decodeURI(nc)
        this.myNich = nc
      }
      // 默认出生日期
      if (!document.cookie || document.cookie.match(/age=(\S*);/)[1] === 'null') {
        this.myAges = ''
      } else {
        this.myAges = document.cookie.match(/age=(\S*);/)[1]
        decodeURI(this.myAges)
      }
      // 设置默认手机号
      let username
      if (!document.cookie) {
        username = ''
      } else {
        username = document.cookie.match(/username=(\S*);/)[1]
        decodeURI(username)
        this.myPhone = username
      }
      // 设置默认住址
      let codeMyAddress
      if (!document.cookie || document.cookie.match(/address=(\S*);/)[1] === 'null') {
        codeMyAddress = ''
      } else {
        codeMyAddress = document.cookie.match(/address=(\S*);/)[1]
        codeMyAddress = decodeURI(codeMyAddress)
        this.myAddress = codeMyAddress
      }
      // 设置默认性别
      let sex
      if (!document.cookie) {
        sex = ''
      } else {
        sex = document.cookie.match(/sex=(\S*);/)[1]
        sex = decodeURI(sex)
        this.mySex = sex
      }
      // 设置默认身份证号
      let idnum
      if (!document.cookie || document.cookie.match(/idnum=(\S*);/)[1] === 'null') {
        idnum = ''
      } else {
        idnum = document.cookie.match(/idnum=(\S*);/)[1]
        idnum = decodeURI(idnum)
        this.myId = idnum
      }
      // 获取省份
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/sheng')
        .then(res => {
          console.log(res)
          this.provinces = res.data.dataList.sheng.shengs
        })
    },
    // 选择城市
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
    // 选择县
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
      this.myAddress = this.sheng + this.city + a
    },
    sub: function () {
      let id = this.myId
      // 号码规则校验
      let format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
      if (!format.test(id)) {
        alert('身份证号码不合规')
        return false
      }
      if (this.uname === '' ||
        this.uname === undefined ||
        this.myNich === '' ||
        this.myNich === undefined ||
        this.myAges === '' ||
        this.myAges === undefined ||
        this.myPhone === '' ||
        this.myPhone === undefined ||
        this.myAddress === '' ||
        this.myAddress === undefined ||
        this.mySex === '' ||
        this.mySex === undefined ||
        this.myId === '' ||
        this.myId === undefined) {
        alert('您有未输入的信息，预约失败！')
        return false
      } else {
        let time3 = new Date(this.myAges).getTime()
        let params = {
          'uid': this.uid,
          'uname': this.uname,
          'nc': this.myNich,
          'address': this.myAddress,
          'sex': this.mySex,
          'age': time3,
          'idnum': this.myId
        }
        params = qs.stringify(params)
        this.$axios
          .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/updUser', params)
          .then(res => {
            if (res.data.code === '200') {
              this.use = res.data.dataList.users
              console.log(this.use)
              let exp = new Date()
              let code1 = encodeURI(this.use.address)
              let code2 = encodeURI(this.use.age)
              let code3 = encodeURI(this.use.date)
              let code4 = encodeURI(this.use.idnum)
              let code5 = encodeURI(this.use.nc)
              let code6 = encodeURI(this.use.sex)
              let code7 = encodeURI(this.use.token)
              let code8 = encodeURI(this.use.ugrade)
              let code9 = encodeURI(this.use.uid)
              let code10 = encodeURI(this.use.uname)
              let code12 = encodeURI(this.use.upic)
              let code14 = encodeURI(this.use.username)
              let code15 = encodeURI(this.use.upsw)
              exp.setTime(exp.getTime() + 3 * 60 * 60 * 1000)
              document.cookie = 'address=' + code1 + ';expires=' + exp.toGMTString()
              document.cookie = 'age=' + code2 + ';expires=' + exp.toGMTString()
              document.cookie = 'date=' + code3 + ';expires=' + exp.toGMTString()
              document.cookie = 'idnum=' + code4 + ';expires=' + exp.toGMTString()
              document.cookie = 'nc=' + code5 + ';expires=' + exp.toGMTString()
              document.cookie = 'sex=' + code6 + ';expires=' + exp.toGMTString()
              document.cookie = 'token=' + code7 + ';expires=' + exp.toGMTString()
              document.cookie = 'ugrade=' + code8 + ';expires=' + exp.toGMTString()
              document.cookie = 'uid=' + code9 + ';expires=' + exp.toGMTString()
              document.cookie = 'uname=' + code10 + ';expires=' + exp.toGMTString()
              document.cookie = 'uphone=' + '0' + ';expires=' + exp.toGMTString()
              document.cookie = 'upic=' + code12 + ';expires=' + exp.toGMTString()
              document.cookie = 'ustate=' + '1' + ';expires=' + exp.toGMTString()
              document.cookie = 'username=' + code14 + ';expires=' + exp.toGMTString()
              document.cookie = 'upsw=' + code15 + ';expires=' + exp.toGMTString()
              alert(res.data.msg)
            }
          })
      }
    }
  }
}
</script>

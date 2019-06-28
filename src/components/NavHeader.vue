<template>
    <div class="akNav">
      <div class="akTop">
        <div class="container">
          <div class="akNav-left aOne">
            <router-link to="/login">登录</router-link>
            |
            <router-link to="/regester">注册</router-link>
          </div>
          <div class="akNav-left aTwo">
            欢迎
            <a class="aTwoName">{{userName}}</a>
            <router-link to="/mine/minorder" class="aTwoName" target="_blank">个人中心</router-link>
            <a @click="outLogin">退出</a>
          </div>
          <div class="akNav-right">
            <a>我的购物车</a>
            <div class="DownApp">
              <a>下载App</a>
            </div>
            <img src="../../static/img/servicephone.png">
            <a class="akNavSpn">服务热线电话:
              <span>400-990-5558</span>
            </a>
          </div>
        </div>
      </div>
      <div class="SearchMod container">
          <img class="Slogo" src="../../static/img/logo.png">
          <div class="SearchTh">
            <form>
              <input class="SearchBtn1" type="text" placeholder="搜索医院、医生、科室、疾病">
              <input class="SearchBtn2" type="button" value="搜索">
            </form>
            <a>外科医生</a>
            <a class="hospital">医院</a>
            <a>内科医生</a>
          </div>
        <img class="consult" src="../../static/img/consultation.png" height="39" width="156"/>
      </div>
      <div class="SearchBan">
        <ul class="container SearchLink">
         <li v-for="(item) in tabs" :key='item.values'>
           <router-link :to="item.tab" class="iNav_orderAA">{{item.name}}</router-link>
         </li>
        </ul>
      </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      changeRed: 0,
      tabs: [{name: '首页', tab: '/'}, {name: '预约就诊', tab: '/apponintDoctor'}, {name: '预约转诊', tab: '/apponintDoctorh'}, {name: '电话咨询', tab: '/tellPhone'}, {name: '预约手术', tab: '/operAtion'}, {name: '专家看片', tab: '/moVie'}, {name: '远程会诊', tab: '/consuLtation'}, {name: '合作医院', tab: '/hosPital'}, {name: '健康商城', tab: '/Mall'}, {name: '关于我们', tab: '/About'}],
      userName: '',
      usSate: ''
    }
  },
  mounted () {
    let username, ustate
    if (!document.cookie) {
      username = ''
      ustate = ''
    } else {
      username = document.cookie.match(/username=(\S*);/)[1]
      ustate = document.cookie.match(/ustate=(\S*);/)[1]
      decodeURI(this.userName)
    }
    this.userName = username
    this.usSate = ustate
    var aOne = document.getElementsByClassName('aOne')[0]
    var aTwo = document.getElementsByClassName('aTwo')[0]
    if (this.usSate === '1') {
      aTwo.style.display = 'block'
      aOne.style.display = 'none'
    } else {
      aOne.style.display = 'block'
      aTwo.style.display = 'none'
    }
  },
  methods: {
    outLogin: function () {
      let params = {
        username: this.userName
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/updStateByUsername', params)
        .then(res => {
          if (res.data.code === '200') {
            let exp = new Date()
            exp.setTime(exp.getTime() - 1)
            document.cookie = 'address=;expires=' + exp.toGMTString()
            document.cookie = 'age=;expires=' + exp.toGMTString()
            document.cookie = 'date=;expires=' + exp.toGMTString()
            document.cookie = 'idnum=;expires=' + exp.toGMTString()
            document.cookie = 'nc=;expires=' + exp.toGMTString()
            document.cookie = 'sex=;expires=' + exp.toGMTString()
            document.cookie = 'token=;expires=' + exp.toGMTString()
            document.cookie = 'ugrade=;expires=' + exp.toGMTString()
            document.cookie = 'uid=;expires=' + exp.toGMTString()
            document.cookie = 'uname=;expires=' + exp.toGMTString()
            document.cookie = 'uphone=;expires=' + exp.toGMTString()
            document.cookie = 'upic=;expires=' + exp.toGMTString()
            document.cookie = 'ustate=;expires=' + exp.toGMTString()
            document.cookie = 'username=;expires=' + exp.toGMTString()
            document.cookie = 'upsw=;expires=' + exp.toGMTString()
            window.location.reload()
          } else if (res.data.code === '300') {
            // 请求失败
            alert(res.data.msg)
          } else if (res.data.code === '400') {
            // 参数为空
            alert(res.data.msg)
          } else if (res.data.code === '500') {
            // 验证码错误
            alert(res.data.msg)
          } else if (res.data.code === '600') {
            // 用户已存在
            alert(res.data.msg + '请直接登陆')
          } else if (res.data.code === '700') {
            // 用户不存在
            alert(res.data.msg + '请注册后再登陆')
          }
        })
    }
  }
}
</script>

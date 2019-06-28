<template>
  <div class="rLogin">
    <div class="rHead">
      <div class="container">
        <div class="rHead_left">
          <h4 class="rHead_title">
            <router-link to="/login">登录</router-link>
            <router-link to="/regester">注册</router-link>
          </h4>
          <form>
            <div class="rHead_Text">
              <label class="rHead_img">
                <img src="../../static/img/people.png">
              </label>
              <input class="rHead_btn" v-model="userName" type="text" placeholder="请输入手机号码">
            </div>
            <div class="rHead_Text">
              <label class="rHead_img">
                <img src="../../static/img/codeOne.png">
              </label>
              <input class="rHead_btn" v-model="userPwd" type="password" placeholder="请输入密码">
            </div>
            <button type="button" class="rHead_atn" @click="login">登录</button>
          </form>
          <div class="rHead_forget">
            <router-link to="/">返回首页</router-link>
            <router-link to="/forget" target="_blank">忘记密码?</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="rFoot">
        <router-link class="rFoot_box" to="/apponintDoctor">
          <img class="rFoot_img" src="../../static/img/yuye.png">
          <p class="rFoot_t">预约就诊</p>
          <p class="rFoot_tt">快速、便捷预约，名医就诊</p>
        </router-link>
        <router-link class="rFoot_box" to="/movie">
          <img class="rFoot_img" src="../../static/img/zhuanjia.png">
          <p class="rFoot_t">专家看片</p>
          <p class="rFoot_tt">知名专家精诚解决您的疑难杂症</p>
        </router-link>
        <router-link class="rFoot_box" to="/hospital">
          <img class="rFoot_img" src="../../static/img/hezuohospital.png">
          <p class="rFoot_t">合作医院</p>
          <p class="rFoot_tt">三甲级医院直接提供服务</p>
        </router-link>
        <router-link class="rFoot_box" to="/consultation">
          <img class="rFoot_img" src="../../static/img/yuanchenghuizhen.png">
          <p class="rFoot_t">远程会诊</p>
          <p class="rFoot_tt">更方便高端的就诊方式</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import qs from 'qs'
export default {
  data () {
    return {
      userName: '',
      userPwd: '',
      upsw: '',
      use: ''
    }
  },
  methods: {
    login: function () {
      if (!this.userName || !this.userPwd) {
        alert('请您输入用户账号和密码')
        return false
      }
      let usew = md5(md5(this.userPwd))
      this.upsw = usew
      let params = {
        username: this.userName,
        upsw: this.upsw
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/logByUser', params)
        .then(res => {
          console.log(res.data.code)
          if (res.data.code === '200') {
            this.use = res.data.dataList.users
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
            let code11 = encodeURI(this.use.uphone)
            let code12 = encodeURI(this.use.upic)
            let code13 = encodeURI(this.use.ustate)
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
            document.cookie = 'uphone=' + code11 + ';expires=' + exp.toGMTString()
            document.cookie = 'upic=' + code12 + ';expires=' + exp.toGMTString()
            document.cookie = 'ustate=' + code13 + ';expires=' + exp.toGMTString()
            document.cookie = 'username=' + code14 + ';expires=' + exp.toGMTString()
            document.cookie = 'upsw=' + code15 + ';expires=' + exp.toGMTString()
            this.$router.replace('/')
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
        .catch(error => {
          alert(error)
        })
    }
  }
}
</script>

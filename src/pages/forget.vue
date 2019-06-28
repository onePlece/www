<template>
  <div class="rLogin">
    <div class="rHead">
      <div class="container">
        <div class="rGester">
          <h4 class="rRegister">重置密码</h4>
          <form>
            <div class="rHead_Text">
              <label class="rHead_img">
                <img src="../../static/img/people.png">
              </label>
              <input class="rHead_btn" @blur="phoneBlurOne" v-model="tell" type="tell" autofocus minlength="11" maxlength="11" placeholder="请输入手机号码">
            </div>
            <div class="rHead_Text">
              <input class="rGestr_btn" v-model="codeOne" type="password" placeholder="输入验证码">
              <input type="button" @click="sendphonecodeOne" class="rssCode" v-bind:class="paraclass" value="获取验证码">
            </div>
            <div class="rHead_Text">
              <input class="rPassword" type="password" v-model="pwdOne" placeholder="输入密码">
            </div>
            <button type="button" @click="subpwd" class="rgester_btn">提交</button>
          </form>
          <router-link class="rBack forgetback" to="/">返回首页</router-link>
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
/* eslint-disable one-var */
import md5 from 'js-md5'
import qs from 'qs'
export default {
  name: 'forget',
  data () {
    return {
      tell: '',
      codeOne: '',
      pwdOne: '',
      paraclass: ''
    }
  },
  methods: {
    phoneBlurOne: function () {
      let a = /^1[3|4|5|8|7][0-9]\d{4,8}$/
      if (a.test(this.tell)) {
        this.paraclass = 'rHuoqu'
      }
    },
    sendphonecodeOne: function () {
      console.log(this.tell)
      let params = {
        username: this.tell
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/yzm', params)
        .then(res => {
          console.log(res.data.code)
          var vCode = document.getElementsByClassName('rssCode')[0]
          if (res.data.code === '200') {
            var second = 60, timePromise = ''
            timePromise = setInterval(function () {
              if (second <= 0) {
                clearInterval(timePromise)
                timePromise = ''
                second = 60
                vCode.value = '重发验证码'
                this.paraclass = 'rHuoqu'
                console.log(4)
              } else {
                console.log(2)
                vCode.value = second + '秒后可重发'
                this.paraclass = 'rssCode'
                second--
              }
            }, 1000)
          }
        })
    },
    subpwd: function () {
      let params = {
        phonenum: this.tell,
        newUpsw: md5(md5(this.pwdOne)),
        yzm: md5(md5(this.codeOne))
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/wjUpsw', params)
        .then(res => {
          console.log(res)
          if (res.data.code === '200') {
            this.$router.push('/login')
          } else if (res.data.code === '300') {
            //    请求失败
            alert(res.data.msg)
          } else if (res.data.code === '400') {
            //    参数为空
            alert(res.data.msg)
          } else if (res.data.code === '500') {
            //    验证码错误
            alert(res.data.msg)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>

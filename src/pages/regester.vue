<template>
  <div class="rLogin">
    <div class="rHead">
      <div class="container">
        <div class="rGester">
          <h4 class="rHead_title">
            <router-link to="/login">登录</router-link>
            <router-link to="/regester">注册</router-link>
          </h4>
          <form>
            <div class="rHead_Text">
              <label class="rHead_img">
                <img src="../../static/img/people.png">
              </label>
              <input class="rHead_btn" @blur="outFocus" v-model="tell" type="tell" autofocus minlength="11" maxlength="11" pattern="/^1[3|4|5|8|7][0-9]\d{4,8}$/" required placeholder="请输入手机号码">
            </div>
            <div class="rHead_Text">
              <input class="rGestr_btn" v-model="code" type="password" placeholder="输入验证码">
              <input type="button" @click="sendphonecode" class="rssCode" v-bind:class="paraclass" value="获取验证码">
            </div>
            <div class="rHead_Text">
              <input class="rPassword" v-model="pwd" type="password" placeholder="输入密码">
            </div>
            <div class="rAgreement">
              <input type="checkbox"/>
              <span class="rText_p"></span>
              <span>我同意</span>
              <a target="_blank">《安康好一生医疗协议》</a>
            </div>
            <input type="submit" class="rgester_btn" @click="regest" value="注册">
          </form>
          <router-link class="rBack" to="/">返回首页</router-link>
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
  data () {
    return {
      tell: '',
      code: '',
      pwd: '',
      paraclass: ''
    }
  },
  methods: {
    outFocus: function () {
      let a = /^1[3|4|5|8|7][0-9]\d{4,8}$/
      if (a.test(this.tell)) {
        this.paraclass = 'rHuoqu'
      }
    },
    sendphonecode: function () {
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
    regest: function () {
      let params = {
        username: this.tell,
        upsw: md5(md5(this.pwd)),
        yzm: md5(md5(this.code))
      }
      params = qs.stringify(params)
      console.log(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/insUser', params)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>

</style>

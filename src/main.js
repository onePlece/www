// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import operationDate from './assets/js/operationDate'
import './assets/css/index.css'
import './assets/css/reset.css'
// import 'bootstrap3/dist/css/bootstrap.css'
// import 'bootstrap3/dist/js/bootstrap.js'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(operationDate)

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  if (value.length > 17) {
    return value.slice(0, 17) + '...'
  }
  return value
})

Vue.filter('dateFilter', function (data) {
  let stamp = parseInt(data)
  let date = new Date(stamp)
  let Y = date.getFullYear() + '-'
  let M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  let D =
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  // let s =
  //     date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  let formatDate = Y + M + D + h + m
  return formatDate
})

Vue.filter('paymentKind', function (item) {
  let result
  if (item === 'appointment') {
    result = '预约就诊'
  } else if (item === 'telephone') {
    result = '电话咨询'
  } else if (item === 'zjkp') {
    result = '专家看片'
  } else if (item === 'referral') {
    result = '预约转诊'
  } else if (item === 'sugery') {
    result = '预约手术'
  }
  return result
})

function getAesString (data, key, iv) { // 加密
  var key1 = CryptoJS.enc.Utf8.parse(key)
  var iv1 = CryptoJS.enc.Utf8.parse(iv)
  var encrypted = CryptoJS.AES.encrypt(data, key1, {
    iv: iv1,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString() // 返回的是16进制格式的密文
}
function getAES () { // 加密
  var key = 'akhys13521917288' // 密钥
  var iv = 'akhys13521917288'
  let data = '世界太黑暗'
  var encrypted = getAesString(data, key, iv) // 密文
  return encrypted
}
let password = getAES()
password = password.toUpperCase()
console.log(password)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Dec-Enc'] = password

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

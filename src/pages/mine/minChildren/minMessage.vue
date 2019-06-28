<template>
    <div class="eHea_box">
      <h5 class="eHea_title">添加反馈</h5>
      <div class="eMes_box">
        <p class="eMes_title">我们会认真聆听您的每一句话，请将您宝贵的建议或问题告诉我们</p>
        <textarea class="eMes_text" v-model="myMessage" placeholder="请描述您的建议或遇到的问题..."></textarea>
        <input class="eMes_btn" @click="subMes" type="button" value="提交">
      </div>
    </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'min-message',
  data () {
    return {
      myMessage: '',
      uid: ''
    }
  },
  methods: {
    subMes: function () {
      let uid
      let cookie = document.cookie + ';'
      if (!document.cookie) {
        uid = ''
        alert('没登陆了')
      } else {
        alert('登陆了')
        uid = cookie.match(/uid=(\S*);/)[1]
        decodeURI(uid)
        this.uid = uid
        if (this.myMessage === '' || this.myMessage === undefined) {
          alert('反馈不能为空')
          return false
        } else {
          let params = {
            'uid': this.uid,
            'yjtext': this.myMessage
          }
          params = qs.stringify(params)
          this.$axios
            .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/addYjfk', params)
            .then(res => {
              console.log(res)
            })
        }
      }
    }
  }
}
</script>

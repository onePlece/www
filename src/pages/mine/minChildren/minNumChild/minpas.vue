<template>
  <div class="eNum_person">
    <p class="eNum_notes">注：修改密码</p>
    <table class="eNum_form">
      <tr>
        <td><span><i class="eNum_star">*&nbsp;</i>原密码:</span></td>
        <td><input class="mpForm_input" v-model="oldPassword" type="password" placeholder="请输入密码"/></td>
      </tr>
      <tr>
        <td><span><i class="eNum_star">*&nbsp;</i>新密码:</span></td>
        <td><input class="mpForm_input" v-model="newPassword" type="password" placeholder="请输入新密码"/></td>
      </tr>
    </table>
    <input type="button" @click="subPassword" class="eNum_fSave" value="保存">
  </div>
</template>

<script>
import md5 from 'js-md5'
import qs from 'qs'
export default {
  data () {
    return {
      oldPassword: '',
      newPassword: ''
    }
  },
  methods: {
    subPassword: function () {
      if (this.oldPassword === '' ||
        this.oldPassword === undefined ||
        this.newPassword === '' ||
        this.newPassword === undefined) {
        alert('信息不能为空')
      } else {
        let username = document.cookie.match(/username=(\S*);/)[1]
        decodeURI(username)
        let params = {
          'username': username,
          'upsw': md5(md5(this.oldPassword)),
          'newUpsw': md5(md5(this.newPassword))
        }
        params = qs.stringify(params)
        this.$axios
          .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/wjUpsw ', params)
          .then(res => {
            if (res.data.code === '200') {
              alert(res.data.msg)
              this.oldPassword = ''
              this.newPassword = ''
            } else if (res.data.code === '300') {
              alert(res.data.msg)
              this.oldPassword = ''
              this.newPassword = ''
            }
          })
      }
    }
  }
}
</script>

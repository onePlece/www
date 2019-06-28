<template>
    <div class="eNum_person">
      <p class="eNum_notes">添加或更改你的头像</p>
      <p class="eNum_notes">从电脑中选择一项你喜欢的照片上传，仅支持JPEG、GIF或PNG图片文件，且大小不超过2M。</p>
      <div class="minImg">
        <up-load @saveImg="save" @delImg="deleteImg"></up-load>
        <!--<input type="file">-->
      </div>
      <input type="button" @click="uploadmyPic" class="eNum_fSave" value="保存">
    </div>
</template>

<script>
import UpLoad from '../../../../components/UpLoad'

export default {
  components: {
    UpLoad
  },
  data () {
    return {
      articleImg: '',
      file: '',
      uid: ''
    }
  },
  methods: {
    uploadmyPic: function () {
      // alert()
      if (this.articleImg === '') {
        alert('请选择图片')
      } else {
        this.uid = document.cookie.match(/uid=(\S*);/)[1]
        let param = new FormData()
        console.log(this.file)
        param.append('file', this.file, this.file.name)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$axios
          .post(
            'http://www.hao-yisheng.com/AKHYSKJApp/hys/upload/' + this.uid,
            param,
            config
          )
          .then(res => {
            alert(res.data.msg)
            // this.$router.push("/article/consulting");
          })
      }
    },
    save (file) {
      this.articleImg = file.src
      this.file = file
    },
    deleteImg () {
      this.articleImg = ''
    }
  }
}
</script>

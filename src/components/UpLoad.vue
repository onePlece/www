<template>
  <div>
    <div class="upload_warp_left">
        <img src="../../static/img/add.png" @click="fileClick">
    </div>
    <!--<span id="ban-up-text">上传图片</span>-->
    <input @change="fileChange($event)" type="file" id="upload_file" name="myfile" style="display: none"/>
    <div v-show="img != ''" class="upload-total">
      <div class="upload_warp_img_div">
        <div class="upload_warp_img_div_top">
          <img src="../../static/img/del.png" class="upload_warp_img_div_del" @click="fileDel">
        </div>
        <img :src="img.src">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['editImg'],
  data () {
    return {
      img: '',
      size: 0
    }
  },
  methods: {
    // 设置
    fileClick () {
      document.getElementById('upload_file').click()
    },
    fileChange (el) {
      if (!el.target.files[0].size) return
      this.fileList(el.target)
      el.target.value = ''
    },
    fileList (fileList) {
      let files = fileList.files
      // 判断是否为文件夹
      if (files[0].type !== '') {
        this.fileAdd(files[0])
      }
    },
    fileAdd (file) {
      // 总大小
      // 判断是否为图片文件
      let reader = new FileReader()
      let image = new Image()
      let _this = this
      reader.readAsDataURL(file)
      reader.onload = function () {
        file.src = this.result
        image.onload = function () {
          let width = image.width
          let height = image.height
          file.width = width
          file.height = height
          _this.img = file
          _this.$emit('saveImg', file)
        }
        image.src = file.src
      }
    },
    fileDel () {
      this.img = ''
      this.$emit('delImg')
    }
  },
  watch: {
    editImg (val) {
      this.img = {
        src: ''
      }
      this.img.src = val
    }
  }
}
</script>


<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for='el in arrItem' :key="el.values" class="swiper-slide">
        <img class="img" :src="el.fileurl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import qs from 'qs'
export default {
  data: function () {
    return {
      imgUrl1: '',
      arrItem: [
        {
          imgUrl: ''
        },
        {
          imgUrl: ''
        },
        {
          imgUrl: ''
        }
      ]
    }
  },
  mounted: function () {
    /* eslint-disable no-new */
    new Swiper('.swiper-container', {
      slidesPerView: 1,
      autoplay: true, // 设置轮播可循环
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
    this.init()
  },
  methods: {
    init: function () {
      var params = {
        kinds: 'H5First'
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getAppLogo', params)
        .then(res => {
          this.imgUrl1 = res.data.dataList.logs.obj
          this.arrItem = res.data.dataList.logs.obj
        })
    }
  }
}
</script>

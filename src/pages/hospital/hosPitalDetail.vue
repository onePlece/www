<template>
  <div id="hosptldet">
    <nav-header></nav-header>
    <div class="hosptldet_h">
      <div class="container">
        <h4 class="joinHos">合作医院&gt;医院详情</h4>
        <h2 class="hospitDetal">医院详情</h2>
        <div class="hdText">
          <div class="hdTop">
            <div class="hdTop_left">
              <img class="hdTop_img" :src="docDetails.hpic">
              <h3>{{docDetails.hname}}</h3>
              <p class="hdTopgrdd">{{docDetails.hgrade}}</p>
              <p class="hdadd"><span>地址:</span>{{docDetails.address}}</p>
              <p class="hdadd"><span>电话:</span>{{docDetails.hphone}}</p>
            </div>
            <div class="hdTop_right">
              <div class="hdRight_img">
                <img src="../../../static/img/star1212Y.png" alt="">
                <img src="../../../static/img/star1212Y.png" alt="">
                <img src="../../../static/img/star1212Y.png" alt="">
                <img src="../../../static/img/star1212Y.png" alt="">
                <img src="../../../static/img/star1212Y.png" alt="">
                <span>10.0</span>
              </div>
              <p class="hdRight_text">
                <span>{{docDetails.countper}}</span>
                位医生可以预约
              </p>
            </div>
          </div>
          <div class="hdBrief">
            <input class="hdBrief_btn" type="button" value="医院简介">
            <div class="hdBrief_text">
              <p>{{docDetails.introduction}}</p>
            </div>
          </div>
          <input class="hdBrief_btn" type="button" value="用户评价">
          <div class="adevaluate">
            <div class="adevaluate_null">
              <img src="../../../static/img/null.png" alt="">
              <p>暂无评价...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {{msg}}
    <foot-er></foot-er>
    <foot-bo></foot-bo>
  </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import FootEr from '../../components/FootEr'
import FootBo from '../../components/FootBo'
import qs from 'qs'
export default {
  name: 'hos-pital-detail',
  components: {
    NavHeader,
    FootEr,
    FootBo
  },
  data () {
    return {
      docDetails: [],
      msg: this.$store.state.count
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      var iNavorderAA = document.getElementsByClassName('iNav_orderAA')
      iNavorderAA[7].style.color = '#0a9b83'
      let params = {'hid': this.$route.params.hid}
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getHospitalById', params)
        .then(res => {
          console.log(res)
          this.docDetails = res.data.dataList.hospital.obj[0]
        })
    }
  }
}
</script>

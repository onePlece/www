<template>
    <div id='hosPital'>
      <nav-header></nav-header>
      <ban-ner></ban-ner>
      <div id='hosPtl' class='container'>
        <h1>合作医院</h1>
        <ul id='C_hospital'>
          <li v-for="hospital in hospitals" :key="hospital.id">
            <router-link :to="{ name: 'hosPitalDetail', params: { hid: hospital.hid }}" target="_Blank">
            <img src="../../../static/img/hospitals.jpg" alt="">
            <h4 class='C_title'>{{hospital.hname}}</h4>
            <p class='C_grade'>{{hospital.hgrade}}</p>
            <p class='C_text'>
              {{hospital.introduction}}
            </p>
            <span class="C_spn">查看全文</span>
            <p class='C_address'>
              <img src='../../../static/img/adress.png' alt=''>
              {{hospital.address}}
            </p>
            </router-link>
          </li>
        </ul>
      </div>
      <foot-er></foot-er>
      <foot-bo></foot-bo>
    </div>
</template>
<script>
import NavHeader from '../../components/NavHeader'
import BanNer from '../../components/BanNer'
import FootEr from '../../components/FootEr'
import FootBo from '../../components/FootBo'
import qs from 'qs'
export default {
  components: {
    NavHeader,
    BanNer,
    FootEr,
    FootBo
  },
  data () {
    return {
      hospitals: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      var params = {
        'pageNum': 1,
        'pageSize': 12,
        'kind': 'hzyy',
        'syskind': 0,
        'sysid': 0
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getDataGw', params)
        .then(res => {
          this.hospitals = res.data.dataList.dataList.dataList.obj
          console.log(this.hospitals)
        })
    }
  }
}
</script>

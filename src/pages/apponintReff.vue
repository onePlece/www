<template>
    <div class="apponintRe">
      <nav-header></nav-header>
      <ban-ner></ban-ner>
      <div id="aBox" class="container">
        <!--第一行-->
        <div class="aHead">
          <p class="aHead_all">找到<span>12</span>位医生</p>
          <div class="aDepartment">
            城市:
            <span v-for='(item,index) in BigCity' :key='item.id' :class='{aDepartmentSpan:index == focusBigCity}' @click="CitySmall(item.sheng,index)">{{item.sheng}}</span>
          </div>
          <div class="aDepartment">
            等级:
            <span v-for='(item,index) in Grand' :key="item.id" @click='obHospitalS(item.hgrade,index)' :class='{aDepartmentSpan:index == focusGrand}'>{{item.hgrade}}</span>
          </div>
        </div>
        <div class="aSort">
          <span>综合</span>
          <span>好评量</span>
          <span>问诊量</span>
          <span>价格</span>
        </div>
        <!--内容展示-->
        <ul class="aHospital">
          <li v-for='item in hosipitals' :key='item.id'>
            <img class="aImgh" src="../../static/img/hospitals.jpg">
            <h4 class="aHospital_name">{{item.hname}}</h4>
            <p class="aTel">{{item.hphone}}</p>
            <p class="aDdress">{{item.address}}</p>
            <a href="javascript" class="aHospital_comment">
              {{item.introduction}}
            </a>
            <button type="button" class="aRbtn">立即转诊</button>
          </li>
        </ul>
        <mo-paging :page-index="page" :page-size="pageSize" @change="pageChange" :total="count"></mo-paging>
      </div>
      <foot-er></foot-er>
      <foot-bo></foot-bo>
    </div>
</template>
<script>
import NavHeader from '../components/NavHeader'
import BanNer from '../components/BanNer'
import FootEr from '../components/FootEr'
import FootBo from '../components/FootBo'
import MoPaging from '../components/MoPaging'
import qs from 'qs'
export default {
  components: {
    MoPaging,
    NavHeader,
    BanNer,
    FootEr,
    FootBo
  },
  data () {
    return {
      BigCity: [],
      BigCityFirst: '',
      focusBigCity: '',
      Grand: [],
      focusGrand: '',
      GrandFirst: '',
      GrFirst: '',
      hosipitals: '',
      page: 1,
      pageSize: 7,
      count: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getHospitalCity')
        .then(data => {
          this.BigCity = data.data.dataList.dataList.obj
          this.BigCityFirst = this.BigCity[0].sheng
          this.CitySmall(this.BigCityFirst, 0)
        })
    },
    CitySmall: function (sheng, number) {
      this.focusBigCity = number
      let params = {
        'sheng': sheng
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getHosHgrade', params)
        .then(data => {
          this.Grand = data.data.dataList.dataList.obj
          this.GrFirst = data.data.dataList.dataList.obj[0].hgrade
          this.obHospitalS(this.GrFirst, 0)
        })
    },
    obHospitalS: function (sId, number) {
      this.focusGrand = number
      this.GrandFirst = sId
      this.pageChange(1)
    },
    pageChange (page) {
      this.page = page
      var params = {
        'pageNum': page,
        'pageSize': this.pageSize,
        'sheng': this.BigCityFirst,
        'grade': this.GrandFirst
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getYyzzGw', params)
        .then(res => {
          this.hosipitals = res.data.dataList.dataList.dataList.obj
        })
    }
  }
}
</script>

<template>
  <div>
    <ol id="hDoctorList">
      <li v-for="(item,index) in obKeshi" :key="item.id"  :class='{aDepartmentSpan:index == threeBanner}' @click="obFirstDoc(item.sids,index)">{{item.snames}}</li>
    </ol>
    <div class="swiper-container2 TheeBan">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in bannerDoc" :key="item.id">
          <div class="doctor-top">
            <img class='aImg' v-show="item.dpic==''&& item.sex==1" src='../../static/img/picpicpic1.png'>
            <img class='aImg' v-show="item.dpic==''&& item.sex==0" src='../../static/img/picpicpic.png'>
            <img class='aImg' v-show="item.dpic!=''" :src=item.dpic>
            <h3>{{item.dname}}<span>{{item.sname}}</span></h3>
            <p>{{item.zc}}</p>
            <h4>{{item.hname}}</h4>
            <button type="button">立即预约</button>
          </div>
          <div class="doctor-bom">
            <p>{{item.special}}</p>
          </div>
        </div >
      </div>
      <!-- Add Arrows -->
      <div class="swiper-button-prev">&lt;&lt;</div>
      <div class="swiper-button-next">&gt;&gt;</div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import qs from 'qs'
export default {
  name: 'three-banner',
  data () {
    return {
      obKeshi: [],
      bannerDoc: [],
      threeBanner: ''
    }
  },
  mounted: function () {
    /* eslint-disable no-new */
    this.initSwiper()
    this.init()
  },
  methods: {
    initSwiper () {
      new Swiper('.swiper-container2', {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 3,
        // autoplay: true,
        // loop: true,
        loopFillGroupWithBlank: true,
        observer: true,
        observeParents: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        }
      })
    },
    init: function () {
      var params = {
        'pageNum': 1,
        'pageSize': 9,
        'kind': 'dks',
        'state': 2,
        'sids': 0,
        'name': ''
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getSysPage', params)
        .then(res => {
          this.obKeshi = res.data.sys.dataList.obj
          this.obFirstDoc(169, 0)
        })
    },
    obFirstDoc: function (id, number) {
      this.threeBanner = number
      var params = {
        'pageNum': 1,
        'pageSize': 9,
        'kind': 'sy',
        'syskind': 2,
        'sysid': id
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getDataGw', params)
        .then(res => {
          this.bannerDoc = res.data.dataList.dataList.dataList.obj
        })
    }
  }
}
</script>

<template>
  <div class='moVie'>
    <nav-header></nav-header>
    <ban-ner></ban-ner>
    <div id='moVe' class='container'>
      <!--第一行-->
      <div class='aHead'>
        <p class='aHead_all'>找到<span>12</span>位医生</p>
        <div class='aDepartment'>
          科室:
          <span v-for="(item,index) in movieBigs" :key="item.id" :class='{aDepartmentSpan:index == movieFocusBid}' @click="movieSmall(item.sids,index)">{{item.snames}}</span>
        </div>
        <div class='aDepartment'>
          {{movieName}}:
          <span @click="movieOb(item.sid,index)" v-for="(item,index) in movieSmalls" :key="item.id" :class='{aDepartmentSpan:index == movieSame}'>{{item.sname}}</span>
        </div>
      </div>
      <div class='aSort'>
        <span>综合</span>
        <span>好评量</span>
        <span>问诊量</span>
        <span>价格</span>
      </div>
      <!--列表-->
      <ul id='mContent'>
        <li v-for="movie in movies" :key="movie.id">
          <img src='../../static/img/picpicpic.png'>
          <h4>{{movie.dname}}<span>{{movie.sname}}</span></h4>
          <p class='mHospital'>{{movie.zc}}</p>
          <p class='mPro'>{{movie.hid}}</p>
          <div class='mBord'><p class="mSpec">{{movie.special}}</p></div>
          <div class='mBox'>
            <a class='mBleft'>
              <img src='../../static/img/tupian.png'>
              <p>图文看片</p>
              <i>￥500</i>
            </a>
            <a class='aRigth'>
              <img src='../../static/img/huishipin.png'>
              <p>视频看片</p>
              <i>￥0</i>
            </a>
          </div>
        </li>
      </ul>
        <mo-paging :page-index="page" :page-size="pageSize" @change="pageChange" :total="count"></mo-paging>
    </div>
    <foot-er class="moveabc"></foot-er>
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
      movieBigs: [],
      movieBigFirst: '',
      movieFocusBid: '',
      movieSmalls: [],
      movieName: '',
      movieSame: '',
      movieSamlFirst: '',
      page: 1,
      pageSize: 7,
      count: '',
      movies: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getSysAll')
        .then(res => {
          this.movieBigs = res.data.dataList.systems.obj
          this.movieBigFirst = this.movieBigs[0].sids
          this.movieSmall(this.movieBigFirst, 0)
        })
    },
    movieSmall: function (id, number) {
      this.movieFocusBid = number
      var params = {
        'sids': id
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getSysKind', params)
        .then(res => {
          this.movieSmalls = res.data.dataList.system.obj
          this.movieName = this.movieSmalls[0].snames
          this.movieOb(this.movieSmalls[0].sid, 0)
        })
    },
    movieOb: function (sId, number) {
      this.movieSame = number
      this.movieSamlFirst = sId
      // return false
      this.pageChange(1)
    },
    pageChange (page) {
      this.page = page
      var params = {
        'pageNum': page,
        'pageSize': this.pageSize,
        'kind': 'zjkp',
        'syskind': 1,
        'sysid': this.movieSamlFirst
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getDataGw', params)
        .then(res => {
          this.movies = res.data.dataList.dataList.dataList.obj
          this.count = res.data.dataList.dataList.totalRecord
        })
    }
  }
}
</script>

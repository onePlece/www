<template>
    <div class="tellPhone">
      <nav-header></nav-header>
      <ban-ner></ban-ner>
      <div id="aBox" class="container">
        <!--第一行-->
        <div class="aHead">
          <p class="aHead_all">找到<span>12</span>位医生</p>
          <div class="aDepartment">
            科室:
            <span v-for='(item,index) in tellBigs' :key='item.id' :class='{aDepartmentSpan:index == focustell}' @click="tellOb(item.sids,index)">{{item.snames}}</span>
          </div>
          <div class="aDepartment">
            {{tellBigName}}:
            <span v-for="(tellSmall,index) in tellSmalls" :key="tellSmall.id" :class='{aDepartmentSpan:index == tellSmallFocus}' @click="tellDoc(tellSmall.sid,index)">{{tellSmall.sname}}</span>
          </div>
        </div>
        <div class="aSort">
          <span>综合</span>
          <span>好评量</span>
          <span>问诊量</span>
          <span>价格</span>
        </div>
        <!--内容展示-->
        <ul class="aText">
          <li v-for="item in telldoctors" :key="item.id">
            <img class='aImg' v-show="item.dpic==''&& item.sex==1" src='../../static/img/picpicpic1.png'>
            <img class='aImg' v-show="item.dpic==''&& item.sex==0" src='../../static/img/picpicpic.png'>
            <img class="aImg" v-show="item.dpic!=''" :src=item.dpic>
            <h4 class="aName">{{item.dname}}<span>{{item.sname}}</span></h4>
            <p class="aDoctor_prv">{{item.zc}}</p>
            <p class="aDoctor_hospital">{{item.hid}}</p>
            <button type="button" class="aBtn">立即通话</button>
            <p class="aDoctor_doone">{{item.special}}</p>
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
      tellBigs: [],
      tellBigsFirst: '',
      tellSmalls: [],
      focustell: '',
      tellBigName: '',
      tellSmallFirst: '',
      tellSmallFocus: '',
      tellSml: '',
      page: 1,
      pageSize: 7,
      count: '',
      telldoctors: []
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
          this.tellBigs = res.data.dataList.systems.obj
          this.tellBigsFirst = this.tellBigs[0].sids
          this.tellOb(this.tellBigsFirst, 0)
        })
    },
    tellOb: function (id, number) {
      this.focustell = number
      var params = {
        'sids': id
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getSysKind', params)
        .then(res => {
          this.tellSmalls = res.data.dataList.system.obj
          this.tellBigName = res.data.dataList.system.obj[0].snames
          this.tellSmallFirst = res.data.dataList.system.obj[0].sid
          this.tellDoc(this.tellSmallFirst, 0)
        })
    },
    tellDoc: function (sId, number) {
      this.tellSmallFocus = number
      this.tellSml = sId
      this.pageChange(1)
    },
    pageChange (page) {
      this.page = page
      var params = {
        'pageNum': page,
        'pageSize': this.pageSize,
        'kind': 'dhzx',
        'syskind': 1,
        'sysid': this.tellSml
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getDataGw', params)
        .then(res => {
          this.telldoctors = res.data.dataList.dataList.dataList.obj
          this.count = res.data.dataList.dataList.totalRecord
        })
    }
  }
}
</script>

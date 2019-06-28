<template>
  <div class='appodoc'>
    <nav-header></nav-header>
    <ban-ner></ban-ner>
    <div id='aBox' class='container'>
      <!--第一行-->
      <div class='aHead'>
        <p class='aHead_all'>找到<span>12</span>位医生</p>
        <div class='aDepartment'>
          科室:
          <span v-for='(item,index) in Bigs' :key='item.id' :class='{aDepartmentSpan:index == focusBig}' @click="obSmall(item.sids,index)">{{item.snames}}</span>
        </div>
        <div class='aDepartment'>
          {{bigName}}
          <span @click="obDoc(Small.sid,index)" v-for="(Small,index) in Smalls" :key="Small.id" :class='{aDepartmentSpan:index == focusSmal}'>{{Small.sname}}</span>
        </div>
      </div>
      <div class='aSort'>
        <span>综合</span>
        <span>好评量</span>
        <span>问诊量</span>
        <span>价格</span>
      </div>
      <!--内容展示-->
      <ul class='aText'>
        <li v-for="doctor in doctors" :key="doctor.id" @click="toDoctorDetail(doctor.did)">
          <img class='aImg' v-show="doctor.dpic==''&& doctor.sex==1" src='../../../static/img/picpicpic1.png'>
          <img class='aImg' v-show="doctor.dpic==''&& doctor.sex==0" src='../../../static/img/picpicpic.png'>
          <img class='aImg' v-show="doctor.dpic!=''" :src=doctor.dpic>
          <h4 class='aName'>{{doctor.dname}}<span>{{doctor.sname}}</span></h4>
          <p class='aDoctor_prv'>{{doctor.zc}}</p>
          <p class='aDoctor_hospital'>{{doctor.hid}}</p>
          <button type='button' class='aBtn'>立即预约</button>
          <p class='aDoctor_doone'>擅长：{{doctor.special}}</p>
        </li>
      </ul>
      <mo-paging :page-index="page" :page-size="pageSize" @change="pageChange" :total="count"></mo-paging>
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
import MoPaging from '../../components/MoPaging'
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
      Bigs: [],
      Smalls: [],
      bigName: '',
      BigFirst: '',
      focusBig: '',
      SmallFirst: '',
      focusSmal: '',
      Smalfirst: '',
      page: 1,
      pageSize: 7,
      count: '',
      doctors: [],
      ustate: ''
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
          this.Bigs = res.data.dataList.systems.obj
          this.BigFirst = this.Bigs[0].sids
          this.obSmall(this.BigFirst, 0)
        })
    },
    obSmall: function (id, number) {
      this.focusBig = number
      var params = {
        'sids': id
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getSysKind', params)
        .then(res => {
          this.Smalls = res.data.dataList.system.obj
          this.bigName = res.data.dataList.system.obj[0].snames
          this.SmallFirst = res.data.dataList.system.obj[0].sid
          this.obDoc(this.SmallFirst, 0)
        })
    },
    obDoc: function (sId, number) {
      this.focusSmal = number
      this.Smalfirst = sId
      this.pageChange(1)
    },
    pageChange (page) {
      this.page = page
      var params = {
        'pageNum': page,
        'pageSize': this.pageSize,
        'kind': 'yyjz',
        'syskind': 1,
        'sysid': this.Smalfirst
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getDataGw', params)
        .then(res => {
          this.doctors = res.data.dataList.dataList.dataList.obj
          this.count = res.data.dataList.dataList.totalRecord
        })
    },
    toDoctorDetail: function (id) {
      let ustate, myUid
      if (!document.cookie) {
        ustate = ''
        myUid = ''
      } else {
        ustate = document.cookie.match(/ustate=(\S*);/)[1]
        myUid = document.cookie.match(/uid=(\S*);/)[1]
        decodeURI(ustate)
        decodeURI(myUid)
      }
      this.ustate = ustate
      console.log(this.ustate)
      if (this.ustate !== '1') {
        alert('请先登录...')
        this.$router.push('/login')
      } else {
        this.$router.push({
          path: `/appDocOrder/${id}`
        })
      }
    }
  }
}
</script>

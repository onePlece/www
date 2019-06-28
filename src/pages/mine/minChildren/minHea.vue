<template>
  <div class="eHea_box">
    <h5 class="eHea_title">我的健康档案
      <a @click="addArchives">添加档案</a>
    </h5>
    <!--有报告-->
    <div class="minH">
      <ul class="archives-list">
        <li class="eHea_personal" v-for="item in minedata" :key="item.id">
          <span>{{item.uname}}</span>
          <span>{{item.sjc | dateFilter('YYYY-MM-DD')}}</span>
          <span>体检报告</span>
          <a class="delete-archives" @click="delArchives(item.cid)">删除</a>
          <a @click="showDetail(item.sjc)">查看详情</a>
        </li>
      </ul>
      <mo-paging :page-index="page" :page-size="pageSize" @change="pageChange" :total="count"></mo-paging>
      <!-- 添加档案 -->
      <div class="eTel_bomb">
        <div class="eTel_bombox">
          <a class="eTel_bombClose" @click="delFrame">×</a>
          <h4 class="eTel_bombTitle">新增健康档案</h4>
          <span class="error-tips" v-show="errorCue">有未输入的信息！</span>
          <p class="eTel_bombMes">基本信息（必填）</p>
          <p class="eTel_bombMes eTel_archives">
            <span class="type-blue">*</span>
            <span class="type-gray">姓名：</span>
            <input type="text" v-model="archivesName">
          </p>
          <p class="eTel_bombMes eTel_archives">
            <span class="type-blue">*</span>
            <span class="type-gray">年龄：</span>
            <input type="number" v-model="archivesAge">
          </p>
          <p class="eTel_bombMes eTel_archives">
            <span class="type-blue">*</span>
            <span class="type-gray">性别：</span>
            <select v-model="archivesSex">
              <option value="0">男</option>
              <option value="1">女</option>
            </select>
          </p>
          <p class="eTel_bombMes eTel_archives_phone">
            <span class="type-blue">*</span>
            <span class="type-gray">手机号码：</span>
            <input type="number" v-model="archivesPhone">
          </p>
          <p class="eTel_bombMes eTel_archives_phone">
            <span class="type-blue">*</span>
            <span class="type-gray">所在地区：</span>
            <select id="city_archives" v-model="archivesCity">
              <option value="北京市">北京市</option>
              <option value="天津市">天津市</option>
              <option value="河北省">河北省</option>
              <option value="山西省">山西省</option>
              <option value="内蒙古自治区">内蒙古自治区</option>
              <option value="辽宁省">辽宁省</option>
              <option value="吉林省">吉林省</option>
              <option value="黑龙江省">黑龙江省</option>
              <option value="上海市">上海市</option>
              <option value="江苏省">江苏省</option>
              <option value="浙江省">浙江省</option>
              <option value="安徽省">安徽省</option>
              <option value="福建省">福建省</option>
              <option value="江西省">江西省</option>
              <option value="山东省">山东省</option>
              <option value="河南省">河南省</option>
              <option value="湖北省">湖北省</option>
              <option value="湖南省">湖南省</option>
              <option value="广东省">广东省</option>
              <option value="广西壮族自治区">广西壮族自治区</option>
              <option value="重庆市">重庆市</option>
              <option value="四川省">四川省</option>
              <option value="贵州省">贵州省</option>
              <option value="云南省">云南省</option>
              <option value="西藏自治区">西藏自治区</option>
              <option value="陕西省">陕西省</option>
              <option value="甘肃省">甘肃省</option>
              <option value="青海省">青海省</option>
              <option value="宁夏回族自治区">宁夏回族自治区</option>
              <option value="新疆维吾尔自治区">新疆维吾尔自治区</option>
              <option value="香港特别行政区">香港特别行政区</option>
              <option value="澳门特别行政区">澳门特别行政区</option>
            </select>
          </p>
          <div class="archives_save" @click="addArchivesConfirm">
            保存
          </div>
        </div>
      </div>
      <!--删除订单-->
      <div class="eTel_bombOne">
        <div class="eTel_bomboxOne">
          <h4 class="eTel_bombTitl">提示</h4>
          <p class="eTel_bombText">删除后不可恢复，确定要删除吗？</p>
          <br/>
          <a class="eTel_bombClose" @click="closeDel">×</a>
          <a class="eTel_bombCloseo" @click="closeDel">取消</a>
          <a class="eTel_bombCertain" @click="del">确认</a>
        </div>
      </div>
      <!-- 点击弹出详情 -->
      <div class="eTel_bombTwo">
        <div class="eTel_bomboxTwo">
          <a class="eTel_bombClose" @click="hideDetail">×</a>
          <h4 class="eTel_bombTitle">{{report.uname}}&nbsp;&nbsp;{{report.sjc|dateFilter('YYYY-MM-DD')}}&nbsp;&nbsp;体检报告</h4>
          <p class="eTel_bombMes eTel_basic">基本信息（必填）</p>
          <p class="eTel_bombMes eTel_archives">
            <span class="type-blue">*</span>
            <span class="type-gray">姓名：{{report.uname}}&nbsp;</span>
            <span></span>
          </p>
          <p class="eTel_bombMes eTel_archives">
            <span class="type-blue">*</span>
            <span class="type-gray">年龄：{{report.age}}</span>
            <span></span>
          </p>
          <p class="eTel_bombMes eTel_archives">
            <span class="type-blue">*</span>
            <span class="type-gray">性别：{{report.sex=='1'?'女':'男'}}</span>
            <span></span>
          </p>
          <p class="eTel_bombMes eTel_archives_phone">
            <span class="type-blue">*</span>
            <span class="type-gray">手机号码：{{report.phone}}</span>
            <span></span>
          </p>
          <p class="eTel_bombMes eTel_archives_phone">
            <span class="type-blue">*</span>
            <span class="type-gray">所在地区：{{report.city}}</span>
            <span></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MoPaging from '../../../components/MoPaging'
import qs from 'qs'
export default {
  name: 'mine-hea',
  components: {
    MoPaging
  },
  data () {
    return {
      page: 1,
      pageSize: 8,
      count: '',
      minedata: [],
      errorCue: '',
      archivesName: '',
      archivesAge: '',
      archivesSex: '0',
      archivesPhone: '',
      archivesCity: '北京市',
      delId: '',
      report: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.pageChange(1)
    },
    pageChange (page) {
      this.page = page
      var uid = document.cookie.match(/uid=(\S*);/)[1]
      let params = {
        'pageNum': page,
        'pageSize': 8,
        'uid': uid
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getCaseHisPer', params)
        .then(res => {
          this.minedata = res.data.dataList.dataList.dataList.obj
          this.count = res.data.dataList.dataList.totalRecord
        })
    },
    addArchives () {
      // 获取用户的id
      document.getElementsByClassName('eTel_bomb')[0].style.display = 'block'
      setTimeout(function () {
        document.getElementsByClassName('eTel_bomb')[0].style.opacity = '1'
        document.querySelector('.eTel_bombox').style.transform = 'translateX(-' + 100 + ' px)'
        // $('.eTel_bombox').css('transform', 'translate(-50%,0)')
      }, 50)
      document.getElementsByClassName('eTel_bomb')[0].style.paddingRight = '17px'
      this.errorCue = false
    },
    addArchivesConfirm () {
      if (this.archivesName === '' || this.archivesAge === '' || this.archivesSex === '') {
        this.errorCue = true
      } else {
        var uid = document.cookie.match(/uid=(\S*);/)[1]
        let params = {
          'city': this.archivesCity,
          'uname': this.archivesName,
          'sex': this.archivesSex,
          'age': this.archivesAge,
          'phone': this.archivesPhone,
          'uid': uid
        }
        params = qs.stringify(params)
        this.$axios
          .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/addCaseHistory', params)
          .then(res => {
            console.log(res)
            this.delFrame()
            this.init()
          })
      }
    },
    delFrame () {
      document.getElementsByClassName('eTel_bomb')[0].style.opacity = '0'
      setTimeout(function () {
        document.getElementsByClassName('eTel_bomb')[0].style.display = 'none'
        document.getElementsByClassName('eTel_bomb')[0].style.paddingRight = '0'
      }, 200)
    },
    delArchives (id) {
      document.getElementsByClassName('eTel_bombOne')[0].style.display = 'block'
      setTimeout(function () {
        document.getElementsByClassName('eTel_bombOne')[0].style.opacity = '1'
        document.querySelector('.eTel_bomboxOne').style.transform = 'translateX(-' + 200 + ' px)'
      }, 50)
      document.getElementsByClassName('eTel_bombOne')[0].style.paddingRight = '17px'
      // this.del(id)
      this.delId = id
    },
    closeDel () {
      document.getElementsByClassName('eTel_bombOne')[0].style.opacity = '0'
      document.querySelector('.eTel_bomboxOne').style.transform = 'translateX(-' + 0 + ' px)'
      setTimeout(function () {
        document.getElementsByClassName('eTel_bombOne')[0].style.display = 'none'
        document.getElementsByClassName('eTel_bombOne')[0].style.paddingRight = '0'
      }, 200)
    },
    del () {
      let params = {
        'cid': this.delId
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/delCaseHis', params)
        .then(res => {
          this.closeDel()
          this.init()
        })
    },
    showDetail (val) {
      document.getElementsByClassName('eTel_bombTwo')[0].style.display = 'block'
      setTimeout(function () {
        document.getElementsByClassName('eTel_bombTwo')[0].style.opacity = '1'
        document.querySelector('.eTel_bomboxTwo').style.transform = 'translateX(-' + 200 + ' px)'
      }, 50)
      document.getElementsByClassName('eTel_bomb')[0].style.paddingRight = '17px'
      let params = {
        'sjc': val
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getCaseHistoryBySjc', params)
        .then(res => {
          console.log(res)
          this.report = res.data.dataList.caseHistory.obj[0]
        })
    },
    hideDetail () {
      document.getElementsByClassName('eTel_bombTwo')[0].style.opacity = '0'
      document.querySelector('.eTel_bombox').style.transform = 'translateX(-' + 0 + ' px)'
      setTimeout(function () {
        document.getElementsByClassName('eTel_bombTwo')[0].style.display = 'none'
        document.getElementsByClassName('eTel_bomb')[0].style.paddingRight = '0'
      }, 200)
    }
  }
}
</script>

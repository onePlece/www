<template>
    <div class="eHea_box">
      <!--账户余额-->
      <div class="eAcc_balance">
        <h5 class="eAcc_baMoney">账户余额</h5>
        <p class="eAcc_last">账户余额: {{myMoney}}元</p>
        <a class="eAcc_add" @click="chatShow">充值</a>
      </div>
      <h5 class="eAcc_baMoney">交易记录</h5>
      <!--有内容-->
      <div class="eTel_ListBoxOne">
        <p class="eHea_personal eHea_transaction" v-for="item in record" :key="item.id">
          <span>{{item.kinds | paymentKind}}</span>
          <span>{{item.yeorno}}</span>
          <span>-{{item.money}}元</span>
          <a class="payment-date">{{item.date | dateFilter('YYYY-MM-DD')}}</a>
        </p>
        <mo-paging :page-index="page" :page-size="pageSize" @change="pageChange" :total="count"></mo-paging>
      </div>
      <!--弹框详情-->
      <div class="eTel_bomb">
        <div class="eTel_bombox">
          <a class="eTel_bombClose" @click="chatHide">×</a>
          <div v-show="chatCode!=200">
            <form class="eMes_box" role="form" action="" name="signUpForm" method="post">
                    <span class="mpForm_text">
                        <i>*</i>充值金额：
                    </span>
              <input class="mpForm_inputOne" v-model="myPhone" type="number" name="myPhone" required/>元
              <div class="chatBox">
                <p class="chatP">支付方式：</p>
                <div class="over_flow">
                  <div class="chat_zhifu">
                    <input class="chat_zhifuBtn" type="button" />
                    <span class="bill-payment">中国最大的第三方支付</span>
                  </div>
                  <div class="chat_weixin" @click="myChat()">
                    <input class="chat_weixinBtn" type="button" />
                    <span class="bill-payment">微信扫一扫支付，更便捷</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div v-show="this.chatCode === '200'">
            <p class="chatPp">请用微信扫码支付</p>
            <img class="eTel_bomboxPic" :src="myPic"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import MoPaging from '../../../components/MoPaging'
import qs from 'qs'
export default {
  name: 'min-acc',
  components: {
    MoPaging
  },
  data () {
    return {
      myMoney: '',
      page: 1,
      pageSize: 8,
      count: '',
      record: [],
      myPhone: '',
      chatCode: '',
      myPic: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var uid = document.cookie.match(/uid=(\S*);/)[1]
      let params = {
        'uid': uid
      }
      params = qs.stringify(params)
      this.$axios
        .post(
          'http://www.hao-yisheng.com/AKHYSKJApp/hys/getPerCount',
          params
        )
        .then(res => {
          this.myMoney = res.data.dataList.money
          // this.$router.push("/article/consulting");
          this.pageChange(1)
        })
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
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getPerBillByPer', params)
        .then(res => {
          this.record = res.data.dataList.dataList.dataList.obj
          this.count = res.data.dataList.dataList.totalRecord
        })
    },
    chatShow: function () {
      document.getElementsByClassName('eTel_bomb')[0].style.display = 'block'
      setTimeout(function () {
        document.getElementsByClassName('eTel_bomb')[0].style.opacity = '1'
        document.querySelector('.eTel_bombox').style.transform = 'translateX(-' + 200 + ' px)'
      }, 50)
      document.getElementsByClassName('eTel_bomb')[0].style.paddingRight = '17px'
    },
    chatHide: function () {
      document.getElementsByClassName('eTel_bomb')[0].style.opacity = '0'
      document.querySelector('.eTel_bombox').style.transform = 'translateX(-' + 200 + ' px)'
      setTimeout(function () {
        document.getElementsByClassName('eTel_bomb')[0].style.display = 'none'
        document.getElementsByClassName('eTel_bomb')[0].style.paddingRight = '0'
      }, 200)
    },
    myChat: function () {
      if (this.myPhone === '') {
        alert('充值金额不能为空')
      } else {
        var uid = document.cookie.match(/uid=(\S*);/)[1]
        let params = {
          'body': '微信充值',
          'total_fee': this.myPhone,
          'type': 'cz',
          'uid': uid,
          'kind': '',
          'ddh': ''
        }
        params = qs.stringify(params)
        this.$axios
          .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/prepayidH5', params)
          .then(res => {
            console.log(res)
            this.chatCode = res.data.code
            console.log(this.chatCode)
            if (this.chatCode === '200') {
              this.myPic = res.data.dataList.dataList.code_url
              this.myPic = 'http://' + this.myPic
            }
          })
      }
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="homePage">
    <nav-header></nav-header>
    <ban-ner></ban-ner>
    <div id="main" class="container">
      <!--左侧-->
      <div id="main-left">
        <!--家庭医生-->
        <div id="homeDoctor">
          <h1>预约就诊&nbsp;&nbsp;<span>预约全国知名专家</span><a>更多</a></h1>
          <div id="hDoctor">
            <three-banner></three-banner>
          </div>
        </div>
        <!--专家预约-->
        <div id="SpecList">
          <h1>专家预约 <span>快速转诊 专家咨询</span></h1>
          <ul id="SpecLi">
            <li id="Sone">
              <h3>
                <span>北京</span>
                <i>不限</i>
                <a>切换</a>
              </h3>
              <input type="text" placeholder="请输入你要预约的医院">
              <input type="text" placeholder="请选择科室">
              <img src="../../../static/img/kuaisu.png">
              <button type="button">预约转诊</button>
            </li>
            <li id="Stwo">
              <img src="../../../static/img/VCG21409072210.png">
              <h3>电话咨询</h3>
              <h4>享受高端服务</h4>
              <button type="button">立即咨询</button>
            </li>
            <li id="Sthree">
              <img src="../../../static/img/VCG41587163056.png">
              <h3>预约手术</h3>
              <h4>全国三甲级医院</h4>
              <button type="button">立即预约</button>
            </li>
          </ul>
        </div>
        <!--健康咨询-->
        <div id="heaCon">
          <h1><em>健康咨询&nbsp;&nbsp;</em><span>关注健康，享受生活</span><a>更多</a></h1>
          <div class="ConSame">
            <h4>专家谈</h4>
            <!--<img src="../../../static/img/jkzx1542677600526306301.jpg">-->
            <img :src=expertImg>
            <h5>{{expertDatas}}</h5>
            <p class="heaSame">分类：{{expertsze}}</p>
            <p class="heaSame">作者:{{expertauthor}}<a class="ConDetail">[详细]</a></p>
            <p class="healArticle" v-for="(item,index) in experttotal" :key="item.id" v-if="index<6"><a href="">{{item.jkzxtop | capitalize}}</a><time>{{operationDate(item)}}</time></p>
          </div>
          <div class="ConSame Conright">
            <h4>健康</h4>
            <img src="../../../static/img/jkzx1542677600526306301.jpg">
            <h5>{{dataMesDatas}}</h5>
            <p class="heaSame">分类：{{dataMessze}}</p>
            <p class="heaSame">作者: {{dataMesauthor}}<a class="ConDetail">[详细]</a></p>
            <p class="healArticle" v-for="(item,index) in dataMes" :key="item.id" v-if="index<6"><a href="">{{item.jkzxtop | capitalize}}</a><time>{{operationDate(item)}}</time></p>
          </div>
        </div>
        <!--健康商城-->
        <div id="healShop">
          <h1>健康商城&nbsp;&nbsp;<span>关注健康，享受生活！</span><a>更多</a></h1>
          <ul id="ShopList">
            <li>
              <img src="../../../static/img/000.png">
              <div class="ShopIntro">
                <p>
                  <span>家用测压仪</span>
                  <em>7人评价</em>
                </p>
                <div class="healtrade">
                  <span>$69.00</span>
                  <button type="button">立即购买</button>
                </div>
              </div>
            </li>
            <li>
              <img src="../../../static/img/000.png">
              <div class="ShopIntro">
                <p>
                  <span>家用测压仪</span>
                  <em>7人评价</em>
                </p>
                <div class="healtrade">
                  <span>$69.00</span>
                  <button type="button">立即购买</button>
                </div>
              </div>
            </li>
            <li>
              <img src="../../../static/img/000.png">
              <div class="ShopIntro">
                <p>
                  <span>家用测压仪</span>
                  <em>7人评价</em>
                </p>
                <div class="healtrade">
                  <span>$69.00</span>
                  <button type="button">立即购买</button>
                </div>
              </div>
            </li>
            <li>
              <img src="../../../static/img/000.png">
              <div class="ShopIntro">
                <p>
                  <span>家用测压仪</span>
                  <em>7人评价</em>
                </p>
                <div class="healtrade">
                  <span>$69.00</span>
                  <button type="button">立即购买</button>
                </div>
              </div>
            </li>
            <li>
              <img src="../../../static/img/000.png">
              <div class="ShopIntro">
                <p>
                  <span>家用测压仪</span>
                  <em>7人评价</em>
                </p>
                <div class="healtrade">
                  <span>$69.00</span>
                  <button type="button">立即购买</button>
                </div>
              </div>
            </li>
            <li>
              <img src="../../../static/img/000.png">
              <div class="ShopIntro">
                <p>
                  <span>家用测压仪</span>
                  <em>7人评价</em>
                </p>
                <div class="healtrade">
                  <span>$69.00</span>
                  <button type="button">立即购买</button>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>
      <!--右侧-->
      <div id="main-right">
        <!--第一个-->
        <div id="Rfirst">
          <p>专为汶上老百姓开通的便捷入口</p>
          <button type="button">点击进入&nbsp;>></button>
        </div>
        <!--第二个-->
        <div id="Rsecond">
          <img src="../../../static/img/zhao.png">
          <a class="seePic">
            <img src="../../../static/img/tupian.png">
            <h4>图片看片</h4>
            <p>使用图文、语音与医生沟通</p>
          </a>
          <a class="seePic">
            <img src="../../../static/img/tupian.png">
            <h4>图片看片</h4>
            <p>使用图文、语音与医生沟通</p>
          </a>
          <div id="Hpic">
            <img src="../../../static/img/pic.png" alt="">
          </div>
        </div>
        <!--第三个-->
        <div id="FamDoc">
          <h2>名医风采<a>更多</a></h2>
          <div id="FamDocList">
            <div class="FamA">
              <div class="FamImg">
                <img class="headphoto" src="../../../static/img/picpicpic.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
              </div>
              <h3>郑亚民<span>普外科</span></h3>
              <p class="FamJob">副主任医师、副教授</p>
              <p class="HosPital">首都医科大学</p>
              <p class="Introduce">
                擅长：肝胆外科疾病:胆石病（胆囊结石 肝内外胆管结石）肝胆肿瘤（肝癌  ...
              </p>
            </div>
            <div class="FamA">
              <div class="FamImg">
                <img class="headphoto" src="../../../static/img/picpicpic.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
              </div>
              <h3>郑亚民<span>普外科</span></h3>
              <p class="FamJob">副主任医师、副教授</p>
              <p class="HosPital">首都医科大学</p>
              <p class="Introduce">
                擅长：肝胆外科疾病:胆石病（胆囊结石 肝内外胆管结石）肝胆肿瘤（肝癌  ...
              </p>
            </div>
            <div class="FamA">
              <div class="FamImg">
                <img class="headphoto" src="../../../static/img/picpicpic.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
                <img class="Famstar" src="../../../static/img/star1212Y.png">
              </div>
              <h3>郑亚民<span>普外科</span></h3>
              <p class="FamJob">副主任医师、副教授</p>
              <p class="HosPital">首都医科大学</p>
              <p class="Introduce">
                擅长：肝胆外科疾病:胆石病（胆囊结石 肝内外胆管结石）肝胆肿瘤（肝癌  ...
              </p>
            </div>
          </div>
        </div>
        <!--第四个-->
        <div id="CooperHospital">
          <h2>合作医院<a>更多</a></h2>
          <a class="C_hospit">
            <img src="../../../static/img/hospitals.jpg">
            <h4>石家庄栾城医院</h4>
            <p class="C_position">二级甲等</p>
            <p class="C_address">地址：河北省石家庄市栾城区鑫源路36号</p>
          </a>
          <a class="C_hospit">
            <img src="../../../static/img/hospitals.jpg">
            <h4>石家庄栾城医院</h4>
            <p class="C_position">二级甲等</p>
            <p class="C_address">地址：河北省石家庄市栾城区鑫源路36号</p>
          </a>
        </div>
      </div>
    </div>
    <foot-er></foot-er>
    <foot-bo></foot-bo>
  </div>
</template>
<script>
import NavHeader from '../../components/NavHeader'
import BanNer from '../../components/BanNer'
import ThreeBanner from '../../components/ThreeBanner'
import FootEr from '../../components/FootEr'
import FootBo from '../../components/FootBo'
import qs from 'qs'
export default {
  components: {
    NavHeader,
    BanNer,
    ThreeBanner,
    FootEr,
    FootBo
  },
  data () {
    return {
      experttotal: [],
      expertDatas: '',
      expertImg: '',
      expertsze: '',
      expertauthor: '',
      dataMes: [],
      dataMesDatas: '',
      dataMessze: '',
      dataMesauthor: ''
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
        'wzgroup': '专家讲堂',
        'jkzxtop': ''
      }
      params = qs.stringify(params)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getJkzxBylike', params)
        .then(res => {
          this.experttotal = res.data.dataList.jkzx.dataResult.dataList.obj
          this.expertDatas = this.experttotal[0].jkzxtop
          this.expertImg = this.experttotal[0].fileurl
          this.expertsze = this.experttotal[0].wzgroup
          this.expertauthor = this.experttotal[0].author
        })
      var param = {
        'pageNum': 1,
        'pageSize': 12,
        'wzgroup': '健康',
        'jkzxtop': ''
      }
      param = qs.stringify(param)
      this.$axios
        .post('http://www.hao-yisheng.com/AKHYSKJApp/hys/getJkzxBylike', param)
        .then(res => {
          this.dataMes = res.data.dataList.jkzx.dataResult.dataList.obj
          this.dataMesDatas = this.dataMes[0].jkzxtop
          this.dataMessze = this.dataMes[0].wzgroup
          this.dataMesauthor = this.dataMes[0].author
        })
    }
  }
}
</script>

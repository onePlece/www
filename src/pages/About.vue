<template>
  <div id='About'>
    <nav-header></nav-header>
    <div id='A_main' class='container'>
      <h1>关于我们</h1>
      <div id='A_text'>
        <ol class='Aleft'>
          <li v-for='(item,index) in tabs' :key='item.id' :class='{active:index == num}' @click='tab(index)'>{{item}}
          </li>
        </ol>
        <ul class='Aright'>
          <li v-for='(itemCon,index) in tabContents' :key='itemCon.id' v-show='index == num'>
            <h4 class='bText_title'>{{itemCon.title}}</h4>
            <p class='bText_cont'>{{itemCon.cont1}}</p>
            <p class='bText_cont'>{{itemCon.cont2}}</p>
            <p class='bText_cont'>{{itemCon.cont3}}</p>
            <p class='bText_cont'>{{itemCon.cont4}}</p>
            <p class='bText_cont'>{{itemCon.cont5}}</p>
            <p class='bText_cont'>{{itemCon.cont6}}</p>
            <div class='bText_img over_flow'>
              <img :src='itemCon.imgUrl1'>
              <img :src='itemCon.imgUrl2'>
              <img :src='itemCon.imgUrl3'>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <foot-er></foot-er>
    <foot-bo></foot-bo>
  </div>
</template>
<script>
/* eslint-disable */
  import NavHeader from '../components/NavHeader.vue'
  import FootEr from '../components/FootEr.vue'
  import FootBo from '../components/FootBo.vue'
  import imgurl1 from '../../static/img/desk.jpg'
  import imgurl2 from '../../static/img/deskds.jpg'
  import imgurl3 from '../../static/img/culture.jpg'
  import imgurl4 from '../../static/img/cultures.jpg'
  /* eslint-disable */
  export default {
    components: {
      NavHeader,
      FootEr,
      FootBo,
    },
    data() {
      return {
        tabs: ['公司简介', '企业文化', '我们的优势'],
        tabContents: [
          {
            title: '安康好一生医疗集团有限公司简介：',
            cont1: '司成立于2016年8月，注册资本一亿元人民币，主要从事互联网信息服务；技术推广服务；会议服务；销售Ⅰ类Ⅱ类医疗器械等业务。公司作为《中国医药教育协会移动医疗专业委员会》（隶属于中国医药教育协会的二级学会）的唯一挂靠单位，平台上近千名专家，技术精湛，学术精深，医德高尚，服务精细。',
            cont2: '公司统筹线上线下两个平台，线上业务总部设在北京，以信息技术为载体设立北京互联网医院，以科研、大数据、市场推广、远程诊断、在线咨询、预约挂号、网上教育与培训等为业务重点，进行全国的推广。线下业务放在济宁，建设实体的三级甲等医院，随着业务的发展，再选择区域中心，与当地具有影响力的医院合作建设合作医院，进行全国的覆盖。',
            cont3: '公司本着诚信经营，高品质服务的理念，将深入基层，将病人留在基层，将知名专家输送到基层，打破资源垄断，解决基层医疗的稀缺性。让基层广大人民群众不用离乡，就能够享受到全国一流水平的诊断、治疗、预防和保健。并将一流的诊断技术、手术水平、预防保健知识传播到基层医疗单位，提高当地医院的医疗水平。',
            imgUrl1: imgurl1,
            imgUrl2: imgurl2,
            imgUrl3: imgurl1,
          },
          {
            title: '好一生企业文化：',
            cont1: '司成立于2016年8月，注册资本一亿元人民币，主要从事互联网信息服务；技术推广服务；会议服务；销售Ⅰ类Ⅱ类医疗器械等业务。公司作为《中国医药教育协会移动医疗专业委员会》（隶属于中国医药教育协会的二级学会）的唯一挂靠单位，平台上近千名专家，技术精湛，学术精深，医德高尚，服务精细。',
            cont2: '公司统筹线上线下两个平台，线上业务总部设在北京，以信息技术为载体设立北京互联网医院，以科研、大数据、市场推广、远程诊断、在线咨询、预约挂号、网上教育与培训等为业务重点，进行全国的推广。线下业务放在济宁，建设实体的三级甲等医院，随着业务的发展，再选择区域中心，与当地具有影响力的医院合作建设合作医院，进行全国的覆盖。',
            cont3: '公司肩负着深入推进健康中国计划的重任，承担着提高基层卫生技术人员的技术水平、改善基层卫生设施，保基本、强基层的医改任务有效推进、和面向医务工作者和社区开展专业培训、健康教育及健康促进活动；动员组织医药企业和社会各界参与“慢病防治健康行”国家示范项目的活动。',
            cont4: '公司本着诚信经营，高品质服务的理念，将深入基层，将病人留在基层，将知名专家输送到基层，打破资源垄断，解决基层医疗的稀缺性。让基层广大人民群众不用离乡，就能够享受到全国一流水平的诊断、治疗、预防和保健。并将一流的诊断技术、手术水平、预防保健知识传播到基层医疗单位，提高当地医院的医疗水平。',
            imgUrl1: imgurl3,
            imgUrl2: imgurl4
          },
          {
            title: '我们的优势：',
            cont1: '公司成立于2016年8月，注册资本一亿元人民币，主要从事互联网信息服务；技术推广服务；会议服务；销售Ⅰ类Ⅱ类医疗器械等业务。公司作为《中国医药教育协会移动医疗专业委员会》（隶属于中国医药教育协会的二级学会）的唯一挂靠单位，平台上近千名专家，技术精湛，学术精深，医德高尚，服务精细。',
            cont2: '1.公司统筹线上线下两个平台，线上业务总部设在北京，以信息技术为载体设立北京互联网医院。',
            cont3: '2.以科研、大数据、市场推广、远程诊断、在线咨询、预约挂号、网上教育与培训等为业务重点，进行全国的推广。',
            cont4: '3.线下业务放在济宁，建设实体的三级甲等医院，随着业务的发展，再选择区域中心，与当地具有影响力的医院合作建设合作医院，进行全国的覆盖。',
            cont5: '4.公司本着诚信经营，高品质服务的理念，将深入基层，将病人留在基层，将知名专家输送到基层，打破资源垄断，解决基层医疗的稀缺性。',
            cont6: '5.让基层广大人民群众不用离乡，就能够享受到全国一流水平的诊断、治疗、预防和保健。并将一流的诊断技术、手术水平、预防保健知识传播到基层医疗单位，提高当地医院的医疗水平。',
            imgUrl1: imgurl3,
            imgUrl2: imgurl4
          }
        ],
        num: ''
      }
    },
    methods: {
      tab(index) {
        this.num = index
    }
  }
}
</script>

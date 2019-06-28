<template>
    <div class='operAtion'>
      <nav-header></nav-header>
      <ban-ner></ban-ner>
      <div id='oPer' class='container'>
        <!--第一行-->
        <div class='aHead'>
          <p class='aHead_all'>找到<span>12</span>位医生</p>
          <div class='aDepartment'>
            科室:
            <span>外科</span>
            <span>外科</span>
            <span>外科</span>
            <span>外科</span>
            <span>外科</span>
          </div>
          <div class='aDepartment'>
            外科:
            <span>普外科</span>
            <span>普外科</span>
            <span>普外科</span>
            <span>普外科</span>
            <span>普外科</span>
            <span>普外科</span>
          </div>
        </div>
        <div class='aSort'>
          <span>综合</span>
          <span>好评量</span>
          <span>问诊量</span>
          <span>价格</span>
        </div>
      </div>
      <foot-er></foot-er>
      <foot-bo></foot-bo>
    </div>
</template>

<script>
import NavHeader from '../components/NavHeader.vue'
import BanNer from '../components/BanNer.vue'
import FootEr from '../components/FootEr.vue'
import FootBo from '../components/FootBo.vue'
export default {
  components: {
    NavHeader,
    BanNer,
    FootEr,
    FootBo
  }
}
</script>

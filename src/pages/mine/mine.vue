<template>
    <div>
      <nav-header></nav-header>
      <div class="eBox">
        <div class="container">
          <!--头部-->
          <h4 class="eHead">个人中心</h4>
          <!--内容-->
          <div class="eWrap over_flow">
            <!--Left-->
            <div class="eLeft">
              <!--头像-->
              <div class="eLeft_head">
                <img src="../../../static/img/picpicpic.png" class="eLeft_hPic">
                <p class="eLeft_hMes">13373391051</p>
                <a class="eLeft_hMod">
                  <img src="../../../static/img/write.png" alt="">
                  完善资料
                </a>
              </div>
              <!--列表-->
              <ul class="eLeft_list">
                <h5>订单管理</h5>
                <li>
                  <router-link to="/mine/minorder">预约就诊订单</router-link>
                  <!--<a>预约就诊订单</a>-->
                  <!--<a>电话咨询订单</a>-->
                  <!--<a>专家看片订单</a>-->
                  <!--<a>预约转诊订单</a>-->
                  <!--<a>预约手术订单</a>-->
                </li>
                <h5>我的服务</h5>
                <li>
                  <!--<a>健康档案</a>-->
                  <router-link to="/mine/minhea">健康档案</router-link>
                </li>
                <h5>我的账户</h5>
                <li>
                  <router-link to="/mine/minacc">健康账户</router-link>
                </li>
                <h5>更多设置</h5>
                <li>
                  <router-link to="/mine/minnum">账号设置</router-link>
                  <router-link to="/mine/message">意见反馈</router-link>
                </li>
              </ul>
            </div>
            <!--Right-->
            <div class="eRight">
              <router-view/>
            </div>
          </div>
        </div>
      </div>
      <foot-er class="minfoot"></foot-er>
      <foot-bo></foot-bo>
    </div>
</template>

<script>
import NavHeader from '../../components/NavHeader'
import FootEr from '../../components/FootEr'
import FootBo from '../../components/FootBo'
export default {
  components: {
    NavHeader,
    FootEr,
    FootBo
  }
}
</script>

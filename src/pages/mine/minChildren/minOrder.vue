<template>
  <div class="eHea_box">
    <h5 class="eHea_title">我的预约就诊订单</h5>
    <ol class="eTel_nav over_flow">
      <li><router-link to="/mine/minOrder/minorderone">待付款</router-link></li>
      <li><a>待服务</a></li>
      <li><a>待评价</a></li>
      <li><a>已完成</a></li>
    </ol>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mine-order'
}
</script>

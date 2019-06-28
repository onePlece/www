<template>
  <div class="eHea_box">
    <h5 class="eHea_title">个人信息<span>修改个人信息</span></h5>
    <ol class="eNum_nav over_flow">
      <li><router-link to="/mine/minnum/minset">个人信息</router-link></li>
      <li><router-link to="/mine/minnum/minpas">修改密码</router-link></li>
      <li><router-link to="/mine/minnum/minimg">头像设置</router-link></li>
    </ol>
    <div>
      <router-view/>
    </div>
  </div>
</template>

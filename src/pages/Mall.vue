<template>
    <div id='Mall'>
      <nav-header></nav-header>
      <div id='M_main' class='container'>
        <img src='../../static/img/wzhanjsbb.jpg'>
      </div>
      <foot-er></foot-er>
      <foot-bo></foot-bo>
    </div>
</template>
<script>
import NavHeader from '../components/NavHeader'
import FootEr from '../components/FootEr'
import FootBo from '../components/FootBo'
export default {
  components: {
    NavHeader,
    FootEr,
    FootBo
  }
}
</script>

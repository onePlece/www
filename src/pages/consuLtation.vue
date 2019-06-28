<template>
    <div class='consuLtation'>
      <nav-header></nav-header>
      <ban-ner></ban-ner>
      <div id='consuLtation' class='container'>
        <h1>远程会诊</h1>

      </div>
      <foot-er></foot-er>
      <foot-bo></foot-bo>
    </div>
</template>
<script>
import NavHeader from '../components/NavHeader'
import BanNer from '../components/BanNer'
import FootEr from '../components/FootEr'
import FootBo from '../components/FootBo'
export default {
  components: {
    NavHeader,
    BanNer,
    FootEr,
    FootBo
  }
}
</script>

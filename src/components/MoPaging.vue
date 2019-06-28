<template>
  <div class="container">
    <ul class="mo-paging">
      <li :class="['paging-item','paging-item--prev',{'paging-item--disabled':index===1}]" @click="prev">
        &lt;
      </li>
      <li :class="['paging-item','paging-item--first',{'paging-item--disabled':index===1}]" @click="first">
        首页
      </li>
      <li :class="['paging-item','paging-item--more']" v-if="showPrevMore">
        ...
      </li>
      <li :class="['paging-item',{'paging-item--current':index===pager}]" v-for="pager in pagers" @click="go(pager)" :key="pager.id">
        {{pager}}
      </li>
      <li :class="['paging-item','paging-item--more']" v-if="showNextMore">
        ...
      </li>
      <li :class="['paging-item', 'paging-item--last', {'paging-item--disabled' : index === pages}]" @click="last">
        尾页
      </li>
      <li :class="['paging-item', 'paging-item--next', {'paging-item--disabled' : index === pages}]" @click="next">
        &gt;
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['pageIndex', 'pageSize', 'total'],
  data () {
    return {
      perPages: 3,
      index: this.pageIndex,
      limit: this.pageSize,
      size: this.total || 1,
      showPrevMore: false,
      showNextMore: false
    }
  },
  methods: {
    prev () {
      if (this.index > 1) {
        this.go(this.index - 1)
      }
    },
    next () {
      if (this.index < this.pages) {
        this.go(this.index + 1)
      }
    },
    first () {
      if (this.index !== 1) {
        this.go(1)
      }
    },
    last () {
      if (this.index !== this.pages) {
        this.go(this.pages)
      }
    },
    go (page) {
      if (this.index !== page) {
        this.index = page
        this.$emit('change', this.index)
      }
    }
  },
  computed: {
    pages () {
      return Math.ceil(this.size / this.limit)
    },
    pagers () {
      let array = []
      let perPages = this.perPages
      let pageCount = this.pages
      let current = this.index
      let _offset = (perPages - 1) / 2
      let offset = {
        start: current - _offset,
        end: current + _offset
      }
      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start)
        offset.start = 1
      }
      if (offset.end > pageCount) {
        offset.start = offset.start - (offset.end - pageCount)
        offset.end = pageCount
      }
      if (offset.start < 1) offset.start = 1

      // eslint-disable-next-line
      this.showPrevMore = offset.start > 1
      // eslint-disable-next-line
      this.showNextMore = offset.end < pageCount

      for (let i = offset.start; i <= offset.end; i++) {
        array.push(i)
      }
      return array
    }
  },

  watch: {
    pageIndex (val) {
      this.index = val || 1
    },
    pageSize (val) {
      this.limit = val || 10
    },
    total (val) {
      this.size = val || 1
    }
  }
}
</script>


<template>
  <div class="search-nav">
    <a href="#" class="search-nav-icon" @click="changePanel1">
      <img src="../images/search.png" alt="" style="width: 25px;">
      <span>十代雅阁</span>
    </a>
  </div>
</template>

<script>
  export default {
    name: "SearchNav",
    props:{
      changePanel: Function
    },
    methods:{
      changePanel1(){
        this.changePanel();
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import '../../../common/stylus/mixins.styl'
  .search-nav
    width 100%
    height: 60px
    background-color: #fff
    border-bottom-1px(#ccc)
    position fixed
    top 0
    left 0
    z-index 998
    display flex
    justify-content center
    align-items center
    .search-nav-icon
      width: 90%
      height: 70%
      background-color: #e8e8e8
      display flex
      justify-content center
      align-items center
      border-radius 5px
      span
        color #aaa
        font-size 20px
        font-weight lighter
        margin-left 12px
</style>

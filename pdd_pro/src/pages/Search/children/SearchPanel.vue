<template>
  <div class="search-panel">
    <div class="search-panel-nav">
      <div class="search-panel-input">
        <img src="../images/search.png" alt="" width="25px">
        <input ref="myInput" type="text" placeholder="十代雅阁">
      </div>
      <button @click="changepanel2">返回 ></button>
    </div>
    <div class="search-panel-content">
      <div class="title">
        <img src="../images/hot.png" alt="" width="25">
        <span>热门搜索</span>
      </div>
      <ul>
        <li>抽纸批发</li>
        <li>浴巾可穿</li>
        <li>石榴水果</li>
        <li>冰箱收纳盒</li>
        <li>摸金衣服</li>
        <li>小白鞋</li>
        <li>男士小皮鞋</li>
        <li>连衣裙夏</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchPanel",
    props:{
      changePanel1: Function
    },
    methods: {
      changepanel2(){
        this.changePanel1();
      }
    },
    mounted(){
      this.$refs.myInput.focus();
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .search-panel
    width 100%
    height 100%
    background-color: #fff
    position fixed
    top 0
    left 0
    z-index 1000
    .search-panel-nav
      width: 100%
      height: 60px
      border-bottom-1px(#ddd)
      padding 0 0 0 16px
      display flex
      flex-direction row
      justify-content space-between
      align-items center
      .search-panel-input
        display flex
        flex-direction row
        align-items  center
        width: 85%
        height: 38px
        background-color: #ededed
        border-radius 8px
        padding 0 10px
        input
          width: 90%
          height: 100%
          padding-left 10px
          font-size 16px
          background-color: #ededed
          outline none
      button
        color black
        font-size 18px
        background-color: transparent
    .search-panel-content
      padding 25px
      .title
        font-size 24px
        font-weight bold
        color black
        margin-bottom 35px
        width: 100%
        background-color: #ccc
        border-radius 8px
        height: 48px
        display flex
        align-items center
      ul
        width: 100%
        display flex
        flex-direction row
        flex-wrap wrap
        li
          width: 30%
          height: 34px
          background-color: #ccc
          display flex
          align-items center
          margin-right 10px
          margin-bottom 10px
          font-size 16px
          border-radius 8px
          padding-left 6px
          overflow-x hidden



</style>

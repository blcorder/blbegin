<template>
  <div class="cell" @click="clickCell">
    <div class="cell-left" :style="{color: leftTitleColor}">
      <i :class="leftIcon"></i>
      <span>{{leftTitle}}</span>
    </div>
    <div class="cell-right" :style="{color: rightTitleColor}">
      <span>{{rightTitle}}</span>
      <i class="itlike-uniE909" v-show="isShowRightArrow" ></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MeSell",
    props: {
      leftTitle:{type: String, default: ''},
      leftIcon:{type: String, default: ''},
      rightTitle:{type: String, default: ''},
      leftTitleColor:{type: String, default: ''},
      rightTitleColor:{type: String, default: ''},
      isShowRightArrow:{type: Boolean, default: true},
      clickCell:{type: Function, default: () => {}}
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .cell
    height: 44px
    background-color: #fff
    display flex
    justify-content space-between
    align-items center
    padding: 0 10px
    border-bottom 1px solid #ccc
    .cell-left
    .cell-right
      display flex
      justify-content center
      align-items center
      i
        margin-right 10px

</style>

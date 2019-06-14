<template>
  <a class="recommend-item">
    <img :src="item.thumb_url" alt="" style="width: 100%;">
    <p>{{item.short_name}}</p>
    <div class="recommend-item-bottom">
      <span class="price">{{item.normal_price / 10}}</span>
      <span class="count">已拼{{item.cnt / 10000}}w件</span>
    </div>
    <button class="btn" @click="addShopCar(item)">加入购物车</button>
  </a>
</template>

<script>
    export default {
        name: "shoplist",
        props:{
          item: Object,
          addShopCar: Function
        }
    }
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-item
    width: 49.5%
    float left
    background-color: #fff
    margin-bottom 15px
    padding-bottom 15px
    p
      margin-top 12px
      font-size 15px
      color black
      line-height 22px
      padding 0 4px
      overflow hidden
      height 22px
    .recommend-item-bottom
      position relative
      width: 100%
      height: 40px
      margin-top 14px
      line-height 35px
      .price
        font-size 22px
        color #f40
        font-weight bolder
        float left
        margin-left 6px
      .count
        float right
        font-size 15px
        color black
        margin-left 5px
        margin-right 7px
    .btn
      width: 90%
      height: 32px
      margin 0 0 0 5%
      display block
      background-color: #f40
      border none
      border-radius 4px
      color white
      font-size 18px

  .recommend-item:nth-child(2n)
    margin-left 1%
</style>

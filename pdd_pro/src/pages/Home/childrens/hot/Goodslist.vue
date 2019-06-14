<template>
  <div class="goods-list">
    <ul class="goods-all-li">
      <li class="goods-item" v-for="(item, index) in homegoods" :key="index">
        <img :src="item.image_url" alt="" style="width: 100%;">
        <h4 class="list-item-title">{{ item.goods_name}}</h4>
        <div class="list-item-bottom">
          <span class="item-price">￥{{ item.group.price /10 }}</span>
          <span class="item-counter">{{ item.sales_tip}}</span>
          <span class="item-user">
              <img :src="user.avatar" alt="" v-for="(user,index1) in item.bubble" :key="index1">
            </span>
          <span class="button-buy">
              <button>去拼单 ></button>
            </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "Goodslist",
    mounted(){
      this.$store.dispatch('reqHomeGoods')
    },
    computed:{
      ...mapState(['homegoods'])
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .goods-list
    margin-bottom 50px
    background-color: #f5f5f5
    .goods-all-li
      .goods-item
        margin-bottom 10px
        background-color: #fff
        display flex
        flex-direction column
        .list-item-title
          width: 94%
          margin-left 3%
          margin-top 10px
          line-height 22px
          height 44px
          overflow hidden
        .list-item-bottom
          margin 13px 0
          display flex
          flex-direction row
          justify-content space-around
          align-items center
          .item-price
            font-size 24px
            font-weight bold
            color #f40
            flex 1
            justify-content center
          .item-counter
            font-size 16px
            color rgba(0,0,0,.7)
            flex 2
            margin 0 8px 0
          .item-user
            display flex
            justify-content center
            align-items center
            flex 1
            img
              width: 40px
              border-radius 50%
          .button-buy
            flex 2
            button
              width 80%
              height 34px
              display flex
              justify-content center
              align-items center
              background-color: #f40
              color #fff
              border none
              font-size 17px
              margin-left 15px
</style>

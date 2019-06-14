<template>
  <div class="chat">
    <div v-if="true">
      <!--头部区域-->
      <div class="header">
        <a href="" class="icon_back"></a>
        <h3>购物车</h3>
        <a href="" class="icon_menu"></a>
      </div>
      <!--安全提示-->
      <div class="jd_safe_tip">
        <p class="tip_word">
          您正在安全购物环境中，请放心购物
        </p>
      </div>
      <!--中间的列表-->
      <main class="jd_shopCart_list">
        <section>
          <div class="shopCart_list_con" v-for="(item, index) in shopgoods" :key="index">
            <div class="list_con_left">
              <a
                href="javascript:;"
                class="cart_check_box"
                :checked="item.checked"
                @click.stop="singleGoodsSelected(item)"
              ></a>
            </div>
            <div class="list_con_right">
              <div class="shop_img">
                <img :src="item.thumb_url" alt="">
              </div>
              <div class="shop_con">
                <a href="">{{item.goods_name}}</a>
                <p class="shop_price">&yen;{{item.price | moneyFormat}}</p>
                <div class="shop_deal">
                  <div class="shop_deal_left">
                    <span @click.stop="changeCartGoodsCount1(item, false)">-</span>
                    <input type="tel" value="1" v-model="item.buy_count">
                    <span @click.stop="changeCartGoodsCount1(item, true)">+</span>
                  </div>
                  <div class="shop_deal_right" @click.stop="delSingleGoods(item)">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <!--底部通栏-->
      <div id="tab_bar">
        <div class="tab-bar-left">
          <a
            href="javascript:;"
            class="cart_check_box"
            :checked="isSelected"
            @click.stop="isAllSelected(isSelected)"
          ></a>
          <span style="font-size: 16px;">全选</span>
          <div class="select-all">
            合计：<span class="total-price">&yen;{{totalMoney | moneyFormat}}</span>
          </div>
        </div>
        <div class="tab-bar-right">
          <a href="#" class="pay">去结算</a>
        </div>
      </div>
    </div>
    <select-login v-else/>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  import {Toast, MessageBox} from 'mint-ui'
  import {getGoodsFromShopcar, removeGoodsFromCart} from '../../api/index'

  export default {
    name: "Chat",
    mounted() {
      this.getShopcarData();
    },
    methods: {
      ...mapActions(['reqShopcarData']),
      ...mapActions(['changeCartGoodsCount']),
      ...mapActions(['isAllGoodsSelected']),
      ...mapActions(['reqSingleGoodsSelected']),
      ...mapActions(['reqdelSingleGoods']),
      // 1.0 从后端请求购物车中的数据
      async getShopcarData() {
        // 1.1 取出每条商品的数据
        let result = await getGoodsFromShopcar();

        // 1.2 将取出的数据放到vuex中
        this.reqShopcarData(result.message);

        // 1.3 计算商品总价
        this.calculatorTotalPrice();
      },
      // 2.0 改变购物车中同一商品的数量
      changeCartGoodsCount1(goods, flag) {
        this.changeCartGoodsCount({goods: goods, flag: flag});
        // 计算商品总价
        this.calculatorTotalPrice();
      },
      // 3.0 是否全选
      isAllSelected(isSelected) {
        this.isSelected = !isSelected;
        this.isAllGoodsSelected({isSelected});
        // 计算商品总价
        this.calculatorTotalPrice();
      },
      // 4.0 计算商品总价
      calculatorTotalPrice(){
        let totalMoney = 0;
        this.shopgoods.forEach((item,index) => {
          if(item.checked){
            totalMoney += item.price * item.buy_count;
          }
        });
        this.totalMoney = totalMoney;
      },
      // 5.0 单个商品的选中
      singleGoodsSelected(goods){
        // 5.1 改变单个商品的选中与非选中
        this.reqSingleGoodsSelected({goods});
        // 5.2 计算商品总价
        this.calculatorTotalPrice();
        // 5.3 判断是否全选
        this.judgeIsAllSelected();
      },
      // 6.0 判断是否全选
      judgeIsAllSelected(){
        let flag = true;
        this.shopgoods.forEach((item,index) => {
          if(!item.checked){
            flag = false;
          }
        });
        this.isSelected = flag;
      },
      // 7.0 删除商品
      delSingleGoods(goods){
        MessageBox.confirm("确定要删除此商品？").then(action => {
          if ('confirm' === action) {
            removeGoodsFromCart(goods.id);
            this.reqdelSingleGoods({goods});
            this.calculatorTotalPrice();
          }
        });
      }
    },
    data() {
      return {
        totalMoney: 0,
        isSelected: false,
      }
    },
    computed: {
      ...mapState(['shopgoods'])
    },
    filters: {
      moneyFormat(money) {
        return money.toFixed(2)
      }
    }
  }
</script>


<style scoped lang="stylus" ref="stylesheet/stylus">
  .chat
    width 100%
    height 100%
    background-color #e0e0e0
    .header
      width: 100%;
      height: 44px;
      background: #ececec;
      -webkit-background-size: 1px 44px;
      background-size: 1px 44px;
      border-bottom: 1px solid #e0e0e0;
      position: fixed;
      left: 0;
      top: 0;
      display flex
      justify-content center
      align-items center
      font-size 18px
      font-weight bolder
      color #f40
      z-index 999
    .jd_safe_tip
      margin-top 44px
      height 36px
      line-height 36px
      border-bottom: 1px solid #e0e0e0;
      background-color #fff
      text-align center
      .tip_word
        display inline-block
        font-size 14px
        padding-left 20px
        position relative
        &:before
          content ''
          width 18px
          height 18px
          background url("./images/safe_icon.png") no-repeat
          -webkit-background-size 18px 18px
          background-size 18px 18px
          position absolute
          top 9px
          left 0
    .jd_shopCart_list
      margin-bottom 120px
      background-color #e0e0e0
      section
        margin-top 15px
        border-top 1px solid #e0e0e0
        background-color #fff
        .shopCart_list_con
          padding: 10px 0
          border-bottom 1px solid #e0e0e0
          .list_con_left
            .cart_check_box
              float left
              background url("./images/shop-icon.png") no-repeat
              -webkit-background-size 50px 100px
              background-size 50px 100px
              width 20px
              height 20px
              margin-top 17px
              margin-left 7px
            .cart_check_box[checked]
              background-position -25px 0
          .list_con_right
            overflow: hidden;
            padding: 0 7px;
            .shop_img
              float left
              img
                width 80px
                height 80px
                display block
            .shop_con
              overflow hidden
              padding-left 7px
              & > a
                font-size 14px
                color #666
                margin-left 5px
                line-height 20px
                height 40px
                overflow hidden
                display block
                text-decoration none
              .shop_price
                color #f40
                margin-top 25px
                margin-left 5px
                margin-bottom 10px
                font-size 18px
              .shop_deal
                margin-top 5px
                .shop_deal_left
                  float left
                  & > span
                    border 1px solid #e0e0e0
                    display inline-block
                    width 30px
                    height 25px
                    line-height 25px
                    text-align center
                    float left
                    &:first-child
                      border-top-left-radius 3px
                      border-bottom-left-radius 3px
                    &:last-child
                      border-top-right-radius 3px
                      border-bottom-right-radius 3px
                  input
                    border none
                    border-top 1px solid #e0e0e0
                    border-bottom 1px solid #e0e0e0
                    float left
                    width 50px
                    height 23px
                    text-align center
                .shop_deal_right
                  float right
                  & > span:first-child
                    background url('./images/delete_up.png') no-repeat
                    background-size 18px 4px
                    width 18px
                    height 4px
                    display block
                  & > span:last-child
                    background url('./images/delete_down.png') no-repeat
                    background-size 17px 17px
                    width 17px
                    height 17px
                    display block
                    margin-top -3px
    #tab_bar
      position: fixed
      left 0
      bottom 50px
      width 100%
      height 60px
      background-color #fff
      display flex
      justify-content space-between
      align-items center
      box-shadow 0 -5px 5px #e0e0e0
      border-bottom: 1px solid #e0e0e0
      .tab-bar-left
        display flex
        align-items center
        margin-left 7px
        .cart_check_box
          float left
          background url("./images/shop-icon.png") no-repeat
          -webkit-background-size 50px 100px
          background-size 50px 100px
          width 20px
          height 20px
          margin-top 4px
          margin-left 4px
        .cart_check_box[checked]
          background-position -25px 0
        .select-all
          margin-left 12px
          font-size 18px
          .total-price
            color #f40
            font-size 22px
      .tab-bar-right
        .pay
          width 90px
          height 44px
          background-color #f40
          display flex
          justify-content center
          align-items center
          font-size 18px
          color #fff
          text-decoration none
</style>


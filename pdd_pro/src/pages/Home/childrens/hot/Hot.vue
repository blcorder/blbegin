<template>
  <div class="hot">
    <!-- 轮播图-->
    <div class="swiper-container" v-if="homecasual.length > 0">
      <div class="swiper-wrapper" >
        <div class="swiper-slide" v-for="(casual, index) in homecasual" :key="index">
          <img :src="casual.imgurl" alt=""></div>
      </div>
      <!-- 分液器-->
      <div class="swiper-pagination"></div>
    </div>
    <!-- 中部导航-->
    <Hotnav/>
    <!-- 广告位-->
    <div class="hot-ad">
      <img src="../../imgs/hot_ad/home_ad.gif" alt="">
    </div>
    <!-- 商品列表-->
    <Goodslist/>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import Hotnav from './Hotnav'
  import Goodslist from './Goodslist'
  import {
    mapState
  } from 'vuex'

  export default {
    name: "Hot",
    mounted() {
      // 请求轮播图数据
      this.$store.dispatch('reqHomeCasual');
    },
    computed:{
      ...mapState(['homecasual'])
    },
    components:{
      Hotnav,
      Goodslist
    },
    watch:{
      homecasual(){
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            autoplay: true,
            loop: true,
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .hot
    width: 100%
    height: 100%
    padding-top 46px
    background-color: rgba(0,0,0,.06)
    img
      width 100%
      background-size cover
    .hot-ad
      background-color: #fff
      margin 8px 0
</style>

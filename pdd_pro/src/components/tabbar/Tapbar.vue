<template>
  <div class="bottom-tapbar">
      <span class="tap-item" @click="changeTo('/home')">
        <img :src="$route.path.includes('/home') ? tabBarImgArr[0].selected : tabBarImgArr[0].normal" alt="">
        <span :class="{on : '/home' === $route.path }">首页</span>
      </span>
    <span class="tap-item" @click="changeTo('/recommend')">
        <img :src=" '/recommend' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal" alt="">
        <span :class="{on : '/recommend' === $route.path }">推荐</span>
      </span>
    <span class="tap-item" @click="changeTo('/search')">
        <img :src=" '/search' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal" alt="">
        <span :class="{on : '/search' === $route.path }">搜索</span>
      </span>
    <span class="tap-item" @click="changeTo('/chat')">
        <img :src=" '/chat' === $route.path ? tabBarImgArr[3].selected : tabBarImgArr[3].normal" alt="">
        <span :class="{on : '/chat' === $route.path }">购物车</span>
      </span>
    <span class="tap-item" @click="changeTo('/me')">
        <img :src=" '/me' === $route.path ? tabBarImgArr[4].selected : tabBarImgArr[4].normal" alt="">
        <span :class="{on : '/me' === $route.path }">我的</span>
      </span>
  </div>
</template>

<script>
  export default {
    name: "tapbar",
    methods: {
      changeTo(path) {
        this.$router.replace(path);
      }
    },
    data() {
      return {
        tabBarImgArr: [
          {
            normal: require('./../../../static/img/icon_home.png'), selected:
              require('./../../../static/img/icon_home_selected.png')
          },
          {
            normal: require('./../../../static/img/icon_intro.png'), selected:
              require('./../../../static/img/icon_intro_selected.png')
          },
          {
            normal: require('./../../../static/img/icon_search.png'), selected:
              require('./../../../static/img/icon_search_selected.png')
          },
          {
            normal: require('./../../../static/img/icon_chat.png'), selected:
              require('./../../../static/img/icon_chat_selected.png')
          },
          {
            normal: require('./../../../static/img/icon_mine.png'), selected:
              require('./../../../static/img/icon_mine_selected.png')
          }
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .bottom-tapbar
    width 100%
    height 50px
    background-color #fff
    position fixed
    left 0
    bottom 0
    z-index 999
    display flex
    .tap-item
      display flex
      flex 1
      flex-direction column
      justify-content center
      align-items center
      font-size 14px
      coloe #666
      img
        width: 35%
        margin-bottom 2px
      .on
        color red
</style>

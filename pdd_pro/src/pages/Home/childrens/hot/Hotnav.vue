<template>
  <div class="hot-nav">
    <!-- 导航-->
    <div class="hot-nav-content">
      <div class="nav-content-inner" v-if="homenav.length > 0">
        <a href="" v-for="(item,index) in homenav " :key="index">
          <img :src="item.iconurl" alt="">
          <span>{{ item.icontitle}}</span>
        </a>
      </div>
    </div>
    <!-- 底部滚动条-->
    <div class="hot-nav-bottom-bar">
      <div class="active-bar" :style="activeBarStyle"></div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: "Hotnav",
    data(){
      return {
        // 屏幕的宽度
        screenW: window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth,
        // 滚动内容的宽度
        contentW: 720,
        // 滚动条的背景长度
        bgScrollBarW: 100,
        // 滚动条的长度
        scrollBarW: 0,
        // 鼠标落下的起始位置
        startX: 0,
        // 鼠标抬起时的位置
        endX : 0,
        // 移动的距离
        flagDis: 0,
        // 滚动条的left值
        barLeft: 0
      }
    },
    mounted(){
      this.getScrollBarW();
      this.bindEvent();
      this.$store.dispatch('reqHomeNav');
    },
    methods:{
      getScrollBarW(){
        this.scrollBarW = (this.screenW / this.contentW) * this.bgScrollBarW;
      },
      bindEvent(){
        this.$el.addEventListener('touchstart',this.handleTouchStart,false);
        this.$el.addEventListener('touchmove',this.handleTouchMove,false);
        this.$el.addEventListener('touchend',this.handleTouchEnd,false);
      },
      // 开始触摸
      handleTouchStart(event){
        this.startX = event.touches[0].pageX;
      },
      // 移动
      handleTouchMove(){
        let moveDis = event.touches[0].pageX - this.startX;
        this.barLeft = -(moveDis * (this.bgScrollBarW / this.contentW)) + this.flagDis;
        if(this.barLeft <= 0){
          this.barLeft = 0;
        }
        if(this.barLeft >= this.bgScrollBarW - this.scrollBarW){
          this.barLeft = this.bgScrollBarW - this.scrollBarW;
        }
      },
      // 抬起
      handleTouchEnd(){
        this.flagDis = this.barLeft;
      }

    },
    computed:{
      activeBarStyle(){
        return{
          width: `${this.scrollBarW}px`,
          left: `${this.barLeft}px`
        }
      },
      ...mapState(['homenav'])
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .hot-nav
    width 100%
    height 180px
    position relative
    background-color #fff
    padding-bottom 10px
    .hot-nav-content
      width 100%
      overflow-x scroll
      .nav-content-inner
        width 720px
        height 180px
        display flex
        flex-wrap wrap
        a
          width: 90px
          height: 90px
          display flex
          flex-direction column
          justify-content center
          align-items center
          text-decoration none
          color black
          font-size 15px
          img
            width: 50%
            margin-bottom 5px
    .hot-nav-content::-webkit-scrollbar
      display none
    .hot-nav-bottom-bar
      width 100px
      height 3px
      background-color: #ccc
      position absolute
      left 50%
      margin-left -50px
      .active-bar
        width 0
        height 100%
        background-color: red
        position absolute
        left 0

</style>

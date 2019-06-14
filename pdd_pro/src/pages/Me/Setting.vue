<template>
  <div class="setting">
    <div class="setting-top" @click="backSetting">
      <i> < </i>
      <span>设置</span>
    </div>
    <div class="setting-me" @click="backUserInfo">
      <img src="./images/me_icon.png" alt="">
      <span class="top-title">{{userinfo.user_cname}}</span>
      <span class="bottom-title">会员名:{{userinfo.user_cname}}</span>
      <i class="itlike-uniE909"></i>
    </div>
    <div class="setting-inner">
      <MeSell left-icon="itlike-1" leftTitle="我的收货地址"/>
    </div>
    <div class="setting-inner">
      <MeSell left-icon="itlike-2" leftTitle="账户与安全"/>
    </div>
    <div class="setting-inner">
      <MeSell left-icon="itlike-3" leftTitle="地区设置"/>
      <MeSell left-icon="itlike-1" leftTitle="音效与通知"/>
      <MeSell left-icon="itlike-2" leftTitle="隐私"/>
      <MeSell left-icon="itlike-3" leftTitle="通用"/>
    </div>
    <div class="setting-inner">
      <MeSell left-icon="itlike-1" leftTitle="问题反馈"/>
      <MeSell left-icon="itlike-2" leftTitle="关于手机淘宝"/>
    </div>
    <div class="log-out" @click="delLogOut">
      <span>退出当前账户</span>
    </div>
  </div>
</template>

<script>
  import MeSell from './MeSell'
  import {MessageBox} from 'mint-ui'
  import {mapActions , mapState} from 'vuex'

  export default {
    name: "Setting",
    components: {
      MeSell
    },
    methods: {
      ...mapActions(['reqLogOut']),
      delLogOut() {
        MessageBox.confirm("皇上真的要抛弃臣妾吗？").then(action => {
          if ('confirm' === action) {
            this.reqLogOut({});
            this.$router.replace('/me')
          }
        })
      },
      backSetting() {
        this.$router.replace('/me')
      },
      backUserInfo(){
        this.$router.replace('/userdetail')
      }
    },
    computed:{
      ...mapState(['userinfo'])
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .setting
    width: 100%
    height: 100%
    background-color: #f5f5f5
    position fixed
    top 0
    bottom 0
    z-index 1000
    .setting-me
      height 80px
      width: 100%
      background-color: #fff
      border-bottom 1px solid #ccc
      display flex
      align-items center
      padding-left 10px
      position relative
      img
        width: 60px
        height: 60px
        border-radius 50%
      i
        position absolute
        right 30px
      .top-title
        position absolute
        color black
        font-size 20px
        top 18px
        left 87px
      .bottom-title
        position absolute
        top 52px
        left 87px
        font-size 14px
        color rgba(0,0,0,.7)
    .setting-top
      height: 50px
      display flex
      align-items center
      padding-left 20px
      font-size 20px
      i
        margin-right 8px
    .setting-inner
      margin-bottom 10px
    .log-out
      width: 100%
      height: 50px
      line-height 50px
      text-align center
      color white
      font-size 20px
      background-color: #f40
      position absolute
      bottom 0

</style>

<template>
  <div id="app">
    <router-view></router-view>
    <tapbar/>
  </div>
</template>

<script>
  import Tapbar from './components/tabbar/Tapbar'
  export default {
    name: "App",
    components: {Tapbar},
    // created() {
    //   this.$store.dispatch('reqUserInfo')
    // }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  #app
    background-color: #f5f5f5
    height 100%
    width 100%
</style>

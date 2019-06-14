<template>
  <div class="me">
    <div v-if="userinfo.id">
      <MeTop/>
    </div>
    <SelectLogin v-else/>
  </div>
</template>

<script>
  import SelectLogin from '../login/SelectLogin'
  import MeTop from './MeTop'
  import {
    mapState
  } from 'vuex'
  export default {
    name: "Me",
    components:{
      SelectLogin,
      MeTop
    },
    computed:{
      ...mapState(['userinfo'])
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .me
    width: 100%
    height: 100%
    background-color: #f5f5f5
</style>

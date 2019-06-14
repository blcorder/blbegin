<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="changeItem"
      class="home-nav"
    >
    </ly-tab>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        selectedId: 0,
        items: [
          {label: '热门'},
          {label: '服饰'},
          {label: '鞋包'},
          {label: '母婴'},
          {label: '百货'},
          {label: '食品'},
          {label: '内衣'},
          {label: '男装'},
          {label: '电器'}
        ],
        options: {
          activeColor: '#e9232c'
        },
        childrensArr: [
          '/home/hot',
          '/home/clothes',
          '/home/shose',
          '/home/mother',
          '/home/hundreds',
          '/home/foods',
          '/home/underwear',
          '/home/manclose',
          '/home/electric'
        ]
      }
    },
    methods: {
      changeItem(item, index) {
        this.$router.replace(this.childrensArr[index]);
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .home
    width: 100%
    height: 100%
    background-color: #fff
    .home-nav
      position fixed
      top 0
      left 0
      z-index 998
</style>

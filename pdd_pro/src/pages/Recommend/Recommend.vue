<template>
  <div class="recommend-container">
    <div>
      <ul class="recommend">
        <shoplist
          v-for="(item, index) in recommendgoods"
          :key="index"
          :item=item
          :addShopCar="addShopCar"
        />
      </ul>
      <div class="pull-down" v-show="bottomFlag">
        <span>下拉加载更多</span>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  import {addGoodsShopcar} from '../../api/index'
  import shoplist from '../../components/shoplist/shoplist'
  import BScroll from 'better-scroll'
  import {Toast, Indicator} from 'mint-ui'
  export default {
    name: "Recommend",
    data() {
      return {
        page: 1,
        count: 4,
        refreshStartY:0,
        bottomFlag: false
      }
    },
    mounted() {
      Indicator.open('加载中...');
      this.$store.dispatch('reqRecommendGoods', {page: this.page, count: this.count, callback: ()=>{
        Indicator.close();
        }});
    },
    computed: {
      ...mapState(['recommendgoods'])
    },
    components: {
      shoplist
    },
    watch: {
      recommendgoods() {
        this.$nextTick(() => {
          this.recommendScroll();
          this.page = this.page + 1;
        })
      }
    },
    methods: {
      // 1.0 better-scroll滚动
      recommendScroll() {
        // 1.1 初始化滚动
        this.rencommendPanelScroll = new BScroll('.recommend-container', {
          click: true,
          scrollY: true,
          probeType: 3,
          startY:this.refreshStartY
        });
        // 1.2 监听列表的滚动结束
        this.rencommendPanelScroll.on('touchEnd', (pos) => {
          // console.log(pos.y);
          if (pos.y > 50) {
            console.log("上拉刷新");
          }
          if (pos.y < this.rencommendPanelScroll.maxScrollY - 100) {
            console.log("下拉加载更多");
            Indicator.open("加载中...");
            this.$store.dispatch('reqRecommendGoods', {page: this.page, count: this.count, callback: ()=>{
              Indicator.close();
              }});
            this.refreshStartY = pos.y;
          }
        });
        // 1.3 滚动结束刷新高度
        this.rencommendPanelScroll.on('scrollEnd', () => {
          this.rencommendPanelScroll.refresh();
        });
        // 1.4 滚动时监听滚动距离
        this.rencommendPanelScroll.on('scroll', (pos) => {

          if(pos.y < this.rencommendPanelScroll.maxScrollY - 100) {
            this.bottomFlag = true;
          }else{
            this.bottomFlag = false;
          }

        })
      },
      // 2.0 加商品到购物车
      async addShopCar(goods) {
        let normal_price = goods.normal_price / 10;
        let result = await addGoodsShopcar(goods.goods_id, goods.goods_name, goods.thumb_url,normal_price);
        if(result.success_code === 200){
          Toast({
            message: "加入购物车成功！",
            duration: 1000
          });
        }
      }
    }
  }
</script>
<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container
    width 100%
    height 100%
    background-color #f5f5f5
    overflow hidden
    .recommend
      display flex
      flex-direction row
      flex-wrap wrap
      padding-bottom 50px
    .pull-down
      height: 44px
      line-height 44px
      text-align center
</style>

<template>
  <div class="search">
    <!-- 头部搜索框-->
    <SearchNav
      :changePanel="changePanel"
    />

    <!-- 中部商品区-->
    <div class="shop">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item "
              v-for="(navtitle, index) in searchgoods"
              :key="index"
              :class="{current: index === currentIndex}"
              @click="clickScroll(index)"
              ref="menuList"
          >
            <span>{{ navtitle.name}}</span>
          </li>
        </ul>
      </div>
      <div class="shop-wrapper">
        <ul ref="shopsparent">
          <li class="shops-li" v-for="(navtitle, index1) in searchgoods" :key="index1">
            <div class="shops-title">
              <h4>{{ navtitle.name}}</h4>
              <a href="#">查看更多 ></a>
            </div>
            <ul class="phone-type" v-if="navtitle.tag === 'phone'">
              <li v-for="(phone, index) in navtitle.category" :key="index">
                <img :src="phone.icon" alt="">
              </li>
            </ul>
            <ul class="shop-items">
              <li v-for="(item, index2) in navtitle.items" :key="index2">
                <img :src="item.icon" alt="">
                <span>{{ item.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 搜索面板-->
    <SearchPanel
      v-if="isShow"
      :changePanel1="changePanel1"
    />
  </div>
</template>

<script>
  import SearchNav from './children/SearchNav'
  import { mapState} from 'vuex'
  import BScroll from 'better-scroll'
  import SearchPanel from './children/SearchPanel'
  export default {
    name: "Search",
    data(){
      return{
        scrollY: 0,
        rightLiTops: [],
        isShow: false
      }
    },
    components: {
      SearchNav,
      SearchPanel
    },
    mounted(){
      this.$store.dispatch('reqSearchGoods')
    },
    computed:{
      ...mapState(['searchgoods']),
      currentIndex(){
        // 1.0 获取数组
        const {scrollY, rightLiTops}  = this;
        // 2.0 取出索引
        return rightLiTops.findIndex((liTop, index) => {
          this._leftScroll(index);
          return scrollY >= liTop && scrollY < rightLiTops[index + 1];
        })
      }
    },
    watch:{
      searchgoods(){
        this.$nextTick(() => {
          // 1.0 滚动
          this._initBScroll();
          // 2.0 求出右边所有版块的头部位置
          this._initRightLiTops();
        })
      }
    },
    methods:{
      // 滚动
      _initBScroll(){
        // 1.0 左边
        this.leftScroll = new BScroll('.menu-wrapper',{
          scrollY: true,
          click: true
        });
        // 2.0 右边
        this.rightScroll = new BScroll('.shop-wrapper',{
          scrollY: true,
          click: true,
          probeType: 3
        });
        // 3.0 监听右侧的实时滚动
        this.rightScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(pos.y);
        })
      },

      // 求出右边所有版块的头部位置
      _initRightLiTops(){
        // 1.0 定义临时数组
        const tempArr = [];
        // 2.0 定义变量记录高度
        let top = 0;
        tempArr.push(top);
        // 3.0 拿到所有li 标签
        let allLis = this.$refs.shopsparent.getElementsByClassName('shops-li');
        Array.prototype.slice.call(allLis).forEach((li) => {
          top += li.clientHeight;
          tempArr.push(top);
        });
        // 4.0 更新数据
        this.rightLiTops = tempArr;
      },

      // 点击滚动
      clickScroll(index){
        this.scrollY = this.rightLiTops[index];
        this.rightScroll.scrollTo(0, -this.scrollY, 300)
      },

      // 左侧联动
      _leftScroll(index){
        let menuAllLi = this.$refs.menuList;
        let el = menuAllLi[index];
        this.leftScroll.scrollToElement(el,300, 0 , -100);
      },

      // 点击切换面板
      changePanel(){
        this.isShow = true; //显示搜索框
      },
      changePanel1(){
        this.isShow = false; // 隐藏搜索框
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .search
    width: 100%
    height: 100%
    background-color: #f5f5f5
    .shop
      width: 100%
      position absolute
      top 60px
      bottom 50px
      display flex
      overflow hidden
      .menu-wrapper
        width: 80px
        flex 0 0 80px
        background-color: #ececec
        .menu-item
          width: 100%
          height: 60px
          display flex
          justify-content center
          align-items center
          box-sizing border-box
          background-color: #ececec
        .current
          color #f40
          background-color: #fff
          border-left 5px solid #f40
      .shop-wrapper
        flex 1
        background-color: #fff
        ul
          padding-bottom 50px
          .shops-title
            display flex
            flex-direction row
            padding 0 10px
            height 60px
            align-items center
            justify-content space-between
            color 999
            a
              color black
              text-decoration none
          .phone-type
            width: 100%
            display flex
            flex-direction row
            flex-wrap wrap
            li
              width: 33.3%
              display flex
              justify-content center
              align-items center
              margin 10px 0
              img
                width: 75%

          .shop-items
            display flex
            flex-wrap wrap
            li
              display flex
              flex-direction column
              width 33.3%
              height 90px
              justify-content center
              align-items center
              img
                width: 65%
                height: 65%
                margin-bottom 5px

</style>

import {
  getHomeCasual,
  getHomeNav,
  getHomeGoods,
  getRecommendGoods,
  getSearchGoods,
  getUserInfo,
  getLogOut,
} from '../api/index'
import {
  HOME_CASUAL,
  HOME_NAV,
  HOME_GOODS_LIST,
  RECOMMEND_GOODS_LIST,
  GET_SEARCH_GOODS,
  USER_INFO,
  RESET_USER_INFO,
  SHOP_CAR_GOODS,
  ADD_CART_GOODS,
  REDUCE_CART_GOODS,
  CART_GOODS_SELECTED,
  SINGLE_GOODS_SELECTED,
  DELETE_CART_GOODS
} from './mutation-type'
export default {
  // 1.0 获取首页轮播图
  async reqHomeCasual({commit}) {
    const result = await getHomeCasual();
    commit(HOME_CASUAL, {homecasual: result.message.data})
  },
  // 2.0 首页导航
  async reqHomeNav({commit}) {
    const result = await getHomeNav();
    commit(HOME_NAV, {homenav: result.message.data})
  },
  // 3.0 获取商品列表
  async reqHomeGoods({commit}) {
    const result = await getHomeGoods();
    commit(HOME_GOODS_LIST, {homegoods: result.message.goods_list})
  },
  // 4.0 获取推荐列表的数据
  async reqRecommendGoods({commit}, params){
    const result = await getRecommendGoods(params);
    commit(RECOMMEND_GOODS_LIST, {recommendgoods: result.message});
    params.callback && params.callback();
  },
  // 5.0 获取搜索界面的数据
  async reqSearchGoods({commit}){
    const result = await getSearchGoods();
    commit(GET_SEARCH_GOODS, {searchgoods: result.message.data});
  },
  // 6.0 同步用户信息
  syncUserInfo({commit}, userInfo){
    commit(USER_INFO, {userInfo});
  },
  // 7.0 获取session中保存的用户信息
  async reqUserInfo({commit}){
    const result = await getUserInfo();
    if(result.success_code === 200){
      commit(USER_INFO, {userInfo: result.message})
    }
  },
  // 8.0 清空session中保存的用户信息
  async reqLogOut({commit}){
    const result = await getLogOut();
    if(result.success_code === 200){
      commit(RESET_USER_INFO)
    }
  },
  // 9.0 将购物车中的数据同步到state中
   reqShopcarData({commit},shopgoods){
    commit(SHOP_CAR_GOODS, {shopgoods})
  },
  // 10.0 改变购物车中同一商品的数量
   changeCartGoodsCount({commit}, {goods,flag}){
    if(flag){  // 增加购物车中商品数量
      commit(ADD_CART_GOODS, {goods});

    }else{  // 减少购物车中商品数量
      commit(REDUCE_CART_GOODS, {goods});
    }
  },
  // 11.0 全选商品
  isAllGoodsSelected({commit},{isSelected}){
    commit(CART_GOODS_SELECTED, {isSelected});
  },
  // 12.0 单个商品的选中
  reqSingleGoodsSelected({commit},{goods}){
    commit(SINGLE_GOODS_SELECTED, {goods})
  },
  // 13.0 删除商品
  reqdelSingleGoods({commit}, {goods}){
    commit(DELETE_CART_GOODS, {goods})
  }
}

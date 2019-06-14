import Vue from 'vue';
import {
  HOME_CASUAL,
  HOME_GOODS_LIST,
  HOME_NAV,
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
import {addGoodsShopcar, removeGoodsFromCart, reduceGoodsCount} from "../api";
import {Toast} from 'mint-ui'
export default {
  [HOME_CASUAL](state, {homecasual}){
    state.homecasual = homecasual;
  },
  [HOME_NAV](state,{homenav}){
    state.homenav = homenav;
  },
  [HOME_GOODS_LIST](state,{homegoods}){
    state.homegoods = homegoods;
  },
  [RECOMMEND_GOODS_LIST](state,{recommendgoods}){
    state.recommendgoods = state.recommendgoods.concat(recommendgoods);
  },
  [GET_SEARCH_GOODS](state,{searchgoods}){
    state.searchgoods = searchgoods;
  },
  [USER_INFO](state, {userInfo}){
    state.userinfo = userInfo;
  },
  [RESET_USER_INFO](state){
    state.userinfo = {};
  },
  // 同步购物车数据
  [SHOP_CAR_GOODS](state, {shopgoods}){
    state.shopgoods = shopgoods
  },
  // 改变购物车中单个商品的数量
  [ADD_CART_GOODS](state,{goods}){
    // 调用服务器端接口实现数据库中数据同步
    let normal_price = goods.normal_price / 10;
    addGoodsShopcar(goods.goods_id, goods.goods_name, goods.thumb_url,normal_price);
    // 本地同步
    goods.buy_count =parseInt(goods.buy_count)+1;
  },
  [REDUCE_CART_GOODS](state, {goods}){
    if(goods.buy_count){
      // 在数据库中将商品的数量减 1
      reduceGoodsCount(goods.id, goods.buy_count);

      // 在本地将商品的数量减 1
      goods.buy_count -=1;
      if(goods.buy_count === 0){
        let index = state.shopgoods.indexOf(goods);
        state.shopgoods.splice(index,1);
        // 在数据库中将数据清除
        removeGoodsFromCart(goods.id);
        Toast({
          duration: 800,
          message: "移除成功！"
        })
      }
    }
  },
  // 购物车中商品的全选
  [CART_GOODS_SELECTED](state,{isSelected}){
    state.shopgoods.forEach((goods,index) => {
      if(goods.checked){ //如果有checked属性
        goods.checked = !isSelected;
      }else{ // 没有checked属性
        Vue.set(goods, 'checked', !isSelected);
      }
    })
  },
  // 单选商品
  [SINGLE_GOODS_SELECTED](state,{goods}){
    goods.checked = !goods.checked;
  },

  // 删除购物车中商品
  [DELETE_CART_GOODS](state, {goods}){
    let index = state.shopgoods.indexOf(goods);
    state.shopgoods.splice(index,1);
  }
}

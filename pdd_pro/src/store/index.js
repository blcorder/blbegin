import Vue from 'vue'
import Vuex from 'vuex'

import actions from './action'
import mutations from './mutations'
import getters from './getters'
import state from './state'

// 1.0 使用vuex
Vue.use(Vuex);

// 2.0 对我输出vuex 的store 对象
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

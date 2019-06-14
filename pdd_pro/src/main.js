import Vue from 'vue';
import App from './App';
import router from './router/router'
import LyTab from 'ly-tab'
import store from './store/index'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

// 配置mint-ui选择组件
import { Actionsheet, DatetimePicker } from 'mint-ui'
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(DatetimePicker.name, DatetimePicker);

// 配置字体图标
import '@/common/css/style.css';
Vue.use(Mint);

Vue.use(LyTab);

// 图片懒加载
import Vuelazyload from 'vue-lazyload';
Vue.use(Vuelazyload,{

});

new Vue({
  el:"#app",
  render: h => h(App),
  router,
  store
});

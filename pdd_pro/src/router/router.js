// 导入配置对象
import Vue from 'vue';
import VueRouter from 'vue-router';

// 关联
Vue.use(VueRouter);

// 导入路由组件
import Home from '../pages/Home/Home'
import Search from '../pages/Search/Search'
import Recommend from '../pages/Recommend/Recommend'
import Me from '../pages/Me/Me'
import Chat from '../pages/Chat/Chat'
import Login from '../pages/login/Login'
import Setting from '../pages/Me/Setting'
import UserDetail from '../pages/Me/UserDetail'
// 导入子路由
import Hot from '../pages/Home/childrens/hot/Hot'
import Clothes from '../pages/Home/childrens/Clothes'
import Foods from '../pages/Home/childrens/Foods'
import Electric from '../pages/Home/childrens/Electric'
import Hundreds from '../pages/Home/childrens/Hundreds'
import Manclose from '../pages/Home/childrens/Manclose'
import Mother from '../pages/Home/childrens/Mother'
import Shose from '../pages/Home/childrens/Shose'
import Underwear from '../pages/Home/childrens/Underwear'

// 创建一级路由
export default new VueRouter({
  routes:[
    {path: '/', redirect: '/me'},
    {
      path: '/home',
      component: Home,
      children: [
        {path: '/home', redirect: '/home/hot'},
        {path: 'hot', component: Hot},
        {path: 'clothes', component: Clothes},
        {path: 'foods', component: Foods},
        {path: 'electric', component: Electric},
        {path: 'hundreds', component: Hundreds},
        {path: 'manclose', component: Manclose},
        {path: 'mother', component: Mother},
        {path: 'shose', component: Shose},
        {path: 'underwear', component: Underwear},
      ]
    },
    {path: '/search', component: Search},
    {path: '/recommend', component: Recommend},
    {path: '/me', component: Me},
    {path: '/chat', component: Chat},
    {path: '/login', component: Login},
    {path: '/setting', component: Setting},
    {path: '/userdetail', component: UserDetail},
  ]
})

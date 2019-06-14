import ajax from './ajax'

// 1.0 基础路径
const BASE_URL = 'http://127.0.0.1:3000';

// 2.0 请求方法

// 3.0 请求首页轮播图
export const getHomeCasual = () => ajax(BASE_URL + '/api/homecasual');

// 4.0 请求首页中部导航
export const getHomeNav = () => ajax(BASE_URL + '/api/homenav');

// 5.0 请求首页中商品列表
export const getHomeGoods = () => ajax(BASE_URL + '/api/homeshoplist');

// 6.0 获取推荐列表的数据
export const getRecommendGoods = (params) => ajax(BASE_URL + '/api/recommendshoplist', params);

// 7.0 获取搜索界面的数据
export const getSearchGoods = () => ajax(BASE_URL + '/api/searchgoods');

// 8.0 获取短信验证码
export const getPhoneCode = (phone) => ajax(BASE_URL+ '/api/send_code',{ phone });

// 9.0 手机验证码登录
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL+ '/api/login_code',{phone: phone,code: code});

// 10.0 获取session中保存的用户信息
export const getUserInfo = () => ajax(BASE_URL+ '/api/user_info');

// 11.0 退出登录
export const getLogOut = () => ajax(BASE_URL+ '/api/logout');

// 12.0 插入性别，年龄
export const updateInfo = (id,age,sex) => ajax(BASE_URL + '/api/setUserInfo',{id: id, age: age, sex: sex});

// 13.0 加入购物车商品
export const addGoodsShopcar = (goods_id, goods_name, thumb_url, price) => ajax(BASE_URL + '/api/add_goods_shopcar',{goods_id: goods_id, goods_name: goods_name, thumb_url: thumb_url, price:price});

// 14.0 从数据库取出购物车商品加到购物车列表
export const getGoodsFromShopcar = () => ajax(BASE_URL + '/api/getgoods_from_shopcar');

// 15.0 删除数据库中的数据
export const removeGoodsFromCart = (id) => ajax(BASE_URL + '/api/removegoods_from_cart', {goods_id: id});

// 16.0 在数据库中将商品的数量减 1
export const reduceGoodsCount = (id, buy_count) => ajax(BASE_URL + '/api/reduce_goods_count', {goods_id: id, buy_count: buy_count});

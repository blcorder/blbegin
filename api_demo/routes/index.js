const express = require('express');
const router = express.Router();
const conn = require('../db');
const svgCaptcha = require('svg-captcha');
const sms_util = require('../util/sms_util');
const md5 = require('blueimp-md5');
let users = {};

let goods = require('./../public/goods_list');
router.get('/data', function(req, res) {
    let tempArr_all = [];
    for(let i=0; i<goods.goods_list.length; i++){
        let tempArr = [];
        let oldGoods = goods.goods_list[i];
        // 1. 新建新的json对象
        tempArr.push(oldGoods.goods_id);
        tempArr.push(oldGoods.goods_name);
        tempArr.push(oldGoods.short_name);
        tempArr.push(oldGoods.image_url);
        tempArr.push(oldGoods.thumb_url);
        tempArr.push(oldGoods.hd_thumb_url);
        tempArr.push(oldGoods.cnt);
        tempArr.push(oldGoods.market_price);
        tempArr.push(oldGoods.normal_price);
        tempArr.push(oldGoods.group_price);
        tempArr_all.push(tempArr);
    }

    //2. 遍历数据, 插入数据库
    let sql = "INSERT INTO homegoods(`goods_id`,`goods_name`,`short_name`, `image_url`, `thumb_url`, `hd_thumb_url`, `cnt`, `market_price`, `normal_price`, `group_price`) VALUES ?";
    conn.query(sql, [tempArr_all], function (err, rows, fields) {
        if(err){
            console.log('INSERT ERROR - ', err.message);
            return;
        }
        console.log("INSERT SUCCESS");
    });
});

/**
 * 获取首页轮播图
 */
router.get('/api/homecasual', (req, res)=>{
   /* let sqlStr = 'select * from homecasual';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })*/
    const data = require('../data/homecasual');
    res.json({success_code: 200, message: data})
});

/**
 * 获取首页导航
 */
router.get('/api/homenav', (req, res)=>{
   /*
   let sqlStr = 'select * from homenav';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
    */
    const data = require('../data/homenav');
    res.json({success_code: 200, message: data});
});

/**
 * 获取首页商品列表
 */
router.get('/api/homeshoplist', (req, res)=>{
    /*
   let sqlStr = 'select * from homeshoplist';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0})
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
    */
    setTimeout(function () {
         const data = require('../data/shopList');
         res.json({success_code: 200, message: data})
    }, 300);
});

/**
 * 获取推荐商品列表
 */
router.get('/api/recommendshoplist', (req, res)=>{
    // 1.0 获取数据参数
    let pageNo = req.query.page || 1;
    let pageSize = req.query.count || 10;
    // console.log(pageNo);
    // console.log(pageSize);
    // 2.0 执行数据库查询语句
    let sqlStr = 'select * from homegoods limit ' + (pageNo-1)*pageSize + ',' + pageSize;
    conn.query(sqlStr, (error, results,fields) => {
        if(error){
            res.json({
                err_code: 0,
                message: '请求数据失败'
            })
        }else{
           setTimeout(() => {
            res.json({
                success_code: 200,
                message: results
            })
           },1000)
        }
    })
});

/**
 * 获取推荐商品列表拼单用户
 */
router.get('/api/recommenduser', (req, res)=>{
    setTimeout(function () {
        const data = require('../data/recommend_users');
        res.json({success_code: 200, message: data})
    }, 10);
});

/**
 * 获取搜索分类列表
 */
router.get('/api/searchgoods', (req, res)=>{
    setTimeout(function () {
        const data = require('../data/search');
        res.json({success_code: 200, message: data})
    }, 10);
});

/**
 * 获取商品数据
 */
router.get('/api/getqalist', (req, res) => {
    const course = req.query.course;
    const limit = req.query.limit || 20;
    const keyword = req.query.keyword || '';

    let sqlStr = 'select * from qa where course= "' + course + '" LIMIT ' + limit;
    if (keyword !== '') {
        sqlStr = 'select * from qa where course= "' + course + '" AND qname LIKE "%' + keyword + '%" LIMIT ' + limit;
    }

    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '资料不存在', affextedRows: 0});
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows})
    })
});

/**
 * 获取学生列表
 */
router.get('/api/getStuList', (req, res) => {
    let sqlStr = 'select * from student';
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({err_code: 1, message: '获取数据失败', affextedRows: 0});
        res.json({success_code: 200, message: results, affextedRows: results.affextedRows});
    });
});

/**
 * 往数据库中插入学生记录
 */
router.post("/api/insertStuList",function(req,res){
    conn.query('INSERT INTO student SET  ?',req.body, (err, results) => {
        if (err) return res.json({err_code: 1, message: '插入数据失败', affextedRows: 0});
        res.json({success_code: 200, message:'插入成功'});
    });
});

/**
 * 删除数据库中的一条学生记录
 */
router.post("/api/delStuList", (req,res)=>{
    console.log(req.body);
    let  sqlStr = 'DELETE FROM student WHERE id = ?';
    conn.query(sqlStr, [req.body.id], (err, results) => {
        if (err) return res.json({err_code: 1, message: '删除数据失败', affextedRows: 0});
        res.json({success_code: 200, message: '删除数据失败', affextedRows: 0});
    });
});

router.get('/public/images/home/*', function (req, res) {
    res.sendFile( req.url );
    console.log(req.url);
    console.log(__dirname);
});

// 获取一次性图形验证码
router.get('/api/captcha', (req, res) => {
    let captcha = svgCaptcha.create({
        size: 4,
        color: true,
        moise: 2,
        ignoreChars: '0ol1'
    })
   
    // 2.0 保存验证码的内容
    req.session.captcha = captcha.text.toLocaleLowerCase();

    // 3.0 返回给客户端
    res.type('svg');
    res.send(captcha.data);
})

// 获取短信验证码
router.get('/api/send_code', (req, res) => {
    // 1.0 获取随机验证码
    let code = sms_util.randomCode(6);
    
    // 2.0 获取手机号码
    let phone = req.query.phone;

    // 3.0 返回给客户端数据进行验证
    setTimeout( () => {
        users[phone] = code;
        res.json({success_code: 200, message: code})
    }, 2000)
})

// 校验前端发送过来的验证码是否正确
router.get('/api/login_code',(req, res) => {
    // 获取数据
    const phone = req.query.phone;
    const code = req.query.code;

    // 进行比对
    if(users[phone] !== code){
        // res.json({success_code: 200, message: "登录成功！"})
        res.json({err_code: 0, message: "验证码不正确！"});
        return;
    }
    // 查询数据库
    delete users[phone];
    let sqlStr = "SELECT * FROM user_info WHERE user_phone = '" + phone + "' LIMIT 1";

    conn.query(sqlStr, (error, results, fields) => {
        if(error){
            res.json({err_code: 0, message: '请求数据失败！'})
        }else{
            results = JSON.parse(JSON.stringify(results));
            
            // 若用户已经创建
            if(results[0]){
            req.session.userId = results[0].id;
            res.json({success_code: 200, message: {id: results[0].id, user_name: results[0].user_name
            , user_phone: results[0].user_phone, user_cname: results[0].user_cname,user_sex: results[0].user_sex,
            user_age: results[0].user_age}});
            }else{ // 创建新用户
                const addSql = "INSERT INTO user_info (user_name, user_phone) VALUES (?, ?)";
                const addSqlParams = [phone, phone];
                conn.query(addSql, addSqlParams, (error, results, fields) => {
                    results = JSON.parse(JSON.stringify(results));
                    if(!error){
                        req.session.userId = results.insertId;
                        let sqlStr = "SELECT * from user_info WHERE id = '" + results.insertId + "' LIMIT 1 ";
                        conn.query(sqlStr, (error, results, fields) => {
                            if(error){
                                res.json({err_code: 0, message: '请求数据失败！'})
                            }else{
                                results = JSON.parse(JSON.stringify(results));
                                res.json({success_code: 200, message: {id: results[0].id, user_name: results[0].user_name
                                    , user_phone: results[0].user_phone}});
                            }
                        })
                    }
                })
            }

        }
    })
    console.log(req.session.userId);
})

/**
 *  根据session中的用户id获取用户信息
 *  */ 
router.get('/api/user_info', (req,res) => {
    // let userId = req.session.userId;
    // console.log(req.session.userId);
    // 数据库查询
    let sqlStr = "SELECT * from user_info WHERE id = '" + userId + "' LIMIT 1";
    conn.query(sqlStr, (error, results, fields) => {
        if(error){
            res.json({err_code: 0, message: "查询失败！"})
        }else{
            results = JSON.parse(JSON.stringify(results));
            // 返回数据给客户端
           if(!results[0]){
            delete req.session.userId;
            res.json({
                error_code: 0,
                message: "请先登录！"
            })
           }else{
            res.json({
                success_code: 200,
                message: {
                    id: results[0].id,
                    user_name: results[0].user_name,
                    user_phone: results[0].user_phone
                }
            })
           }
        }
    })
})

/*
退出登录
 */
router.get('/api/logout',(req,res) => {
    // 1.0 清除session中的ID
    delete req.session.userId;
    // 2.0 提示用户
    res.json({
        success_code: 200,
        message: " 退出成功！"
    })
})

/**
 * 设置用户信息
 */
router.get('/api/setUserInfo', (req, res) => {
    // 1.0 拿到用户信息
    let sex = req.query.sex;
    let age = req.query.age;
    let id = req.query.id;

    // 2.0 数据库操作
    let sqlStr = "UPDATE user_info SET user_age = '" + age + "',user_sex = '" + sex + "' WHERE id = '" + id + "'"
    conn.query(sqlStr, (error, results,fields) => {
        if(error){
            res.json({err_code: 0, message: "查询错误！"});
        }else{
            let sqlStr = "SELECT * from user_info WHERE id = '" + id + "'"
            conn.query(sqlStr, (error, results, fields) => {
                if(error){
                    res.json({err_code: 0, message: "查询错误！"});  
                }else{
                    results = JSON.parse(JSON.stringify(results));
                    res.json({success_code: 200, message: { user_sex: results[0].user_sex
                        , user_age: results[0].user_age}});
                }
            })
        }
    })
})

/**
 * 添加商品到购物车
 */
router.get('/api/add_goods_shopcar',(req, res) => {
    // 1.0 接收数据
    // goods_id goods_name thumb_url price
    let goods_id = req.query.goods_id;
    let goods_name = req.query.goods_name;
    let thumb_url = req.query.thumb_url;
    let price = req.query.price;
    let buy_count = 1;
    let is_pay = 0;
    // 2.0 数据库操作
    let sql_str = "SELECT * from shopcar WHERE goods_id = '" + goods_id + "'";
    conn.query(sql_str, (error, results, fields) => {
        if(error){
            res.json({err_code: 0, message: "查询失败！"});
        }else{
            results = JSON.parse(JSON.stringify(results));
            if(results[0]){ // 购物车中已有该商品
                // 将商品数量加1
                let buy_count = parseInt(results[0].buy_count) + 1;
                let sql_str = "UPDATE shopcar SET buy_count = '" + buy_count + "' WHERE goods_id = '" + goods_id + "'";
                conn.query(sql_str, (error, results, fields) => {
                    if(error){
                        res.json({err_code: 0, message: "已有该商品查询失败！"});
                    }else{
                        res.json({success_code: 200, message: "更新成功！"});
                    }
                })
            }else{ // 购物车中还没有此商品
                // 添加新商品到数据库
                let addSql = "INSERT INTO shopcar(goods_id,goods_name,thumb_url,price,buy_count,is_pay) VALUES('"+goods_id+"','"+goods_name +"','"+thumb_url+"','"+price+"','"+buy_count+"','"+is_pay+"')"
                conn.query(addSql, (error, results, fields) => {
                    if(error){
                        res.json({err_code: 0, message: "添加新商品查询失败！"});
                    }else{
                        res.json({success_code: 200, message: "插入成功！"});
                    }
                })
            }
        }
    })
})

/**
 * 从数据库中取出购物车的数据
 */
router.get('/api/getgoods_from_shopcar',(req,res) => {
    let sqlStr = "SELECT * from shopcar";
    conn.query(sqlStr, (error, results, fields) => {
        if(error){
            res.json({error_code:0, message: "请求数据失败！"})
        }else{
            results = JSON.parse(JSON.stringify(results));
            res.json({
                success_code: 200,
                message: results
            })
        }
    })
})
/**
 * 从购物车中删除商品
 */
router.get('/api/removegoods_from_cart', (req,res) => {
    let id = req.query.goods_id;
    let sqlStr = "DELETE from shopcar WHERE id = " + id;
    conn.query(sqlStr, (error, results, fields) => {
        if(error){
            res.json({err_code:0, message:"删除数据失败！"})
        }else{
            res.json({err_code:0, message:"删除数据成功！"})
        }
    })
})

/**
 * 点击减号 进行商品数量减少
 */
router.get('/api/reduce_goods_count', (req,res) => {
    let id = req.query.goods_id;
    let goods_count = req.query.buy_count - 1;
    let sqlStr = "UPDATE shopcar set buy_count = "+ goods_count +" where id =" + id;
    conn.query(sqlStr, (error, results, fields) => {
        if(error){
            res.json({err_code:0, message:"减少数据失败！"})
        }else{
            res.json({err_code:0, message:"减少数据成功！"})
        }
    })
})
module.exports = router;

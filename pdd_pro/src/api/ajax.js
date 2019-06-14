const axios = require('axios');

export default function ajax(url = '',params={},type = 'GET') {
    // 1.0 定义promise 对象
    let promise;
    return new Promise((resolve, reject) => {

    // 2.0 判断请求方式
    if('GET' === type ){     // 请求方式为GET时
      // 拼接请求字符串
      let paramsStr = '';
      Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&';
      });
      // 过滤掉最后一个 &
      if(paramsStr !== ''){
        paramsStr.substr(0,paramsStr.lastIndexOf('&'));
      }
      // 拼接完整的字符串
      url += '?' + paramsStr;
      // 发送GET请求
      promise = axios.get(url);
    }else if('POST'=== type){ // 请求方式为POST
      promise = axios.post(url, params)
    }
    // 3.0 返回请求的结果
    promise.then( (response) => {
      resolve(response.data);
    }).catch( (err) => {
      reject(err);
    })
  })
}

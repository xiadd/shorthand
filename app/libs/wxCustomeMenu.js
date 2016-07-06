'use strict';
const fs = require('fs');
const request = require('request');

//token
const token = fs.readFileSync('./token').toString();

//常用type为view和click,分别为点击事件和链接
var menus = {
  "button": [
    {
      "name": "测试菜单",
      "sub_button": [
        {
          "type": "view",
          "name": "授权登录",
          "url": "http://wuyrsp3tma.proxy.qqbrowser.cc/auth"
        }]
    }]
};

function createMenu() {
  let options = {
    url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token,
    form: JSON.stringify(menus),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };
  
  request.post(options, function (err, res, body) {
    if (err) {
      console.log(err)
    }else {
      console.log(body);
    }
  })
  
}

module.exports = createMenu;


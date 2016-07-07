'use strict';
const request = require('request');
const qs = require('querystring');

function getUserInfo(AccessToken, openId) {
  let reqUrl = 'https://api.weixin.qq.com/sns/userinfo?';
  let params = {
    access_token: AccessToken,
    openid: openId,
    lang: 'zh_CN'
  };

  let options = {
    method: 'get',
    url: reqUrl+qs.stringify(params)
  };
  
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  })
}

module.exports = getUserInfo;
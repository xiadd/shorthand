'use strict';
const request = require('request');
const qs = require('querystring');
const config = require('../../config');

function getToken(code) {
  let reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
  let params = {
    appid: config.appId,
    secret: config.appSecret,
    code: code,
    grant_type: 'authorization_code'
  };

  let options = {
    method: 'get',
    url: reqUrl+qs.stringify(params)
  };
  console.log(options.url);
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(body);
      } else {
        reject(err);
      }
    })
  })
}

module.exports = getToken;
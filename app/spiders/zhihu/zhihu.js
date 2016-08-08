'use strict';
/**
 * Created by xiadd on 7/14/16.
 */

var AV = require('leanengine');
const cheerio = require('cheerio');
const config = require('../../../config');
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const api = require('./api');


AV.init({
  appId: 'C2yCiRi9yETYr8RvEJvs276d-gzGzoHsz',
  appKey: 'O4zRMgWdUMj6H3PJQMJ7RHpg',
  masterKey: '9Kc9CjYKKr3EQdRX3buxSRC5'
});
//数据库
var Follwees = AV.Object.extend('Follees');

function getFollowees() {
  var options = {
    url: api.followees,
    method: 'post',
    headers: {
      'Cookie': config.zhihuCookie,
      'X-Xsrftoken': config.zhihuXsrfToken
    },
    form: {
      'method': 'next',
      'params': '{"offset":40,"order_by":"created","hash_id":"8e54246e804fef8aa43434190f1c1870"}'
    }
  };

  return new Promise(function (resolve, reject) {
    request(options, function (err, res, body) {
      if(typeof JSON.parse(body) === 'object') {
        resolve(JSON.parse(body));
      } else {
        reject(new TypeError('返回数据格式不正确').message);
      }
    })
  })
}

function saveResults() {
  if(typeof getFollowees !== 'function'){
    throw new TypeError('传入正确的函数');
  }
  getFollowees().then(function (data) {
    if(!data['msg']){
      return new Error('数据格式不正确');
    }
    var resData = data['msg'];
    resData.forEach(function (item) {
      var newFollee = new Follwees();
      newFollee.set('info', item);
      newFollee.save().then(function () {
        console.log('success');
      }, function (err) {
        console.log(err);
      })
    });
  });
}

module.exports = saveResults;
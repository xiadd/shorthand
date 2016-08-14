'use strict';
/**
 * Created by xiadd on 7/14/16.
 */

var AV = require('leanengine');
var $ = require('cheerio');
var cheerio = require('cheerio');
var config = require('../../../config');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var api = require('./api');


//数据库
var Follwees = AV.Object.extend('Follees');

function getFollowees(offset) {
  var params = {
    'offset': offset,
    'order_by': 'created',
    'hash_id': '8e54246e804fef8aa43434190f1c1870'
  };
  var options = {
    url: api.followees,
    method: 'post',
    headers: {
      'Cookie': config.zhihuCookie,
      'X-Xsrftoken': config.zhihuXsrfToken
    },
    form: {
      'method': 'next',
      'params': JSON.stringify(params)
    }
  };

  return new Promise(function (resolve, reject) {
    request(options, function (err, res, body) {
      if(typeof JSON.parse(body) === 'object' && JSON.parse(body['msg']).length !== 0) {
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
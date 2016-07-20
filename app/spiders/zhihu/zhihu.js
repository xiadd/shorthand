'use strict';
/**
 * Created by xiadd on 7/14/16.
 */
const cheerio = require('cheerio');
const config = require('../../../config');
const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));
const api = require('./api');

function getAllTopicsHref() {
  let topicsArr = [];
  return request.getAsync({
    url: api.topicUrl
  }).then(res => {
    let $ = cheerio.load(res.body);
    let topics = $('.zm-topic-cat-item>a');
    topics.each((i, v) => {
      topicsArr.push(api.topicUrl + v.attribs.href);
    });
    return topicsArr;
  })
}

function getChildrenTopics() {
  let childrenTopics = {};
  getAllTopicsHref().then(data => {
    console.log(data)
    data.forEach(v => {
      let topicHref = v;
      request({
        method: 'get',
        url: topicHref
      })
    });
    console.log(childrenTopics)
  })
}

function extractContent(content) {
  if (typeof content !== 'string') {
    content = content.toString();
  }
  let $ = cheerio.load(content);
  return $('a.question_link').text();
}

function getZhihuContent() {
  let options = {
    url: 'https://www.zhihu.com/topic/19550517/top-answers',
    method: 'get',
    qs: {
      page: 12
    },
    headers: {
      'Cookie': config.zhihuCookie
    }
  };
  request(options, function (err, res, body) {
    let data = extractContent(body).split('\n');
    data = data.filter(v => {
      return v.length > 0;
    });
    console.log(data)
  })
}

module.exports = getChildrenTopics;
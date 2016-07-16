'use strict';
/**
 * Created by xiadd on 7/14/16.
 */
const request = require('request');
const cheerio = require('cheerio');
const config = require('../../../config');

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
    console.log(extractContent(body))
  })
}

module.exports = getZhihuContent;
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
      page: 1
    },
    headers: {
      'Cookie': config.zhihuCookie,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  };
  request(options, function (err, res, body) {
    console.log(extractContent(body))
  })
}

module.exports = getZhihuContent;
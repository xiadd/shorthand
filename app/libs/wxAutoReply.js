//自动回复消息
const request = require('request');

/**
 *
 * @param requestData {object} 收到的信息的内容
 * @param info {string} 返回消息的内容
 * @returns {string} 返回xml字符串用作消息内容
 */

function autoReply(requestData, info) {
  switch (requestData.msgtype) {
    case 'text':
      var resMsg = '<xml>' +
        '<ToUserName><![CDATA[' + requestData.fromusername + ']]></ToUserName>' +
        '<FromUserName><![CDATA[' + requestData.tousername + ']]></FromUserName>' +
        '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
        '<MsgType><![CDATA[text]]></MsgType>' +
        '<Content><![CDATA['+info+']]></Content>' +
        '</xml>';
      break;
  }

  return resMsg;
}

module.exports = autoReply;
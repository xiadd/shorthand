const router =require('express').Router();
const wxAuth = require('../libs/wxAuth');
const toJSON = require('../libs/util').convertXMLtoJSON;
const turingRobot = require('../libs/turingRobot');

router.get('/', wxAuth);

router.post('/', function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/xml'});
  var content = req.body.xml.content;
  console.log(encodeURI(content))
  turingRobot(encodeURI(content)).then(function (data) {
    var response = JSON.parse(data);
    var resMsg = '<xml>' +
      '<ToUserName><![CDATA[' + req.body.xml.fromusername + ']]></ToUserName>' +
      '<FromUserName><![CDATA[' + req.body.xml.tousername + ']]></FromUserName>' +
      '<CreateTime>' + parseInt(new Date().valueOf() / 1000) + '</CreateTime>' +
      '<MsgType><![CDATA[text]]></MsgType>' +
      '<Content><![CDATA['+response.text+']]></Content>' +
      '</xml>';
    res.end(resMsg);
  })
});

module.exports = router;
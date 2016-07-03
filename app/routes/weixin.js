const router =require('express').Router();
const wxAuth = require('../libs/wxAuth');
const toJSON = require('../libs/util').convertXMLtoJSON;
const turingRobot = require('../libs/turingRobot');
const autoReply = require('../libs/wxAutoReply');

router.get('/', wxAuth);

router.post('/', function (req, res) {

  res.writeHead(200, {'Content-Type': 'application/xml'});

  var content = req.body.xml.content;

  turingRobot(encodeURI(content)).then(function (data) {
    var response = JSON.parse(data);
    var resMsg = autoReply(req.body.xml, response.text);
    res.end(resMsg);
  })
});

module.exports = router;
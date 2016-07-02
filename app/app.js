const express = require('express');
const nunjucks =require('nunjucks');
const AV = require('leanengine');
const path = require('path');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

//引入路由
const weixin = require('./routes/weixin');

//app配置
const app = express();
app.use(AV.express());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

//解析xml
app.use(bodyParser.xml({
  limit: '1MB',   // Reject payload bigger than 1 MB
  xmlParseOptions: {
    normalize: true,     // Trim whitespace inside text nodes
    normalizeTags: true, // Transform tags to lowercase
    explicitArray: false // Only put nodes in array if >1
  }
}));

//启用nunjucks模板
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

//启用路由
app.use('/wechat', weixin);

module.exports = app;

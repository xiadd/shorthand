const express = require('express');
const nunjucks =require('nunjucks');
const AV = require('leanengine');
const path = require('path');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

//引入token刷新
const getToken = require('./libs/common');
getToken();

//引入路由
const weixin = require('./routes/weixin');

//app配置
const app = express();
app.use(AV.express());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

//解析xml
app.use(bodyParser.xml({
  limit: '1MB',
  xmlParseOptions: {
    normalize: true,
    normalizeTags: true,
    explicitArray: false
  }
}));

//启用nunjucks模板
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

//启用路由
app.use('/wechat', weixin);

module.exports = app;

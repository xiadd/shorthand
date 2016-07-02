const express = require('express');
const nunjucks =require('nunjucks');
const AV = require('leanengine');
const path = require('path');
const wechat = require('./libs/wechat');

//app配置
const app = express();
app.use(AV.express());
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

//启用nunjucks模板
app.engine('html', nunjucks.render);
app.set('view engine', 'html');

app.get('/wechat', wechat);

module.exports = app;

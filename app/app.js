const express = require('express');
const nunjucks =require('nunjucks');
const AV = require('leanengine');
const path = require('path');

//app
const app = express();
app.use(AV.express());
app.use(express.static('public'));

//启用nunjucks模板
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.get('/', function (req, res) {
  res.render('index.html');
});

module.exports = app;

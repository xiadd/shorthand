const AV = require('leanengine');
const express = require('express');

AV.init({
  appId: 'C2yCiRi9yETYr8RvEJvs276d-gzGzoHsz',
  appKey: 'O4zRMgWdUMj6H3PJQMJ7RHpg',
  masterKey: '9Kc9CjYKKr3EQdRX3buxSRC5'
});

//是否启用masterkey
AV.Cloud.useMasterKey();

const app = require('./app/app');
app.use(express.static('./public'));
const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);

//启动服务器
var isDev = process.env.NODE_ENV === 'dev';
if(isDev){
  var webpack = require('webpack'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),
    webpackDevConfig = require('./webpackConfig/webpack.dev.config.js');

  var compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
  // add "reload" to express, see: https://www.npmjs.com/package/reload
  var reload = require('reload');
  var http = require('http');

  var server = http.createServer(app);
  reload(server, app);

  server.listen(3000, function(){
    console.log('App (dev) is now running on port 3000!');
  });
} else {
  app.listen(PORT, function (err) {
    console.log('app is running on port 3000');

    // 注册全局未捕获异常处理器
    process.on('uncaughtException', function (err) {
      console.error("Caught exception:", err.stack);
    });
    process.on('unhandledRejection', function (reason, p) {
      console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
    });
  });
}

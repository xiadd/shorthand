const AV = require('leanengine');
const express = require('express');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

//是否启用masterkey
AV.Cloud.useMasterKey();

const app = require('./app/app');
app.use(express.static('./app/public'));
const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);

//启动服务器
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
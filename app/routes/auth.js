const router = require('express').Router();
const getJsApiData = require('../libs/getJsApiData');
const config = require('../../config');

router.get('/auth', function (req, res) {
  getJsApiData().then(data => {
    res.render('index.html', {signature: data[0], timestamp: data[1], nonceStr:data[2], appId: config.appId});
  })
});

module.exports = router;
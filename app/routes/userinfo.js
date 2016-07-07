const router = require('express').Router();
const getToken = require('../websdk/getWebToken');
const getUserInfo = require('../websdk/getWebUserInfo');

router.get('/user', function (req, res) {
  getToken(req.query.code)
    .then(function (data) {
      return JSON.parse(data);
    })
    .then(function (data) {
      getUserInfo(data['access_token'], data['openid']).then(_ => {
        res.render('user.html', {userinfo: _});      
      })
    });
});

module.exports = router;
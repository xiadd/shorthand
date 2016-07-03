const request = require('request');
const config = require('../../config');

function getTuringResponse(info) {
  if(typeof info !== 'string') {
    info = info.toString();
  }
  var options = {
    method:'GET',
    url: 'http://apis.baidu.com/turing/turing/turing?key=879a6cb3afb84dbf4fc84a1df2ab7319&info='+info,
    headers: {
      'apikey': config.turingKey
    }
  };
  return new Promise((resolve, reject) => {
    request(options, function (err, res, body) {
      if (res) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  })
}

module.exports = getTuringResponse;
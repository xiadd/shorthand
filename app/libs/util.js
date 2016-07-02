const parserString = require('xml2js').parseString;

//将xml转为obj对象
exports.convertXMLtoJSON = function (xml) {
  if (typeof xml !== 'string') {
    console.error('请输入合法的xml字符串');
    return ;
  }

  return new Promise((resolve, reject) => {
    parserString(xml,  function (err, results) {
      if(err) {
        reject(err);
      }else {
        resolve(results);
      }
    })
  })
};
'use strict';

module.exports.sendResponse = (data, callback) => {
  callback(null, {
    statusCode: data.statusCode,
    headers: {    
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data.return),
  });
};

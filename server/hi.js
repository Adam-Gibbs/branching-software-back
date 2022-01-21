'use strict';

module.exports.hi = (event, context, callback) => {
  console.log('hi');
  // create a response
  const response = {
    statusCode: 200,
    headers: {    
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify('hi'),
  };
  callback(null, response);
};

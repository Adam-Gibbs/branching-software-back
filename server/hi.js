'use strict';

module.exports.hi = (event, context, callback) => {
  console.log('hi');
  // create a response
  const response = {
    statusCode: 200,
    body: JSON.stringify('hi'),
  };
  callback(null, response);
};

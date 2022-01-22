'use strict';

const db = require('../../dynamodb');

module.exports.get = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.assetId !== 'string' || typeof data.userId !== 'string') {
    console.log('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: {    
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'Invalid data'}),
    });
    return;
  }

  const params = {
    TableName: process.env.ASSETS_TABLE,
    Key: {
      id: data.assetId,
    },
  };

  // get asset from the database
  db.get(params, (error, result) => {
    let response = {
      statusCode: 401,
      headers: {    
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'An error occurred, please try again'}),
    };

    if (error) {
      console.log(error);
      callback(null, response);
      return;
    }

    try {
      if (result.Item.userId === data.userId) {
        response = {
          statusCode: 201,
          headers: {    
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({message: 'Success', result: result.Item}),
        };
      }
    } catch (e) {
      console.log(e);
    } finally {
      callback(null, response);
    }
  });
};

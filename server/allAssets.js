'use strict';

const db = require('./dynamodb');

module.exports.allAssets = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.userId !== 'string') {
    console.error('Validation Failed');
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
    IndexName: 'userId-asset-index',
    KeyConditionExpression: 'userId = :u',
    ExpressionAttributeValues: {
    ':u': data.userId
    }
  };

  // fetch todo from the database
  db.query(params, (error, result) => {
    let response = {
      statusCode: 401,
      headers: {    
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'An error occurred while retrieving assets'}),
    };

    if (error) {
      console.error(error);
      callback(null, response);
      return;
    }
    
    try {
      if (result.Items) {
        response = {
          statusCode: 201,
          headers: {    
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({message: 'Success', result: result.Items}),
        };
      }
    } catch (e) {
      console.error(e);
    } finally {
      callback(null, response);
    }
  });
};

'use strict';

const db = require('../../dynamodb');

module.exports.all = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.userId !== 'string') {
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
    TableName: process.env.GOALS_TABLE,
    IndexName: 'userId-goal-index',
    KeyConditionExpression: 'userId = :u',
    ExpressionAttributeValues: {
    ':u': data.userId
    }
  };

  // get all goals from the database
  db.query(params, (error, result) => {
    let response = {
      statusCode: 401,
      headers: {    
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'An error occurred while retrieving goals'}),
    };

    if (error) {
      console.log(error);
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
      console.log(e);
    } finally {
      callback(null, response);
    }
  });
};

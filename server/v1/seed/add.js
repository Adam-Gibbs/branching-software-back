'use strict';

const db = require('../../dynamodb');

function checkExists(userId, success, failure, callback) {
  console.log("D");
  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: 'userId-user-index',
    KeyConditionExpression: 'id = :u',
    ExpressionAttributeValues: {
      ':u': userId
    }
  };

  // get the user from the database
  db.queryAsync(params).then((error, result) => {
    console.log(result)
    if (error) {
      console.log(error);
      failure(callback);
    } else if (result.Items.length > 0) {
      success(userId, callback);
    } else {
      failure(callback);
    }
  });
}

function noUser(callback) {
  callback(null, {
    statusCode: 401,
    headers: {    
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({message: 'User does not exist'}),
  });
}

function updateUser(userId, callback) {
  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: 'userId-user-index',
    KeyConditionExpression: 'id = :u',
    UpdateExpression: "set update = :value",
    ExpressionAttributeValues:{
          ':u': userId,
          ":value": true
        },
  };

  db.update(params, (error, result) => {
    let response = {
      statusCode: 401,
      headers: {    
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'Incorrect Username/Password'}),
    };

    if (error) {
      console.log("II")
      console.log(error);
      callback(null, response);
      return;
    }

    try {
      response = {
        statusCode: 201,
        headers: {    
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({message: 'Success', result: result.Item}),
      };
    } catch (e) {
      console.log(e);
    } finally {
      callback(null, response);
    }
  });
}

module.exports.add = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.userId !== 'string' || typeof data.name !== 'string') {
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
  
  checkExists(data.userId, updateUser, noUser, callback);
};

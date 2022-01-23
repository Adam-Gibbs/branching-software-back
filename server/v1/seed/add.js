'use strict';

const db = require('../../dynamodb');

function checkExists(userId) {
  const params = {
    TableName: USERS_TABLE,
    IndexName: 'userId-user-index',
    KeyConditionExpression: 'id = :u',
    ExpressionAttributeValues: {
      ':u': userId
    }
  };

  // get the user from the database
  db.query(params, (error, result) => {
    if (error) {
      console.log(error);
      return false;
    }

    try {
      if (result.Item.userId === userId) {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  });
  return false;
}

module.exports.signin = (event, context, callback) => {
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
    TableName: USERS_TABLE,
    IndexName: 'userId-user-index',
    KeyConditionExpression: 'id = :u',
    UpdateExpression: "set update = :value",
    ExpressionAttributeValues:{
          ':u': data.userId,
          ":value": true
        },
  };

  if (checkExists(data.userId)) {
    // get the user from the database
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
  } else {
    callback(null, {
      statusCode: 401,
      headers: {    
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'User does not exist'}),
    });
  }
};

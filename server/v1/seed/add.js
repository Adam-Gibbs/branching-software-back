'use strict';

const db = require('../../dynamodb');

async function checkExists(userId) {
  console.log("D");
  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: 'userId-user-index',
    KeyConditionExpression: 'id = :u',
    ExpressionAttributeValues: {
      ':u': userId
    }
  };
  console.log("E")

  // get the user from the database
  db.query(params, (error, result) => {
    if (error) {
      console.log(error);
      return false;
    }
    console.log("F")
    console.log(result.Items)

    try {
      if (result.Items.length > 0) {
        console.log("G")
        return true;
      }
    } catch (f) {
      console.log("GGG")
      console.log(f);
      return false;
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
  console.log("B")

  const params = {
    TableName: process.env.USERS_TABLE,
    IndexName: 'userId-user-index',
    KeyConditionExpression: 'id = :u',
    UpdateExpression: "set update = :value",
    ExpressionAttributeValues:{
          ':u': data.userId,
          ":value": true
        },
  };
  console.log("C")

  if (await checkExists(data.userId)) {
    console.log("H")
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
      console.log("I")

      if (error) {
        console.log("II")
        console.log(error);
        callback(null, response);
        return;
      }
      console.log("J")

      try {
        response = {
          statusCode: 201,
          headers: {    
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({message: 'Success', result: result.Item}),
        };
        console.log("K")
      } catch (g) {
        console.log(g);
        console.log("L")
      } finally {
        console.log("M")
        callback(null, response);
      }
    });
  } else {
    console.log("P")
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

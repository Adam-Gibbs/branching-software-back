'use strict';

const db = require('../../dynamodb');

module.exports.signin = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.email !== 'string' && typeof data.password !== 'string') {
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
    TableName: process.env.USERS_TABLE,
    Key: {
      email: data.email,
    },
  };

  // get the user from the database
  db.get(params, (error, result) => {
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
      if (result.Item.password === data.password) {
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

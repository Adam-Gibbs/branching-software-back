'use strict';

const db = require('./dynamodb');

module.exports.signin = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.email !== 'string' && typeof data.password !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Invalid data.',
    });
    return;
  }

  const params = {
    TableName: process.env.USERS_TABLE,
    Key: {
      email: data.email,
    },
  };

  // fetch todo from the database
  db.get(params, (error, result) => {
    let response = {
      statusCode: 401,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Unauthorized.',
    };

    if (error) {
      console.error(error);
      callback(null, response);
      return;
    }

    try {
      if (result.Item.password === data.password) {
        response = {
          statusCode: 201,
          body: JSON.stringify(result.Item),
        };
      }
    } catch (e) {
      console.error(e);
    } finally {
      callback(null, response);
    }
  });
};

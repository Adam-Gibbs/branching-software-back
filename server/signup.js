'use strict';

const uuid = require('uuid');
const db = require('./dynamodb');

module.exports.signup = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.email !== 'string' && typeof data.password !== 'string' && typeof data.firstName !== 'string' && typeof data.lastName !== 'string') {
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
    Item: {
      id: uuid.v1(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  db.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the user.',
      });
      return;
    }

    if (result.Item) {
      callback(null, {
        statusCode: 401,
        headers: { 'Content-Type': 'text/plain' },
        body: 'User already exists.',
      });
    }
  });

  // write the todo to the database
  db.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the user.',
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    });
  });
};

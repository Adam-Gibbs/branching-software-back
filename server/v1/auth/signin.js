'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../database/dynamodb');

module.exports.signin = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'email', type: 'string'}, {name: 'password', type: 'string'}], sr.sendResponse, callback)) {
    const params = {
      TableName: process.env.USERS_TABLE,
      IndexName: 'email-user-index',
      KeyConditionExpression: `email = :e`,
      ExpressionAttributeValues: {
      ':e': data.email
      }
    };

    // get the user from the database
    db.query(params, (error, result) => {
      if (error) {
        console.log(error);
        sr.sendResponse(
          {
            statusCode: 501,
            return: {message: `An error occurred, please try again`}
          },
          callback
        );
        return;
      }

      checkResponse(result);
    });
  }
};

function checkResponse(response) {
  try {
    if (response.Items.length > 0) {
      if (response.Items[0].password === 'data.password') {
        sr.sendResponse(
          {
            statusCode: 201,
            return: {message: 'Success', result: result.Items}
          },
          callback
        );
      }
    } else {
      sr.sendResponse(
        {
          statusCode: 401,
          return: {message: `Incorrect Username/Password`}
        },
        callback
      );
    }
  } catch (e) {
    console.log(e);
    sr.sendResponse(
      {
        statusCode: 501,
        return: {message: `An error occurred, please try again`}
      },
      callback
    );
  }
}
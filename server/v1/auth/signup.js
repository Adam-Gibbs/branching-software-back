'use strict';

const uuid = require('uuid');
const db = require('../../dynamodb');

module.exports.signup = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.email !== 'string' || typeof data.password !== 'string' || typeof data.firstName !== 'string' || typeof data.lastName !== 'string') {
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
    Item: {
      id: uuid.v1(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      pastData: {},
      locationData: {ongoing: "0", outputDay: "0kg", outputTotal: "0kg", burndown: {yaxis: [ null, null, null, null,null, null, null, null, null, null, null, null, null, null, null, null, null, null,null, null, ]}, halfline: {yaxis: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0,], valueA: "0", valueB: "0", changeA: "+0%", changeB: "+0%"}, quarterProgress: {value: "0", progress: "0"}, quarterBar: {value: "0kg", change: "+0%", dataA: [0, 0, 0, 0, 0, 0, 0], dataB: [0, 0, 0, 0, 0, 0, 0]}},
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // get the user from the database, in case of duplicate user
  db.get(params, (error, result) => {
    if (error) {
      console.log(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {    
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({message: 'Couldn\'t create the user'}),
      });
      return;
    }

    if (result.Item) {
      callback(null, {
        statusCode: 401,
        headers: {    
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({message: 'User already exists'}),
      });
    } else {
      // write the user to the database
      db.put(params, (errorPut) => {
        // handle potential errors
        if (errorPut) {
          console.log(errorPut);
          callback(null, {
            statusCode: errorPut.statusCode || 501,
            headers: {    
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({message: 'Couldn\'t create the user'}),
          });
          return;
        }

        callback(null, {
          statusCode: 201,
          headers: {    
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({message: 'Success', result: params.Item}),
        });
      });
    }
  });
};

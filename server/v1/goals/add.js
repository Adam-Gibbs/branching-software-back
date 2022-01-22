'use strict';

const uuid = require('uuid');
const db = require('../../dynamodb');

module.exports.add = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.userId !== 'string' || typeof data.name !== 'string' || typeof data.type !== 'string' || typeof data.targetValue !== 'number') {
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
    TableName: process.env.GOALS_TABLE,
    Item: {
      id: uuid.v1(),
      userId: data.userId,
      name: data.name,
      type: data.type,
      targetValue: data.targetValue,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // add the asset to the database
  db.put(params, (errorPut) => {
  // handle potential errors
  if (errorPut) {
    console.error(errorPut);
    callback(null, {
    statusCode: errorPut.statusCode || 501,
    headers: {    
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({message: 'Couldn\'t create the goal'}),
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
};

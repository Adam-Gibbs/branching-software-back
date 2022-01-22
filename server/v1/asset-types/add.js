'use strict';

const uuid = require('uuid');
const db = require('../../dynamodb');

module.exports.add = (event, context, callback) => {
  const timestamp = new Date().getTime();
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

  const params = {
    TableName: process.env.ASSET_TYPES_TABLE,
    Item: {
      id: uuid.v1(),
      userId: data.userId,
      name: data.name,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // add the asset type to the database
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
    body: JSON.stringify({message: 'Couldn\'t create the type'}),
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

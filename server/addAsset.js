'use strict';

const uuid = require('uuid');
const db = require('./dynamodb');

module.exports.addAsset = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.userId !== 'string' || typeof data.co2 !== 'number' || typeof data.description !== 'string' || typeof data.eol !== 'string' || typeof data.image !== 'string'|| typeof data.location !== 'string'|| typeof data.name !== 'string'|| typeof data.type !== 'string') {
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
    TableName: process.env.ASSETS_TABLE,
    Item: {
      id: uuid.v1(),
      userId: data.userId,
      co2: data.co2,
      description: data.description,
      eol: data.eol,
      image: data.image,
      location: data.location,
      name: data.name,
      type: data.type,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
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
    body: JSON.stringify({message: 'Couldn\'t create the asset'}),
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

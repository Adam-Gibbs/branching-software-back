'use strict';

const uuid = require('uuid');
const db = require('../../database/dynamodb');

module.exports.add = (table, data, complete, callback) => {
  const timestamp = new Date().getTime();

  const params = {
    TableName: table,
    Item: {
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
      ...data,
    },
  };

  // add the item to the database
  db.put(params, (error) => {
    // handle potential errors
    if (error) {
        console.log(error);
        complete(
          {
            statusCode: error.statusCode || 501,
            return: {message: `An error occurred, please try again`}
          },
          callback
        );
        return;
    }

    complete({statusCode: 201, return: {message: 'Success', result: params.Item}}, callback);
  });
};

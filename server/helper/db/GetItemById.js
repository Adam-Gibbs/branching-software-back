'use strict';

const db = require('../../database/dynamodb');

module.exports.getItemById = (table, search, name, complete, callback) => {
  const params = {
    TableName: table,
    Key: {
      ...search,
    },
  };

  // get asset from the database
  db.get(params, (error, result) => {
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

    try {
      complete({statusCode: 201, return: {message: 'Success', result: result.Item}}, callback);
      return;

    } catch (e) {
      console.log(e);
    } finally {
      complete(
        {
          statusCode: 401,
          return: {message: `${name} does not exist`}
        },
        callback
      );
    }
  });
};

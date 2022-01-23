'use strict';

const db = require('../../database/dynamodb');

module.exports.checkExistsById = (table, search, failure, exists, notExists) => {
  const params = {
    TableName: table,
    Key: {
      ...search,
    },
  };

  // get item from the database
  db.get(params, (error, result) => {
    if (error) {
      console.log(error);
      failure();
      return;
    }
    
    try {
      if (result.Item) {
        exists();
      } else {
        notExists();
      }
      return;

    } catch (e) {
      console.log(e);
      failure();
    }
  });
};

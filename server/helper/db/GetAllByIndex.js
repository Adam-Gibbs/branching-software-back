'use strict';

import { query } from '../../database/dynamodb';

export function getAllByIndex(table, search, complete, callback) {
  const params = {
    TableName: table,
    IndexName: search.index,
    KeyConditionExpression: `${search.search} = :i`,
    ExpressionAttributeValues: {
    ':i': search.searchItem
    }
  };

  // get all items from the database
  query(params, (error, result) => {
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
    
    complete({statusCode: 201, return: {message: 'Success', result: result.Items}}, callback);
  });
}

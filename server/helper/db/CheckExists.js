'use strict';

import { query } from '../../database/dynamodb';

export function checkExists(table, search, failure, exists, notExists) {
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
      failure();
      return;
    }
    
    try {
      if (result.Items) {
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
}

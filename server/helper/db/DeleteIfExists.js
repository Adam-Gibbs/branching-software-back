'use strict';

import { checkExists } from './CheckExists';

export function deleteIfExists(table, data, search, complete, name, callback) {
  checkExists(
    table, 
    search,
    function(){
      complete(
        {
          statusCode: 501,
          return: {message: `An error occurred, please try again`}
        },
        callback
      );
    },
    function(){
      deleteAction(
        table,
        data,
        complete,
        callback
      )
    },
    function(){
      complete(
        {
          statusCode: 401,
          return: {message: `${name} does not exist`}
        },
        callback
      )
    }
  );
}

function deleteAction(table, data, complete, callback) {
  const params = {
    TableName: table,
    Key: {
      ...data,
    },
  };

  // delete item from the database
  db.delete(params, (error, deleteResult) => {
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
    complete(
      {
        statusCode: 201,
        return: {message: `Success`}
      },
      callback
    )
  });
}
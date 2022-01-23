'use strict';

const helper = require('./CheckExists');
const db = require('../../database/dynamodb');

module.exports.updateIfExists = (table, data, search, name, complete, callback) => {
  helper.checkExists(
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
      updateAction(
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

function updateAction(table, data, complete, callback) {
  const params = {
    TableName: table,
    Key: {
      id: data.id,
    },
    UpdateExpression: data.update,
    ExpressionAttributeValues: data.updateItems,
  };

  // delete item from the database
  db.update(params, (error, result) => {
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
        return: {message: `Success`, result: data.updateItems,}
      },
      callback
    )
  });
};

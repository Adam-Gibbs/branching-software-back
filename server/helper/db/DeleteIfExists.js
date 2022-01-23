'use strict';

const helper = require('./CheckExistsById');
const db = require('../../database/dynamodb');

module.exports.deleteIfExists = (table, search, complete, name, callback) => {
  helper.checkExistsById(
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
        search,
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
};

function deleteAction(table, search, complete, callback) {
  const params = {
    TableName: table,
    Key: {
      ...search,
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

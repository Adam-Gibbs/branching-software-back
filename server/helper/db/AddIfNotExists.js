'use strict';

const helper = require('./CheckExists');
const db = require('./Add');

module.exports.addIfNotExists = (table, data, search, name, complete, callback) => {
  helper.checkExists(
    table, 
    search,
    function(){
      complete(
        {
          statusCode: error.statusCode || 501,
          return: {message: `An error occurred, please try again`}
        },
        callback
      );
    },
    function(){
      complete(
        {
          statusCode: 401,
          return: {message: `${name} already exists`}
        },
        callback
      )
    },
    function(){
      db.add(table, data, complete, callback)
    }
  );
};

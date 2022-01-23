'use strict';

import { checkExists } from './CheckExists';
import { add } from './Add';

export function addIfNotExists(table, data, search, complete, name, callback) {
  checkExists(
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
      add(table, data, complete, callback)
    }
  );
}

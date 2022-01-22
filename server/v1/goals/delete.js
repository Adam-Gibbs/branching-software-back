'use strict';

const db = require('../../dynamodb');

module.exports.delete = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.goalId !== 'string' || typeof data.userId !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: {    
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'Invalid data'}),
    });
    return;
  }

  const params = {
    TableName: process.env.GOALS_TABLE,
    Key: {
      id: data.goalId,
    },
  };

  // get goal from the database, to check if userId matches
  db.get(params, (error, result) => {
    let response = {
      statusCode: 401,
      headers: {    
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({message: 'An error occurred, please try again'}),
    };

    if (error) {
      console.log(error);
      callback(null, response);
      return;
    }

    console.log(result);
    try {
      if (!result.Item) {
        console.log('NoItem');
        response = {
          statusCode: 401,
          headers: {    
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({message: 'This goal does not exist'}),
        };
      } else if (result.Item.userId === data.userId) {
        // delete goal from the database
        db.delete(params, (deleteError, deleteResult) => {      
          console.log('deleteResult');
          if (deleteError) {
            console.log(deleteError);
            callback(null, response);
            return;
          }
          console.log('deleteResultNoError');
          console.log(deleteResult);
          response = {
            statusCode: 201,
            headers: {    
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({message: 'Success', result: deleteResult.Item}),
          };
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      callback(null, response);
    }
  });
};

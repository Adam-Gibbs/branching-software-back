'use strict';

const db = require('../../dynamodb');

module.exports.updateUser = (event, context, callback) => {
  const data = JSON.parse(event.body);
  var params = {
    TableName: process.env.USERS_TABLE,
    IndexName: 'userId-user-index',
    KeyConditionExpression: 'id = :u',
    ExpressionAttributeValues:{
      ':u': data.userId,
    },
  };

  db.query(params, function (err, result) {
    if (err) {
      console.log(err);
      callback(null, {
        statusCode: err.statusCode || 501,
        headers: {    
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({message: 'There has been an error accessing the user'}),
      });
    } else if ( result.Items.length === 0) {
      console.log(err);
      callback(null, {
        statusCode: 401,
        headers: {    
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({message: 'This user does not exist'}),
      });
    } else {
      var paramsUpdate = {
        TableName: process.env.USERS_TABLE,
        Key: {
          "email": result.Items[0].email
        },
        UpdateExpression: "set pastData = :pastData, locationData = :locationData",
        ExpressionAttributeValues: {
          ":pastData": {},
          ":locationData": {ongoing: "0", outputDay: "0kg", outputTotal: "0kg", burndown: {yaxis: [ null, null, null, null,null, null, null, null, null, null, null, null, null, null, null, null, null, null,null, null, ]}, halfline: {yaxis: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0,], valueA: "0", valueB: "0", changeA: "+0%", changeB: "+0%"}, quarterProgress: {value: "0", progress: "0"}, quarterBar: {value: "0kg", change: "+0%", dataA: [0, 0, 0, 0, 0, 0, 0], dataB: [0, 0, 0, 0, 0, 0, 0]}}
        },
      };
      db.update(paramsUpdate, function (errUpdate, updateReturn) {
        if (errUpdate) {
          console.log(errUpdate)
          callback(null, {
            statusCode: errUpdate.statusCode || 501,
            headers: {    
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({message: 'Couldn\'t update the user'}),
          });
        } else {
          db.query(params, function (error, finalResult) {
            if (error) {
              console.log(err);
              callback(null, {
                statusCode: err.statusCode || 501,
                headers: {    
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({message: 'There has been an error accessing the user'}),
              });
            } else {
              callback(null, {
                statusCode: 201,
                headers: {    
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Credentials': true,
                },
                body: JSON.stringify({message: 'Success', result: finalResult}),
              });
            }
          });
        }
      });
    }
  });
};

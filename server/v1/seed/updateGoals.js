'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/Add');
const faker = require('@ngneat/falso');

module.exports.updateGoals = (event, context, callback)  =>  {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}, {name: 'number', type: 'number'}], sr.sendResponse, callback)) {
    add(data.number - 1, data.userId, callback);
  }
};

function add(value, userId, callback) {
  var types = [
    'Assets Nearing EOL',
    'Average Time Between Actions',
    'Days Since Last Action',
    'Difference to Target Estimate',
    'Number of Ongoing Projects',
    'Possible Daily Savings',
    'Registered Assets',
    'Total Assets Replaced',
    'Total Carbon Emissions',
  ];

  const params = {
    userId: userId,
    name: faker.randQuote(),
    type: types[Math.floor(Math.random() * types.length)],
    targetValue: faker.randNumber({ min: 10, max: 1000 }),
  };

  db.add(process.env.GOALS_TABLE, params, complete, {value: value, userId: userId, callback: callback});
}

function complete(data, carry) {
  if (data.statusCode === 201) {
    if (carry.value === 0) {
      sr.sendResponse({statusCode: 201, return: {message: 'Success'}}, carry.callback);
    } else {
      add(carry.value - 1, carry.userId, carry.callback);
    }
  } else {
    sr.sendResponse(
      {
        statusCode: 501,
        return: {message: `An error occurred, please try again`}
      },
      carry.callback
    );
  }
}

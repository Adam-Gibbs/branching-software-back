'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/Add');
const faker = require('@ngneat/falso');

module.exports.updateGoals = (event, context, callback)  =>  {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}, {name: 'number', type: 'number'}], sr.sendResponse, callback)) {
    add(data.number, data.userId, callback);
  }
};

function add(value, userId, callback) {
  const item = faker.randProduct()
  const params = {
    userId: userId,
    co2: item.price,
    description: item.description,
    eol: faker.randFutureDate(),
    image: "",
    location: faker.randCity(),
    name: item.title,
    type: item.category,
  };

  db.add(process.env.ASSETS_TABLE, params, complete, {value: value, userId: userId, callback: callback});
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
        statusCode: error.statusCode || 501,
        return: {message: `An error occurred, please try again`}
      },
      callback
    );
  }
}

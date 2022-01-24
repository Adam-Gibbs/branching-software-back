'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/Add');
const faker = require('@ngneat/falso');

module.exports.updateAssets = (event, context, callback)  =>  {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}, {name: 'number', type: 'number'}], sr.sendResponse, callback)) {
    add(data.number - 1, data.userId, callback);
  }
};

function add(value, userId, callback) {
  const item = faker.randProduct()
  const params = {
    userId: userId,
    co2: parseFloat(item.price),
    description: item.description,
    eol: Date.now()+(faker.randNumber({ min: 432, max: 26298 })*1000000),
    image: "",
    location: faker.randCity(),
    name: item.title,
    type: item.category,
    createdAt: Date.now()-(faker.randNumber({ min: 0, max: 2629 })*1000000)
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
        statusCode: 501,
        return: {message: `An error occurred, please try again`}
      },
      carry.callback
    );
  }
}

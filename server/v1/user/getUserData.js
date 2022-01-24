'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/GetItemById');

module.exports.getUserData = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}], sr.sendResponse, callback)) {
    db.getItemById(process.env.USERS_TABLE, {id: data.userId}, 'User', sr.sendResponse, callback);
  }
};

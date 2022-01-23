'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/DeleteIfExists');

module.exports.deleteGoal = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'id', type: 'string'}, {name: 'userId', type: 'string'}], sr.sendResponse, callback)) {
    db.deleteIfExists(process.env.GOALS_TABLE, {id: data.id}, sr.sendResponse, 'Goal', callback);
  }
};

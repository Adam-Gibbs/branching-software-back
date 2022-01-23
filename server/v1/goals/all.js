'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/GetAllByIndex');

module.exports.allGoals = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}], sr.sendResponse, callback)) {
    db.getAllByIndex(process.env.GOALS_TABLE, {index: 'userId-goal-index', search: 'userId', searchItem: data.userId}, sr.sendResponse, callback);
  }
};

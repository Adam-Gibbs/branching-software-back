'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/Add');

module.exports.addGoal = (event, context, callback)  =>  {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(
      data,
      [
        {name: 'userId', type: 'string'},
        {name: 'targetValue', type: 'number'},
        {name: 'name', type: 'string'},
        {name: 'type', type: 'string'},
      ],
      sr.sendResponse,
      callback
    )) 
    {
      const params = {
        userId: data.userId,
        name: data.name,
        type: data.type,
        targetValue: data.targetValue,
      };

      db.add(process.env.GOALS_TABLE, params, sr.sendResponse, callback)
    }
};

'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/Add');

module.exports.addLocation = (event, context, callback)  =>  {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}, {name: 'name', type: 'string'}], sr.sendResponse, callback)) {
      const params = {
        userId: data.userId,
        name: data.name,
      };

      db.add(process.env.LOCATIONS_TABLE, params, sr.sendResponse, callback)
    }
};

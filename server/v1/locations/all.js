'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/GetAllByIndex');

module.exports.allLocations = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}], sr.sendResponse, callback)) {
    db.getAllByIndex(process.env.LOCATIONS_TABLE, {index: 'userId-location-index', search: 'userId', searchItem: data.userId}, sr.sendResponse, callback);
  }
};

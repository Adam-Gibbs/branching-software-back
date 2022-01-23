'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/GetItemById');

module.exports.getAsset = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}, {name: 'assetId', type: 'string'}], sr.sendResponse, callback)) {
    db.getItemById(process.env.ASSETS_TABLE, {id: data.assetId}, 'Asset', sr.sendResponse, callback);
  }
};

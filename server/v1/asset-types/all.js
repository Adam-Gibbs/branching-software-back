'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/GetAllByIndex');

module.exports.allAssetTypes = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}], sr.sendResponse, callback)) {
    db.getAllByIndex(process.env.ASSET_TYPES_TABLE, {index: 'userId-assetType-index', search: 'userId', searchItem: data.userId}, sr.sendResponse, callback);
  }
};

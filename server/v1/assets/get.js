'use strict';

import { validateRequest } from '../../helper/ValidateRequest';
import { sendResponse } from '../../helper/SendResponse';
import { getItemById } from '../../helper/db/GetItemById';

export function getAsset(event, context, callback) {
  const data = JSON.parse(event.body);
  if (validateRequest(data, [{name: 'userId', type: 'string'}, {name: 'assetId', type: 'string'}], sendResponse, callback)) {
    getItemById(process.env.ASSETS_TABLE, {id: data.assetId}, 'Asset', sendResponse, callback);
  }
}

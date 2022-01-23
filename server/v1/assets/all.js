'use strict';

import { validateRequest } from '../../helper/ValidateRequest';
import { sendResponse } from '../../helper/SendResponse';
import { getAllByIndex } from '../../helper/db/GetAllByIndex';

export function allAssets(event, context, callback) {
  const data = JSON.parse(event.body);
  if (validateRequest(data, [{name: 'userId', type: 'string'}], sendResponse, callback)) {
    getAllByIndex(process.env.ASSETS_TABLE, {index: 'userId-asset-index', search: 'userId', searchItem: 'data.userId'}, sendResponse, callback);
  }
}

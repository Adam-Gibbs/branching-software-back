'use strict';

import { validateRequest } from '../../helper/ValidateRequest';
import { sendResponse } from '../../helper/SendResponse';
import { add } from '../../helper/db/Add';

export function addAsset(event, context, callback) {
  const data = JSON.parse(event.body);
  if (validateRequest(
      data,
      [
        {name: 'userId', type: 'string'},
        {name: 'co2', type: 'number'},
        {name: 'description', type: 'string'},
        {name: 'location', type: 'string'},
        {name: 'eol', type: 'number'},
        {name: 'image', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'type', type: 'string'},
      ],
      sendResponse,
      callback
    )) 
    {
      const params = {
        userId: data.userId,
        co2: data.co2,
        description: data.description,
        eol: data.eol,
        image: data.image,
        location: data.location,
        name: data.name,
        type: data.type,
      };

      add(process.env.ASSETS_TABLE, params, sendResponse, callback)
    }
}

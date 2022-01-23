'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/Add');

module.exports.addAsset = (event, context, callback)  =>  {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(
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
      sr.sendResponse,
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

      add(process.env.ASSETS_TABLE, params, sr.sendResponse, callback)
    }
};

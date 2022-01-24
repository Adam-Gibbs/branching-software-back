'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/AddIfNotExists');

module.exports.signup = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'email', type: 'string'}, {name: 'password', type: 'string'}, {name: 'firstName', type: 'string'}, {name: 'lastName', type: 'string'}], sr.sendResponse, callback)) {
    const params = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        pastData: {},
        locationData: {ongoing: "0", outputDay: "0kg", outputTotal: "0kg", burndown: {yaxis: [ null, null, null, null,null, null, null, null, null, null, null, null, null, null, null, null, null, null,null, null, ]}, halfline: {yaxis: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0,], valueA: "0", valueB: "0", changeA: "+0%", changeB: "+0%"}, quarterProgress: {value: "0kg", progress: "0"}, quarterBar: {value: "0kg", change: "+0%", dataA: [0, 0, 0, 0, 0, 0, 0], dataB: [0, 0, 0, 0, 0, 0, 0]}},
    };
    
    db.addIfNotExists(process.env.USERS_TABLE, params, {index: 'email-user-index', search: 'email', searchItem: data.email},'User', sr.sendResponse, callback);
  }
};

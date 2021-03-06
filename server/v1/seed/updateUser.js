'use strict';

const vr = require('../../helper/ValidateRequest');
const sr = require('../../helper/SendResponse');
const db = require('../../helper/db/UpdateIfExists');

module.exports.updateUser = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (vr.validateRequest(data, [{name: 'userId', type: 'string'}], sr.sendResponse, callback)) {
    db.updateIfExists(
      process.env.USERS_TABLE,
      {
        id: data.userId,
        update: "set pastData = :pastData, locationData = :locationData",
        updateItems: {
          ":pastData": {assetsAdded: "100", co2Reduction: "562kg", totalCO2Output: "6542kg", assetsReplaced: {xaxis: ['2018-01-19T00:00:00.000Z', '2018-02-01T00:00:00.000Z', '2018-02-24T00:00:00.000Z', '2018-03-14T00:00:00.000Z', '2018-05-26T00:00:00.000Z', '2018-06-05T00:00:00.000Z', '2018-09-09T00:00:00.000Z', '2018-10-16T00:00:00.000Z'], yaxis: [100, 99, 98, 97, 96, 95, 94, 93]}, totalAssetsReplaced: "52", totalCO2Saved: "621kg", affectedLocations: "38", totalCost: "£21,602,000", outputEachWeek: {xaxis: ['2021-01-01T00:00:00.000Z', '2021-01-08T00:00:00.000Z', '2021-01-15T00:00:00.000Z', '2021-01-22T00:00:00.000Z','2021-01-29T00:00:00.000Z','2021-02-05T00:00:00.000Z','2021-02-12T00:00:00.000Z','2021-02-19T00:00:00.000Z','2021-02-26T00:00:00.000Z','2021-03-04T00:00:00.000Z','2021-03-11T00:00:00.000Z','2021-03-18T00:00:00.000Z','2021-03-25T00:00:00.000Z','2021-04-01T00:00:00.000Z','2021-04-08T00:00:00.000Z','2021-04-15T00:00:00.000Z','2021-04-22T00:00:00.000Z','2021-04-29T00:00:00.000Z','2021-05-06T00:00:00.000Z','2021-05-13T00:00:00.000Z','2021-05-20T00:00:00.000Z','2021-05-27T00:00:00.000Z','2021-06-03T00:00:00.000Z','2021-06-10T00:00:00.000Z','2021-06-17T00:00:00.000Z','2021-06-24T00:00:00.000Z','2021-07-01T00:00:00.000Z','2021-07-08T00:00:00.000Z','2021-07-15T00:00:00.000Z','2021-07-22T00:00:00.000Z','2021-07-29T00:00:00.000Z','2021-08-05T00:00:00.000Z','2021-08-12T00:00:00.000Z','2021-08-19T00:00:00.000Z','2021-08-26T00:00:00.000Z','2021-09-02T00:00:00.000Z','2021-09-09T00:00:00.000Z','2021-09-16T00:00:00.000Z','2021-09-23T00:00:00.000Z','2021-09-30T00:00:00.000Z','2021-10-07T00:00:00.000Z','2021-10-14T00:00:00.000Z','2021-10-21T00:00:00.000Z','2021-10-28T00:00:00.000Z','2021-11-04T00:00:00.000Z','2021-11-11T00:00:00.000Z','2021-11-18T00:00:00.000Z','2021-11-25T00:00:00.000Z','2021-12-02T00:00:00.000Z','2021-12-09T00:00:00.000Z','2021-12-16T00:00:00.000Z','2021-12-23T00:00:00.000Z','2021-12-30T00:00:00.000Z',], yaxis: [300, 400, 200, 350, 500, 400, 300, 200, 100, 400, 500, 300, 400, 200,100, 300, 400, 200, 350, 500, 400, 300, 200, 100, 400, 500, 300, 400,200, 100, 250, 200, 350, 500, 400, 300, 200, 100, 400, 500, 300, 400,200, 100, 250, 200, 100, 250, 200, 100, 250, 400, 300,]}},
          ":locationData": {ongoing: "8", outputDay: "7.2kg", outputTotal: "380kg", burndown: {yaxis: [ 22, 22, 21, 19,18, 18, 15, 14, 13, 11, null, null, null, null, null, null, null, null,null, null, ]}, halfline: {yaxis: [0, 9, 5, 10, 9, 2, 2, 8, 4, 5, 4, 3, 2, 5, 1, 10, 10, 4, 2, 0, 1, 2,7, 4, 7, 6, 0, 7, 11, 6,], valueA: "146", valueB: "78", changeA: "+12%", changeB: "-10%"}, quarterProgress: {value: "20kg", progress: "82"}, quarterBar: {value: "67kg", change: "-4.3%", dataA: [14, 11, 7, 9, 6, 15, 5], dataB: [13, 9, 8, 15, 12, 7, 6]}}
        }
      },
      {id: data.userId},
      'User',
      sr.sendResponse,
      callback
    );
  }
};

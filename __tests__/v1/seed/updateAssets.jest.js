const target = require("../../../server/v1/seed/updateAssets");
const db = require("../../../server/helper/db/Add");

describe("updateAssets", () => {
  it("adds to the database correct number of times", () => {
    db.add  = jest.fn().mockImplementation((table, data, complete, callback) => {
      complete({statusCode: 201, return: {message: 'Success'}}, callback);
    });
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return {userId: "input user string", number: 4};
    });

    process.env.ASSETS_TABLE = "assets";
    target.updateAssets({}, "", function () {});

    // Expect db.add to be called with correct values
    expect(db.add).toHaveBeenCalledWith(
      "assets", 
      {name: expect.any(String), type: expect.any(String), userId: "input user string", co2: expect.any(Number), description: expect.any(String), eol: expect.any(Number), image: expect.any(String), location: expect.any(String), createdAt: expect.any(Number)},
      expect.any(Function),
      {callback: expect.any(Function), userId: "input user string", value: expect.any(Number)}
      );

    // Expect db.add to be called onc4 times
    expect(db.add).toHaveBeenCalledTimes(4);
  });

  it("responds correctly to a db error", () => {
    db.add  = jest.fn().mockImplementation((table, data, complete, callback) => {
      complete({statusCode: 501, return: {message: 'Failure'}}, callback);
    });
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return {userId: "input user string", number: 4};
    });
    process.env.ASSETS_TABLE = "assets";
    target.updateAssets({}, "", function () {});

    // Expect db.add to be called with correct values
    expect(db.add).toHaveBeenCalledWith(
      "assets", 
      {name: expect.any(String), type: expect.any(String), userId: "input user string", co2: expect.any(Number), description: expect.any(String), eol: expect.any(Number), image: expect.any(String), location: expect.any(String), createdAt: expect.any(Number)},
      expect.any(Function),
      {callback: expect.any(Function), userId: "input user string", value: expect.any(Number)}
      );

    // Expect db.add to be called once
    expect(db.add).toHaveBeenCalledTimes(1);
  });
});

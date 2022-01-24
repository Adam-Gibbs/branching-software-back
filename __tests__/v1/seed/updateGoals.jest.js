const target = require("../../../server/v1/seed/updateGoals");
const db = require("../../../server/helper/db/Add");

describe("updateGoals", () => {
  it("adds to the database correct number of times", () => {
    db.add  = jest.fn().mockImplementation((table, data, complete, callback) => {
      complete({statusCode: 201, return: {message: 'Success'}}, callback);
    });
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return {userId: "input user string", number: 4};
    });

    process.env.GOALS_TABLE = "goals";
    target.updateGoals({}, "", function () {});

    // Expect db.add to be called with correct values
    expect(db.add).toHaveBeenCalledWith(
      "goals", 
      {name: expect.any(String), targetValue: expect.any(Number), type: expect.any(String), userId: "input user string"},
      expect.any(Function),
      {callback: expect.any(Function), userId: "input user string", value: expect.any(Number)}
      );

      // Expect db.add to be called 4 times
    expect(db.add).toHaveBeenCalledTimes(4);
  });

  it("responds correctly to a db error", () => {
    db.add  = jest.fn().mockImplementation((table, data, complete, callback) => {
      complete({statusCode: 501, return: {message: 'Failure'}}, callback);
    });
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      return {userId: "input user string", number: 4};
    });
    process.env.GOALS_TABLE = "goals";
    target.updateGoals({}, "", function () {});

    // Expect db.add to be called with correct values
    expect(db.add).toHaveBeenCalledWith(
      "goals", 
      {name: expect.any(String), targetValue: expect.any(Number), type: expect.any(String), userId: "input user string"},
      expect.any(Function),
      {callback: expect.any(Function), userId: "input user string", value: 3}
      );

    // Expect db.add to be called once
    expect(db.add).toHaveBeenCalledTimes(1);
  });
});

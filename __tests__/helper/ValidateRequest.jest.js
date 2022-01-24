const target = require("../../server/helper/ValidateRequest");

describe("ValidateRequest", () => {
  it("returns true with valid data", () => {
    const failure = jest.fn().mockImplementationOnce();
    expect(target.validateRequest(
      {aValue: 'this is a string', bValue: 258369, cValue: 'this also a string', dValue: 1657},
      [
        {name: 'aValue', type: 'string'},
        {name: 'bValue', type: 'number'},
        {name: 'cValue', type: 'string'},
        {name: 'dValue', type: 'number'},
      ],
      failure,
      function () {}
    )).toBe(true);
    
    // Expect failure to not be called
    expect(failure).not.toHaveBeenCalled();
  });

  it("returns false with invalid types", () => {
    const failure = jest.fn().mockImplementationOnce();
    expect(target.validateRequest(
      {aValue: 'this is a string', bValue: 258369, cValue: 'this also a string', dValue: 1657},
      [
        {name: 'aValue', type: 'string'},
        {name: 'bValue', type: 'string'},
        {name: 'cValue', type: 'string'},
        {name: 'dValue', type: 'string'},
      ],
      failure,
      function () {}
    )).toBe(false);
    
    // Expect failure to not be called
    expect(failure).toHaveBeenCalledWith({statusCode: 401, return: {message: 'Invalid data'}}, expect.any(Function));
  });

  it("returns false with invalid names", () => {
    const failure = jest.fn().mockImplementationOnce();
    expect(target.validateRequest(
      {aValue: 'this is a string', bValue: 258369, cValue: 'this also a string', eValue: 1657},
      [
        {name: 'aValue', type: 'string'},
        {name: 'bValue', type: 'string'},
        {name: 'cValue', type: 'string'},
        {name: 'dValue', type: 'string'},
      ],
      failure,
      function () {}
    )).toBe(false);
    
    // Expect failure to not be called
    expect(failure).toHaveBeenCalledWith({statusCode: 401, return: {message: 'Invalid data'}}, expect.any(Function));
  });
});

const target = require("../../server/helper/SendResponse");

describe("SendResponse", () => {
  it("correctly returns the right headers and content", () => {    
    const callback = jest.fn().mockImplementationOnce();
    target.sendResponse({statusCode: 201, return: {message: 'Success'}}, callback);

    // Expect callback to be called with correct values
    expect(callback).toHaveBeenCalledWith(null, {statusCode: 201, headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, }, body: JSON.stringify({"message": "Success"})});
    // Expect callback to be called once
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

'use strict';

module.exports.validateRequest = (data, expectedPattern, failure, callback) => {
  let valid = true;
  expectedPattern.forEach(element => {
    if (typeof data[element.name] !== element.type) {
      failure(
        {
          statusCode: 401,
          return: {message: 'Invalid data'}
        },
        callback
      );
      valid = false;
    }
  });
  return valid;
};

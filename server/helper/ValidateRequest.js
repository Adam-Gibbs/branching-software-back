'use strict';

export function validateRequest(data, expectedPattern, failure, callback) {
  expectedPattern.forEach(element => {
    if (typeof data[element.name] !== element.type) {
      console.log('Validation Failed');
      failure(
        {
          statusCode: 401,
          return: {message: 'Invalid data'}
        },
        callback
      );
      return false;
    }
  });
  return true;
}
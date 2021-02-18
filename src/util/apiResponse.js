const ApiResponse = {
  createResponse(statusCode = 500, body = {}, headers = {}) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        ...headers,
      },
      statusCode,
      body: JSON.stringify(body),
    };
  },

  ok(data = {}, headers = {}) {
    return this.createResponse(200, data, headers);
  },
  notFound(data = {}, headers = {}) {
    return this.createResponse(404, data, headers);
  },
  badRequest(data = {}, headers = {}) {
    return this.createResponse(400, data, headers);
  },
  serverError(data = {}, headers = {}) {
    return this.createResponse(500, data, headers);
  },
};

module.exports = ApiResponse;

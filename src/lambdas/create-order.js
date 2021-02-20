const { v4: uuid } = require('uuid');
const ApiResponse = require('../util/apiResponse');
const DynamoService = require('../services/dynamo.service');

module.exports.handler = async (event, ctx, cb) => {
  const { body = {} } = event;

  const { name = '', total = 0 } = JSON.parse(body);

  const order = {
    id: uuid(),
    name,
    total,
    createdAt: Date.now(),
  };

  try {
    const tableName = process.env.orderTableName;
    await DynamoService.write(order, tableName);
    return cb(null, ApiResponse.ok({ message: 'success' }));
  } catch (e) {
    return cb(
      null,
      ApiResponse.serverError({ message: 'Failed to create order' })
    );
  }
};

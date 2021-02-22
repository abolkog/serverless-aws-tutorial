const { v4: uuid } = require('uuid');
const ApiResponse = require('../util/apiResponse');
const sqsService = require('../services/sqs.service');

module.exports.handler = async (event, ctx, cb) => {
  const { body = {} } = event;

  const { name = '', total = 0 } = JSON.parse(body);
  const id = uuid();

  const order = {
    id,
    name,
    total,
    createdAt: Date.now(),
  };

  try {
    const queueURL = process.env.ordersQueue;
    await sqsService.sendMessage(queueURL, JSON.stringify(order));
    return cb(null, ApiResponse.ok({ message: 'success', id }));
  } catch (e) {
    return cb(
      null,
      ApiResponse.serverError({ message: 'Failed to create order' })
    );
  }
};

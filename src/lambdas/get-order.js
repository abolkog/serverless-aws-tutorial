const ApiResponse = require('../util/apiResponse');
const ORDERS = {
  1: { name: 'Khalid', total: 120, createdAt: '2021-01-01' },
  2: { name: 'Elma', total: 10, createdAt: '202-01-01' },
  3: { name: 'Sami', total: 222, createdAt: '2021-01-01' },
  4: { name: 'Bushra', total: 344, createdAt: '2021-01-01' },
  5: { name: 'Mozafar', total: -100, createdAt: '2021-01-01' },
  6: { name: 'Amin', total: 20, createdAt: '2021-01-01' },
};

module.exports.handler = (event, ctx, cb) => {
  const { pathParameters = {} } = event;
  if (!pathParameters.id) {
    return cb(null, ApiResponse.badRequest({ message: 'Missing order id' }));
  }

  const { id } = pathParameters;
  if (!ORDERS[id]) {
    return cb(
      null,
      ApiResponse.notFound({ message: `Order ${id} was not found` })
    );
  }

  return cb(null, ApiResponse.ok({ message: 'success', order: ORDERS[id] }));
};

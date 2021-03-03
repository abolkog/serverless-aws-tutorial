const dynamoService = require('../services/dynamo.service');

module.exports.handler = event => {
  const { Records = [] } = event;
  Records.forEach(async record => {
    if (record.Sns) {
      try {
        const { Sns } = record;
        const orders = JSON.parse(Sns.Message);

        const { orderTableName } = process.env;
        await dynamoService.writeBatch(orders, orderTableName);
      } catch (e) {
        console.log('Error pcessing data');
        console.log(e);
      }
    }
  });
};

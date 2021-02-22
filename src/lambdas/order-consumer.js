const DynamoService = require('../services/dynamo.service');

module.exports.handler = event => {
  const { Records = [] } = event;
  Records.forEach(async item => {
    try {
      const tableName = process.env.orderTableName;
      const order = JSON.parse(item.body);
      await DynamoService.write(order, tableName);
    } catch (e) {
      console.log('Error saving the data');
      console.log(e);
    }
  });
};

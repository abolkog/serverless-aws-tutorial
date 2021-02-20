const { v4: uuid } = require('uuid');
const DynamoService = require('../services/dynamo.service');
const s3Service = require('../services/s3.service');

module.exports.handler = event => {
  const { Records = [] } = event;
  Records.forEach(async record => {
    if (record.s3) {
      try {
        const {
          s3: { object, bucket },
        } = record;
        const contents = await s3Service.getObject(bucket.name, object.key);
        const data = JSON.parse(contents);
        const orders = data.map(item => ({
          id: uuid(),
          ...item,
        }));

        const tableName = process.env.orderTableName;
        await DynamoService.writeBatch(orders, tableName);
      } catch (e) {
        console.log('Error processing order');
        console.log(e);
      }
    } //End if
  });
};

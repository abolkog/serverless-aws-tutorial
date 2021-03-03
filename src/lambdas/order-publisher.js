const { v4: uuid } = require('uuid');
const s3Service = require('../services/s3.service');
const snsService = require('../services/sns.service');

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

        const { ordersTopicARN } = process.env;
        await snsService.publishMessage(JSON.stringify(orders), ordersTopicARN);
      } catch (e) {
        console.log('Error publishing order');
        console.log(e);
      }
    } //End if
  });
};

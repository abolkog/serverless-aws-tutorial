const { sendMessage } = require('../services/slack.service');

module.exports.handler = event => {
  const { Records = [] } = event;
  Records.forEach(async record => {
    if (record.Sns) {
      try {
        const { Sns } = record;
        const orders = JSON.parse(Sns.Message);
        const message = `New file uploaded to s3 containing [${orders.length}] order.`;
        await sendMessage(message);
      } catch (e) {
        console.log('Error sending notification');
        console.log(e);
      }
    }
  });
};

const AWS = require('aws-sdk');

const sqsClient = new AWS.SQS();

const sendMessage = async (queueURL, message, params = {}) => {
  if (typeof message !== 'string') {
    throw new Error('Message is not a string');
  }

  const messageParams = {
    QueueUrl: queueURL,
    MessageBody: message,
    ...params,
  };

  try {
    await sqsClient.sendMessage(messageParams).promise();
  } catch (e) {
    console.log(`Failed to send message`, e);
    throw new Error(e);
  }
};

module.exports = {
  sendMessage,
};

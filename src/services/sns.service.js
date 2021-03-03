const AWS = require('aws-sdk');

const snsClient = new AWS.SNS();

const publishMessage = async (message, topicARN) => {
  if (typeof message !== 'string') {
    throw new Error('Message is not a string');
  }

  if (!topicARN) {
    throw new Error('TopicArn is required');
  }

  const params = {
    Message: message,
    TopicArn: topicARN,
  };

  try {
    await snsClient.publish(params).promise();
  } catch (e) {
    console.log(`Failed to publish message`, e);
    throw new Error(e);
  }
};

module.exports = {
  publishMessage,
};

const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const write = async (data, tableName) => {
  const params = {
    TableName: tableName,
    Item: data,
  };

  const result = await documentClient.put(params).promise();
  if (!result) {
    throw new Error(`Unable to write to dynamo table ${tableName}`);
  }
  return result;
};

module.exports = {
  write,
};

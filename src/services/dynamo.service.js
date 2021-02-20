const AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient();

const writeBatch = async (data, tableName) => {
  const batchData = data.map(item => ({
    PutRequest: {
      Item: {
        ...item,
      },
    },
  }));
  const params = {
    RequestItems: {
      [tableName]: batchData,
    },
  };

  const result = await documentClient.batchWrite(params).promise();
  if (!result) {
    throw new Error(`Unable to batchWrite to dynamo table ${tableName}`);
  }
  return result;
};

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
  writeBatch,
};
